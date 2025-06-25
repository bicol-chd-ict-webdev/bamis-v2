<?php

declare(strict_types=1);

namespace App\Jobs;

use App\Events\AllotmentClassDeleted;
use App\Models\AllotmentClass;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;

class AllotmentClassDeletionJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(public int $allotmentClassId) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $allotmentClass = AllotmentClass::withTrashed()->find($this->allotmentClassId);

        if ($allotmentClass) {
            DB::transaction(function () use ($allotmentClass): void {
                $allotmentClass->expenditures()->chunkById(100, function ($expenditures): void {
                    foreach ($expenditures as $expenditure) {
                        $expenditure->delete();
                    }
                });

                AllotmentClassDeleted::dispatch($allotmentClass);
            });
        }
    }
}
