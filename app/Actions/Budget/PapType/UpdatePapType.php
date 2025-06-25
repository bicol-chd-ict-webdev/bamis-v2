<?php

declare(strict_types=1);

namespace App\Actions\Budget\PapType;

use App\Models\PapType;
use App\Repositories\PapTypeRepository;

class UpdatePapType
{
    public function __construct(private readonly PapTypeRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(PapType $papType, array $attributes): void
    {
        $this->repository->update($papType, $attributes);
    }
}
