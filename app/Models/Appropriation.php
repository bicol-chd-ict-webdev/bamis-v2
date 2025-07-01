<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\AppropriationSource;
use App\Enums\ProgramClassification;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property string $name
 * @property string $acronym
 */
class Appropriation extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'acronym',
    ];

    protected $casts = [
        'program_classification' => ProgramClassification::class,
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
