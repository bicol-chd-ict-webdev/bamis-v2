<?php

declare(strict_types=1);

namespace App\Jobs;

use App\Events\ProgramDeleted;
use App\Models\Program;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;

final class ProgramDeletionJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(public int $programId) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $program = Program::withTrashed()->find($this->programId);

        if ($program) {
            DB::transaction(function () use ($program): void {
                $program->subprograms()->chunkById(100, function ($subprograms): void {
                    foreach ($subprograms as $subprogram) {
                        $subprogram->delete();
                    }
                });

                event(new ProgramDeleted($program));
            });
        }
    }
}
