<?php

declare(strict_types=1);

namespace App\Models;

use App\Concerns\HasActivityLog;
use Brick\Math\BigDecimal;
use Brick\Math\RoundingMode;
use Carbon\CarbonImmutable;
use Database\Factories\DisbursementFactory;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

/**
 * @property-read int $id
 * @property-read string $net_amount
 * @property-read string $date
 * @property-read int $obligation_id
 * @property-read ?string $check_date
 * @property-read ?string $check_number
 * @property-read ?string $tax
 * @property-read ?string $retention
 * @property-read ?string $penalty
 * @property-read ?string $absences
 * @property-read ?string $other_deductions
 * @property-read ?string $remarks
 * @property-read string $total_amount
 * @property-read ?string $total
 */
final class Disbursement extends Model
{
    use HasActivityLog;

    /** @use HasFactory<DisbursementFactory> */
    use HasFactory;

    use LogsActivity;

    use SoftDeletes;

    protected $fillable = [
        'net_amount',
        'date',
        'obligation_id',
        'check_date',
        'check_number',
        'tax',
        'retention',
        'penalty',
        'absences',
        'other_deductions',
        'remarks',
    ];

    protected $casts = [
        'net_amount' => 'decimal:2',
        'date' => 'immutable_date',
        'check_date' => 'immutable_date',
        'tax' => 'decimal:2',
        'retention' => 'decimal:2',
        'penalty' => 'decimal:2',
        'absences' => 'decimal:2',
        'other_deductions' => 'decimal:2',
    ];

    protected $appends = ['total_amount'];

    /**
     * @return BelongsTo<Obligation, covariant $this>
     */
    public function obligation(): BelongsTo
    {
        return $this->belongsTo(Obligation::class);
    }

    /**
     * @param  Builder<Disbursement>  $query
     * @return Builder<Disbursement>
     */
    #[\Illuminate\Database\Eloquent\Attributes\Scope]
    protected function totalDisbursements(Builder $query): Builder
    {
        return $query->selectRaw(
            'SUM(CAST(net_amount AS DECIMAL(10,2))) +
         SUM(CAST(COALESCE(tax, 0) AS DECIMAL(10,2))) +
         SUM(CAST(COALESCE(retention, 0) AS DECIMAL(10,2))) +
         SUM(CAST(COALESCE(penalty, 0) AS DECIMAL(10,2))) +
         SUM(CAST(COALESCE(absences, 0) AS DECIMAL(10,2))) +
         SUM(CAST(COALESCE(other_deductions, 0) AS DECIMAL(10,2))) as total'
        );
    }

    protected function getActivityDescription(): string
    {
        return $this->check_number ? 'LDDAP '.$this->check_number : 'Check number not yet available';
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
     * @return Attribute<string, string>
     */
    protected function checkDate(): Attribute
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
    protected function totalAmount(): Attribute
    {
        return Attribute::make(
            get: function (): string {
                $fields = [
                    $this->net_amount,
                    $this->tax,
                    $this->retention,
                    $this->penalty,
                    $this->absences,
                    $this->other_deductions,
                ];

                $total = BigDecimal::zero();

                foreach ($fields as $value) {
                    if ($value !== null) {
                        $total = $total->plus(BigDecimal::of($value));
                    }
                }

                return $total->toScale(2, RoundingMode::HALF_UP)->__toString();
            }
        );
    }
}
