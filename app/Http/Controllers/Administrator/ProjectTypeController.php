<?php

declare(strict_types=1);

namespace App\Http\Controllers\Administrator;

use App\Actions\Administrator\ProjectType\CreateProjectType;
use App\Actions\Administrator\ProjectType\DeleteProjectType;
use App\Actions\Administrator\ProjectType\UpdateProjectType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Administrator\ProjectType\StoreProjectTypeRequest;
use App\Http\Requests\Administrator\ProjectType\UpdateProjectTypeRequest;
use App\Http\Resources\ProjectTypeResource;
use App\Models\ProjectType;
use App\Repositories\ProjectTypeRepository;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

final class ProjectTypeController extends Controller
{
    public function __construct(private readonly ProjectTypeRepository $repository) {}

    public function index(): Response
    {
        return Inertia::render('administrator/project-type/project-type-index', [
            'projectTypes' => fn () => ProjectTypeResource::collection($this->repository->list())->resolve(),
        ]);
    }

    public function store(StoreProjectTypeRequest $request, CreateProjectType $action): RedirectResponse
    {
        $action->handle($request->validated());

        return to_route('administrator.project-types.index');
    }

    public function update(UpdateProjectTypeRequest $request, ProjectType $projectType, UpdateProjectType $action): RedirectResponse
    {
        $action->handle($projectType, $request->validated());

        return to_route('administrator.project-types.index');
    }

    public function destroy(ProjectType $projectType, DeleteProjectType $action): RedirectResponse
    {
        $action->handle($projectType);

        return to_route('administrator.project-types.index');
    }
}
