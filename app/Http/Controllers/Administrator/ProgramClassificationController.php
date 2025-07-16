<?php

declare(strict_types=1);

namespace App\Http\Controllers\Administrator;

use App\Actions\Administrator\ProgramClassification\CreateProgramClassification;
use App\Actions\Administrator\ProgramClassification\DeleteProgramClassification;
use App\Actions\Administrator\ProgramClassification\UpdateProgramClassification;
use App\Http\Controllers\Controller;
use App\Http\Requests\Administrator\ProgramClassification\StoreProgramClassificationRequest;
use App\Http\Requests\Administrator\ProgramClassification\UpdateProgramClassificationRequest;
use App\Http\Resources\ProgramClassificationResource;
use App\Models\ProgramClassification;
use App\Repositories\ProgramClassificationRepository;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProgramClassificationController extends Controller
{
    public function __construct(private readonly ProgramClassificationRepository $repository) {}

    public function index(): Response
    {
        return Inertia::render('administrator/program-classification/program-classification-index', [
            'programClassifications' => fn () => ProgramClassificationResource::collection(
                $this->repository->list())
                ->resolve(),
        ]);
    }

    public function store(StoreProgramClassificationRequest $request, CreateProgramClassification $action): RedirectResponse
    {
        $action->handle($request->validated());

        return to_route('administrator.program-classifications.index');
    }

    public function update(UpdateProgramClassificationRequest $request, ProgramClassification $programClassification, UpdateProgramClassification $action): RedirectResponse
    {
        $action->handle($programClassification, $request->validated());

        return to_route('administrator.program-classifications.index');
    }

    public function destroy(ProgramClassification $programClassification, DeleteProgramClassification $action): RedirectResponse
    {
        $action->handle($programClassification);

        return to_route('administrator.program-classifications.index');
    }
}
