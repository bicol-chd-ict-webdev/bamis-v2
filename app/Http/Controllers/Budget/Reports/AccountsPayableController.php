<?php

declare(strict_types=1);

namespace App\Http\Controllers\Budget\Reports;

use App\Http\Controllers\Controller;
use App\Services\Reports\Excel\AccountsPayable\HeaderRendererService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Symfony\Component\HttpFoundation\StreamedResponse;

final class AccountsPayableController extends Controller
{
    public function __construct(private readonly HeaderRendererService $headerRendererService) {}

    public function __invoke(Request $request): StreamedResponse
    {
        $date = (string) $request->query('date');
        $filename = 'Monitoring of Accounts Payables - '.Str::slug($date).'.xlsx';

        $spreadsheet = new Spreadsheet();
        $spreadsheet->getDefaultStyle()->getFont()->setName('Arimo')->setSize(10);

        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('Consolidated');

        $this->headerRendererService->render($sheet, $date);

        return response()->streamDownload(function () use ($spreadsheet): void {
            $writer = new Xlsx($spreadsheet);
            $writer->save('php://output');
        }, $filename, [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ]);
    }
}
