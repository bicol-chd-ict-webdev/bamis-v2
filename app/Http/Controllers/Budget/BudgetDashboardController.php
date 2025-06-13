<?php

declare(strict_types=1);

namespace App\Http\Controllers\Budget;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class BudgetDashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('budget/dashboard/dashboard-index');
    }
}
