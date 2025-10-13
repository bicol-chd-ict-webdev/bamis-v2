<?php

declare(strict_types=1);

namespace App\Enums;

enum ReportTypesEnum: string
{
    case BUR_BY_SECTION = 'BUR by Section';
    case BUR_BY_ALLOTMENT_CLASS = 'BUR by Allotment Class';
    case SAOB = 'SAOB';
}
