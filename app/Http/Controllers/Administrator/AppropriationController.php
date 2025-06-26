<?php

declare(strict_types=1);

namespace App\Http\Controllers\Administrator;

use App\Actions\Administrator\Appropriation\CreateAppropriation;
use App\Actions\Administrator\Appropriation\DeleteAppropriation;
use App\Actions\Administrator\Appropriation\UpdateAppropriation;
use App\Http\Controllers\Controller;
use App\Http\Requests\Administrator\Appropriation\StoreAppropriationRequest;
use App\Http\Requests\Administrator\Appropriation\UpdateAppropriationRequest;
use App\Http\Resources\AppropriationResource;
use App\Models\Appropriation;
use App\Repositories\AppropriationRepository;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AppropriationController extends Controller
{
    public function __construct(private readonly AppropriationRepository $appropriationRepository) {}

    public function index(): Response
    {
        return Inertia::render('administrator/appropriation/appropriation-index', [
            'appropriations' => fn () => AppropriationResource::collection($this->appropriationRepository->list())->resolve(),
        ]);
    }

    public function store(StoreAppropriationRequest $request, CreateAppropriation $action): RedirectResponse
    {
        $action->handle($request->validated());

        return to_route('administrator.appropriations.index');
    }

    public function update(UpdateAppropriationRequest $request, Appropriation $appropriation, UpdateAppropriation $action): RedirectResponse
    {
        $action->handle($appropriation, $request->validated());

        return to_route('administrator.appropriations.index');
    }

    public function destroy(Appropriation $appropriation, DeleteAppropriation $action): RedirectResponse
    {
        $action->handle($appropriation);

        return to_route('administrator.appropriations.index');
    }
}
