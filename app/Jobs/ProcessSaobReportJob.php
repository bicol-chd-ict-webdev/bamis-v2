<?php

declare(strict_types=1);

namespace App\Jobs;

use App\Enums\QueueStatusEnum;
use App\Enums\ReportTypesEnum;
use App\Events\ReportUpdated;
use App\Models\Report;
use App\Services\Reports\Excel\SAOB\SaobReportService;
use Carbon\CarbonImmutable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Throwable;

final class ProcessSaobReportJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $timeout = 600;

    public int $tries = 3;

    public function __construct(
        public readonly string $date,
        public readonly string $filename,
    ) {}

    /**
     * Execute the job.
     */
    public function handle(SaobReportService $saobReportService): void
    {
        ini_set('max_execution_time', 0);

        $report = Report::query()->firstOrCreate(['filename' => $this->filename], [
            'type' => ReportTypesEnum::SAOB,
            'status' => QueueStatusEnum::QUEUED,
        ]);

        $report->update([
            'status' => QueueStatusEnum::PROCESSING,
            'error' => null,
        ]);
        broadcast(new ReportUpdated($report->fresh() ?? $report));

        try {
            $spreadsheet = $saobReportService->generate($this->date);

            $relativePath = "reports/{$this->filename}";
            Storage::makeDirectory('reports');

            $writer = new Xlsx($spreadsheet);
            $writer->save(Storage::path($relativePath));

            $expiresAt = CarbonImmutable::now()->addMonth();
            $downloadUrl = URL::temporarySignedRoute(
                'budget.reports.download',
                $expiresAt,
                ['filename' => $this->filename]
            );

            $report->update([
                'status' => QueueStatusEnum::COMPLETED->value,
                'download_link' => $downloadUrl,
                'expires_at' => $expiresAt,
            ]);

            broadcast(new ReportUpdated($report->fresh() ?? $report, $downloadUrl));
        } catch (Throwable $e) {
            $report->update([
                'status' => QueueStatusEnum::FAILED->value,
                'error' => $e->getMessage(),
            ]);

            broadcast(new ReportUpdated($report->fresh() ?? $report));
            throw $e;
        }
    }

    /**
     * Handle the job failure after max retries or fatal timeout.
     */
    public function failed(Throwable $exception): void
    {
        // Mark as failed if it wasn't already
        $report = Report::query()->where('filename', $this->filename)->first();

        if ($report) {
            $report->update([
                'status' => QueueStatusEnum::FAILED->value,
                'error' => $exception->getMessage(),
            ]);

            broadcast(new ReportUpdated($report->fresh() ?? $report));
        }
    }
}
