<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\ObjectDistribution;

class ObjectDistributionObserver
{
    /**
     * Handle the ObjectDistribution "created" event.
     */
    public function created(ObjectDistribution $objectDistribution): void
    {
        //
    }

    /**
     * Handle the ObjectDistribution "updated" event.
     */
    public function updated(ObjectDistribution $objectDistribution): void
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
    public function restored(ObjectDistribution $objectDistribution): void
    {
        //
    }

    /**
     * Handle the ObjectDistribution "force deleted" event.
     */
    public function forceDeleted(ObjectDistribution $objectDistribution): void
    {
        //
    }
}
