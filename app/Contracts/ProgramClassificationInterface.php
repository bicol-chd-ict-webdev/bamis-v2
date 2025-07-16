<?php

declare(strict_types=1);

namespace App\Contracts;

use App\Models\ProgramClassification;
use Illuminate\Database\Eloquent\Collection;

interface ProgramClassificationInterface
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(array $attributes): ProgramClassification;

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(ProgramClassification $programClassification, array $attributes): void;

    public function delete(ProgramClassification $programClassification): void;

    /**
     * @return Collection<int, ProgramClassification>
     */
    public function list(): Collection;
}
