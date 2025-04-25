<?php

declare(strict_types=1);

namespace App\Enums;

enum AccountStatus: string
{
    case ACTIVE = 'Active';
    case INACTIVE = 'Inactive';
}
