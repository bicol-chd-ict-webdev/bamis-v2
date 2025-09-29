<?php

declare(strict_types=1);

namespace App\Http\Controllers\Budget\Reports;

use App\Http\Controllers\Controller;
use App\Services\Reports\Excel\BUR\BurReportService;
use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Symfony\Component\HttpFoundation\StreamedResponse;

class BurController extends Controller
{
    public function __invoke(Request $request, BurReportService $burReportService): StreamedResponse
    {
        $spreadsheet = $burReportService->generate((string) $request->query('date'));
        $filename = 'Budget Utilization Report.xlsx';

        return response()->streamDownload(function () use ($spreadsheet): void {
            $writer = new Xlsx($spreadsheet);
            $writer->save('php://output');
        }, $filename, [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ]);
    }
}
