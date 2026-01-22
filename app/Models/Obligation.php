<?php

declare(strict_types=1);

namespace App\Models;

use App\Concerns\HasActivityLog;
use App\Enums\NorsaTypeEnum;
use App\Enums\RecipientEnum;
use Brick\Math\BigDecimal;
use Brick\Math\RoundingMode;
use Carbon\CarbonImmutable;
use Database\Factories\ObligationFactory;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Collection;
use Spatie\Activitylog\Traits\LogsActivity;

/**
 * @property-read int $id
 * @property-read int $allocation_id
 * @property-read string $amount
 * @property-read string $balance
 * @property-read string $creditor
 * @property-read CarbonImmutable $date
 * @property-read string | null $disbursements_sum_amount
 * @property-read string | null $dtrak_number
 * @property-read bool | null $is_cancelled
 * @property-read bool | null $is_transferred
 * @property-read string | null $norsa_type
 * @property-read int $expenditure_id
 * @property-read int $office_allotment_id
 * @property-read string $oras_number
 * @property-read string $oras_number_reference
 * @property-read string $particulars
 * @property-read RecipientEnum | null $recipient
 * @property-read string | null $reference_number
 * @property-read int | null $section_id
 * @property-read string $series
 * @property-read int | null $tagged_obligation_id
 * @property-read Obligation | null $relatedObligation
 * @property-read Collection<int, Obligation> | null $taggedObligations
 * @property-read string $tagged_obligations_sum_amount
 */
final class Obligation extends Model
{
    use HasActivityLog;

    /** @use HasFactory<ObligationFactory> */
    use HasFactory;

    use LogsActivity;

    use SoftDeletes;

    protected $fillable = [
        'oras_number',
        'series',
        'amount',
        'date',
        'creditor',
        'particulars',
        'is_cancelled',
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
        'is_cancelled' => 'boolean',
        'is_transferred' => 'boolean',
        'norsa_type' => NorsaTypeEnum::class,
        'object_distribution_id' => 'integer',
        'office_allotment_id' => 'integer',
        'recipient' => RecipientEnum::class,
        'tagged_obligation_id' => 'integer',
    ];

    protected $appends = ['disbursements_sum_amount', 'oras_number_reference', 'balance', 'section_id', 'dues_sum_amount'];

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
     * @return HasMany<Due, covariant $this>
     */
    public function dues(): HasMany
    {
        return $this->hasMany(Due::class);
    }

    protected function getActivityDescription(): string
    {
        return $this->oras_number_reference;
    }

    /**
     * @param  Builder<Obligation>  $query
     * @return Builder<Obligation>
     */
    #[Scope]
    protected function nonZeroBalance(Builder $query): Builder
    {
        return $query->select('obligations.*')
            ->selectRaw('COALESCE((
                SELECT SUM(
                    COALESCE(net_amount, 0) +
                    COALESCE(tax, 0) +
                    COALESCE(retention, 0) +
                    COALESCE(penalty, 0) +
                    COALESCE(absences, 0) +
                    COALESCE(other_deductions, 0)
                )
                FROM disbursements
                WHERE disbursements.obligation_id = obligations.id
            ), 0) as disbursements_sum_amount')
            ->havingRaw('(amount - disbursements_sum_amount) <> 0');
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
     * @noinspection PhpUnused
     *
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
    protected function balance(): Attribute
    {
        return Attribute::make(
            get: fn (): string => BigDecimal::of((string) ($this->amount ?? '0'))
                ->minus((string) ($this->disbursements_sum_amount ?? '0'))
                ->toScale(2, RoundingMode::HALF_UP)
                ->__toString(),
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

    /**
     * @return Attribute<string, never>
     */
    protected function duesSumAmount(): Attribute
    {
        return Attribute::make(
            get: function (): string {
                $total = BigDecimal::zero();

                foreach ($this->dues as $due) {
                    $total = $total->plus(BigDecimal::of($due->amount));
                }

                return $total->toScale(2, RoundingMode::HALF_UP)->__toString();
            }
        );
    }

    /**
     * @noinspection PhpUnused
     *
     * @return Attribute<int|null, never>
     */
    protected function sectionId(): Attribute
    {
        return Attribute::make(
            get: fn (): ?int => $this->officeAllotment?->section_id,
        );
    }
}
