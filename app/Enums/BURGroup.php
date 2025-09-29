<?php

declare(strict_types=1);

namespace App\Enums;

enum BURGroup: string
{
    case GRAND_TOTAL = 'GRAND TOTAL';
    case GAA_CURRENT = 'GAA CURRENT';
    case SAA_CURRENT = 'SAA CURRENT';
    case SARO_CURRENT = 'SARO CURRENT';
    case GAA_CONAP = 'GAA CONAP';
    case SAA_CONAP = 'SAA CONAP';
    case CURRENT_TOTAL = 'CURRENT TOTAL';
    case CONAP_TOTAL = 'CONAP TOTAL';
}
