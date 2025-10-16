<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\ObjectDistribution;

final class ObjectDistributionObserver
{
    /**
     * Handle the ObjectDistribution "created" event.
     */
    public function created(): void
    {
        //
    }

    /**
     * Handle the ObjectDistribution "updated" event.
     */
    public function updated(): void
    {
        //
    }

    /**
     * Handle the ObjectDistribution "deleted" event.
     */
    public function deleted(ObjectDistribution $objectDistribution): void
    {
        foreach ($objectDistribution->obligations as $obligation) {
            $obligation->disbursements()->delete();
            $obligation->delete();
        }
    }

    /**
     * Handle the ObjectDistribution "restored" event.
     */
    public function restored(): void
    {
        //
    }

    /**
     * Handle the ObjectDistribution "force deleted" event.
     */
    public function forceDeleted(): void
    {
        //
    }
}
