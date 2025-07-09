<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\Recipient;
use Carbon\CarbonImmutable;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property string $amount
 * @property CarbonImmutable $date
 * @property string $creditor
 * @property string $particulars
 * @property ?bool $is_transferred
 * @property ?Recipient $recipient
 * @property ?bool $is_batch_process
 * @property ?string $norsa_type
 * @property int $office_allotment_id
 * @property int $object_distribution_id
 * @property int $allocation_id
 * @property string $series
 * @property string $dtrak_number
 * @property string $reference_number
 */
class Obligation extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'series',
        'amount',
        'date',
        'creditor',
        'particulars',
        'is_transferred',
        'recipient',
        'is_batch_process',
        'norsa_type',
        'office_allotment_id',
        'object_distribution_id',
        'allocation_id',
        'reference_number',
        'dtrak_number',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'date' => 'immutable_date',
        'is_transferred' => 'boolean',
        'is_batch_process' => 'boolean',
        'recipient' => Recipient::class,
    ];

    /**
     * @return BelongsTo<OfficeAllotment, covariant $this>
     */
    public function officeAllotment(): BelongsTo
    {
        return $this->belongsTo(OfficeAllotment::class);
    }

    /**
     * @return BelongsTo<ObjectDistribution, covariant $this>
     */
    public function objectDistribution(): BelongsTo
    {
        return $this->belongsTo(ObjectDistribution::class);
    }

    /**
     * @return BelongsTo<Allocation, covariant $this>
     */
    public function allocation(): BelongsTo
    {
        return $this->belongsTo(Allocation::class);
    }

    /**
     * @return Attribute<string, string>
     */
    protected function date(): Attribute
    {
        return Attribute::make(
            get: fn (mixed $value, array $attributes): string => is_string($value) || $value instanceof DateTimeInterface
                    ? CarbonImmutable::parse($value)->format('Y-m-d')
                    : '',
        );
    }
}
