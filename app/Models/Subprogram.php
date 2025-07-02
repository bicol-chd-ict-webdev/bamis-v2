<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property string $name
 * @property int $program_id
 * @property string $program_name
 */
class Subprogram extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'program_id',
    ];

    protected $appends = ['program_name'];

    /**
     * @return BelongsTo<Program, covariant $this>
     */
    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }

    /**
     * @return Attribute<string|null, never>
     */
    protected function programName(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->program?->name,
        );
    }
}
