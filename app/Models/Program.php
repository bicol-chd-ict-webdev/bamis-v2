<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property string $name
 * @property string $appropriation_source
 * @property string|null $code
 * @property string|null $program_classification
 */
class Program extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'appropriation_source',
        'code',
        'program_classification',
    ];

    /**
     * @return HasMany<Subprogram, covariant $this>
     */
    public function subprograms(): HasMany
    {
        return $this->hasMany(Subprogram::class);
    }
}
