<?php

declare(strict_types=1);

namespace App\Contracts;

use App\Models\Obligation;
use Illuminate\Database\Eloquent\Collection;

interface AccountsPayableInterface
{
    /**
     * @return Collection<int, Obligation>
     */
    public function list(): Collection;
}
