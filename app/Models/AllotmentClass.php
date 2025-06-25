<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class AllotmentClass extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'acronym',
        'code',
    ];

    /**
     * @return HasMany<Expenditure, covariant $this>
     */
    public function expenditures(): HasMany
    {
        return $this->hasMany(Expenditure::class);
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
