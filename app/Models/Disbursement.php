<?php

declare(strict_types=1);

namespace App\Models;

use Brick\Math\BigDecimal;
use Brick\Math\RoundingMode;
use Carbon\CarbonImmutable;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property string $net_amount
 * @property string $date
 * @property int $obligation_id
 * @property ?string $check_date
 * @property ?string $check_number
 * @property ?string $tax
 * @property ?string $retention
 * @property ?string $penalty
 * @property ?string $absences
 * @property ?string $other_deductions
 * @property ?string $remarks
 * @property string $total_amount
 */
final class Disbursement extends Model
{
    use \Illuminate\Database\Eloquent\Factories\HasFactory;
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
