<?php

declare(strict_types=1);

namespace App\Actions\Budget\Expenditure;

use App\Models\Expenditure;
use App\Repositories\ExpenditureRepository;

final readonly class UpdateExpenditure
{
    public function __construct(private ExpenditureRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(Expenditure $expenditure, array $attributes): bool
    {
        return $this->repository->update($expenditure, $attributes);
    }
}
