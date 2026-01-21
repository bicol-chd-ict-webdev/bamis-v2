<?php

declare(strict_types=1);

namespace App\Actions\Administrator\Section;

use App\Models\Section;
use App\Repositories\SectionRepository;

final readonly class UpdateSection
{
    public function __construct(private SectionRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(Section $section, array $attributes): bool
    {
        return $this->repository->update($section, $attributes);
    }
}
