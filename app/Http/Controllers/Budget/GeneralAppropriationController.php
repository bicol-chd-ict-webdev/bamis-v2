<?php

declare(strict_types=1);

namespace App\Http\Controllers\Budget;

use App\Actions\Budget\Allocation\CreateAllocation;
use App\Actions\Budget\Allocation\DeleteAllocation;
use App\Actions\Budget\Allocation\UpdateAllocation;
use App\Http\Controllers\Controller;
use App\Http\Requests\Budget\Allocation\StoreAllocationRequest;
use App\Http\Requests\Budget\Allocation\UpdateAllocationRequest;
use App\Models\Allocation;
use App\Queries\AllocationIndexData;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

final class GeneralAppropriationController extends Controller
{
    public function __construct(private readonly AllocationIndexData $viewData) {}

    public function index(): Response
    {
        return Inertia::render('budget/allocation/general-appropriation/general-appropriation-index', $this->viewData->get(1));
    }

    public function store(StoreAllocationRequest $request, CreateAllocation $action): RedirectResponse
    {
        $action->handle($request->validated());

        return to_route('budget.general-appropriations.index');
    }

    public function update(UpdateAllocationRequest $request, Allocation $general_appropriation, UpdateAllocation $action): RedirectResponse
    {
        $action->handle($general_appropriation, $request->validated());

        return to_route('budget.general-appropriations.index');
    }

    public function destroy(Allocation $general_appropriation, DeleteAllocation $action): RedirectResponse
    {
        $action->handle($general_appropriation);

        return to_route('budget.general-appropriations.index');
    }
}
