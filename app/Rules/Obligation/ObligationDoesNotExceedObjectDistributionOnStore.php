<?php

declare(strict_types=1);

namespace App\Rules\Obligation;

use App\Models\ObjectDistribution;
use Brick\Math\BigDecimal;

class ObligationDoesNotExceedObjectDistributionOnStore extends AbstractObligationObjectDistributionRule
{
    protected function calculateTotalObligation(ObjectDistribution $objectDistribution): BigDecimal
    {
        return BigDecimal::of((string) $objectDistribution->obligations()->sum('amount'));
    }
}
