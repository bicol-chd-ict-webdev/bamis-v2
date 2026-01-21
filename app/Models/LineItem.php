<?php

declare(strict_types=1);

namespace App\Models;

use App\Casts\UppercaseCast;
use Database\Factories\LineItemFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property-read int $id
 * @property-read string $name
 * @property-read string $acronym
 * @property-read string $code
 */
final class LineItem extends Model
{
    /** @use HasFactory<LineItemFactory> */
    use HasFactory;

    use SoftDeletes;

    protected $fillable = ['name', 'acronym', 'code'];

    protected $casts = [
        'acronym' => UppercaseCast::class,
    ];
}
