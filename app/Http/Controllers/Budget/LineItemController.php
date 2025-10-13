<?php

declare(strict_types=1);

namespace App\Http\Controllers\Budget;

use App\Actions\Budget\LineItem\CreateLineItem;
use App\Actions\Budget\LineItem\DeleteLineItem;
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

    public function store(StoreLineItemRequest $request, CreateLineItem $action): RedirectResponse
    {
        $action->handle($request->validated());

        return back();
    }

    public function update(UpdateLineItemRequest $request, LineItem $lineItem, UpdateLineItem $action): RedirectResponse
    {
        $action->handle($lineItem, $request->validated());

        return back();
    }

    public function destroy(LineItem $lineItem, DeleteLineItem $action): RedirectResponse
    {
        $action->handle($lineItem);

        return back();
    }
}
