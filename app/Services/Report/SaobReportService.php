<?php

declare(strict_types=1);

namespace App\Services\Report;

use App\Models\Allocation;
use App\Models\AllotmentClass;
use App\Models\Appropriation;
use App\Services\Excel\Appropriation\AppropriationGrandTotalRendererService;
use App\Services\Excel\Appropriation\AppropriationTotalRendererService;
use App\Services\Excel\AppropriationSource\AppropriationSourceRendererService;
use App\Services\Excel\LabelCodeRowRendererService;
use App\Services\Excel\LineItem\LineItemSheetRendererService;
use App\Services\Excel\RenderGroupedAllocations;
use App\Services\Excel\SaobHeader\SaobHeaderService;
use App\Services\Excel\SheetTotalWriterService;
use App\Services\Excel\Signatory\SignatoryService;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\File;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use RuntimeException;

class SaobReportService
{
    public function __construct(
        protected SaobHeaderService $saobHeaderService,
        protected AllocationGrouper $allocationGrouper,
        protected RenderGroupedAllocations $renderGroupedAllocations,
        protected LabelCodeRowRendererService $labelCodeRowRendererService,
        protected SheetTotalWriterService $sheetTotalWriterService,
        protected LineItemSheetRendererService $lineItemSheetRendererService,
        protected AppropriationSourceRendererService $appropriationSourceRendererService,
        protected AppropriationTotalRendererService $appropriationTotalRendererService,
        protected AppropriationGrandTotalRendererService $appropriationGrandTotalRendererService,
        protected SignatoryService $signatoryService,
    ) {}

    public function generate(string $date): string
    {
        // $carbonMonth = CarbonImmutable::parse("1 $month");
        // $monthNumber = $carbonMonth->month;

        // $asOfDate = CarbonImmutable::create($year, $monthNumber, 1);
        // if (! $asOfDate instanceof CarbonImmutable) {
        // throw new RuntimeException("Invalid date: $year-$monthNumber-01");
        // }
        // $asOfDate = $asOfDate->endOfMonth();

        // $formattedDate = $asOfDate->format('F d, Y');
        // $prevYear = $year - 1;

        $asOfDate = CarbonImmutable::parse("$date");
        $year = $asOfDate->year;

        $formattedDate = $asOfDate->format('F d, Y');
        $prevYear = $year - 1;

        $makeKey = fn (Allocation $allocation): string => match ($allocation->appropriation_id) {
            Appropriation::GENERAL_APPROPRIATION => "GAA {$year}",
            Appropriation::SUB_ALLOTMENT => "SAA NO. {$allocation->saa_number}",
            Appropriation::SPECIAL_ALLOTMENT => "SARO-ROV-{$allocation->saro_number}",
            default => 'UNSPECIFIED APPROPRIATION',
        };

        $allotmentClasses = AllotmentClass::all(['id', 'name']);
        $allAllotmentClasses = $allotmentClasses->pluck('name')->toArray();
        $conapAllotmentClasses = $allotmentClasses
            ->reject(fn ($class): bool => $class->id === 1)
            ->pluck('name')
            ->toArray();

        $currentAllocations = $this->allocationGrouper->getGroupedAllocations(
            Allocation::isCurrent(),
            $allAllotmentClasses,
            $makeKey,
            $date,
        );

        $conapAllocations = $this->allocationGrouper->getGroupedAllocations(
            Allocation::isConap(),
            $conapAllotmentClasses,
            $makeKey,
            $date,
        );

        $spreadsheet = new Spreadsheet();
        $spreadsheet->getDefaultStyle()->getFont()->setName('Cambria')->setSize(12);

        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('SAOB BICOL CHD');

        $this->saobHeaderService->render($sheet, $formattedDate, $year, $prevYear);

        $startRow = $row = 13;

        $currentAllotmentRowMap = [];
        $this->renderGroupedAllocations->render(
            $sheet,
            $currentAllocations,
            $allAllotmentClasses,
            $row,
            $currentAllotmentRowMap,
            $this->lineItemSheetRendererService,
            $this->labelCodeRowRendererService,
            $this->sheetTotalWriterService,
            $this->appropriationSourceRendererService
        );

        $row--;
        $this->appropriationTotalRendererService->render($sheet, $currentAllotmentRowMap, $row, 'CURRENT YEAR APPROPRIATIONS');

        $blackRow = $row;
        $sheet->getStyle("B{$blackRow}:AS{$blackRow}")->getFill()->setFillType(Fill::FILL_SOLID)->getStartColor()->setARGB('000000');
        $sheet->getStyle("B{$blackRow}:AS{$blackRow}")->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN);
        $row++;

        $conapAllotmentRowMap = [];
        $this->renderGroupedAllocations->render(
            $sheet,
            $conapAllocations,
            $conapAllotmentClasses,
            $row,
            $conapAllotmentRowMap,
            $this->lineItemSheetRendererService,
            $this->labelCodeRowRendererService,
            $this->sheetTotalWriterService,
            $this->appropriationSourceRendererService
        );

        $row--;
        $this->appropriationTotalRendererService->render($sheet, $conapAllotmentRowMap, $row, 'CONTINUING APPROPRIATIONS');

        $endRow = $row - 1;
        $sheet->getStyle("B{$startRow}:AS{$endRow}")->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN);
        $sheet->getStyle("B{$startRow}:AS{$endRow}")->getAlignment()->setVertical(Alignment::VERTICAL_CENTER);

        $this->appropriationGrandTotalRendererService->render($sheet, $currentAllotmentRowMap, $conapAllotmentRowMap, $row);

        $row++;
        $this->signatoryService->render($sheet, $row);

        $filename = "SAOB CY {$year} Bicol CHD as of {$formattedDate}.xlsx";

        $folderPath = storage_path("app/private/saob-report/{$year}");

        if (! File::exists($folderPath)) {
            File::makeDirectory($folderPath, 0755, true);
        }

        $filePath = "{$folderPath}/{$filename}";

        (new Xlsx($spreadsheet))->save($filePath);

        return $filePath;
    }
}
