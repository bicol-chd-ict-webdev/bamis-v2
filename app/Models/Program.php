<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property string $name
 * @property string $appropriation_source
 * @property string|null $code
 * @property string|null $prexc
 */
class Program extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'appropriation_source',
        'code',
        'prexc',
    ];
}
