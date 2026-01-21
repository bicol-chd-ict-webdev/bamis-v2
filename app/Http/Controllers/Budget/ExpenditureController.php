<?php

declare(strict_types=1);

namespace App\Http\Controllers\Budget;

use App\Actions\Budget\Expenditure\DestroyExpenditure;
use App\Actions\Budget\Expenditure\StoreExpenditure;
use App\Actions\Budget\Expenditure\UpdateExpenditure;
use App\Http\Controllers\Controller;
use App\Http\Requests\Budget\Expenditure\StoreExpenditureRequest;
use App\Http\Requests\Budget\Expenditure\UpdateExpenditureRequest;
use App\Http\Resources\AllotmentClassResource;
use App\Http\Resources\ExpenditureResource;
use App\Models\Expenditure;
use App\Repositories\AllotmentClassRepository;
use App\Repositories\ExpenditureRepository;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

final class ExpenditureController extends Controller
{
    public function __construct(
        private readonly ExpenditureRepository $expenditureRepository,
        private readonly AllotmentClassRepository $allotmentClassRepository,
    ) {}

    public function index(): Response
    {
        return Inertia::render('budget/expenditure/expenditure-index', [
            'expenditures' => fn () => ExpenditureResource::collection($this->expenditureRepository->list())->resolve(),
            'allotmentClasses' => fn () => AllotmentClassResource::collection($this->allotmentClassRepository->listWithExpenditureCount())->resolve(),
        ]);
    }

    public function store(StoreExpenditureRequest $request, StoreExpenditure $action): RedirectResponse
    {
        $action->handle($request->validated());

        return to_route('budget.expenditures.index');
    }

    public function update(UpdateExpenditureRequest $request, Expenditure $expenditure, UpdateExpenditure $action): RedirectResponse
    {
        $action->handle($expenditure, $request->validated());

        return to_route('budget.expenditures.index');
    }

    public function destroy(Expenditure $expenditure, DestroyExpenditure $action): RedirectResponse
    {
        $action->handle($expenditure);

        return to_route('budget.expenditures.index');
    }
}
