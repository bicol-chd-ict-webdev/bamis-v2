<?php

declare(strict_types=1);

namespace App\Http\Controllers\Budget\Reports;

use App\Enums\AppropriationSource;
use App\Http\Controllers\Controller;
use App\Models\Allocation;
use App\Services\RAO\Obligation\ObligationSheetWriterService;
use App\Services\RAO\RaoHeaderRendererService;
use App\Services\RAO\RaoHeadingRendererService;
use Carbon\CarbonImmutable;
use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Symfony\Component\HttpFoundation\StreamedResponse;

class RaoController extends Controller
{
    public function __construct(
        protected RaoHeaderRendererService $raoHeaderRendererService,
        protected RaoHeadingRendererService $raoHeadingRendererService,
        protected ObligationSheetWriterService $obligationSheetWriterService,
    ) {}

    public function generateSingleRao(Request $request): StreamedResponse
    {
        $allocation = Allocation::findOrFail($request->integer('allocation'));
        $year = (int) CarbonImmutable::parse($allocation->created_at)->format('Y');

        $appropriationAcronym = $allocation->appropriation_acronym ?? '';
        $lineItem = $allocation->line_item_name ?? '';
        $lineItemAcronym = $allocation->line_item_acronym ?? '';
        $allotmentClassAcronym = $allocation->allotment_class_acronym ?? '';
        $appropriationId = $allocation->appropriation_id ?? '';

        if ($appropriationId === 1) {
            $isRlip = $allocation->appropriation_source === AppropriationSource::AUTOMATIC;
            $title = $isRlip ? "{$lineItemAcronym}-RLIP" : "{$lineItemAcronym}-{$allotmentClassAcronym}";
        } elseif ($appropriationId === 2) {
            $saaNumber = mb_substr((string) $allocation->saa_number, -4);
            $title = "{$lineItemAcronym}-{$saaNumber}";
        } else {
            $saroNumber = mb_substr((string) $allocation->saro_number, -4);
            $title = "{$appropriationAcronym}-{$lineItemAcronym}-{$saroNumber}";
        }

        $spreadsheet = new Spreadsheet();
        $spreadsheet->getDefaultStyle()->getFont()->setName('Arial')->setSize(11);

        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle($title);

        // RAO Header
        $saaSaroNumber = $allocation->saa_number
            ? "SAA {$allocation->saa_number}"
            : ($allocation->saro_number ? "SARO-ROV-{$allocation->saro_number}" : null);
        $this->raoHeaderRendererService->render($sheet, $lineItem, $allotmentClassAcronym, $year, $saaSaroNumber);

        // Sheet Heading
        $this->raoHeadingRendererService->render($sheet);

        // Obligations data
        $this->obligationSheetWriterService->write($sheet, $allocation);

        $filename = "{$title}.xlsx";

        return response()->streamDownload(function () use ($spreadsheet): void {
            $writer = new Xlsx($spreadsheet);
            $writer->save('php://output');
        }, $filename, [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ]);
    }
}
