<?php

declare(strict_types=1);

namespace App\Http\Controllers\Administrator;

use App\Actions\Administrator\Account\StoreAccount;
use App\Actions\Administrator\Account\UpdateAccount;
use App\Http\Controllers\Controller;
use App\Http\Requests\Administrator\Account\StoreAccountRequest;
use App\Http\Requests\Administrator\Account\UpdateAccountRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use Throwable;

final class AccountController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('administrator/account/account-index', [
            'users' => fn () => User::query()->where('id', '!=', 1)->latest()->get(['id', 'name', 'email', 'designation', 'status']),
            'roles' => fn () => Role::query()->get(['id', 'name'])->toArray(),
        ]);
    }

    /**
     * @throws Throwable
     */
    public function store(StoreAccountRequest $request, StoreAccount $action): RedirectResponse
    {
        $action->handle($request->validated());

        return to_route('administrator.accounts.index');
    }

    /**
     * @throws Throwable
     */
    public function update(UpdateAccountRequest $request, User $account, UpdateAccount $action): RedirectResponse
    {
        $action->handle($request->validated(), $account);

        return to_route('administrator.accounts.index');
    }
}
