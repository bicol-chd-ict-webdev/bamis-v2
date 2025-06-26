<?php

declare(strict_types=1);

namespace App\Actions\Administrator\Section;

use App\Repositories\SectionRepository;

class CreateSection
{
    public function __construct(private readonly SectionRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): void
    {
        $this->repository->create($attributes);
    }
}
