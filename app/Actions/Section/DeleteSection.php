<?php

declare(strict_types=1);

namespace App\Actions\Section;

class DeleteSection
{
    /**
     * @param  \App\Models\Section  $section
     */
    public function handle($section): void
    {
        $section->delete();
    }
}
