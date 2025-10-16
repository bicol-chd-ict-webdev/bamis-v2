<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property string $acronym
 * @property string $code
 * @property int $division_id
 * @property ?string $division_name
 * @property string $name
 */
final class Section extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'acronym',
        'code',
        'division_id',
    ];

    protected $appends = ['division_name'];

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
     * @return Attribute<string|null, never>
     */
    protected function divisionName(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->division?->name,
        );
    }

    /**
     * @return Attribute<string, string>
     */
    protected function acronym(): Attribute
    {
        return Attribute::make(
            set: fn (string $value): string => Str::upper($value),
        );
    }

    /**
     * @return Attribute<string, string>
     */
    protected function code(): Attribute
    {
        return Attribute::make(
            set: fn (string $value): string => Str::upper($value),
        );
    }
}
