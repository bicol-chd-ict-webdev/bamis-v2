<?php

declare(strict_types=1);

namespace App\Enums;

enum Prexc: string
{
    case PROMOTIVE = 'Access to promotive and preventive health care services improved';
    case CURATIVE = 'Access to curative and rehabilitative health care services improved';
    case SAFE = 'Access to safe and quality health commodities, devices and facilities ensured';
    case SOCIAL = 'Access to social health protection assured';
}
