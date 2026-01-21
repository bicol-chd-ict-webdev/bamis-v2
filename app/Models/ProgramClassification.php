<?php

declare(strict_types=1);

namespace App\Models;

use Database\Factories\ProgramClassificationFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property-read int $id
 * @property-read string $name
 * @property-read string $code
 */
final class ProgramClassification extends Model
{
    /** @use HasFactory<ProgramClassificationFactory> */
    use HasFactory;

    use SoftDeletes;

    protected $fillable = ['name', 'code'];

    /**
     * @return HasMany<Program, covariant $this>
     */
    public function programs(): HasMany
    {
        return $this->hasMany(Program::class);
    }

    /**
     * @return HasMany<Allocation, covariant $this>
     */
    public function allocations(): HasMany
    {
        return $this->hasMany(Allocation::class);
    }
}
