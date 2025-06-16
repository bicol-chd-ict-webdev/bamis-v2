<?php

declare(strict_types=1);

namespace App\Actions\Administrator\Division;

use App\Contracts\DivisionInterface;
use App\Models\Division;

class DeleteDivision
{
    public function __construct(private readonly DivisionInterface $divisionInterface) {}

    public function handle(Division $division): void
    {
        $this->divisionInterface->delete($division);
    }
}
