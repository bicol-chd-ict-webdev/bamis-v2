<?php

declare(strict_types=1);

namespace App\Http\Controllers\Budget;

use App\Actions\Budget\Allocation\DestroyAllocation;
use App\Actions\Budget\Allocation\StoreAllocation;
use App\Actions\Budget\Allocation\UpdateAllocation;
use App\Enums\RecipientEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Budget\Allocation\StoreAllocationRequest;
use App\Http\Requests\Budget\Allocation\UpdateAllocationRequest;
use App\Http\Resources\ExpenditureResource;
use App\Http\Resources\ObjectDistributionResource;
use App\Http\Resources\ObligationResource;
use App\Http\Resources\SectionResource;
use App\Models\Allocation;
use App\Models\Appropriation;
use App\Queries\AllocationIndexData;
use App\Repositories\ExpenditureRepository;
use App\Repositories\ObjectDistributionRepository;
use App\Repositories\ObligationRepository;
use App\Repositories\OfficeAllotmentRepository;
use App\Repositories\SectionRepository;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

final class GeneralAppropriationController extends Controller
{
    public function __construct(
        private readonly AllocationIndexData $viewData,
        private readonly SectionRepository $sectionRepository,
        private readonly ExpenditureRepository $expenditureRepository,
        private readonly ObjectDistributionRepository $objectDistributionRepository,
        private readonly OfficeAllotmentRepository $officeAllotmentRepository,
        private readonly ObligationRepository $obligationRepository,
    ) {}

    public function index(): Response
    {
        return Inertia::render('budget/allocation/general-appropriation/general-appropriation-index', $this->viewData->get(Appropriation::GENERAL_APPROPRIATION));
    }

    public function store(StoreAllocationRequest $request, StoreAllocation $action): RedirectResponse
    {
        $action->handle($request->validated());

        return to_route('budget.general-appropriations.index');
    }

    public function show(Allocation $general_appropriation): Response
    {
        return Inertia::render('budget/allocation/show-allocation', [
            'allocation' => $general_appropriation,
            'sections' => fn () => SectionResource::collection($this->sectionRepository->comboboxList())->resolve(),
            'expenditures' => fn (): array => ExpenditureResource::collection(
                $this->expenditureRepository->comboboxList($general_appropriation->allotment_class_id)
            )->resolve(),
            'objectDistributions' => fn (): array => ObjectDistributionResource::collection(
                $this->objectDistributionRepository->list($general_appropriation->id)
            )->resolve(),
            'officeAllotments' => $this->officeAllotmentRepository->list((int) $general_appropriation->id),
            'officeAllotmentsGroupedBySection' => $this->officeAllotmentRepository->listGroupedBySection((int) $general_appropriation->id),
            'obligations' => fn (): array => ObligationResource::collection(
                $this->obligationRepository->list((int) $general_appropriation->id)
            )->resolve(),
            'recipients' => array_map(fn (RecipientEnum $case): array => [
                'name' => $case->name,
                'value' => $case->value,
            ], RecipientEnum::cases()),
        ]);
    }

    public function update(UpdateAllocationRequest $request, Allocation $general_appropriation, UpdateAllocation $action): RedirectResponse
    {
        $action->handle($general_appropriation, $request->validated());

        return to_route('budget.general-appropriations.index');
    }

    public function destroy(Allocation $general_appropriation, DestroyAllocation $action): RedirectResponse
    {
        $action->handle($general_appropriation);

        return to_route('budget.general-appropriations.index');
    }
}
