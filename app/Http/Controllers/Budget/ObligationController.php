<?php

declare(strict_types=1);

namespace App\Http\Controllers\Budget;

use App\Actions\Budget\Obligation\CancelObligation;
use App\Actions\Budget\Obligation\CreateObligation;
use App\Actions\Budget\Obligation\DeleteObligation;
use App\Actions\Budget\Obligation\UpdateObligation;
use App\Enums\NorsaType;
use App\Enums\Recipient;
use App\Http\Controllers\Controller;
use App\Http\Requests\Budget\Obligation\StoreObligationRequest;
use App\Http\Requests\Budget\Obligation\UpdateObligationRequest;
use App\Http\Resources\ObjectDistributionResource;
use App\Http\Resources\ObligationResource;
use App\Http\Resources\OfficeAllotmentResource;
use App\Models\Obligation;
use App\Repositories\ObjectDistributionRepository;
use App\Repositories\ObligationRepository;
use App\Repositories\OfficeAllotmentRepository;
use App\Services\ValidateAllocationAppropriationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ObligationController extends Controller
{
    public function __construct(
        private readonly ObligationRepository $obligationRepository,
        private readonly ObjectDistributionRepository $objectDistributionRepository,
        private readonly OfficeAllotmentRepository $officeAllotmentRepository,
        private readonly ValidateAllocationAppropriationService $validateAllocationAppropriationService,
    ) {}

    public function index(Request $request): Response
    {
        $allocation = $this->validateAllocationAppropriationService->handle($request);

        if (
            ($allocation->office_allotments_count ?? 0) < 1 ||
            ($allocation->object_distributions_count ?? 0) < 1
        ) {
            abort(403, 'Access denied. This allocation must have at least one Office Allotment and Object Distribution.');
        }

        return Inertia::render('budget/obligation/obligation-index', [
            'allocation' => $allocation,
            'obligations' => fn (): array => ObligationResource::collection(
                $this->obligationRepository->list((int) $allocation->id)
            )->resolve(),
            'objectDistributions' => fn (): array => ObjectDistributionResource::collection(
                $this->objectDistributionRepository->list((int) $allocation->id)
            )->resolve(),
            'objectDistributionsWithObligationsCount' => fn (): array => ObjectDistributionResource::collection(
                $this->objectDistributionRepository->listWithObligationCount((int) $allocation->id)
            )->resolve(),
            'officeAllotments' => fn (): array => OfficeAllotmentResource::collection(
                $this->officeAllotmentRepository->list((int) $allocation->id)
            )->resolve(),
            'officeAllotmentWithObligationsCount' => fn (): array => OfficeAllotmentResource::collection(
                $this->officeAllotmentRepository->listWithObligationCount((int) $allocation->id, false)
            )->resolve(),
            'recipients' => array_map(fn (Recipient $case): array => [
                'name' => $case->name,
                'value' => $case->value,
            ], Recipient::cases()),
            'norsaTypes' => array_map(fn (NorsaType $case): array => [
                'name' => $case->name,
                'value' => $case->value,
            ], NorsaType::cases()),
            'obligatable' => $allocation->unobligated_balance === '0.00',
            'sections' => $this->officeAllotmentRepository->listGroupedBySection((int) $allocation->id),
        ]);
    }

    public function store(StoreObligationRequest $request, CreateObligation $action): RedirectResponse
    {
        $action->handle($request->validated());

        return redirect()->back();
    }

    public function update(UpdateObligationRequest $request, Obligation $obligation, UpdateObligation $action): RedirectResponse
    {
        $action->handle($obligation, $request->validated());

        return redirect()->back();
    }

    public function destroy(Obligation $obligation, DeleteObligation $action): RedirectResponse
    {
        $action->handle($obligation);

        return redirect()->back();
    }

    public function cancel(Obligation $obligation, CancelObligation $action): RedirectResponse
    {
        $action->handle($obligation);

        return redirect()->back();
    }
}
