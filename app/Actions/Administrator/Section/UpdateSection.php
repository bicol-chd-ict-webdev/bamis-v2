<?php

declare(strict_types=1);

namespace App\Actions\Administrator\Section;

use App\Contracts\SectionInterface;
use App\Models\Section;

class UpdateSection
{
    public function __construct(private readonly SectionInterface $sectionInterface) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(Section $section, array $attributes): void
    {
        $this->sectionInterface->update($section, $attributes);
    }
}
