<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LineItem extends Model
{
    use SoftDeletes;

    protected $fillable = ['name', 'acronym', 'code'];
}
