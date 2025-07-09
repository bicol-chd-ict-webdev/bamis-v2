<?php

declare(strict_types=1);

namespace App\Rules\Obligation;

use App\Models\OfficeAllotment;
use Brick\Math\BigDecimal;

class ObligationDoesNotExceedAllotmentOnUpdate extends AbstractObligationAllotmentRule
{
    public function __construct(
        int $allocationId,
        int $officeAllotmentId,
        private readonly int $excludeObligationId,
    ) {
        parent::__construct($allocationId, $officeAllotmentId);
    }

    protected function calculateTotalObligation(OfficeAllotment $officeAllotment): BigDecimal
    {
        return BigDecimal::of((string) $officeAllotment
            ->obligations()
            ->where('id', '!=', $this->excludeObligationId)
            ->sum('amount'));
    }
}
