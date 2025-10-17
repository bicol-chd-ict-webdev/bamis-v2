<?php

declare(strict_types=1);

use App\Console\Commands\CleanUpExpiredReports;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function (): void {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::command(CleanUpExpiredReports::class)->daily();
Schedule::command('github:fetch-latest-release')->daily()->withoutOverlapping();
