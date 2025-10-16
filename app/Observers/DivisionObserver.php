<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\Division;

final class DivisionObserver
{
    /**
     * Handle the Division "created" event.
     */
    public function created(): void
    {
        //
    }

    /**
     * Handle the Division "updated" event.
     */
    public function updated(): void
    {
        //
    }

    /**
     * Handle the Division "deleted" event.
     */
    public function deleted(Division $division): void
    {
        $division->sections()->delete();
    }

    /**
     * Handle the Division "restored" event.
     */
    public function restored(): void
    {
        //
    }

    /**
     * Handle the Division "force deleted" event.
     */
    public function forceDeleted(): void
    {
        //
    }
}
