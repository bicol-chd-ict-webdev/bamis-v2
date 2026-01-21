<?php

declare(strict_types=1);

namespace App\Models;

use Database\Factories\ProgramFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property-read int $id
 * @property-read string $name
 * @property-read string $appropriation_source
 * @property-read string $code
 * @property-read int | null $program_classification_id
 * @property-read string |null $program_classification_name
 */
final class Program extends Model
{
    /** @use HasFactory<ProgramFactory> */
    use HasFactory;

    use SoftDeletes;

    protected $fillable = [
        'name',
        'appropriation_source',
        'code',
        'program_classification_id',
    ];

    protected $appends = ['program_classification_name'];

    /**
     * @return HasMany<Subprogram, covariant $this>
     */
    public function subprograms(): HasMany
    {
        return $this->hasMany(Subprogram::class);
    }

    /**
     * @return HasMany<Allocation, covariant $this>
     */
    public function allocations(): HasMany
    {
        return $this->hasMany(Allocation::class);
    }

    /**
     * @return BelongsTo<ProgramClassification, covariant $this>
     */
    public function programClassification(): BelongsTo
    {
        return $this->belongsTo(ProgramClassification::class);
    }

    /**
     * @noinspection PhpUnused
     *
     * @return Attribute<string|null, never>
     */
    protected function programClassificationName(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->programClassification?->name,
        );
    }
}
