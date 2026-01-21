<?php

declare(strict_types=1);

namespace App\Http\Controllers\Administrator;

use App\Actions\Administrator\AllotmentClass\DestroyAllotmentClass;
use App\Actions\Administrator\AllotmentClass\StoreAllotmentClass;
use App\Actions\Administrator\AllotmentClass\UpdateAllotmentClass;
use App\Http\Controllers\Controller;
use App\Http\Requests\Administrator\AllotmentClass\StoreAllotmentClassRequest;
use App\Http\Requests\Administrator\AllotmentClass\UpdateAllotmentClassRequest;
use App\Http\Resources\AllotmentClassResource;
use App\Models\AllotmentClass;
use App\Repositories\AllotmentClassRepository;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

final class AllotmentClassController extends Controller
{
    public function __construct(private readonly AllotmentClassRepository $repository) {}

    public function index(): Response
    {
        return Inertia::render('administrator/allotment-class/allotment-class-index', [
            'allotmentClasses' => fn () => AllotmentClassResource::collection($this->repository->list())->resolve(),
        ]);
    }

    public function store(StoreAllotmentClassRequest $request, StoreAllotmentClass $action): RedirectResponse
    {
        $action->handle($request->validated());

        return to_route('administrator.allotment-classes.index');
    }

    public function update(UpdateAllotmentClassRequest $request, AllotmentClass $allotmentClass, UpdateAllotmentClass $action): RedirectResponse
    {
        $action->handle($allotmentClass, $request->validated());

        return to_route('administrator.allotment-classes.index');
    }

    public function destroy(AllotmentClass $allotmentClass, DestroyAllotmentClass $action): RedirectResponse
    {
        $action->handle($allotmentClass);

        return to_route('administrator.allotment-classes.index');
    }
}
