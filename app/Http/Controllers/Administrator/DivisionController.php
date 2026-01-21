<?php

declare(strict_types=1);

namespace App\Http\Controllers\Administrator;

use App\Actions\Administrator\Division\DestroyDivision;
use App\Actions\Administrator\Division\StoreDivision;
use App\Actions\Administrator\Division\UpdateDivision;
use App\Http\Controllers\Controller;
use App\Http\Requests\Administrator\Division\StoreDivisionRequest;
use App\Http\Requests\Administrator\Division\UpdateDivisionRequest;
use App\Http\Resources\DivisionResource;
use App\Models\Division;
use App\Repositories\DivisionRepository;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

final class DivisionController extends Controller
{
    public function __construct(private readonly DivisionRepository $repository) {}

    public function index(): Response
    {
        return Inertia::render('administrator/division/division-index', [
            'divisions' => fn () => DivisionResource::collection($this->repository->list())->resolve(),
        ]);
    }

    public function store(StoreDivisionRequest $request, StoreDivision $action): RedirectResponse
    {
        $action->handle($request->validated());

        return to_route('administrator.divisions.index');
    }

    public function update(UpdateDivisionRequest $request, Division $division, UpdateDivision $action): RedirectResponse
    {
        $action->handle($division, $request->validated());

        return to_route('administrator.divisions.index');
    }

    public function destroy(Division $division, DestroyDivision $action): RedirectResponse
    {
        $action->handle($division);

        return to_route('administrator.divisions.index');
    }
}
