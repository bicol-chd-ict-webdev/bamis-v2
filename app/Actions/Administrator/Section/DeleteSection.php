<?php

declare(strict_types=1);

namespace App\Actions\Administrator\Section;

use App\Contracts\SectionInterface;
use App\Models\Section;

class DeleteSection
{
    public function __construct(private readonly SectionInterface $sectionInterface) {}

    public function handle(Section $section): void
    {
        $this->sectionInterface->delete($section);
    }
}
