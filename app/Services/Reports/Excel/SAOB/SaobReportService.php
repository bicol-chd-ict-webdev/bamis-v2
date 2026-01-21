<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB;

use App\Models\Allocation;
use App\Models\AllotmentClass;
use App\Models\Appropriation;
use App\Services\Reports\Excel\SAOB\Appropriation\AppropriationGrandTotalRendererService;
use App\Services\Reports\Excel\SAOB\Appropriation\AppropriationTotalRendererService;
use App\Services\Reports\Excel\SAOB\AppropriationSource\AppropriationSourceRendererService;
use App\Services\Reports\Excel\SAOB\LineItem\LineItemSheetRendererService;
use App\Services\Reports\Excel\SAOB\SaobHeader\SaobHeaderService;
use App\Services\Reports\Excel\SAOB\Signatory\SignatoryService;
use Carbon\CarbonImmutable;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;

final readonly class SaobReportService
{
    public function __construct(
        private SaobHeaderService $saobHeaderService,
        private AllocationGrouper $allocationGrouper,
        private RenderGroupedAllocations $renderGroupedAllocations,
        private LabelCodeRowRendererService $labelCodeRowRendererService,
        private SheetTotalWriterService $sheetTotalWriterService,
        private LineItemSheetRendererService $lineItemSheetRendererService,
        private AppropriationSourceRendererService $appropriationSourceRendererService,
        private AppropriationTotalRendererService $appropriationTotalRendererService,
        private AppropriationGrandTotalRendererService $appropriationGrandTotalRendererService,
        private SignatoryService $signatoryService,
    ) {}

    /**
     * Generate the SAOB report and return the in-memory Spreadsheet instance.
     */
    public function generate(string $date): Spreadsheet
    {
        $asOfDate = CarbonImmutable::parse($date);
        $year = $asOfDate->year;
        $formattedDate = $asOfDate->format('F d, Y');
        $prevYear = $year - 1;

        $makeKey = fn (Allocation $allocation): string => match ($allocation->appropriation_id) {
            Appropriation::GENERAL_APPROPRIATION => $allocation->appropriation_type_id === 2 ? 'GAA '.$prevYear : 'GAA '.$year,
            Appropriation::SUB_ALLOTMENT => 'SAA NO. '.$allocation->saa_number,
            Appropriation::SPECIAL_ALLOTMENT => 'SARO-ROV-'.$allocation->saro_number,
            default => 'UNSPECIFIED APPROPRIATION',
        };

        $allotmentClasses = AllotmentClass::all(['id', 'name']);
        /** @var array<int, string> $allAllotmentClasses */
        $allAllotmentClasses = $allotmentClasses->pluck('name')->toArray();
        /** @var array<int, string> $conapAllotmentClasses */
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
        $startRow = 13;
        $row = 13;

        /** @var array<string, array<int, int|string>> $currentAllotmentRowMap */
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
            $this->appropriationSourceRendererService,
        );

        $row--;
        $this->appropriationTotalRendererService->render($sheet, $currentAllotmentRowMap, $row, 'CURRENT YEAR APPROPRIATIONS');

        $blackRow = $row;
        $sheet->getStyle(sprintf('B%d:AS%d', $blackRow, $blackRow))
            ->getFill()->setFillType(Fill::FILL_SOLID)
            ->getStartColor()->setARGB('000000');
        $sheet->getStyle(sprintf('B%d:AS%d', $blackRow, $blackRow))
            ->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN);
        $row++;

        /** @var array<string, array<int, int|string>> $conapAllotmentRowMap */
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
            $this->appropriationSourceRendererService,
        );

        $row--;
        $this->appropriationTotalRendererService->render($sheet, $conapAllotmentRowMap, $row, 'CONTINUING APPROPRIATIONS');

        $endRow = $row - 1;
        $sheet->getStyle(sprintf('B%d:AS%d', $startRow, $endRow))
            ->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN);
        $sheet->getStyle(sprintf('B%d:AS%d', $startRow, $endRow))
            ->getAlignment()->setVertical(Alignment::VERTICAL_CENTER);

        $this->appropriationGrandTotalRendererService->render($sheet, $currentAllotmentRowMap, $conapAllotmentRowMap, $row);

        $row++;
        $this->signatoryService->render($sheet, $row);

        return $spreadsheet;
    }
}
