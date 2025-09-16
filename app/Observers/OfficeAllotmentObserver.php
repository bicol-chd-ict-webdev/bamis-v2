<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\OfficeAllotment;

class OfficeAllotmentObserver
{
    /**
     * Handle the OfficeAllotment "created" event.
     */
    public function created(OfficeAllotment $officeAllotment): void
    {
        //
    }

    /**
     * Handle the OfficeAllotment "updated" event.
     */
    public function updated(OfficeAllotment $officeAllotment): void
    {
        //
    }

    /**
     * Handle the OfficeAllotment "deleted" event.
     */
    public function deleted(OfficeAllotment $officeAllotment): void
    {
        foreach ($officeAllotment->obligations as $obligation) {
            $obligation->disbursements()->delete();
            $obligation->delete();
        }
    }

    /**
     * Handle the OfficeAllotment "restored" event.
     */
    public function restored(OfficeAllotment $officeAllotment): void
    {
        //
    }

    /**
     * Handle the OfficeAllotment "force deleted" event.
     */
    public function forceDeleted(OfficeAllotment $officeAllotment): void
    {
        //
    }
}
