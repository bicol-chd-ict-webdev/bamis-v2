<?php

declare(strict_types=1);

use App\Http\Controllers\Budget\BudgetDashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'check_status', 'role:budget'])->prefix('budget')->name('budget.')->group(function () {
    Route::resource('dashboard', BudgetDashboardController::class)->only('index');
});
