<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Section extends Model
{
    use SoftDeletes;

    protected $fillable = ['name', 'acronym', 'code', 'division_id'];

    protected $appends = ['division_name'];

    public function getDivisionNameAttribute(): ?string
    {
        return $this->division?->name;
    }

    /**
     * @return BelongsTo<Division, covariant $this>
     */
    public function division(): BelongsTo
    {
        return $this->belongsTo(Division::class);
    }

    /**
     * @return Attribute<mixed, mixed>
     */
    protected function acronym(): Attribute
    {
        return new Attribute(
            set: fn (string $value): string => Str::upper($value),
        );
    }

    /**
     * @return Attribute<mixed, mixed>
     */
    protected function code(): Attribute
    {
        return new Attribute(
            set: fn (string $value): string => Str::upper($value),
        );
    }
}
