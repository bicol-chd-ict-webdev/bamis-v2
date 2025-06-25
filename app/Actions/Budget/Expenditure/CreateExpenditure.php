<?php

declare(strict_types=1);

namespace App\Actions\Budget\Expenditure;

use App\Repositories\ExpenditureRepository;

class CreateExpenditure
{
    public function __construct(private readonly ExpenditureRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): void
    {
        $this->repository->create($attributes);
    }
}
