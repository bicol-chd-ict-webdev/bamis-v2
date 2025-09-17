<?php

declare(strict_types=1);

namespace App\Rules\Obligation;

use App\Models\ObjectDistribution;
use Brick\Math\BigDecimal;

class ObligationDoesNotExceedObjectDistributionOnUpdate extends AbstractObligationObjectDistributionRule
{
    public function __construct(
        int $allocationId,
        int $objectDistributionId,
        private readonly int $excludeObligationId,
    ) {
        parent::__construct($allocationId, $objectDistributionId);
    }

    protected function calculateTotalObligation(ObjectDistribution $objectDistribution): BigDecimal
    {
        return BigDecimal::of((string) $objectDistribution
            ->obligations()
            ->where('id', '!=', $this->excludeObligationId)
            ->sum('amount'));
    }
}
