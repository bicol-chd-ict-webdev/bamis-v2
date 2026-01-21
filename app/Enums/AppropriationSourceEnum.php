<?php

declare(strict_types=1);

namespace App\Enums;

enum AppropriationSourceEnum: string
{
    case NEW = 'I. New Appropriation';
    case AUTOMATIC = 'II. Automatic Appropriations';
    case SPECIAL = 'III. Special Purpose Fund';
    case UNPROGRAMMED = 'IV. Unprogrammed Appropriations';
}
