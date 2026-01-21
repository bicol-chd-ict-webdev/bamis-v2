<?php

declare(strict_types=1);

namespace App\Models;

use App\Casts\UppercaseCast;
use Database\Factories\DivisionFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property-read int $id
 * @property-read string $name
 * @property-read string $acronym
 * @property-read int | null $sections_count
 */
final class Division extends Model
{
    /** @use HasFactory<DivisionFactory> */
    use HasFactory;

    use SoftDeletes;

    protected $fillable = [
        'name',
        'acronym',
    ];

    protected $casts = [
        'acronym' => UppercaseCast::class,
    ];

    /**
     * @return HasMany<Section, covariant $this>
     */
    public function sections(): HasMany
    {
        return $this->hasMany(Section::class);
    }
}
