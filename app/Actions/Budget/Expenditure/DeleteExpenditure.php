<?php

declare(strict_types=1);

namespace App\Actions\Budget\Expenditure;

use App\Models\Expenditure;
use App\Repositories\ExpenditureRepository;

final readonly class DeleteExpenditure
{
    public function __construct(private ExpenditureRepository $repository) {}

    public function handle(Expenditure $expenditure): void
    {
        $this->repository->delete($expenditure);
    }
}
