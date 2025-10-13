<?php

declare(strict_types=1);

namespace App\Models;

use Database\Factories\OfficeAllotmentFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property string $amount
 * @property int $allocation_id
 * @property int $section_id
 * @property ?string $section_name
 * @property ?string $section_acronym
 * @property ?int $obligations_count
 * @property string $wfp_code
 * @property ?string $wfp_prefix_code
 * @property string $wfp_suffix_code
 */
final class OfficeAllotment extends Model
{
    /** @use HasFactory<OfficeAllotmentFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'amount',
        'wfp_prefix_code',
        'wfp_suffix_code',
        'allocation_id',
        'section_id',
    ];

    protected $appends = ['section_name', 'section_acronym', 'wfp_code'];

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
     * @return HasMany<Obligation, covariant $this>
     */
    public function obligations(): HasMany
    {
        return $this->hasMany(Obligation::class);
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

    /**
     * @return Attribute<string|null, never>
     */
    protected function sectionAcronym(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->section?->acronym,
        );
    }

    /**
     * @return Attribute<string|null, never>
     */
    protected function wfpCode(): Attribute
    {
        return Attribute::make(
            get: fn (): string => ($this->wfp_prefix_code ? "{$this->wfp_prefix_code}-" : '')
                ."{$this->section?->code}.{$this->wfp_suffix_code}",
        );
    }
}
