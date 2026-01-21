<?php

declare(strict_types=1);

namespace App\Models;

use App\Casts\UppercaseCast;
use Database\Factories\AllotmentClassFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property-read int $id
 * @property-read string $name
 * @property-read string $acronym
 * @property-read string $code
 * @property-read int | null $allocations_count
 * @property-read int | null $expenditures_count
 */
final class AllotmentClass extends Model
{
    /** @use HasFactory<AllotmentClassFactory> */
    use HasFactory;

    use SoftDeletes;

    protected $fillable = [
        'name',
        'acronym',
        'code',
    ];

    protected $casts = [
        'acronym' => UppercaseCast::class,
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
}
