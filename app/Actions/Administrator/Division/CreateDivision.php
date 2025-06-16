<?php

declare(strict_types=1);

namespace App\Actions\Administrator\Division;

use App\Contracts\DivisionInterface;

class CreateDivision
{
    public function __construct(private readonly DivisionInterface $divisionInterface) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): void
    {
        $this->divisionInterface->create($attributes);
    }
}
