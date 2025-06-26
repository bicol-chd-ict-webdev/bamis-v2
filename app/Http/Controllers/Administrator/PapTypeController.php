<?php

declare(strict_types=1);

namespace App\Http\Controllers\Administrator;

use App\Actions\Administrator\PapType\CreatePapType;
use App\Actions\Administrator\PapType\DeletePapType;
use App\Actions\Administrator\PapType\UpdatePapType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Administrator\PapType\StorePapTypeRequest;
use App\Http\Requests\Administrator\PapType\UpdatePapTypeRequest;
use App\Http\Resources\PapTypeResource;
use App\Models\PapType;
use App\Repositories\PapTypeRepository;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PapTypeController extends Controller
{
    public function __construct(private readonly PapTypeRepository $repository) {}

    public function index(): Response
    {
        return Inertia::render('administrator/paptype/paptype-index', [
            'papTypes' => fn () => PapTypeResource::collection($this->repository->list())->resolve(),
        ]);
    }

    public function store(StorePapTypeRequest $request, CreatePapType $action): RedirectResponse
    {
        $action->handle($request->validated());

        return to_route('administrator.pap-types.index');
    }

    public function update(UpdatePapTypeRequest $request, PapType $papType, UpdatePapType $action): RedirectResponse
    {
        $action->handle($papType, $request->validated());

        return to_route('administrator.pap-types.index');
    }

    public function destroy(PapType $papType, DeletePapType $action): RedirectResponse
    {
        $action->handle($papType);

        return to_route('administrator.pap-types.index');
    }
}
