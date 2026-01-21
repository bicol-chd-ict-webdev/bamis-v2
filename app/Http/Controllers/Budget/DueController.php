<?php

declare(strict_types=1);

namespace App\Http\Controllers\Budget;

use App\Actions\Budget\Due\CreateDue;
use App\Actions\Budget\Due\DeleteDue;
use App\Actions\Budget\Due\UpdateDue;
use App\Http\Controllers\Controller;
use App\Http\Requests\Budget\Due\StoreDueRequest;
use App\Http\Requests\Budget\Due\UpdateDueRequest;
use App\Http\Resources\DueResource;
use App\Models\Due;
use App\Models\Obligation;
use App\Repositories\DueRepository;
use App\Services\ValidateAllocationAppropriationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

final class DueController extends Controller
{
    public function __construct(
        private readonly DueRepository $repository,
        private readonly ValidateAllocationAppropriationService $validateAllocationAppropriation
    ) {}

    public function index(Request $request, int $obligationId): Response
    {
        $key = array_key_first($request->query());
        $readableKey = Str::of((string) $key)->replace('_', ' ')->title();
        $allocation = $this->validateAllocationAppropriation->handle($request);
        $obligation = Obligation::query()->findOrFail($obligationId);

        abort_if($obligation->allocation_id !== $allocation->id, 403, sprintf('Obligation does not belong to the %s.', $readableKey));

        return Inertia::render('budget/due/due-index', [
            'dues' => fn () => DueResource::class::collection(
                $this->repository->list($obligationId)
            )->resolve(),
        ]);
    }

    public function store(StoreDueRequest $request, Obligation $obligation, CreateDue $action): RedirectResponse
    {
        $action->handle($request->validated());

        return back();
    }

    public function update(UpdateDueRequest $request, Obligation $obligation, Due $due, UpdateDue $action): RedirectResponse
    {
        $action->handle($due, $request->validated());

        return back();
    }

    public function destroy(Obligation $obligation, Due $due, DeleteDue $action): RedirectResponse
    {
        $action->handle($due);

        return back();
    }
}
