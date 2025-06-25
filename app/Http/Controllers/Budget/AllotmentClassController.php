<?php

declare(strict_types=1);

namespace App\Http\Controllers\Budget;

use App\Actions\Budget\AllotmentClass\CreateAllotmentClass;
use App\Actions\Budget\AllotmentClass\DeleteAllotmentClass;
use App\Actions\Budget\AllotmentClass\UpdateAllotmentClass;
use App\Http\Controllers\Controller;
use App\Http\Requests\Budget\AllotmentClass\StoreAllotmentClassRequest;
use App\Http\Requests\Budget\AllotmentClass\UpdateAllotmentClassRequest;
use App\Http\Resources\AllotmentClassResource;
use App\Models\AllotmentClass;
use App\Repositories\AllotmentClassRepository;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AllotmentClassController extends Controller
{
    public function __construct(private readonly AllotmentClassRepository $repository) {}

    public function index(): Response
    {
        return Inertia::render('budget/allotmentclass/allotmentclass-index', [
            'allotmentClasses' => fn () => AllotmentClassResource::collection($this->repository->list())->resolve(),
        ]);
    }

    public function store(StoreAllotmentClassRequest $request, CreateAllotmentClass $action): RedirectResponse
    {
        $action->handle($request->validated());

        return to_route('budget.allotment-classes.index');
    }

    public function update(UpdateAllotmentClassRequest $request, AllotmentClass $allotmentClass, UpdateAllotmentClass $action): RedirectResponse
    {
        $action->handle($allotmentClass, $request->validated());

        return to_route('budget.allotment-classes.index');
    }

    public function destroy(AllotmentClass $allotmentClass, DeleteAllotmentClass $action): RedirectResponse
    {
        $action->handle($allotmentClass);

        return to_route('budget.allotment-classes.index');
    }
}
