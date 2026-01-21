<?php

declare(strict_types=1);

namespace App\Actions\Administrator\Section;

use App\Models\Section;
use App\Repositories\SectionRepository;

final readonly class StoreSection
{
    public function __construct(private SectionRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): Section
    {
        return $this->repository->create($attributes);
    }
}
