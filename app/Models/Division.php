<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Division extends Model
{
    use SoftDeletes;

    protected $fillable = ['name', 'acronym'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany<Section, covariant $this>
     */
    public function sections(): HasMany
    {
        return $this->hasMany(Section::class);
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
}
