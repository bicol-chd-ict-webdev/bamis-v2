<?php

declare(strict_types=1);

namespace App\Http\Controllers\Administrator;

use App\Actions\Administrator\AppropriationType\DestroyAppropriationType;
use App\Actions\Administrator\AppropriationType\StoreAppropriationType;
use App\Actions\Administrator\AppropriationType\UpdateAppropriationType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Administrator\AppropriationType\StoreAppropriationTypeRequest;
use App\Http\Requests\Administrator\AppropriationType\UpdateAppropriationTypeRequest;
use App\Http\Resources\AppropriationTypeResource;
use App\Models\AppropriationType;
use App\Repositories\AppropriationTypeRepository;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

final class AppropriationTypeController extends Controller
{
    public function __construct(private readonly AppropriationTypeRepository $repository) {}

    public function index(): Response
    {
        return Inertia::render('administrator/appropriation-type/appropriation-type-index', [
            'appropriationTypes' => fn () => AppropriationTypeResource::collection($this->repository->list())->resolve(),
        ]);
    }

    public function store(StoreAppropriationTypeRequest $request, StoreAppropriationType $action): RedirectResponse
    {
        $action->handle($request->validated());

        return to_route('administrator.appropriation-types.index');
    }

    public function update(UpdateAppropriationTypeRequest $request, AppropriationType $appropriationType, UpdateAppropriationType $action): RedirectResponse
    {
        $action->handle($appropriationType, $request->validated());

        return to_route('administrator.appropriation-types.index');
    }

    public function destroy(AppropriationType $appropriationType, DestroyAppropriationType $action): RedirectResponse
    {
        $action->handle($appropriationType);

        return to_route('administrator.appropriation-types.index');
    }
}
