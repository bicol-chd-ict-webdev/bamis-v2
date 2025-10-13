<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use InvalidArgumentException;
use Spatie\Permission\Models\Role;

final class RoleService
{
    /**
     * Get the role from the attributes, ensuring it's a valid string and exists in the database.
     *
     * @param  array<string, mixed>  $attributes
     *
     * @throws InvalidArgumentException
     * @throws ModelNotFoundException
     */
    public function validateRole(array $attributes): string
    {
        throw_if(! isset($attributes['role']) || ! is_string($attributes['role']) || empty($attributes['role']), InvalidArgumentException::class, 'The "role" field must be a valid non-empty string.');

        $roleName = $attributes['role'];

        throw_unless(Role::query()->where('name', $roleName)->exists(), ModelNotFoundException::class, "Role '$roleName' not found.");

        return $roleName;
    }
}
