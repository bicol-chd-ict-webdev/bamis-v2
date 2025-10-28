<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\UtilizationByAllotmentClass;

use App\Enums\AppropriationSource;
use App\Models\Appropriation;
use App\Models\AppropriationType;
use Brick\Math\BigDecimal;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Facades\DB;

final class UtilizationByAllotmentClassDataBuilder
{
    public function build(): array
    {
        $obligations = $this->buildObligationsSubQuery();

        $ps = $this->buildPs($obligations);
        $mooe = $this->buildMooe($obligations);
        $co = $this->buildCo($obligations);

        return [$ps, $mooe, $co];
    }

    private function buildObligationsSubQuery(): Builder
    {
        return DB::table('obligations')
            ->select([
                'allocation_id',
                DB::raw('SUM(amount) as total_obligation'),
                DB::raw('SUM(COALESCE(disbursements.net_amount,0)
                    + COALESCE(disbursements.tax,0)
                    + COALESCE(disbursements.retention,0)
                    + COALESCE(disbursements.penalty,0)
                    + COALESCE(disbursements.absences,0)
                    + COALESCE(disbursements.other_deductions,0)) as total_disbursement'),
            ])
            ->leftJoin('disbursements', 'disbursements.obligation_id', '=', 'obligations.id')
            ->groupBy('allocation_id');
    }

    private function buildPs(Builder $obligations): array
    {
        $psGaa = $this->fetchAllocations([
            'allotment_class_id' => 1,
            'appropriation_type_id' => AppropriationType::CURRENT,
            'appropriation_id' => Appropriation::GENERAL_APPROPRIATION,
            'exclude_appropriation_source' => AppropriationSource::AUTOMATIC->value,
            'join_line_items' => true,
        ], $obligations);

        $rlip = $this->fetchAllocations([
            'allotment_class_id' => 1,
            'appropriation_type_id' => AppropriationType::CURRENT,
            'appropriation_source' => AppropriationSource::AUTOMATIC->value,
        ], $obligations, 'RLIP');

        $saaCurrent = $this->fetchAllocations([
            'allotment_class_id' => 1,
            'appropriation_type_id' => AppropriationType::CURRENT,
            'appropriation_id' => Appropriation::SUB_ALLOTMENT,
        ], $obligations, 'SAA CURRENT');

        $saro = $this->fetchAllocations([
            'allotment_class_id' => 1,
            'appropriation_type_id' => AppropriationType::CURRENT,
            'appropriation_id' => Appropriation::SPECIAL_ALLOTMENT,
        ], $obligations, 'SARO from DBM');

        return ['PS with RLIP' => array_merge($psGaa, $rlip, $saaCurrent, $saro)];
    }

    private function buildMooe(Builder $obligations): array
    {
        $groups = [
            $this->fetchAllocations([
                'allotment_class_id' => 2,
                'appropriation_type_id' => AppropriationType::CURRENT,
                'appropriation_id' => Appropriation::GENERAL_APPROPRIATION,
                'exclude_appropriation_source' => AppropriationSource::AUTOMATIC->value,
                'join_line_items' => true,
            ], $obligations),
            $this->fetchAllocations([
                'allotment_class_id' => 2,
                'appropriation_type_id' => AppropriationType::CURRENT,
                'appropriation_id' => Appropriation::SUB_ALLOTMENT,
            ], $obligations, 'SAA CURRENT'),
            $this->fetchAllocations([
                'allotment_class_id' => 2,
                'appropriation_type_id' => AppropriationType::CURRENT,
                'appropriation_id' => Appropriation::SUB_ALLOTMENT,
                'line_item_id' => 34,
            ], $obligations, 'MAIP CURRENT'),
            $this->fetchAllocations([
                'allotment_class_id' => 2,
                'appropriation_type_id' => AppropriationType::CONAP,
                'appropriation_id' => Appropriation::GENERAL_APPROPRIATION,
                'exclude_appropriation_source' => AppropriationSource::AUTOMATIC->value,
                'join_line_items' => true,
            ], $obligations, 'GAA CONAP'),
            $this->fetchAllocations([
                'allotment_class_id' => 2,
                'appropriation_type_id' => AppropriationType::CONAP,
                'appropriation_id' => Appropriation::SUB_ALLOTMENT,
                'exclude_appropriation_source' => AppropriationSource::AUTOMATIC->value,
                'join_line_items' => true,
            ], $obligations, 'SAA CONAP'),
            $this->fetchAllocations([
                'allotment_class_id' => 2,
                'appropriation_type_id' => AppropriationType::CONAP,
                'appropriation_id' => Appropriation::SUB_ALLOTMENT,
                'line_item_id' => 34,
            ], $obligations, 'MAIP CONAP'),
        ];

        return ['MOOE' => array_merge(...$groups)];
    }

