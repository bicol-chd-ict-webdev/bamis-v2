<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\SectionInterface;
use App\Models\Section;
use Illuminate\Support\Collection;

class SectionRepository implements SectionInterface
{
    public function create(array $attributes): Section
    {
        return Section::create($attributes);
    }

    public function update(Section $section, array $attributes): void
    {
        $section->update($attributes);
    }

    public function delete(Section $section): void
    {
        $section->delete();
    }

    public function list(): Collection
    {
        return Section::with('division')
            ->withoutTrashed()
            ->latest()
            ->get(['id', 'name', 'acronym', 'code', 'division_id']);
    }

    public function comboboxList(): Collection
    {
        return Section::withoutTrashed()
            ->oldest('name')
            ->get(['id', 'name']);
    }
}
