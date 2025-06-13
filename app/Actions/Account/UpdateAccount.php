<?php

declare(strict_types=1);

namespace App\Actions\Account;

use App\Services\RoleService;

class UpdateAccount
{
    public function __construct(protected RoleService $roleService) {}

    /**
     * @param  \App\Models\User  $account
     * @param  array<string, mixed>  $attributes
     */
    public function handle($account, array $attributes): void
    {
        $roleName = $this->roleService->validateRole($attributes);

        $account->update($attributes);
        $account->syncRoles($roleName);
    }
}
