<?php

declare(strict_types=1);

namespace App\Models;

use App\Casts\UppercaseCast;
use Database\Factories\ProjectTypeFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property-read int $id
 * @property-read string $name
 * @property-read string $code
 */
final class ProjectType extends Model
{
    /** @use HasFactory<ProjectTypeFactory> */
    use HasFactory;

    use SoftDeletes;

    protected $fillable = ['name', 'code'];

    protected $casts = [
        'name' => UppercaseCast::class,
    ];

    /**
     * @return HasMany<Allocation, covariant $this>
     */
    public function allocations(): HasMany
    {
        return $this->hasMany(Allocation::class);
    }
}
