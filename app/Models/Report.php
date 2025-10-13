<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\QueueStatusEnum;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property-read int $id
 * @property-read string $filename
 * @property-read string $type
 * @property-read QueueStatusEnum $status
 * @property-read string|null $download_link
 * @property-read CarbonImmutable|null $expires_at
 * @property-read string|null $error
 */
class Report extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'filename',
        'type',
        'status',
        'download_link',
        'expires_at',
        'error',
    ];

    protected $casts = [
        'status' => QueueStatusEnum::class,
        'expires_at' => 'datetime',
    ];
}
