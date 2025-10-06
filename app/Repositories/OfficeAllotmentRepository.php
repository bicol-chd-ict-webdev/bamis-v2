<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\OfficeAllotmentInterface;
use App\Models\OfficeAllotment;
use App\Services\OfficeAllotment\WfpSuffixCodeGeneratorService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Collection as SupportCollection;
use Illuminate\Support\Facades\DB;

class OfficeAllotmentRepository implements OfficeAllotmentInterface
{
    public function __construct(private readonly WfpSuffixCodeGeneratorService $wfpSuffixCodeGeneratorService) {}

    public function create(array $attributes): OfficeAllotment
    {
        $attributes['wfp_prefix_code'] = $this->wfpSuffixCodeGeneratorService->generate($attributes);

        return OfficeAllotment::create($attributes);
    }

    public function update(OfficeAllotment $officeAllotment, array $attributes): void
    {
        $attributes['wfp_prefix_code'] = $this->wfpSuffixCodeGeneratorService->generate($attributes);

        $officeAllotment->update($attributes);
    }

    public function delete(OfficeAllotment $officeAllotment): void
    {
        $officeAllotment->delete();
    }

    /**
     * @return SupportCollection<int, array{
     *     id: int,
     *     section_acronym: string|null,
     *     allocation_id: int,
     *     wfp_codes: SupportCollection<int, array{
     *         id: int,
     *         section_id: int,
     *         wfp_code: string|null
     *     }>
     * }>
     */
    public function listGroupedBySection(?int $allocationId = null): SupportCollection
    {
        return OfficeAllotment::query()
            ->withoutTrashed()
            ->when($allocationId !== null, fn ($q) => $q->where('allocation_id', $allocationId))
            ->with('section:id,acronym,code')
            ->get(['id', 'section_id', 'allocation_id', 'wfp_prefix_code', 'wfp_suffix_code'])
            ->groupBy('section_id')
            ->filter(fn ($officeAllotments) => $officeAllotments->isNotEmpty())
            ->map(fn ($officeAllotments): array => [
                'id' => (int) $officeAllotments->first()?->section_id,
                'section_acronym' => $officeAllotments->first()?->section_acronym,
                'allocation_id' => (int) $officeAllotments->first()?->allocation_id,
                'wfp_codes' => $officeAllotments->map(fn ($officeAllotment): array => [
                    'id' => $officeAllotment->id,
                    'section_id' => $officeAllotment->section_id,
                    'wfp_code' => $officeAllotment->wfp_code,
                ]),
            ])
            ->values();
    }

    public function list(?int $allocationId = null): Collection
    {
        return OfficeAllotment::withoutTrashed()
            ->where('allocation_id', $allocationId)
            ->latest()
            ->get(['id', 'allocation_id', 'section_id', 'amount', 'wfp_prefix_code', 'wfp_suffix_code']);
    }

    public function listWithObligationCount(?int $allocationId = null, bool $withZeroBalance = true): Collection
    {
        return OfficeAllotment::query()
            ->select([
                'office_allotments.id',
                'office_allotments.allocation_id',
                'office_allotments.amount',
                'office_allotments.section_id',
                DB::raw('COUNT(obligations.id) as obligations_count'),
            ])
            ->leftJoin('obligations', function (JoinClause $join) use ($withZeroBalance): void {
                $join->on('obligations.office_allotment_id', '=', 'office_allotments.id')
                    ->whereNull([
                        'obligations.norsa_type',
                        'obligations.deleted_at',
                    ]);

                // Apply non-zero balance filter only if requested
                if ($withZeroBalance) {
                    $join->whereRaw('(obligations.amount - COALESCE((
                     SELECT SUM(
                         COALESCE(net_amount, 0) +
                         COALESCE(tax, 0) +
                         COALESCE(retention, 0) +
                         COALESCE(penalty, 0) +
                         COALESCE(absences, 0) +
                         COALESCE(other_deductions, 0)
                     )
                     FROM disbursements
                     WHERE disbursements.obligation_id = obligations.id
                 ), 0)) <> 0');
                }
            })
            ->when($allocationId !== null, fn ($query) => $query->where('office_allotments.allocation_id', $allocationId))
            ->groupBy(
                'office_allotments.id',
                'office_allotments.allocation_id',
                'office_allotments.amount',
                'office_allotments.section_id'
            )
            ->having('obligations_count', '>', 0)
            ->orderBy('office_allotments.id')
            ->get();
    }
}
