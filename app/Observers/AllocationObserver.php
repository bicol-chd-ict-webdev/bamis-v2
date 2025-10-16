<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\Allocation;

final class AllocationObserver
{
    /**
     * Handle the Allocation "created" event.
     */
    public function created(): void
    {
        //
    }

    /**
     * Handle the Allocation "updated" event.
     */
    public function updated(): void
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
    public function restored(): void
    {
        //
    }

    /**
     * Handle the Allocation "force deleted" event.
     */
    public function forceDeleted(): void
    {
        //
    }
}
