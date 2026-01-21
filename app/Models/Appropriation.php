<?php

declare(strict_types=1);

namespace App\Models;

use App\Casts\UppercaseCast;
use App\Enums\AppropriationSourceEnum;
use Database\Factories\AppropriationFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property-read int $id
 * @property-read string $name
 * @property-read string $acronym
 */
final class Appropriation extends Model
{
    /** @use HasFactory<AppropriationFactory> */
    use HasFactory;

    use SoftDeletes;

    public const int GENERAL_APPROPRIATION = 1;

    public const int SUB_ALLOTMENT = 2;

    public const int SPECIAL_ALLOTMENT = 3;

    protected $fillable = ['name', 'acronym'];

    protected $casts = [
        'appropriation_source' => AppropriationSourceEnum::class,
        'acronym' => UppercaseCast::class,
    ];
}
