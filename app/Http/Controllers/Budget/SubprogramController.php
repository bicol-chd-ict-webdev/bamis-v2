<?php

declare(strict_types=1);

namespace App\Http\Controllers\Budget;

use App\Actions\Budget\Subprogram\CreateSubprogram;
use App\Actions\Budget\Subprogram\DeleteSubprogram;
use App\Actions\Budget\Subprogram\UpdateSubprogram;
use App\Http\Controllers\Controller;
use App\Http\Requests\Budget\Subprogram\StoreSubprogramRequest;
use App\Http\Requests\Budget\Subprogram\UpdateSubprogramRequest;
use App\Http\Resources\ProgramResource;
use App\Http\Resources\SubprogramResource;
use App\Models\Subprogram;
use App\Repositories\ProgramRepository;
use App\Repositories\SubprogramRepository;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

final class SubprogramController extends Controller
{
    public function __construct(
        private readonly ProgramRepository $programRepository,
        private readonly SubprogramRepository $subprogramRepository,
    ) {}

    public function index(): Response
    {
        return Inertia::render('budget/subprogram/subprogram-index', [
            'subprograms' => fn () => SubprogramResource::collection(
                $this->subprogramRepository->list()
            )->resolve(),
            'programs' => fn () => ProgramResource::collection(
                $this->programRepository->listOrderByName()
            )->resolve(),
        ]);
    }

    public function store(StoreSubprogramRequest $request, CreateSubprogram $action): RedirectResponse
    {
        $action->handle($request->validated());

        return to_route('budget.subprograms.index');
    }

    public function update(UpdateSubprogramRequest $request, Subprogram $subprogram, UpdateSubprogram $action): RedirectResponse
    {
        $action->handle($subprogram, $request->validated());

        return to_route('budget.subprograms.index');
    }

    public function destroy(Subprogram $subprogram, DeleteSubprogram $action): RedirectResponse
    {
        $action->handle($subprogram);

        return to_route('budget.subprograms.index');
    }
}
