<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property string $amount
 * @property int $id
 * @property int $obligation_id
 */
class Due extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'amount',
        'obligation_id',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'obligation_id' => 'integer',
    ];

    /**
     * @return BelongsTo<Obligation, covariant $this>
     */
    public function obligation(): BelongsTo
    {
        return $this->belongsTo(Obligation::class);
    }
}
