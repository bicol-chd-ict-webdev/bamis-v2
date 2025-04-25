<?php

declare(strict_types=1);

namespace App\Actions\Section;

use App\Models\Section;

class CreateSection
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): void
    {
        Section::create($attributes);
    }
}
