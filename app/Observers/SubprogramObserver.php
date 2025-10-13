<?php

declare(strict_types=1);

namespace App\Observers;

use App\Events\SubprogramDeleted;
use App\Models\Subprogram;

final class SubprogramObserver
{
    /**
     * Handle the Subprogram "created" event.
     */
    public function created(): void
    {
        //
    }

    /**
     * Handle the Subprogram "updated" event.
     */
    public function updated(): void
    {
        //
    }

    /**
     * Handle the Subprogram "deleted" event.
     */
    public function deleted(Subprogram $subprogram): void
    {
        event(new SubprogramDeleted($subprogram));
    }

    /**
     * Handle the Subprogram "restored" event.
     */
    public function restored(): void
    {
        //
    }

    /**
     * Handle the Subprogram "force deleted" event.
     */
    public function forceDeleted(): void
    {
        //
    }
}
