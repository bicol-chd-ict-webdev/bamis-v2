<?php

declare(strict_types=1);

namespace App\Models;

use App\Concerns\HasActivityLog;
use Database\Factories\SubprogramFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

/**
 * @property-read int $id
 * @property-read string $name
 * @property-read string $code
 * @property-read int $program_id
 * @property-read string | null $program_name
 */
final class Subprogram extends Model
{
    use HasActivityLog;

    /** @use HasFactory<SubprogramFactory> */
    use HasFactory;

    use LogsActivity;

    use SoftDeletes;

    protected $fillable = ['name', 'code', 'program_id'];

    protected $appends = ['program_name'];

    /**
     * @return BelongsTo<Program, covariant $this>
     */
    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }

    /**
     * @return HasMany<Allocation, covariant $this>
     */
    public function allocations(): HasMany
    {
        return $this->hasMany(Allocation::class);
    }

    protected function getActivityDescription(): string
    {
        return $this->name;
    }

    /**
     * @noinspection PhpUnused
     *
     * @return Attribute<string|null, never>
     */
    protected function programName(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->program?->name,
        );
    }
}
