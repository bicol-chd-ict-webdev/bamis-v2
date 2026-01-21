<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Report;
use Carbon\CarbonImmutable;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

final class CleanUpExpiredReports extends Command
{
    protected $signature = 'reports:cleanup';

    protected $description = 'Delete expired reports and their files from storage';

    public function handle(): int
    {
        $expiredReports = Report::query()->where('expires_at', '<', CarbonImmutable::now())->get();

        if ($expiredReports->isEmpty()) {
            $this->info('No expired reports found.');

            return self::SUCCESS;
        }

        foreach ($expiredReports as $report) {
            if ($report->filename && Storage::exists('reports/'.$report->filename)) {
                Storage::delete('reports/'.$report->filename);
                $this->info('Deleted file: '.$report->filename);
            }

            $report->delete();
            $this->info('Deleted database record for: '.$report->filename);
        }

        return self::SUCCESS;
    }
}
