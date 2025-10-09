<?php

declare(strict_types=1);

namespace App\Actions\Budget\Due;

use App\Models\Due;
use App\Repositories\DueRepository;

class UpdateDue
{
    public function __construct(private readonly DueRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(Due $due, array $attributes): void
    {
        $this->repository->update($due, $attributes);
    }
}
