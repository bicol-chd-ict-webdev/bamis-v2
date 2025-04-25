<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Actions\Section\CreateSection;
use App\Actions\Section\DeleteSection;
use App\Actions\Section\UpdateSection;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Section\StoreSectionRequest;
use App\Http\Requests\Admin\Section\UpdateSectionRequest;
use App\Models\Division;
use App\Models\Section;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SectionController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/section/section-index', [
            'sections' => fn () => Section::with('division')->latest()->get(['id', 'name', 'acronym', 'code', 'division_id']),
            'divisions' => fn () => Division::withCount('sections')->orderBy('name')->get(['id', 'name', 'acronym']),
        ]);
    }

    public function store(StoreSectionRequest $request, CreateSection $action): RedirectResponse
    {
        $action->handle($request->validated());

        return redirect()->back();
    }

    public function update(UpdateSectionRequest $request, Section $section, UpdateSection $action): RedirectResponse
    {
        $action->handle($section, $request->validated());

        return redirect()->back();
    }

    public function destroy(Section $section, DeleteSection $action): RedirectResponse
    {
        $action->handle($section);

        return redirect()->back();
    }
}
