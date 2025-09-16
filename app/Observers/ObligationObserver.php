<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\Obligation;

class ObligationObserver
{
    /**
     * Handle the Obligation "created" event.
     */
    public function created(Obligation $obligation): void
    {
        //
    }

    /**
     * Handle the Obligation "updated" event.
     */
    public function updated(Obligation $obligation): void
    {
        //
    }

    /**
     * Handle the Obligation "deleted" event.
     */
    public function deleted(Obligation $obligation): void
    {
        $obligation->disbursements()->delete();
    }

    /**
     * Handle the Obligation "restored" event.
     */
    public function restored(Obligation $obligation): void
    {
        //
    }

    /**
     * Handle the Obligation "force deleted" event.
     */
    public function forceDeleted(Obligation $obligation): void
    {
        //
    }
}
