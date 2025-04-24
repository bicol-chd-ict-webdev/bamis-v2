<?php

declare(strict_types=1);

namespace App\Actions\Division;

class DeleteDivision
{
    /**
     * @param  \App\Models\Division  $division
     */
    public function handle($division): void
    {
        $division->delete();
    }
}
