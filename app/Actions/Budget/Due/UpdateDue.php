<?php

declare(strict_types=1);

namespace App\Actions\Budget\Due;

use App\Models\Due;
use App\Repositories\DueRepository;

final readonly class UpdateDue
{
    public function __construct(private DueRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(Due $due, array $attributes): void
    {
        $this->repository->update($due, $attributes);
    }
}
