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

final class SpecialAllotmentController extends Controller
{
    public function __construct(private readonly AllocationIndexData $viewData) {}

    public function index(): Response
    {
        return Inertia::render('budget/allocation/special-allotment/special-allotment-index', $this->viewData->get(3));
    }

    public function store(StoreAllocationRequest $request, CreateAllocation $action): RedirectResponse
    {
        $action->handle($request->validated());

        return to_route('budget.special-allotments.index');
    }

    public function update(UpdateAllocationRequest $request, Allocation $special_allotment, UpdateAllocation $action): RedirectResponse
    {
        $action->handle($special_allotment, $request->validated());

        return to_route('budget.special-allotments.index');
    }

    public function destroy(Allocation $special_allotment, DeleteAllocation $action): RedirectResponse
    {
        $action->handle($special_allotment);

        return to_route('budget.special-allotments.index');
    }
}
