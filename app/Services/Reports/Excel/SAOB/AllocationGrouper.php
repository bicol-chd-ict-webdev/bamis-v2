<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB;

use App\Enums\AppropriationSourceEnum;
use App\Enums\NorsaTypeEnum;
use App\Models\Allocation;
use Brick\Math\BigDecimal;
use Carbon\CarbonImmutable;
use Closure;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

/**
 * @phpstan-type SAOBObjectDistribution array{
 *     name: string,
 *     code: int|string,
 *     gaa_conap: float|int|numeric-string,
 *     allotment_conap: float|int|numeric-string,
 *     saro: float|int|numeric-string,
 *     norsa: float|int|numeric-string|\Brick\Math\BigNumber,
 *     saa_transfer_to: float|int|numeric-string,
 *     saa_transfer_from: float|int|numeric-string,
 *     obligations: array<int, float|int|string>,
 *     disbursements: array<int, float|int|string>
 * }
 * @phpstan-type SAOBSourceData array{
 *     Data: array{particulars: string, amount: float|int|numeric-string},
 *     'Object Distribution': array<int, SAOBObjectDistribution>
 * }
 * @phpstan-type SAOMLineItemData array{
 *     Data: array{name: string, code: string},
 *     'Allotment Class': array<string, array<string, mixed>>
 * }
 */
final class AllocationGrouper
{
    /**
     * @param  Builder<Allocation>  $query
     * @param  array<int, string>  $allAllotmentClasses
     * @param  Closure(Allocation): string  $makeKey
     * @return array<string, array<string, mixed>>
     */
    public function getGroupedAllocations(Builder $query, array $allAllotmentClasses, Closure $makeKey, string $reportDate): array
    {
        /** @var array<int, array{column?: string, value?: mixed}> $wheres */
        $wheres = $query->getQuery()->wheres;
        $isConap = collect($wheres)->contains(fn ($where): bool => isset($where['column'], $where['value']) &&
            $where['column'] === 'appropriation_type_id' &&
            $where['value'] === 2);

        return $query
            ->with([
                'lineItem',
                'projectType',
                'allotmentClass',
                'appropriation',
                'objectDistributions.expenditure',
                'programClassification',
                'program',
                'subprogram',
            ])
            ->orderBy('appropriation_source')
            ->get()
            ->groupBy('appropriation_source')
            ->mapWithKeys(function (Collection $collection, $source) use ($allAllotmentClasses, $makeKey, $isConap, $reportDate): array {
                /** @var string $source */
                $label = $source === AppropriationSourceEnum::NEW->value
                    ? Str::upper($source.' ('.($isConap ? 'CONAP' : 'CURRENT').')')
                    : Str::upper($source);

                return [
                    $label => $this->groupAllocationsByStructure($collection, $source, $allAllotmentClasses, $makeKey, $reportDate),
                ];
            })
            ->map(function (array $projectTypes): array {
                if (count($projectTypes) === 1 && isset($projectTypes[' – '])) {
                    $content = $projectTypes[' – '];
                    if (is_array($content) && isset($content['Line Item'])) {
                        return ['Line Item' => $content['Line Item']];
                    }
                }

                return $projectTypes;
            })
            ->all();
    }

    /**
     * @param  Collection<int, Allocation>  $collection
     * @param  array<int, string>  $allAllotmentClasses
     * @param  Closure(Allocation): string  $makeKey
     * @return array<string, mixed>
     */
    private function groupAllocationsByStructure(Collection $collection, string $source, array $allAllotmentClasses, Closure $makeKey, string $reportDate): array
    {
        $operations = $collection->filter(fn (Allocation $a): bool => Str::startsWith(Str::upper((string) ($a->projectType->name ?? '')), 'III. OPERATIONS'));
        $others = $collection->reject(fn (Allocation $a): bool => Str::startsWith(Str::upper((string) ($a->projectType->name ?? '')), 'III. OPERATIONS'));

        $grouped = $source === AppropriationSourceEnum::NEW->value
            ? $this->groupByProjectType($others, $allAllotmentClasses, $makeKey, $reportDate)
            : $this->groupByProgram($others, $allAllotmentClasses, $makeKey, $reportDate);

        if ($operations->isNotEmpty()) {
            $grouped['III. OPERATIONS – 300000000000000'] = $this->groupOperations($operations, $allAllotmentClasses, $makeKey, $reportDate);
        }

        return $grouped;
    }

