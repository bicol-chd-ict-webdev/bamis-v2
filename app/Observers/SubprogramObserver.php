<?php

declare(strict_types=1);

namespace App\Observers;

use App\Events\SubprogramDeleted;
use App\Models\Subprogram;

class SubprogramObserver
{
    /**
     * Handle the Subprogram "created" event.
     */
    public function created(Subprogram $subprogram): void
    {
        //
    }

    /**
     * Handle the Subprogram "updated" event.
     */
    public function updated(Subprogram $subprogram): void
    {
        //
    }

    /**
     * Handle the Subprogram "deleted" event.
     */
    public function deleted(Subprogram $subprogram): void
    {
        SubprogramDeleted::dispatch($subprogram);
    }

    /**
     * Handle the Subprogram "restored" event.
     */
    public function restored(Subprogram $subprogram): void
    {
        //
    }

    /**
     * Handle the Subprogram "force deleted" event.
     */
    public function forceDeleted(Subprogram $subprogram): void
    {
        //
    }
}
