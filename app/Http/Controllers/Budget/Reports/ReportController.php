<?php

declare(strict_types=1);

namespace App\Http\Controllers\Budget\Reports;

use App\Http\Controllers\Controller;
use App\Models\Report;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('budget/report/report-index', [
            'reports' => fn () => Report::latest()->get(),
        ]);
    }
}
