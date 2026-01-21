<?php

declare(strict_types=1);

namespace App\Models;

use App\Casts\UppercaseCast;
use Database\Factories\AppropriationTypeFactory;
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
 */
final class AppropriationType extends Model
{
    /** @use HasFactory<AppropriationTypeFactory> */
    use HasFactory;

    use SoftDeletes;

    public const int CURRENT = 1;

    public const int CONAP = 2;

    protected $fillable = ['name', 'acronym', 'code'];

    protected $casts = [
        'acronym' => UppercaseCast::class,
    ];

    /**
     * @return HasMany<Allocation, covariant $this>
     */
    public function allocations(): HasMany
    {
        return $this->hasMany(Allocation::class);
    }
}
