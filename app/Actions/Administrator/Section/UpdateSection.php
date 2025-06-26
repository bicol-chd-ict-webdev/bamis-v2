<?php

declare(strict_types=1);

namespace App\Actions\Administrator\Section;

use App\Models\Section;
use App\Repositories\SectionRepository;

class UpdateSection
{
    public function __construct(private readonly SectionRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(Section $section, array $attributes): void
    {
        $this->repository->update($section, $attributes);
    }
}
