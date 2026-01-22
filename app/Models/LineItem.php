<?php

declare(strict_types=1);

namespace App\Models;

use App\Casts\UppercaseCast;
use App\Concerns\HasActivityLog;
use Database\Factories\LineItemFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

/**
 * @property-read int $id
 * @property-read string $name
 * @property-read string $acronym
 * @property-read string $code
 */
final class LineItem extends Model
{
    use HasActivityLog;

    /** @use HasFactory<LineItemFactory> */
    use HasFactory;

    use LogsActivity;

    use SoftDeletes;

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

    protected function getActivityDescription(): string
    {
        return $this->name;
    }
}
