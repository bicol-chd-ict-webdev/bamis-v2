<?php

declare(strict_types=1);

namespace App\Models;

use App\Concerns\HasActivityLog;
use Database\Factories\ExpenditureFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

/**
 * @property-read int $id
 * @property-read string $name
 * @property-read string $code
 * @property-read int $allotment_class_id
 * @property-read string | null $allotment_class_name
 * @property-read int | null $obligations_count
 */
final class Expenditure extends Model
{
    use HasActivityLog;

    /** @use HasFactory<ExpenditureFactory> */
    use HasFactory;

    use LogsActivity;

    use SoftDeletes;

    protected $fillable = ['name', 'code', 'allotment_class_id'];

    protected $appends = ['allotment_class_name'];

    /**
     * @return BelongsTo<AllotmentClass, covariant $this>
     */
    public function allotmentClass(): BelongsTo
    {
        return $this->belongsTo(AllotmentClass::class);
    }

    /**
     * @return HasMany<ObjectDistribution, covariant $this>
     */
    public function objectDistributions(): HasMany
    {
        return $this->hasMany(ObjectDistribution::class);
    }

    protected function getActivityDescription(): string
    {
        return $this->name;
    }

    /**
     * @noinspection PhpUnused
     *
     * @return Attribute<string|null, never>
     */
    protected function allotmentClassName(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->allotmentClass?->name,
        );
    }
}
