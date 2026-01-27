<?php

declare(strict_types=1);

namespace App\Support\Helpers;

use Brick\Math\BigDecimal;
use Brick\Math\RoundingMode;

final class RateCalculator
{
    public static function calculate(float $numerator, float $denominator, int $scale = 2): BigDecimal
    {
        if ($denominator <= 0) {
            return BigDecimal::of('0');
        }

        return BigDecimal::of((string) $numerator)
            ->dividedBy(BigDecimal::of((string) $denominator), 4, RoundingMode::HALF_UP)
            ->multipliedBy(100)
            ->toScale($scale, RoundingMode::HALF_UP);
    }
}
