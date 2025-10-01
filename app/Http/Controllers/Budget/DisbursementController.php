<?php

declare(strict_types=1);

namespace App\Http\Controllers\Budget;

use App\Actions\Budget\Disbursement\CreateDisbursement;
use App\Actions\Budget\Disbursement\DeleteDisbursement;
use App\Actions\Budget\Disbursement\UpdateDisbursement;
use App\Http\Controllers\Controller;
use App\Http\Requests\Budget\Disbursement\StoreDisbursementRequest;
use App\Http\Requests\Budget\Disbursement\UpdateDisbursementRequest;
use App\Http\Resources\DisbursementResource;
use App\Models\Disbursement;
use App\Models\Obligation;
use App\Repositories\DisbursementRepository;
use App\Services\ValidateAllocationAppropriationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class DisbursementController extends Controller
{
    public function __construct(
        private readonly DisbursementRepository $repository,
        private readonly ValidateAllocationAppropriationService $validateAllocationAppropriation
    ) {}

    public function index(Request $request, int $obligationId): Response
    {
        $key = array_key_first($request->query());
        $readableKey = Str::of((string) $key)->replace('_', ' ')->title();
        $allocation = $this->validateAllocationAppropriation->handle($request);
        $obligation = Obligation::findOrFail($obligationId);

        if ($obligation->allocation_id !== $allocation->id) {
            abort(403, "Obligation does not belong to the {$readableKey}.");
        }

        return Inertia::render('budget/disbursement/disbursement-index', [
            'disbursements' => fn () => DisbursementResource::collection(
                $this->repository->list($obligationId)
            )->resolve(),
            'disbursable' => $obligation->balance === '0.00',
        ]);
    }

    public function store(StoreDisbursementRequest $request, CreateDisbursement $action): RedirectResponse
    {
        $action->handle($request->validated());

        return redirect()->back();
    }

    public function update(UpdateDisbursementRequest $request, Obligation $obligation, Disbursement $disbursement, UpdateDisbursement $action): RedirectResponse
    {
        $action->handle($disbursement, $request->validated());

        return redirect()->back();
    }

    public function destroy(Obligation $obligation, Disbursement $disbursement, DeleteDisbursement $action): RedirectResponse
    {
        $action->handle($disbursement);

        return redirect()->back();
    }
}
