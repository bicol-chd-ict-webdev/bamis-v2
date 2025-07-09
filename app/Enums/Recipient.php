<?php

declare(strict_types=1);

namespace App\Enums;

enum Recipient: string
{
    case CO = 'Central Office';
    case BMC = 'Bicol Medical Center';
    case BRHMC = 'Bicol Regional Hospital and Medical Center';
    case BRGHGMC = 'Bicol Region General Hospital and Geriatric Medical Center';
    case CSTRC = 'Camarines Sur Treatment and Rehabilitation Center';
    case MTRC = 'Malinao Treatment and Rehabilitation Center';
}
