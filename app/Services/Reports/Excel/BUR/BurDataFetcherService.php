<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\BUR;

use Illuminate\Support\Facades\DB;

class BurDataFetcherService
{
    public function fetch(string $date): array
    {
        return DB::table('office_allotments as office_allotments')
            ->join('sections as section', 'office_allotments.section_id', '=', 'section.id')
            ->join('divisions as division', 'section.division_id', '=', 'division.id')
            ->join('allocations as allocation', 'office_allotments.allocation_id', '=', 'allocation.id')
            ->leftJoinSub(
                DB::table('obligations')
                    ->select('office_allotment_id', DB::raw('SUM(amount) as obligation_total'))
                    ->groupBy('office_allotment_id'),
                'obligation',
                'office_allotments.id',
                '=',
                'obligation.office_allotment_id'
            )
            ->leftJoinSub(
                DB::table('disbursements')
                    ->join('obligations', 'disbursements.obligation_id', '=', 'obligations.id')
                    ->select(
                        'obligations.office_allotment_id',
                        DB::raw('
                            SUM(
                                COALESCE(disbursements.net_amount, 0) +
                                COALESCE(disbursements.tax, 0) +
                                COALESCE(disbursements.retention, 0) +
                                COALESCE(disbursements.penalty, 0) +
                                COALESCE(disbursements.absences, 0) +
                                COALESCE(disbursements.other_deductions, 0)
                            ) as disbursement_total
                        ')
                    )
                    ->groupBy('obligations.office_allotment_id'),
                'disbursement',
                'office_allotments.id',
                '=',
                'disbursement.office_allotment_id'
            )
            ->select(
                'division.acronym as division_acronym',
                'section.name as section_name',
                'section.code as section_code',
                'allocation.appropriation_id',
                'allocation.appropriation_type_id',
                'allocation.allotment_class_id',
                DB::raw('SUM(office_allotments.amount) as allotment'),
                DB::raw('COALESCE(SUM(obligation.obligation_total),0) as obligation'),
                DB::raw('COALESCE(SUM(disbursement.disbursement_total),0) as disbursement')
            )
            ->groupBy(
                'division.id',
                'section.id',
                'allocation.appropriation_id',
                'allocation.appropriation_type_id',
                'allocation.allotment_class_id',
                'division.acronym',
                'section.name',
                'section.code'
            )
            ->orderBy('division.id')
            ->orderBy('section.id')
            ->get()
            ->toArray();
    }
}
