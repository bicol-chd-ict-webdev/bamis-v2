<?php

declare(strict_types=1);

namespace App\Actions\Administrator\Section;

use App\Models\Section;
use App\Repositories\SectionRepository;

final readonly class DestroySection
{
    public function __construct(private SectionRepository $repository) {}

    public function handle(Section $section): ?bool
    {
        return $this->repository->delete($section);
    }
}
