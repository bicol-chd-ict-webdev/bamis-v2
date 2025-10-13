<?php

declare(strict_types=1);

namespace App\Http\Controllers\Budget;

use App\Http\Controllers\Controller;
use App\Services\BudgetDashboardService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

final class BudgetDashboardController extends Controller
{
    public function __construct(
        private readonly BudgetDashboardService $dashboardService
    ) {}

    public function index(Request $request): Response
    {
        $year = $request->integer('year', now()->year);

        return Inertia::render('budget/dashboard/dashboard-index',
            $this->dashboardService->getDashboardData($year)
        );
    }
}
