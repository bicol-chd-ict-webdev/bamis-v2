<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\Allocation;

class AllocationObserver
{
    /**
     * Handle the Allocation "created" event.
     */
    public function created(Allocation $allocation): void
    {
        //
    }

    /**
     * Handle the Allocation "updated" event.
     */
    public function updated(Allocation $allocation): void
    {
        //
    }

    /**
     * Handle the Allocation "deleted" event.
     */
    public function deleted(Allocation $allocation): void
    {
        $allocation->objectDistributions()->delete();
        $allocation->officeAllotments()->delete();

        foreach ($allocation->obligations as $obligation) {
            $obligation->disbursements()->delete();
            $obligation->delete();
        }
    }

    /**
     * Handle the Allocation "restored" event.
     */
    public function restored(Allocation $allocation): void
    {
        //
    }

    /**
     * Handle the Allocation "force deleted" event.
     */
    public function forceDeleted(Allocation $allocation): void
    {
        //
    }
}
