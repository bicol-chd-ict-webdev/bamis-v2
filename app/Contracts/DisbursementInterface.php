<?php

declare(strict_types=1);

namespace App\Contracts;

use App\Models\Disbursement;
use Illuminate\Database\Eloquent\Collection;

interface DisbursementInterface
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(array $attributes): Disbursement;

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(Disbursement $disbursement, array $attributes): void;

    public function delete(Disbursement $disbursement): void;

    /**
     * @return Collection<int, Disbursement>
     */
    public function list(): Collection;
}
