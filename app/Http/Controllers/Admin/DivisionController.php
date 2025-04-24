<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Actions\Division\CreateDivision;
use App\Actions\Division\DeleteDivision;
use App\Actions\Division\UpdateDivision;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Division\StoreDivisionRequest;
use App\Http\Requests\Admin\Division\UpdateDivisionRequest;
use App\Models\Division;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class DivisionController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/division/division-index', [
            'divisions' => fn () => Division::latest()->get(['id', 'name', 'acronym']),
        ]);
    }

    public function store(StoreDivisionRequest $request, CreateDivision $action): RedirectResponse
    {
        $action->handle($request->validated());

        return redirect()->back();
    }

    public function update(UpdateDivisionRequest $request, Division $division, UpdateDivision $action): RedirectResponse
    {
        $action->handle($division, $request->validated());

        return redirect()->back();
    }

    public function destroy(Division $division, DeleteDivision $action): RedirectResponse
    {
        $action->handle($division);

        return redirect()->back();
    }
}
