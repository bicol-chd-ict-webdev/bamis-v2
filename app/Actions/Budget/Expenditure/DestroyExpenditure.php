<?php

declare(strict_types=1);

namespace App\Actions\Budget\Expenditure;

use App\Models\Expenditure;
use App\Repositories\ExpenditureRepository;

final readonly class DestroyExpenditure
{
    public function __construct(private ExpenditureRepository $repository) {}

    public function handle(Expenditure $expenditure): ?bool
    {
        return $this->repository->delete($expenditure);
    }
}
