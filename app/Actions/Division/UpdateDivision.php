<?php

declare(strict_types=1);

namespace App\Actions\Division;

class UpdateDivision
{
    /**
     * @param  \App\Models\Division  $division
     * @param  array<string, mixed>  $attributes
     */
    public function handle($division, array $attributes): void
    {
        $division->update($attributes);
    }
}
