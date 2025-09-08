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
 */
class ProjectType extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'code',
    ];

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
    protected function name(): Attribute
    {
        return Attribute::make(
            set: fn (string $value): string => Str::upper($value),
        );
    }
}
