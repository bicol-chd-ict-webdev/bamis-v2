<?php

declare(strict_types=1);

namespace App\Jobs;

use App\Enums\QueueStatusEnum;
use App\Enums\ReportTypesEnum;
use App\Events\ReportUpdated;
use App\Models\Report;
use App\Services\Reports\Excel\UtilizationByAllotmentClass\UtilizationByAllotmentClassDataBuilder;
use App\Services\Reports\Excel\UtilizationByAllotmentClass\UtilizationByAllotmentClassReportService;
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

/**
 * @phpstan-import-type UtilizationRow from UtilizationByAllotmentClassDataBuilder
 * @phpstan-import-type COData from UtilizationByAllotmentClassDataBuilder
 */
final class ProcessBurByAllotmentClassJob implements ShouldQueue
{
    use Dispatchable;

    use InteractsWithQueue;

    use Queueable;

    use SerializesModels;

    public int $timeout = 600;

    public int $tries = 3;

    public function __construct(
        public readonly string $date,
        public readonly string $filename,
    ) {}

    /**
     * @throws Throwable
     */
    public function handle(UtilizationByAllotmentClassReportService $reportService, UtilizationByAllotmentClassDataBuilder $dataBuilder): void
    {
        ini_set('max_execution_time', 0);

        $report = Report::query()->firstOrCreate(['filename' => $this->filename], [
            'type' => ReportTypesEnum::BUR_BY_ALLOTMENT_CLASS,
            'status' => QueueStatusEnum::QUEUED,
        ]);

        $report->update([
            'status' => QueueStatusEnum::PROCESSING,
            'error' => null,
        ]);
        broadcast(new ReportUpdated($report->fresh() ?? $report));

        try {
            $data = $dataBuilder->build();
            [$ps, $mooe, $co] = $data;

            /** @var array<string, array<int, UtilizationRow>> $ps */
            /** @var array<string, array<int, UtilizationRow>> $mooe */
            /** @var COData $co */
            $spreadsheet = $reportService->generate($this->date, $ps, $mooe, $co);

            $path = 'reports/'.$this->filename;
            $writer = new Xlsx($spreadsheet);

            Storage::makeDirectory('reports');
            $writer->save(Storage::path($path));

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
        } catch (Throwable $throwable) {
            $report->update([
                'status' => QueueStatusEnum::FAILED->value,
                'error' => $throwable->getMessage(),
            ]);

            broadcast(new ReportUpdated($report->fresh() ?? $report));
            throw $throwable;
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
