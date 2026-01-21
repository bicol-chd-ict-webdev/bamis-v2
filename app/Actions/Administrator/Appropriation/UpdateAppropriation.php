<?php

declare(strict_types=1);

namespace App\Actions\Administrator\Appropriation;

use App\Models\Appropriation;
use App\Repositories\AppropriationRepository;

final readonly class UpdateAppropriation
{
    public function __construct(private AppropriationRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(Appropriation $appropriation, array $attributes): bool
    {
        return $this->repository->update($appropriation, $attributes);
    }
}
