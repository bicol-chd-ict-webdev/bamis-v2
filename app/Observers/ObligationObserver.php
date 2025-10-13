<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\Obligation;

final class ObligationObserver
{
    /**
     * Handle the Obligation "created" event.
     */
    public function created(): void
    {
        //
    }

    /**
     * Handle the Obligation "updated" event.
     */
    public function updated(): void
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
    public function restored(): void
    {
        //
    }

    /**
     * Handle the Obligation "force deleted" event.
     */
    public function forceDeleted(): void
    {
        //
    }
}
