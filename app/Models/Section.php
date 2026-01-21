<?php

declare(strict_types=1);

namespace App\Models;

use App\Casts\UppercaseCast;
use Database\Factories\SectionFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property-read int $id
 * @property-read string $acronym
 * @property-read string $code
 * @property-read int $division_id
 * @property-read string | null $division_name
 * @property-read string $name
 */
final class Section extends Model
{
    /** @use HasFactory<SectionFactory> */
    use HasFactory;

    use SoftDeletes;

    protected $fillable = [
        'name',
        'acronym',
        'code',
        'division_id',
    ];

    protected $appends = ['division_name'];

    protected $casts = [
        'division_id' => 'integer',
        'acronym' => UppercaseCast::class,
        'code' => UppercaseCast::class,
    ];

    /**
     * @return BelongsTo<Division, covariant $this>
     */
    public function division(): BelongsTo
    {
        return $this->belongsTo(Division::class);
    }

    /**
     * @return HasMany<OfficeAllotment, covariant $this>
     */
    public function officeAllotments(): HasMany
    {
        return $this->hasMany(OfficeAllotment::class);
    }

    /**
     * @noinspection PhpUnused
     *
     * @return Attribute<string|null, never>
     */
    protected function divisionName(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->division?->name,
        );
    }
}
