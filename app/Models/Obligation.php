<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\NorsaType;
use App\Enums\Recipient;
use Brick\Math\BigDecimal;
use Brick\Math\RoundingMode;
use Carbon\CarbonImmutable;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Collection;

/**
 * @property int $id
 * @property int $allocation_id
 * @property string $amount
 * @property string $creditor
 * @property CarbonImmutable $date
 * @property ?string $disbursements_sum_amount
 * @property ?string $dtrak_number
 * @property ?bool $is_transferred
 * @property ?string $norsa_type
 * @property int $object_distribution_id
 * @property int $office_allotment_id
 * @property string $oras_number
 * @property string $oras_number_reference
 * @property string $particulars
 * @property ?Recipient $recipient
 * @property ?string $reference_number
 * @property string $series
 * @property ?int $tagged_obligation_id
 * @property ?Obligation $relatedObligation
 * @property ?Collection<int, Obligation> $taggedObligations
 * @property string $tagged_obligations_sum_amount
 */
class Obligation extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'oras_number',
        'series',
        'amount',
        'date',
        'creditor',
        'particulars',
        'is_transferred',
        'recipient',
        'norsa_type',
        'office_allotment_id',
        'object_distribution_id',
        'allocation_id',
        'reference_number',
        'dtrak_number',
        'tagged_obligation_id',
    ];

    protected $casts = [
        'allocation_id' => 'integer',
        'amount' => 'decimal:2',
        'date' => 'immutable_date',
        'is_transferred' => 'boolean',
        'norsa_type' => NorsaType::class,
        'object_distribution_id' => 'integer',
        'office_allotment_id' => 'integer',
        'recipient' => Recipient::class,
        'tagged_obligation_id' => 'integer',
    ];

    protected $appends = ['disbursements_sum_amount', 'oras_number_reference'];

    /**
     * @return BelongsTo<Obligation, covariant $this>
     */
    public function relatedObligation(): BelongsTo
    {
        return $this->belongsTo(self::class, 'tagged_obligation_id');
    }

    /**
     * @return HasMany<Obligation, covariant $this>
     */
    public function taggedObligations(): HasMany
    {
        return $this->hasMany(self::class, 'tagged_obligation_id');
    }

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
     * @return HasMany<Disbursement, covariant $this>
     */
    public function disbursements(): HasMany
    {
        return $this->hasMany(Disbursement::class);
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

    /**
     * @return Attribute<string, never>
     */
    protected function orasNumberReference(): Attribute
    {
        return Attribute::make(
            get: fn (): string => $this->oras_number.'-'.$this->series,
        );
    }

    /**
     * @return Attribute<string, never>
     */
    protected function disbursementsSumAmount(): Attribute
    {
        return Attribute::make(
            get: function (): string {
                $total = BigDecimal::zero();

                foreach ($this->disbursements as $disbursement) {
                    $total = $total->plus(BigDecimal::of($disbursement->total_amount));
                }

                return $total->toScale(2, RoundingMode::HALF_UP)->__toString();
            }
        );
    }
}
