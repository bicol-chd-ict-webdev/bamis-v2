<?php

declare(strict_types=1);

namespace App\Actions\Section;

class UpdateSection
{
    /**
     * @param  \App\Models\Section  $section
     * @param  array<string, mixed>  $attributes
     */
    public function handle($section, array $attributes): void
    {
        $section->update($attributes);
    }
}
