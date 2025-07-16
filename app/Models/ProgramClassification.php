<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property string $name
 * @property string $code
 */
class ProgramClassification extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'code',
    ];

    /**
     * @return HasMany<Program, covariant $this>
     */
    public function programs(): HasMany
    {
        return $this->hasMany(Program::class);
    }
}
