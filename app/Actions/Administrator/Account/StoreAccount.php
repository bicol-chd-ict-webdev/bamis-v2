<?php

declare(strict_types=1);

namespace App\Actions\Administrator\Account;

use App\Models\User;
use App\Services\Common\RoleService;
use Illuminate\Support\Arr;
use Throwable;

final readonly class StoreAccount
{
    public function __construct(private RoleService $roleService) {}

    /**
     * @param  array<string, mixed>  $attributes
     *
     * @throws Throwable
     */
    public function handle(array $attributes): User
    {
        $roleName = $this->roleService->validateRole($attributes);

        /** @var array<string, mixed> $exceptRole */
        $exceptRole = Arr::except($attributes, ['role']);

        $account = User::query()->create($exceptRole);
        $account->assignRole($roleName);

        return $account;
    }
}
