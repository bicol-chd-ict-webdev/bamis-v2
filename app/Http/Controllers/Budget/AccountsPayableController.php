<?php

declare(strict_types=1);

namespace App\Http\Controllers\Budget;

use App\Http\Controllers\Controller;
use App\Http\Resources\ObligationResource;
use App\Repositories\AccountsPayableRepository;
use App\Repositories\ExpenditureRepository;
use App\Repositories\OfficeAllotmentRepository;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\Response;

final class AccountsPayableController extends Controller
{
    public function __construct(
        private readonly AccountsPayableRepository $accountsPayableRepository,
        private readonly ExpenditureRepository $expenditureRepository,
        private readonly OfficeAllotmentRepository $officeAllotmentRepository,
    ) {}

    public function __invoke(): Response
    {
        return Inertia::render('budget/accounts-payable/accounts-payable-index', [
            'accountsPayables' => fn (): array => ObligationResource::collection(
                $this->accountsPayableRepository->list()
            )->resolve(),
            'expenditures' => $this->expenditureRepository->listWithObjectDistributionObligationCount(...),
            'officeAllotments' => fn (): Collection => $this->officeAllotmentRepository->listWithObligationCount(),
        ]);
    }
}
