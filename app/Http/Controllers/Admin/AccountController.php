<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Actions\Account\CreateAccount;
use App\Actions\Account\UpdateAccount;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Account\StoreAccountRequest;
use App\Http\Requests\Admin\Account\UpdateAccountRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/account/account-index', [
            'accounts' => fn () => User::get(['id', 'name', 'email', 'designation', 'status']),
        ]);
    }

    public function store(StoreAccountRequest $request, CreateAccount $action): RedirectResponse
    {
        $action->handle($request->validated());

        return redirect()->back();
    }

    public function update(UpdateAccountRequest $request, User $account, UpdateAccount $action): RedirectResponse
    {
        $action->handle($account, $request->validated());

        return redirect()->back();
    }
}
