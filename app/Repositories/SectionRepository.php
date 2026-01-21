<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\SectionInterface;
use App\Models\Section;
use Illuminate\Support\Collection;

final class SectionRepository implements SectionInterface
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(array $attributes): Section
    {
        return Section::query()->create($attributes);
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(Section $section, array $attributes): bool
    {
        return $section->update($attributes);
    }

    public function delete(Section $section): ?bool
    {
        return $section->delete();
    }

    /**
     * @return Collection<int, Section>
     */
    public function list(): Collection
    {
        return Section::query()
            ->with('division')
            ->oldest('name')
            ->get(['id', 'name', 'acronym', 'code', 'division_id']);
    }

    /**
     * @return Collection<int, Section>
     */
    public function comboboxList(): Collection
    {
        return Section::query()
            ->oldest('name')
            ->get(['id', 'name']);
    }
}
