<?php

declare(strict_types=1);

namespace App\Observers;

use App\Jobs\ProgramDeletionJob;
use App\Models\Program;

final class ProgramObserver
{
    /**
     * Handle the Program "created" event.
     */
    public function created(): void
    {
        //
    }

    /**
     * Handle the Program "updated" event.
     */
    public function updated(): void
    {
        //
    }

    /**
     * Handle the Program "deleted" event.
     */
    public function deleted(Program $program): void
    {
        dispatch(new ProgramDeletionJob($program->id));
    }

    /**
     * Handle the Program "restored" event.
     */
    public function restored(): void
    {
        //
    }

    /**
     * Handle the Program "force deleted" event.
     */
    public function forceDeleted(): void
    {
        //
    }
}