    /**
     * @param  Collection<int, Allocation>  $allocations
     * @param  array<int, string>  $allAllotmentClasses
     * @param  Closure(Allocation): string  $makeKey
     * @return array<string, array{'Line Item': array<int, SAOMLineItemData>}>
     */
    private function groupByProjectType(Collection $allocations, array $allAllotmentClasses, Closure $makeKey, string $reportDate): array
    {
        return $allocations
            ->sortBy('project_type_id')
            ->groupBy(function (Allocation $a): string {
                $name = mb_trim($a->projectType->name ?? '');
                $code = mb_trim($a->projectType->code ?? '');

                return filled($name) && filled($code)
                    ? Str::upper(sprintf('%s – %s', $name, $code))
                    : ' – ';
            })
            ->mapWithKeys(fn (Collection $projGrp, string $key): array => [
                $key => [
                    'Line Item' => $this->groupLineItems($projGrp, $allAllotmentClasses, $makeKey, $reportDate),
                ],
            ])->all();
    }

    /**
     * @param  Collection<int, Allocation>  $group
     * @param  array<int, string>  $allAllotmentClasses
     * @param  Closure(Allocation): string  $makeKey
     * @return array<int, SAOMLineItemData>
     */
    private function groupLineItems(Collection $group, array $allAllotmentClasses, Closure $makeKey, string $reportDate): array
    {
        // determine year/prevYear from report date
        $year = CarbonImmutable::parse($reportDate)->year;
        $prevYear = $year - 1;

        return $group
            ->groupBy(fn (Allocation $a): string => sprintf('%s–%s', (string) ($a->lineItem->name ?? ''), (string) ($a->lineItem->code ?? '')))
            ->map(function (Collection $lineGrp) use ($allAllotmentClasses, $makeKey, $reportDate, $year, $prevYear): array {
                $firstAllocation = $lineGrp->first();
                $lineItem = $firstAllocation->lineItem ?? null;
                if (! $lineItem) {
                    return [];
                }

                /** @var array<string, array<string, SAOBSourceData>> $grouped */
                $grouped = $lineGrp
                    ->groupBy(fn (Allocation $a): string => (string) ($a->allotmentClass->name ?? ''))
                    ->map(
                        fn (Collection $classGrp) => $classGrp
                            ->groupBy(fn (Allocation $a) => $makeKey($a))
                            /** @return SAOBSourceData */
                            ->map(fn (Collection $allocs): array => [
                                'Data' => [
                                    'particulars' => (string) ($allocs->first()->particulars ?? ''),
                                    'amount' => 0,
                                ],
                                'Object Distribution' => $allocs->flatMap(
                                    function (Allocation $alloc) use ($reportDate): array {
                                        $acronym = $alloc->appropriation->acronym ?? null;

                                        return $alloc->objectDistributions->map(
                                            /** @return SAOBObjectDistribution */
                                            fn ($od): array => [
                                                'name' => (string) ($od->expenditure->name ?? ''),
                                                'code' => (string) ($od->expenditure->code ?? ''),
                                                'gaa_conap' => $acronym === 'GAA' ? $od->amount : 0,
                                                'allotment_conap' => $acronym === 'GAA' ? $od->amount : 0,
                                                'saro' => $acronym === 'SARO' ? $od->amount : 0,
                                                'norsa' => $od->obligations->where('norsa_type', NorsaTypeEnum::PREVIOUS->value)->reduce(fn (BigDecimal $carry, $item): BigDecimal => $carry->plus(BigDecimal::of((string) ($item->amount ?? '0'))->abs()), BigDecimal::zero()),
                                                'saa_transfer_to' => $od->obligations->where('is_transferred', true)->sum('amount'),
                                                'saa_transfer_from' => $acronym === 'SAA' ? $od->amount : 0,
                                                'obligations' => (array) $od->obligationsSumPerMonth($reportDate)->toArray(),
                                                'disbursements' => (array) $od->disbursementsSumPerMonth($reportDate)->toArray(),
                                            ]
                                        )->all();
                                    }
                                )->values()->all(),
                            ])->all()
                    )->all();

                // --- SORT EACH CLASS BUCKET'S APPROPRIATION KEYS ---
                foreach ($grouped as &$bucket) {
                    if ($bucket === []) {
                        continue;
                    }

                    uksort($bucket, function (string $a, string $b) use ($year, $prevYear): int {
                        $aKey = Str::upper($a);
                        $bKey = Str::upper($b);

                        $priority = function (string $sortKey) use ($year, $prevYear): int {
                            if ($sortKey === 'DATA') {
                                return -1;
                            }

                            // keep special 'Data' key first
                            if (Str::startsWith($sortKey, 'GAA '.$prevYear)) {
                                return 0;
                            }

                            if (Str::contains($sortKey, 'SAA') && Str::contains($sortKey, (string) $prevYear)) {
                                return 1;
                            }

                            if (Str::startsWith($sortKey, 'GAA '.$year)) {
                                return 2;
                            }

                            if (Str::contains($sortKey, 'SAA') && Str::contains($sortKey, (string) $year)) {
                                return 3;
                            }

                            if (Str::contains($sortKey, 'SARO')) {
                                return 4;
                            }

                            return 5;
                        };

                        $pa = $priority($aKey);
                        $pb = $priority($bKey);

                        if ($pa === $pb) {
                            return strnatcmp($aKey, $bKey);
                        }

                        return $pa < $pb ? -1 : 1;
                    });
                }

                unset($bucket); // break reference

                // build the final complete shape (preserves the new key order)
                $complete = collect($allAllotmentClasses)
                    ->mapWithKeys(function (string $class) use ($grouped): array {
                        $classBucket = $grouped[$class] ?? [];

                        return [
                            $class => [
                                'Data' => ['amount' => 0],
                            ] + $classBucket,
                        ];
                    })->all();

                return [
                    'Data' => [
                        'name' => (string) $lineItem->name,
                        'code' => (string) $lineItem->code,
                    ],
                    'Allotment Class' => $complete,
                ];
            })->reject(fn (array $item): bool => $item === [])->values()->all();
    }

