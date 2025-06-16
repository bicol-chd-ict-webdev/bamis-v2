<?php

declare(strict_types=1);

namespace App\Actions\Administrator\Division;

use App\Contracts\DivisionInterface;
use App\Models\Division;

class UpdateDivision
{
    public function __construct(private readonly DivisionInterface $divisionInterface) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(Division $division, array $attributes): void
    {
        $this->divisionInterface->update($division, $attributes);
    }
}
