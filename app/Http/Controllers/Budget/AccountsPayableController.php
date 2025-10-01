<?php

declare(strict_types=1);

namespace App\Http\Controllers\Budget;

use App\Http\Controllers\Controller;
use App\Http\Resources\ExpenditureResource;
use App\Http\Resources\ObligationResource;
use App\Http\Resources\OfficeAllotmentResource;
use App\Repositories\AccountsPayableRepository;
use App\Repositories\ExpenditureRepository;
use App\Repositories\OfficeAllotmentRepository;
use Inertia\Inertia;
use Inertia\Response;

class AccountsPayableController extends Controller
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
            'expenditures' => fn (): array => ExpenditureResource::collection(
                $this->expenditureRepository->listWithObjectDistributionObligationCount()
            )->resolve(),
            'officeAllotments' => fn (): array => OfficeAllotmentResource::collection(
                $this->officeAllotmentRepository->listWithObligationCount()
            )->resolve(),
        ]);
    }
}
