<?php

declare(strict_types=1);

namespace App\Http\Controllers\Budget;

use App\Actions\Budget\ObjectDistribution\CreateObjectDistribution;
use App\Actions\Budget\ObjectDistribution\DeleteObjectDistribution;
use App\Actions\Budget\ObjectDistribution\UpdateObjectDistribution;
use App\Http\Controllers\Controller;
use App\Http\Requests\Budget\ObjectDistribution\StoreObjectDistributionRequest;
use App\Http\Requests\Budget\ObjectDistribution\UpdateObjectDistributionRequest;
use App\Http\Resources\ExpenditureResource;
use App\Http\Resources\ObjectDistributionResource;
use App\Models\ObjectDistribution;
use App\Repositories\ExpenditureRepository;
use App\Repositories\ObjectDistributionRepository;
use App\Services\ValidateAllocationAppropriationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

final class ObjectDistributionController extends Controller
{
    public function __construct(
        private readonly ObjectDistributionRepository $objectDistributionRepository,
        private readonly ExpenditureRepository $expenditureRepository,
        private readonly ValidateAllocationAppropriationService $validateAllocationAppropriationService,
    ) {}

    public function index(Request $request): Response
    {
        $allocation = $this->validateAllocationAppropriationService->handle($request);

        return Inertia::render('budget/object-distribution/object-distribution-index', [
            'objectDistributions' => fn (): array => ObjectDistributionResource::collection(
                $this->objectDistributionRepository->list((int) $allocation->id)
            )->resolve(),
            'expenditures' => fn (): array => ExpenditureResource::collection(
                $this->expenditureRepository->comboboxList($allocation->allotment_class_id)
            )->resolve(),
        ]);
    }

    public function store(StoreObjectDistributionRequest $request, CreateObjectDistribution $action): RedirectResponse
    {
        $action->handle($request->validated());

        return back();
    }

    public function update(UpdateObjectDistributionRequest $request, ObjectDistribution $objectDistribution, UpdateObjectDistribution $action): RedirectResponse
    {
        $action->handle($objectDistribution, $request->validated());

        return back();
    }

    public function destroy(ObjectDistribution $objectDistribution, DeleteObjectDistribution $action): RedirectResponse
    {
        $action->handle($objectDistribution);

        return back();
    }
}