    private function buildCo(Builder $obligations): array
    {
        $targetExpenditures = [
            'Hospitals and Health Centers',
            'Medical Equipment',
            'Motor Vehicles',
        ];

        $hfepCurrent = $this->fetchObjectDistributions(
            AppropriationType::CURRENT, $targetExpenditures, $obligations
        );

        $hfepConap = $this->fetchObjectDistributions(
            AppropriationType::CONAP, $targetExpenditures, $obligations
        );

        return [
            'Capital Outlays' => [
                'HFEP CURRENT' => $hfepCurrent,
                'HFEP CONAP' => $hfepConap,
            ],
        ];
    }

    private function fetchAllocations(array $filters, Builder $obligations, ?string $forcedLabel = null): array
    {
        $qb = DB::table('allocations')
            ->leftJoinSub($obligations, 'obligations', 'obligations.allocation_id', '=', 'allocations.id')
            ->select([
                DB::raw('SUM(allocations.amount) as allotment'),
                DB::raw('COALESCE(SUM(obligations.total_obligation), 0) as obligation'),
                DB::raw('COALESCE(SUM(obligations.total_disbursement), 0) as disbursement'),
            ]);

        if (! empty($filters['join_line_items'])) {
            $qb->addSelect('line_items.acronym as line_item_acronym')
                ->join('line_items', 'line_items.id', '=', 'allocations.line_item_id')
                ->groupBy('line_items.acronym');
        }

        foreach (['allotment_class_id', 'appropriation_type_id', 'appropriation_id', 'line_item_id'] as $key) {
            if (isset($filters[$key])) {
                $qb->where("allocations.{$key}", $filters[$key]);
            }
        }

        if (isset($filters['appropriation_source'])) {
            $qb->where('allocations.appropriation_source', $filters['appropriation_source']);
        }

        if (isset($filters['exclude_appropriation_source'])) {
            $qb->whereNot('allocations.appropriation_source', $filters['exclude_appropriation_source']);
        }

        return $qb->get()->map(fn ($a): array => $this->formatRow($a, $forcedLabel))->all();
    }

    private function fetchObjectDistributions(
        int $appropriationType,
        array $targetExpenditures,
        Builder $obligations
    ): array {
        $rows = DB::table('allocations')
            ->join('object_distributions', 'object_distributions.allocation_id', '=', 'allocations.id')
            ->join('expenditures', 'expenditures.id', '=', 'object_distributions.expenditure_id')
            ->leftJoinSub($obligations, 'obligations', 'obligations.allocation_id', '=', 'allocations.id')
            ->select([
                'expenditures.name as expenditure_name',
                DB::raw('SUM(object_distributions.amount) as allotment'),
                DB::raw('COALESCE(SUM(obligations.total_obligation), 0) as obligation'),
                DB::raw('COALESCE(SUM(obligations.total_disbursement), 0) as disbursement'),
            ])
            ->where('allocations.allotment_class_id', 3)
            ->where('allocations.appropriation_type_id', $appropriationType)
            ->where('allocations.line_item_id', 2)
            ->whereIn('expenditures.name', $targetExpenditures)
            ->groupBy('expenditures.name')
            ->get()
            ->keyBy('expenditure_name');

        return collect($targetExpenditures)->map(fn ($name): array => $this->formatRow($rows->get($name), $name))->values()->all();
    }

    private function formatRow(?object $allocation, ?string $label = null): array
    {
        $allotment = BigDecimal::of((string) ($allocation->allotment ?? '0'));
        $obligation = BigDecimal::of((string) ($allocation->obligation ?? '0'));
        $disbursement = BigDecimal::of((string) ($allocation->disbursement ?? '0'));

        return [
            'line_item_acronym' => $label ?? (string) ($allocation->line_item_acronym ?? ''),
            'allotment' => $allotment->toScale(2)->__toString(),
            'obligation' => $obligation->toScale(2)->__toString(),
            'unobligated_balance' => $allotment->minus($obligation)->toScale(2)->__toString(),
            'disbursement' => $disbursement->toScale(2)->__toString(),
            'unpaid_obligation' => $obligation->minus($disbursement)->toScale(2)->__toString(),
        ];
    }
}
