<?php

declare(strict_types=1);

namespace App\Observers;

use App\Events\ExpenditureDeleted;
use App\Models\Expenditure;

class ExpenditureObserver
{
    /**
     * Handle the Expenditure "created" event.
     */
    public function created(Expenditure $expenditure): void
    {
        //
    }

    /**
     * Handle the Expenditure "updated" event.
     */
    public function updated(Expenditure $expenditure): void
    {
        //
    }

    /**
     * Handle the Expenditure "deleted" event.
     */
    public function deleted(Expenditure $expenditure): void
    {
        ExpenditureDeleted::dispatch($expenditure);

        $expenditure->objectDistributions()->delete();
    }

    /**
     * Handle the Expenditure "restored" event.
     */
    public function restored(Expenditure $expenditure): void
    {
        //
    }

    /**
     * Handle the Expenditure "force deleted" event.
     */
    public function forceDeleted(Expenditure $expenditure): void
    {
        //
    }
}
