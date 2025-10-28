<?php

declare(strict_types=1);

namespace App\Http\Controllers\Budget\Reports;

use App\Enums\ReportTypesEnum;
use App\Http\Controllers\Controller;
use App\Jobs\ProcessBurByDivisionReportJob;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

final class BurByDivisionController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $date = (string) $request->query('date');
        $filename = ReportTypesEnum::BUR_BY_SECTION->value.' - '.Str::slug($date).'.xlsx';

        dispatch(new ProcessBurByDivisionReportJob($date, $filename));

        return response()->json([
            'message' => 'Processing report...',
            'status' => 'processing',
        ]);
    }
}
