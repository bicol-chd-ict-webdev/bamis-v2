<?php

declare(strict_types=1);

namespace App\Http\Responses;

use Illuminate\Http\RedirectResponse;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

final readonly class LoginResponse implements LoginResponseContract
{
    public function toResponse($request): RedirectResponse
    {
        $user = $request->user();

        if (! $user) {
            return to_route('login');
        }

        if (! $user->isActive()) {
            auth()->logout();

            return to_route('login')->withErrors([
                'email' => 'Your account is inactive. Please contact the administrator.',
            ]);
        }

        $role = $user->getRoleNames()->first();

        return match ($role) {
            'Administrator' => to_route('dashboard'),
            default => to_route('budget.dashboard.index'),
        };
    }
}
