<?php

declare(strict_types=1);

namespace App\Actions\Administrator\Account;

use App\Repositories\AccountRepository;

final readonly class CreateAccount
{
    public function __construct(private AccountRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): void
    {
        $this->repository->create($attributes);
    }
}
