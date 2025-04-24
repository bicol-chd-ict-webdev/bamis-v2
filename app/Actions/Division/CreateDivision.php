<?php

declare(strict_types=1);

namespace App\Actions\Division;

use App\Models\Division;

class CreateDivision
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): void
    {
        Division::create($attributes);
    }
}
