<?php

declare(strict_types=1);

namespace App\Actions\Account;

use App\Models\User;
use App\Services\RoleService;

class CreateAccount
{
    public function __construct(protected RoleService $roleService) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): void
    {
        $roleName = $this->roleService->validateRole($attributes);

        $account = User::create($attributes);
        $account->assignRole($roleName);
    }
}
