<?php

declare(strict_types=1);

namespace App\Observers;

use App\Jobs\AllotmentClassDeletionJob;
use App\Models\AllotmentClass;

final class AllotmentClassObserver
{
    /**
     * Handle the AllotmentClass "created" event.
     */
    public function created(): void
    {
        //
    }

    /**
     * Handle the AllotmentClass "updated" event.
     */
    public function updated(): void
    {
        //
    }

    /**
     * Handle the AllotmentClass "deleted" event.
     */
    public function deleted(AllotmentClass $allotmentClass): void
    {
        dispatch(new AllotmentClassDeletionJob($allotmentClass->id));
    }

    /**
     * Handle the AllotmentClass "restored" event.
     */
    public function restored(): void
    {
        //
    }

    /**
     * Handle the AllotmentClass "force deleted" event.
     */
    public function forceDeleted(): void
    {
        //
    }
}
