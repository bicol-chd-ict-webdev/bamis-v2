<?php

declare(strict_types=1);

use App\Http\Controllers\Budget\AccountsPayableController;
use App\Http\Controllers\Budget\BudgetDashboardController;
use App\Http\Controllers\Budget\DisbursementController;
use App\Http\Controllers\Budget\DueController;
use App\Http\Controllers\Budget\ExpenditureController;
use App\Http\Controllers\Budget\GeneralAppropriationController;
use App\Http\Controllers\Budget\LineItemController;
use App\Http\Controllers\Budget\ObjectDistributionController;
use App\Http\Controllers\Budget\ObligationController;
use App\Http\Controllers\Budget\OfficeAllotmentController;
use App\Http\Controllers\Budget\ProgramController;
use App\Http\Controllers\Budget\ReportDownloadController;
use App\Http\Controllers\Budget\Reports\BurController;
use App\Http\Controllers\Budget\Reports\RaoController;
use App\Http\Controllers\Budget\Reports\ReportController;
use App\Http\Controllers\Budget\Reports\SaobController;
use App\Http\Controllers\Budget\SpecialAllotmentController;
use App\Http\Controllers\Budget\SubAllotmentController;
use App\Http\Controllers\Budget\SubprogramController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'check_status', 'role:Budget'])->prefix('budget')->name('budget.')->group(function (): void {
    Route::resource('dashboard', BudgetDashboardController::class)->only('index');
    Route::get('accounts-payables', AccountsPayableController::class)->name('accounts-payables.index');
    Route::get('reports', ReportController::class)->name('reports.index');

    Route::resource('line-items', LineItemController::class)->only('index', 'store', 'update', 'destroy');
    Route::resource('expenditures', ExpenditureController::class)->only('index', 'store', 'update', 'destroy');
    Route::resource('programs', ProgramController::class)->only('index', 'store', 'update', 'destroy');
    Route::resource('subprograms', SubprogramController::class)->only('index', 'store', 'update', 'destroy');

    Route::resource('general-appropriations', GeneralAppropriationController::class)->only('index', 'store', 'update', 'destroy');
    Route::resource('sub-allotments', SubAllotmentController::class)->only('index', 'store', 'update', 'destroy');
    Route::resource('special-allotments', SpecialAllotmentController::class)->only('index', 'store', 'update', 'destroy');

    Route::resource('object-distributions', ObjectDistributionController::class)->only('index', 'store', 'update', 'destroy');
    Route::resource('office-allotments', OfficeAllotmentController::class)->only('index', 'store', 'update', 'destroy');

    Route::resource('obligations', ObligationController::class)->only('index', 'store', 'update', 'destroy');
    Route::put('obligations/{obligation}', [ObligationController::class, 'cancel'])->name('obligations.cancel');
    Route::resource('obligations.disbursements', DisbursementController::class)->only('index', 'store', 'update', 'destroy');
    Route::resource('obligations.dues', DueController::class)->only('index', 'store', 'update', 'destroy');

    Route::prefix('export')->name('export.')->group(function (): void {
        Route::post('saob-report', SaobController::class)->name('saob-report');
        Route::post('bur-report', BurController::class)->name('bur-report');
        Route::get('rao-report', [RaoController::class, 'generateSingleRao'])->name('rao-report');
    });

    Route::get('/budget/reports/download/{filename}', [ReportDownloadController::class, '__invoke'])
        ->name('reports.download')
        ->middleware('signed');
});
