<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property int $allocation_id
 * @property int $section_id
 * @property ?string $section_name
 * @property string $amount
 */
class OfficeAllotment extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'amount',
        'allocation_id',
        'section_id',
    ];

    protected $appends = ['section_name'];

    /**
     * @return BelongsTo<Allocation, covariant $this>
     */
    public function allocation(): BelongsTo
    {
        return $this->belongsTo(Allocation::class);
    }

    /**
     * @return BelongsTo<Section, covariant $this>
     */
    public function section(): BelongsTo
    {
        return $this->belongsTo(Section::class);
    }

    /**
     * @return Attribute<string|null, never>
     */
    protected function sectionName(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->section?->name,
        );
    }
}
