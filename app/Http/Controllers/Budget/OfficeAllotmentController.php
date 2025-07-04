<?php

declare(strict_types=1);

namespace App\Http\Controllers\Budget;

use App\Actions\Budget\OfficeAllotment\CreateOfficeAllotment;
use App\Actions\Budget\OfficeAllotment\DeleteOfficeAllotment;
use App\Actions\Budget\OfficeAllotment\UpdateOfficeAllotment;
use App\Http\Controllers\Controller;
use App\Http\Requests\Budget\OfficeAllotment\StoreOfficeAllotmentRequest;
use App\Http\Requests\Budget\OfficeAllotment\UpdateOfficeAllotmentRequest;
use App\Http\Resources\OfficeAllotmentResource;
use App\Http\Resources\SectionResource;
use App\Models\OfficeAllotment;
use App\Repositories\OfficeAllotmentRepository;
use App\Repositories\SectionRepository;
use App\Services\ValidateAllocationAppropriationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OfficeAllotmentController extends Controller
{
    public function __construct(
        private readonly OfficeAllotmentRepository $officeAllotmentRepository,
        private readonly SectionRepository $sectionRepository,
        private readonly ValidateAllocationAppropriationService $validateAllocationAppropriationService,
    ) {}

    public function index(Request $request): Response
    {
        $allocation = $this->validateAllocationAppropriationService->handle($request);

        return Inertia::render('budget/office-allotment/office-allotment-index', [
            'officeAllotments' => fn (): array => OfficeAllotmentResource::collection(
                $this->officeAllotmentRepository->list((int) $allocation->id)
            )->resolve(),
            'sections' => fn (): array => SectionResource::collection(
                $this->sectionRepository->comboboxList()
            )->resolve(),
        ]);
    }

    public function store(StoreOfficeAllotmentRequest $request, CreateOfficeAllotment $action): RedirectResponse
    {
        $action->handle($request->validated());

        return redirect()->back();
    }

    public function update(UpdateOfficeAllotmentRequest $request, OfficeAllotment $officeAllotment, UpdateOfficeAllotment $action): RedirectResponse
    {
        $action->handle($officeAllotment, $request->validated());

        return redirect()->back();
    }

    public function destroy(OfficeAllotment $officeAllotment, DeleteOfficeAllotment $action): RedirectResponse
    {
        $action->handle($officeAllotment);

        return redirect()->back();
    }
}
