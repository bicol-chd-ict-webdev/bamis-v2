<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\Division;

class DivisionObserver
{
    /**
     * Handle the Division "created" event.
     */
    public function created(Division $division): void
    {
        //
    }

    /**
     * Handle the Division "updated" event.
     */
    public function updated(Division $division): void
    {
        //
    }

    /**
     * Handle the Division "deleted" event.
     */
    public function deleted(Division $division): void
    {
        $division->sections()->delete();
    }

    /**
     * Handle the Division "restored" event.
     */
    public function restored(Division $division): void
    {
        //
    }

    /**
     * Handle the Division "force deleted" event.
     */
    public function forceDeleted(Division $division): void
    {
        //
    }
}
