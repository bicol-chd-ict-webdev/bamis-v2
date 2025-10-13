<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\User;

final class UserRedirectService
{
    public function getRedirectRoute(User $user): string
    {
        if (! $user->isActive()) {
            return route('login');
        }

        return match ($user->getRoleNames()[0] ?? '') {
            'Administrator' => route('dashboard'),
            'Budget' => route('budget.dashboard.index'),
            default => route('home'),
        };
    }
}
