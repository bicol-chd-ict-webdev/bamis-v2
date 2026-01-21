<?php

declare(strict_types=1);

namespace App\Concerns;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use RuntimeException;

trait HasAuthenticatedUser
{
    /**
     * Get the authenticated user.
     *
     * @throws RuntimeException
     */
    protected function authenticatedUser(): User
    {
        return Auth::user() ?? throw new RuntimeException('User must be authenticated');
    }
}
