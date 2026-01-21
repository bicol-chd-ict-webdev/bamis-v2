<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\OfficeAllotmentInterface;
use App\Models\OfficeAllotment;
use App\Services\OfficeAllotment\WfpSuffixCodeGeneratorService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Collection as SupportCollection;

final readonly class OfficeAllotmentRepository implements OfficeAllotmentInterface
{
    public function __construct(private WfpSuffixCodeGeneratorService $wfpSuffixCodeGeneratorService) {}

    public function create(array $attributes): OfficeAllotment
    {
        $attributes['wfp_prefix_code'] = $this->wfpSuffixCodeGeneratorService->generate($attributes);

        return OfficeAllotment::query()->create($attributes);
    }

    public function update(OfficeAllotment $officeAllotment, array $attributes): bool
    {
        $attributes['wfp_prefix_code'] = $this->wfpSuffixCodeGeneratorService->generate($attributes);

        return $officeAllotment->update($attributes);
    }

    public function delete(OfficeAllotment $officeAllotment): ?bool
    {
        return $officeAllotment->delete();
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

    /**
     * @return SupportCollection<string, Collection<int, OfficeAllotment>>
     */
    public function list(?int $allocationId = null): SupportCollection
    {
        return OfficeAllotment::withoutTrashed()
            ->where('allocation_id', $allocationId)
            ->with(['section.division'])
            ->latest()
            ->get(['id', 'allocation_id', 'section_id', 'amount', 'wfp_prefix_code', 'wfp_suffix_code'])
            ->groupBy(fn ($allotment) => $allotment->section->division->name ?? 'Unassigned');
    }

    public function listWithObligationCount(?int $allocationId = null, bool $withZeroBalance = true): SupportCollection
    {
        return OfficeAllotment::query()
            ->withoutTrashed()
            ->with(['section:id,acronym,name,code'])
            ->withCount('obligations')
            ->when($allocationId !== null, fn ($q) => $q->where('allocation_id', $allocationId))
            ->get(['id', 'section_id', 'allocation_id'])
            ->groupBy('section_id')
            ->map(fn ($officeAllotments): array => [
                'id' => (int) $officeAllotments->first()?->section_id,
                'section_acronym' => (string) ($officeAllotments->first()?->section->acronym ?? ''),
                'obligations_count' => $officeAllotments->sum('obligations_count'),
            ])
            ->filter(fn (array $item): bool => $item['obligations_count'] > 0)
            ->sortBy('section_acronym')
            ->values();
    }
}
