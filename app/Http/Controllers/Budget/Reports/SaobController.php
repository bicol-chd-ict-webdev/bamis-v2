<?php

declare(strict_types=1);

namespace App\Http\Controllers\Budget\Reports;

use App\Http\Controllers\Controller;
use App\Services\Report\SaobReportService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class SaobController extends Controller
{
    public function __invoke(Request $request, SaobReportService $saobReportService): BinaryFileResponse
    {
        $filename = $saobReportService->generate((string) $request->query('date'));

        return response()->download($filename);
    }
}
