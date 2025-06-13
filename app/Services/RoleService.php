<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use InvalidArgumentException;
use Spatie\Permission\Models\Role;

class RoleService
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
        if (! isset($attributes['role']) || ! is_string($attributes['role']) || empty($attributes['role'])) {
            throw new InvalidArgumentException('The "role" field must be a valid non-empty string.');
        }

        $roleName = $attributes['role'];

        if (! Role::where('name', $roleName)->exists()) {
            throw new ModelNotFoundException("Role '$roleName' not found.");
        }

        return $roleName;
    }
}
