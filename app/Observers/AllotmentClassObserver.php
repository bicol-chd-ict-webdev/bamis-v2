<?php

declare(strict_types=1);

namespace App\Observers;

use App\Jobs\AllotmentClassDeletionJob;
use App\Models\AllotmentClass;

class AllotmentClassObserver
{
    /**
     * Handle the AllotmentClass "created" event.
     */
    public function created(AllotmentClass $allotmentClass): void
    {
        //
    }

    /**
     * Handle the AllotmentClass "updated" event.
     */
    public function updated(AllotmentClass $allotmentClass): void
    {
        //
    }

    /**
     * Handle the AllotmentClass "deleted" event.
     */
    public function deleted(AllotmentClass $allotmentClass): void
    {
        AllotmentClassDeletionJob::dispatch($allotmentClass->id);
    }

    /**
     * Handle the AllotmentClass "restored" event.
     */
    public function restored(AllotmentClass $allotmentClass): void
    {
        //
    }

    /**
     * Handle the AllotmentClass "force deleted" event.
     */
    public function forceDeleted(AllotmentClass $allotmentClass): void
    {
        //
    }
}
