<?php

declare(strict_types=1);

namespace App\Observers;

use App\Events\ExpenditureDeleted;
use App\Models\Expenditure;

final class ExpenditureObserver
{
    /**
     * Handle the Expenditure "created" event.
     */
    public function created(): void
    {
        //
    }

    /**
     * Handle the Expenditure "updated" event.
     */
    public function updated(): void
    {
        //
    }

    /**
     * Handle the Expenditure "deleted" event.
     */
    public function deleted(Expenditure $expenditure): void
    {
        event(new ExpenditureDeleted($expenditure));

        $expenditure->objectDistributions()->delete();
    }

    /**
     * Handle the Expenditure "restored" event.
     */
    public function restored(): void
    {
        //
    }

    /**
     * Handle the Expenditure "force deleted" event.
     */
    public function forceDeleted(): void
    {
        //
    }
}
