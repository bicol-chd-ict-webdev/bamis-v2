<?php

declare(strict_types=1);

namespace App\Http\Controllers\Administrator;

use App\Actions\Administrator\Section\CreateSection;
use App\Actions\Administrator\Section\DeleteSection;
use App\Actions\Administrator\Section\UpdateSection;
use App\Http\Controllers\Controller;
use App\Http\Requests\Administrator\Section\StoreSectionRequest;
use App\Http\Requests\Administrator\Section\UpdateSectionRequest;
use App\Http\Resources\DivisionResource;
use App\Http\Resources\SectionResource;
use App\Models\Section;
use App\Repositories\DivisionRepository;
use App\Repositories\SectionRepository;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

final class SectionController extends Controller
{
    public function __construct(
        private readonly SectionRepository $sectionRepository,
        private readonly DivisionRepository $divisionRepository,
    ) {}

    public function index(): Response
    {
        return Inertia::render('administrator/section/section-index', [
            'sections' => fn () => SectionResource::collection($this->sectionRepository->list())->resolve(),
            'divisions' => fn () => DivisionResource::collection($this->divisionRepository->listWithSectionCount())->resolve(),
        ]);
    }

    public function store(StoreSectionRequest $request, CreateSection $action): RedirectResponse
    {
        $action->handle($request->validated());

        return back();
    }

    public function update(UpdateSectionRequest $request, Section $section, UpdateSection $action): RedirectResponse
    {
        $action->handle($section, $request->validated());

        return back();
    }

    public function destroy(Section $section, DeleteSection $action): RedirectResponse
    {
        $action->handle($section);

        return back();
    }
}
