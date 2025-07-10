<?php

declare(strict_types=1);

namespace App\Http\Controllers\Budget;

use App\Actions\Budget\Program\CreateProgram;
use App\Actions\Budget\Program\DeleteProgram;
use App\Actions\Budget\Program\UpdateProgram;
use App\Enums\AppropriationSource;
use App\Enums\ProgramClassification;
use App\Http\Controllers\Controller;
use App\Http\Requests\Budget\Program\StoreProgramRequest;
use App\Http\Requests\Budget\Program\UpdateProgramRequest;
use App\Http\Resources\ProgramResource;
use App\Models\Program;
use App\Repositories\ProgramRepository;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProgramController extends Controller
{
    public function __construct(private readonly ProgramRepository $repository) {}

    public function index(): Response
    {
        return Inertia::render('budget/program/program-index', [
            'programs' => fn () => ProgramResource::collection(
                $this->repository->list()
            )->resolve(),
            'appropriationSources' => array_map(fn ($case): array => [
                'name' => $case->name,
                'value' => $case->value,
            ], AppropriationSource::cases()),
            'programClassifications' => array_map(fn ($case): array => [
                'name' => $case->name,
                'value' => $case->value,
            ], ProgramClassification::cases()),
        ]);
    }

    public function store(StoreProgramRequest $request, CreateProgram $action): RedirectResponse
    {
        $action->handle($request->validated());

        return to_route('budget.programs.index');
    }

    public function update(UpdateProgramRequest $request, Program $program, UpdateProgram $action): RedirectResponse
    {
        $action->handle($program, $request->validated());

        return to_route('budget.programs.index');
    }

    public function destroy(Program $program, DeleteProgram $action): RedirectResponse
    {
        $action->handle($program);

        return to_route('budget.programs.index');
    }
}
