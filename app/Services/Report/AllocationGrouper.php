<?php

declare(strict_types=1);

namespace App\Services\Report;

use App\Enums\AppropriationSource;
use App\Enums\NorsaType;
use Closure;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class AllocationGrouper
{
    public function getGroupedAllocations(Builder $query, array $allAllotmentClasses, Closure $makeKey, int $reportYear, int $reportMonth): array
    {
        $isConap = collect($query->getQuery()->wheres ?? [])->contains(fn ($where): bool => isset($where['column'], $where['value']) &&
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
            ->mapWithKeys(function ($collection, $source) use ($allAllotmentClasses, $makeKey, $isConap, $reportYear, $reportMonth): array {
                $label = $source === AppropriationSource::NEW->value
                     ? Str::upper("{$source} (".($isConap ? 'CONAP' : 'CURRENT').')')
                     : Str::upper($source);

                return [
                    $label => $this->groupAllocationsByStructure($collection, $source, $allAllotmentClasses, $makeKey, $reportYear, $reportMonth),
                ];
            })
            ->map(function ($projectTypes): array {
                if (count($projectTypes) === 1 && isset($projectTypes[' – '])) {
                    $content = $projectTypes[' – '];
                    if (is_array($content) && isset($content['Line Item'])) {
                        return ['Line Item' => $content['Line Item']];
                    }
                }

                return $projectTypes;
            })
            ->toArray();
    }

    private function groupAllocationsByStructure(Collection $collection, string $source, array $allAllotmentClasses, Closure $makeKey, int $reportYear, int $reportMonth): array
    {
        $operations = $collection->filter(fn ($a) => Str::startsWith(Str::upper($a->projectType?->name), 'III. OPERATIONS'));
        $others = $collection->reject(fn ($a) => Str::startsWith(Str::upper($a->projectType?->name), 'III. OPERATIONS'));

        $source === AppropriationSource::NEW->value
            ? $grouped = $this->groupByProjectType($others, $allAllotmentClasses, $makeKey, $reportYear, $reportMonth)
            : $grouped = $this->groupByProgram($others, $allAllotmentClasses, $makeKey, $reportYear, $reportMonth);

        if ($operations->isNotEmpty()) {
            $grouped['III. OPERATIONS – 300000000000000'] = $this->groupOperations($operations, $allAllotmentClasses, $makeKey, $reportYear, $reportMonth);
        }

        return $grouped;
    }

    private function groupByProjectType(Collection $allocations, array $allAllotmentClasses, Closure $makeKey, int $reportYear, int $reportMonth): array
    {
        return $allocations
            ->sortBy('project_type_id')
            ->groupBy(function ($a) {
                $name = trim($a->projectType?->name ?? '');
                $code = trim($a->projectType?->code ?? '');

                return filled($name) && filled($code)
                    ? Str::upper("{$name} – {$code}")
                    : ' – ';
            })
            ->map(fn ($projGrp): array => [
                'Line Item' => $this->groupLineItems($projGrp, $allAllotmentClasses, $makeKey, $reportYear, $reportMonth),
            ])->toArray();
    }

    private function groupByProgram(Collection $allocations, array $allAllotmentClasses, Closure $makeKey, int $reportYear, int $reportMonth): array
    {
        return $allocations
            ->groupBy(function ($a) {
                $name = trim($a->program?->name ?? '');
                $code = trim($a->program?->code ?? '');

                return filled($name) && filled($code)
                    ? Str::upper("{$name} – {$code}")
                    : ' – ';
            })
            ->map(fn ($projGrp): array => [
                'Line Item' => $this->groupLineItems($projGrp, $allAllotmentClasses, $makeKey, $reportYear, $reportMonth),
            ])->toArray();
    }

    private function groupOperations(Collection $allocations, array $allAllotmentClasses, Closure $makeKey, int $reportYear, int $reportMonth): array
    {
        return $allocations
            ->groupBy(fn ($a): string => "{$a->programClassification?->name} - {$a->programClassification?->code}")
            ->map(fn ($classificationGroup) => collect($classificationGroup)
                ->groupBy(fn ($a): string => "{$a->program?->name} - {$a->program?->code}")
                ->map(fn ($programGroup) => collect($programGroup)
                    ->groupBy(fn ($a): string => $a->subprogram
                        ? "{$a->subprogram->name} - {$a->subprogram->code}"
                        : '__NO_SUBPROGRAM__'
                    )
                    ->map(function ($subGroup, $subKey) use ($allAllotmentClasses, $makeKey, $reportYear, $reportMonth): array {
                        $lineItems = $this->groupLineItems($subGroup, $allAllotmentClasses, $makeKey, $reportYear, $reportMonth);

                        return $subKey === '__NO_SUBPROGRAM__'
                            ? ['Line Item' => $lineItems]
                            : ['Line Item' => $lineItems];
                    })
                    ->mapWithKeys(fn ($group, $key): array => $key === '__NO_SUBPROGRAM__' && isset($group['Line Item'])
                        ? ['Line Item' => $group['Line Item']]
                        : [$key => $group])
                    ->toArray()
                )->toArray()
            )->toArray();
    }

    private function groupLineItems(Collection $group, array $allAllotmentClasses, Closure $makeKey, int $reportYear, int $reportMonth): array
    {
        return $group
            ->groupBy(fn ($a): string => "{$a->lineItem->name}–{$a->lineItem->code}")
            ->map(function ($lineGrp) use ($allAllotmentClasses, $makeKey, $reportYear, $reportMonth): array {
                $lineItem = $lineGrp->first()->lineItem;

                $grouped = $lineGrp
                    ->groupBy(fn ($a) => $a->allotmentClass->name)
                    ->map(fn ($classGrp) => collect($classGrp)
                        ->groupBy(fn ($a) => $makeKey($a))
                        ->map(fn ($allocs, $code): array => [
                            'Data' => [
                                'particulars' => $allocs->first()?->particulars ?? '',
                                'amount' => 0,
                            ],
                            'Object Distribution' => $allocs->flatMap(
                                function ($alloc) use ($reportYear, $reportMonth) {
                                    $acronym = $alloc->appropriation?->acronym;

                                    return $alloc->objectDistributions->map(
                                        fn ($od): array => [
                                            'name' => $od->expenditure?->name ?? '',
                                            'code' => $od->expenditure?->code ?? '',
                                            'gaa_conap' => in_array($acronym, ['GAA', 'SARO']) ? $od->amount : 0,
                                            'allotment_conap' => in_array($acronym, ['GAA', 'SARO']) ? $od->amount : 0,
                                            'saro' => 0,
                                            'norsa' => $od->obligations->where('norsa_type', NorsaType::PREVIOUS->value)->sum('amount'),
                                            'saa_transfer_to' => $od->obligations->where('is_transferred', true)->sum('amount'),
                                            'saa_transfer_from' => $acronym === 'SAA' ? $od->amount : 0,
                                            'obligations' => $od->obligationsSumPerMonth($reportYear, $reportMonth)->toArray(),
                                            'disbursements' => $od->disbursementsSumPerMonth($reportYear, $reportMonth)->toArray(),
                                        ]
                                    );
                                }
                            )->values()->toArray(),
                        ])->toArray()
                    );

                $complete = collect($allAllotmentClasses)
                    ->mapWithKeys(function ($class) use ($grouped): array {
                        $classBucket = $grouped[$class] ?? [];
                        $filtered = collect($classBucket)->filter(fn ($rows): bool => ! empty($rows))->toArray();

                        return [
                            $class => [
                                'Data' => ['amount' => 0],
                            ] + $filtered,
                        ];
                    })->toArray();

                return [
                    'Data' => [
                        'name' => $lineItem->name,
                        'code' => $lineItem->code,
                    ],
                    'Allotment Class' => $complete,
                ];
            })->values()->toArray();
    }
}
