<?php

declare(strict_types=1);

namespace App\Http\Controllers\Administrator;

use App\Actions\Administrator\Account\CreateAccount;
use App\Actions\Administrator\Account\UpdateAccount;
use App\Http\Controllers\Controller;
use App\Http\Requests\Administrator\Account\StoreAccountRequest;
use App\Http\Requests\Administrator\Account\UpdateAccountRequest;
use App\Http\Resources\AccountResource;
use App\Models\User;
use App\Repositories\AccountRepository;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

final class AccountController extends Controller
{
    public function __construct(private readonly AccountRepository $repository) {}

    public function index(): Response
    {
        return Inertia::render('administrator/account/account-index', [
            'accounts' => fn () => AccountResource::collection($this->repository->list())->resolve(),
        ]);
    }

    public function store(StoreAccountRequest $request, CreateAccount $action): RedirectResponse
    {
        $action->handle($request->validated());

        return back();
    }

    public function update(UpdateAccountRequest $request, User $account, UpdateAccount $action): RedirectResponse
    {
        $action->handle($account, $request->validated());

        return back();
    }
}
