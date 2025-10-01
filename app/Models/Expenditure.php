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
 * @property string $name
 * @property string $code
 * @property int $allotment_class_id
 * @property ?string $allotment_class_name
 * @property ?int $obligations_count
 */
class Expenditure extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'code',
        'allotment_class_id',
    ];

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

    /**
     * @return Attribute<string|null, never>
     */
    protected function allotmentClassName(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->allotmentClass?->name,
        );
    }
}
