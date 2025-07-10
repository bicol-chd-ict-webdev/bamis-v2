<?php

declare(strict_types=1);

namespace App\Observers;

use App\Jobs\ProgramDeletionJob;
use App\Models\Program;

class ProgramObserver
{
    /**
     * Handle the Program "created" event.
     */
    public function created(Program $program): void
    {
        //
    }

    /**
     * Handle the Program "updated" event.
     */
    public function updated(Program $program): void
    {
        //
    }

    /**
     * Handle the Program "deleted" event.
     */
    public function deleted(Program $program): void
    {
        ProgramDeletionJob::dispatch($program->id);
    }

    /**
     * Handle the Program "restored" event.
     */
    public function restored(Program $program): void
    {
        //
    }

    /**
     * Handle the Program "force deleted" event.
     */
    public function forceDeleted(Program $program): void
    {
        //
    }
}
