<?php

declare(strict_types=1);

namespace App\Rules\Obligation;

use App\Models\OfficeAllotment;
use Brick\Math\BigDecimal;

final class ObligationDoesNotExceedAllotmentOnStore extends AbstractObligationAllotmentRule
{
    protected function calculateTotalObligation(OfficeAllotment $officeAllotment): BigDecimal
    {
        return BigDecimal::of((string) $officeAllotment->obligations()->sum('amount'));
    }
}
