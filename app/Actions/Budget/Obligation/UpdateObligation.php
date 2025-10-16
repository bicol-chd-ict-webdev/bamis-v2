<?php

declare(strict_types=1);

namespace App\Actions\Budget\Obligation;

use App\Models\Obligation;
use App\Repositories\ObligationRepository;

final readonly class UpdateObligation
{
    public function __construct(private ObligationRepository $repository) {}

    /**
     * @param  array{
     *     offices: array<int, array{
     *         office_allotment_id: int,
     *         section_id?: int|null,
     *         amount: numeric-string|float|int
     *     }>,
     *     oras_number?: string,
     *     allocation_id?: int,
     *     series?: string,
     *     creditor?: string,
     *     particulars?: string,
     *     recipient?: string|null,
     *     norsa_type?: string|null,
     *     is_transferred?: bool|null,
     *     dtrak_number?: string|null,
     *     reference_number?: string|null,
     *     tagged_obligation_id?: int|null
     * } $attributes
     */
    public function handle(Obligation $obligation, array $attributes): void
    {
        $this->repository->update($obligation, $attributes);
    }
}
