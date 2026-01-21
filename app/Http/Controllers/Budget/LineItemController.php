<?php

declare(strict_types=1);

namespace App\Http\Controllers\Budget;

use App\Actions\Budget\LineItem\DestroyLineItem;
use App\Actions\Budget\LineItem\StoreLineItem;
use App\Actions\Budget\LineItem\UpdateLineItem;
use App\Http\Controllers\Controller;
use App\Http\Requests\Budget\LineItem\StoreLineItemRequest;
use App\Http\Requests\Budget\LineItem\UpdateLineItemRequest;
use App\Http\Resources\LineItemResource;
use App\Models\LineItem;
use App\Repositories\LineItemRepository;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

final class LineItemController extends Controller
{
    public function __construct(private readonly LineItemRepository $repository) {}

    public function index(): Response
    {
        return Inertia::render('budget/line-item/line-item-index', [
            'lineItems' => fn () => LineItemResource::collection($this->repository->list())->resolve(),
        ]);
    }

    public function store(StoreLineItemRequest $request, StoreLineItem $action): RedirectResponse
    {
        $action->handle($request->validated());

        return to_route('budget.line-items.index');
    }

    public function update(UpdateLineItemRequest $request, LineItem $lineItem, UpdateLineItem $action): RedirectResponse
    {
        $action->handle($lineItem, $request->validated());

        return to_route('budget.line-items.index');
    }

    public function destroy(LineItem $lineItem, DestroyLineItem $action): RedirectResponse
    {
        $action->handle($lineItem);

        return to_route('budget.line-items.index');
    }
}
