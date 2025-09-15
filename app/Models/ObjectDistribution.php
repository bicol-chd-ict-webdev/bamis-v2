<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\NorsaType;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use RuntimeException;

/**
 * @property int $id
 * @property int $allocation_id
 * @property int $expenditure_id
 * @property ?string $expenditure_name
 * @property string $amount
 * @property ?int $obligations_count
 */
class ObjectDistribution extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'allocation_id',
        'expenditure_id',
        'amount',
    ];

    protected $appends = ['expenditure_name'];

    /**
     * @return BelongsTo<Allocation, covariant $this>
     */
    public function allocation(): BelongsTo
    {
        return $this->belongsTo(Allocation::class);
    }

    /**
     * @return BelongsTo<Expenditure, covariant $this>
     */
    public function expenditure(): BelongsTo
    {
        return $this->belongsTo(Expenditure::class);
    }

    /**
     * @return HasMany<Obligation, covariant $this>
     */
    public function obligations(): HasMany
    {
        return $this->hasMany(Obligation::class);
    }

    /**
     * @return Collection<string, float>
     */
    public function obligationsSumPerMonth(int $year, int $month): Collection
    {
        $cutoff = $this->createDateOrFail($year, $month)->endOfMonth();

        /** @var Collection<string, float|int> $dbResults */
        $dbResults = $this->obligations()
            ->where('is_transferred', false)
            ->where('norsa_type', NorsaType::CURRENT->value)
            ->whereDate('date', '<=', $cutoff->toDateString())
            ->selectRaw("DATE_FORMAT(date, '%Y-%m') as month, SUM(amount) as total")
            ->groupBy(DB::raw("DATE_FORMAT(date, '%Y-%m')"))
            ->pluck('total', 'month');

        /** @var Collection<string, float> $filled */
        $filled = collect();
        $start = $this->createDateOrFail($year, 1);

        while ($start->lte($cutoff)) {
            $key = $start->format('Y-m');
            $filled[$key] = (float) ($dbResults[$key] ?? 0);
            $start = $start->addMonth();
        }

        return $filled;
    }

    /**
     * @return Collection<string, float>
     */
    public function disbursementsSumPerMonth(int $year, int $month): Collection
    {
        $cutoff = $this->createDateOrFail($year, $month)->endOfMonth();

        /** @var Collection<string, float|int> $dbResults */
        $dbResults = $this->hasManyThrough(Disbursement::class, Obligation::class)
            ->whereDate('disbursements.date', '<=', $cutoff->toDateString())
            ->selectRaw("
                DATE_FORMAT(disbursements.date, '%Y-%m') as month,
                SUM(
                    disbursements.net_amount +
                    COALESCE(disbursements.tax, 0) +
                    COALESCE(disbursements.retention, 0) +
                    COALESCE(disbursements.penalty, 0) +
                    COALESCE(disbursements.absences, 0) +
                    COALESCE(disbursements.other_deductions, 0)
                ) as total
            ")
            ->groupBy(DB::raw("DATE_FORMAT(disbursements.date, '%Y-%m')"))
            ->pluck('total', 'month');

        /** @var Collection<string, float> $filled */
        $filled = collect();
        $start = $this->createDateOrFail($year, 1);

        while ($start->lte($cutoff)) {
            $key = $start->format('Y-m');
            $filled[$key] = (float) ($dbResults[$key] ?? 0);
            $start = $start->addMonth();
        }

        return $filled;
    }

    /**
     * @return Attribute<string|null, never>
     */
    protected function expenditureName(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->expenditure?->name,
        );
    }

    /**
     * Safely create a CarbonImmutable date or throw if invalid.
     */
    private function createDateOrFail(int $year, int $month, int $day = 1): CarbonImmutable
    {
        return CarbonImmutable::create($year, $month, $day)
            ?? throw new RuntimeException("Invalid date: $year-$month-$day");
    }
}
