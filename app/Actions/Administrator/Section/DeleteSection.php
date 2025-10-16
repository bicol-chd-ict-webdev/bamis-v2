<?php

declare(strict_types=1);

namespace App\Actions\Administrator\Section;

use App\Models\Section;
use App\Repositories\SectionRepository;

final readonly class DeleteSection
{
    public function __construct(private SectionRepository $repository) {}

    public function handle(Section $section): void
    {
        $this->repository->delete($section);
    }
}
