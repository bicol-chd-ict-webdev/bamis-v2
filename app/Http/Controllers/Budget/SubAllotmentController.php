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
use App\Queries\AllocationIndexData;
use App\Repositories\ExpenditureRepository;
use App\Repositories\ObjectDistributionRepository;
use App\Repositories\ObligationRepository;
use App\Repositories\OfficeAllotmentRepository;
use App\Repositories\SectionRepository;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

final class SubAllotmentController extends Controller
{
    public function __construct(private readonly AllocationIndexData $viewData,
        private readonly SectionRepository $sectionRepository,
        private readonly ExpenditureRepository $expenditureRepository,
        private readonly ObjectDistributionRepository $objectDistributionRepository,
        private readonly OfficeAllotmentRepository $officeAllotmentRepository,
        private readonly ObligationRepository $obligationRepository
    ) {}

    public function index(): Response
    {
        return Inertia::render('budget/allocation/sub-allotment/sub-allotment-index', $this->viewData->get(2));
    }

    public function store(StoreAllocationRequest $request, StoreAllocation $action): RedirectResponse
    {
        $action->handle($request->validated());

        return to_route('budget.sub-allotments.index');
    }

    public function show(Allocation $sub_allotment): Response
    {
        return Inertia::render('budget/allocation/show-allocation', [
            'allocation' => $sub_allotment,
            'sections' => fn () => SectionResource::collection($this->sectionRepository->comboboxList())->resolve(),
            'expenditures' => fn (): array => ExpenditureResource::collection(
                $this->expenditureRepository->comboboxList($sub_allotment->allotment_class_id)
            )->resolve(),
            'objectDistributions' => fn (): array => ObjectDistributionResource::collection(
                $this->objectDistributionRepository->list($sub_allotment->id)
            )->resolve(),
            'officeAllotments' => $this->officeAllotmentRepository->list((int) $sub_allotment->id),
            'officeAllotmentsGroupedBySection' => $this->officeAllotmentRepository->listGroupedBySection((int) $sub_allotment->id),
            'obligations' => fn (): array => ObligationResource::collection(
                $this->obligationRepository->list((int) $sub_allotment->id)
            )->resolve(),
            'recipients' => array_map(fn (RecipientEnum $case): array => [
                'name' => $case->name,
                'value' => $case->value,
            ], RecipientEnum::cases()),
        ]);
    }

    public function update(UpdateAllocationRequest $request, Allocation $sub_allotment, UpdateAllocation $action): RedirectResponse
    {
        $action->handle($sub_allotment, $request->validated());

        return to_route('budget.sub-allotments.index');
    }

    public function destroy(Allocation $sub_allotment, DestroyAllocation $action): RedirectResponse
    {
        $action->handle($sub_allotment);

        return to_route('budget.sub-allotments.index');
    }
}
