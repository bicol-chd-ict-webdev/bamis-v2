<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

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
     * @return Attribute<string|null, never>
     */
    protected function expenditureName(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->expenditure?->name,
        );
    }
}
