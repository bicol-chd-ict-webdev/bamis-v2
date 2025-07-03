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
 * @property string $acronym
 * @property ?string $code
 * @property ?int $allocations_count
 * @property ?int $expenditures_count
 */
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
     * @return HasMany<Allocation, covariant $this>
     */
    public function allocations(): HasMany
    {
        return $this->hasMany(Allocation::class);
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
