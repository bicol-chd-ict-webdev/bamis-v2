<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\AccountInterface;
use App\Models\User;
use App\Services\RoleService;
use Illuminate\Support\Collection;

final readonly class AccountRepository implements AccountInterface
{
    public function __construct(private RoleService $roleService) {}

    public function create(array $attributes): User
    {
        $roleName = $this->roleService->validateRole($attributes);
        $account = User::query()->create($attributes);
        $account->assignRole($roleName);

        return $account;
    }

    public function update(User $account, array $attributes): void
    {
        $roleName = $this->roleService->validateRole($attributes);

        $account->update($attributes);
        $account->syncRoles($roleName);
    }

    public function list(): Collection
    {
        return User::query()->latest()->get(['id', 'name', 'email', 'designation', 'status']);
    }
}
