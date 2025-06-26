<?php

declare(strict_types=1);

namespace App\Actions\Administrator\AppropriationType;

use App\Models\AppropriationType;
use App\Repositories\AppropriationTypeRepository;

class UpdateAppropriationType
{
    public function __construct(private readonly AppropriationTypeRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(AppropriationType $appropriationType, array $attributes): void
    {
        $this->repository->update($appropriationType, $attributes);
    }
}
