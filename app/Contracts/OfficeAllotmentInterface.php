<?php

declare(strict_types=1);

namespace App\Contracts;

use App\Models\OfficeAllotment;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Collection as SupportCollection;

interface OfficeAllotmentInterface
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(array $attributes): OfficeAllotment;

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(OfficeAllotment $officeAllotment, array $attributes): void;

    public function delete(OfficeAllotment $officeAllotment): void;

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
    public function listGroupedBySection(): SupportCollection;

    /**
     * @return Collection<int, OfficeAllotment>
     */
    public function list(): Collection;

    /**
     * @return Collection<int, OfficeAllotment>
     */
    public function listWithObligationCount(): Collection;
}
