<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property string $name
 * @property string $code
 * @property string $acronym
 * @property ?int $sections_count
 */
class Division extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'acronym',
    ];

    /**
     * @return HasMany<Section, covariant $this>
     */
    public function sections(): HasMany
    {
        return $this->hasMany(Section::class);
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
}
