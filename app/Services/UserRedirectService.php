<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\User;

class UserRedirectService
{
    public function getRedirectRoute(User $user): string
    {
        if (! $user->isActive()) {
            return route('login');
        }

        return match ($user->getRoleNames()[0] ?? '') {
            'ict' => route('dashboard'),
            'budget' => route('budget.dashboard'),
            default => route('home'),
        };
    }
}
