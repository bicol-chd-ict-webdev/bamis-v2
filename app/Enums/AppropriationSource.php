<?php

declare(strict_types=1);

namespace App\Enums;

enum AppropriationSource: string
{
    case NEW = 'New Appropriation';
    case SPECIAL = 'Special Purpose Fund';
    case AUTOMATIC = 'Automatic Appropriation';
}
