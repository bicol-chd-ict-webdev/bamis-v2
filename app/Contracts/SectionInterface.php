<?php

declare(strict_types=1);

namespace App\Contracts;

use App\Models\Section;
use Illuminate\Support\Collection;

interface SectionInterface
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(array $attributes): Section;

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(Section $section, array $attributes): bool;

    public function delete(Section $section): ?bool;

    /**
     * @return Collection<int, Section>
     */
    public function list(): Collection;

    /**
     * @return Collection<int, Section>
     */
    public function comboboxList(): Collection;
}