    /**
     * @param  Collection<int, Allocation>  $allocations
     * @param  array<int, string>  $allAllotmentClasses
     * @param  Closure(Allocation): string  $makeKey
     * @return array<string, array{'Line Item': array<int, SAOMLineItemData>}>
     */
    private function groupByProgram(Collection $allocations, array $allAllotmentClasses, Closure $makeKey, string $reportDate): array
    {
        return $allocations
            ->groupBy(function (Allocation $a): string {
                $name = mb_trim($a->program->name ?? '');
                $code = mb_trim($a->program->code ?? '');

                return filled($name) && filled($code)
                    ? Str::upper(sprintf('%s – %s', $name, $code))
                    : ' – ';
            })
            ->mapWithKeys(fn (Collection $projGrp, string $key): array => [
                $key => [
                    'Line Item' => $this->groupLineItems($projGrp, $allAllotmentClasses, $makeKey, $reportDate),
                ],
            ])->all();
    }

    /**
     * @param  Collection<int, Allocation>  $allocations
     * @param  array<int, string>  $allAllotmentClasses
     * @param  Closure(Allocation): string  $makeKey
     * @return array<string, array<string, array<string, array{'Line Item': array<int, SAOMLineItemData>}>>>
     */
    private function groupOperations(Collection $allocations, array $allAllotmentClasses, Closure $makeKey, string $reportDate): array
    {
        /** @var array<string, array<string, array<string, array{'Line Item': array<int, SAOMLineItemData>}>>> $result */
        $result = $allocations
            ->groupBy(fn (Allocation $a): string => sprintf('%s - %s', (string) ($a->programClassification->name ?? ''), (string) ($a->programClassification->code ?? '')))
            ->mapWithKeys(function (Collection $classificationGroup, string $classificationKey) use ($allAllotmentClasses, $makeKey, $reportDate): array {
                $programs = $classificationGroup
                    ->groupBy(fn (Allocation $a): string => sprintf('%s - %s', (string) ($a->program->name ?? ''), (string) ($a->program->code ?? '')))
                    ->mapWithKeys(function (Collection $programGroup, string $programKey) use ($allAllotmentClasses, $makeKey, $reportDate): array {
                        $subprograms = $programGroup
                            ->groupBy(
                                fn (Allocation $a): string => $a->subprogram
                                ? sprintf('%s - %s', (string) ($a->subprogram->name ?? ''), (string) ($a->subprogram->code ?? ''))
                                : 'Line Item'
                            )
                            ->mapWithKeys(function (Collection $subGrp, string $subKey) use ($allAllotmentClasses, $makeKey, $reportDate): array {
                                if ($subKey === 'Line Item') {
                                    return ['Line Item' => $this->groupLineItems($subGrp, $allAllotmentClasses, $makeKey, $reportDate)];
                                }

                                return [
                                    $subKey => [
                                        'Line Item' => $this->groupLineItems($subGrp, $allAllotmentClasses, $makeKey, $reportDate),
                                    ],
                                ];
                            })
                            ->all();

                        return [$programKey => $subprograms];
                    })->all();

                return [$classificationKey => $programs];
            })->all();

        return $result;
    }
}
