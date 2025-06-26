<?php

declare(strict_types=1);

namespace App\Actions\Administrator\Account;

use App\Models\User;
use App\Repositories\AccountRepository;

class UpdateAccount
{
    public function __construct(private readonly AccountRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(User $account, array $attributes): void
    {
        $this->repository->update($account, $attributes);
    }
}
