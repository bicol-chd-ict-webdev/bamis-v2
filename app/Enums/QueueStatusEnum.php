<?php

declare(strict_types=1);

namespace App\Enums;

enum QueueStatusEnum: string
{
    case QUEUED = 'Queued';
    case PROCESSING = 'Processing';
    case COMPLETED = 'Completed';
    case FAILED = 'Failed';
}
