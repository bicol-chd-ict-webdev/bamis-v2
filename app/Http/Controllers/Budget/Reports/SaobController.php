<?php

declare(strict_types=1);

namespace App\Http\Controllers\Budget\Reports;

use App\Enums\ReportTypesEnum;
use App\Http\Controllers\Controller;
use App\Jobs\ProcessSaobReportJob;
use App\Services\Reports\Excel\SAOB\SaobReportService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

final class SaobController extends Controller
{
    public function __invoke(Request $request, SaobReportService $saobReportService): JsonResponse
    {
        /** @var string $date */
        $date = $request->input('date', '');
        $filename = ReportTypesEnum::SAOB->value.' - '.Str::slug($date).'.xlsx';

        dispatch(new ProcessSaobReportJob($date, $filename));

        return response()->json([
            'message' => 'Processing report...',
            'status' => 'processing',
        ]);
    }
}
