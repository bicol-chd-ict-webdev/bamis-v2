<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\AppropriationSource;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property string $name
 * @property string $acronym
 */
final class Appropriation extends Model
{
    use SoftDeletes;

    public const GENERAL_APPROPRIATION = 1;

    public const SUB_ALLOTMENT = 2;

    public const SPECIAL_ALLOTMENT = 3;

    protected $fillable = [
        'name',
        'acronym',
    ];

    protected $casts = [
        'appropriation_source' => AppropriationSource::class,
    ];

    /**
     * @return Attribute<string, string>
     */
    protected function acronym(): Attribute
    {
        return Attribute::make(
            set: fn (string $value): string => Str::upper($value),
        );
    }
}
