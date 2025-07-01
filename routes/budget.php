<?php

declare(strict_types=1);

use App\Http\Controllers\Budget\BudgetDashboardController;
use App\Http\Controllers\Budget\ExpenditureController;
use App\Http\Controllers\Budget\GeneralAppropriationController;
use App\Http\Controllers\Budget\LineItemController;
use App\Http\Controllers\Budget\ProgramController;
use App\Http\Controllers\Budget\SubprogramController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'check_status', 'role:Budget'])->prefix('budget')->name('budget.')->group(function () {
    Route::resource('dashboard', BudgetDashboardController::class)->only('index');
    Route::resource('general-appropriations', GeneralAppropriationController::class)->only('index', 'store', 'update', 'destroy');
    Route::resource('line-items', LineItemController::class)->only('index', 'store', 'update', 'destroy');
    Route::resource('expenditures', ExpenditureController::class)->only('index', 'store', 'update', 'destroy');
    Route::resource('programs', ProgramController::class)->only('index', 'store', 'update', 'destroy');
    Route::resource('subprograms', SubprogramController::class)->only('index', 'store', 'update', 'destroy');
});
