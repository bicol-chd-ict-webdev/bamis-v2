<?php

declare(strict_types=1);

namespace App\Http\Controllers\Budget\Reports;

use App\Http\Controllers\Controller;
use App\Jobs\ProcessBurReportJob;
use App\Services\Reports\Excel\BUR\BurReportService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BurController extends Controller
{
    public function __invoke(Request $request, BurReportService $burReportService): JsonResponse
    {
        $date = (string) $request->query('date');
        $filename = 'Budget Utilization Report - '.Str::slug($date).'.xlsx';

        ProcessBurReportJob::dispatch($date, $filename);

        return response()->json([
            'message' => 'Processing report...',
            'status' => 'processing',
        ]);
    }
}
