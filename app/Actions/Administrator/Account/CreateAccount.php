<?php

declare(strict_types=1);

namespace App\Actions\Administrator\Account;

use App\Contracts\AccountInterface;

class CreateAccount
{
    public function __construct(private readonly AccountInterface $accountInterface) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): void
    {
        $this->accountInterface->create($attributes);
    }
}
