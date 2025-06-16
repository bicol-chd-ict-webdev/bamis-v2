<?php

declare(strict_types=1);

namespace App\Actions\Administrator\Account;

use App\Contracts\AccountInterface;
use App\Models\User;

class UpdateAccount
{
    public function __construct(private readonly AccountInterface $accountInterface) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(User $account, array $attributes): void
    {
        $this->accountInterface->update($account, $attributes);
    }
}
