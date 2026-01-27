<?php

declare(strict_types=1);

use App\Http\Controllers\FundTrackerController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [FundTrackerController::class, 'index'])->name('fundtracker');
Route::get('fund-tracker/{section}', [FundTrackerController::class, 'show'])->name('fundtracker.show');

Route::middleware(['auth', 'verified'])->group(function (): void {
    Route::get('dashboard', fn () => Inertia::render('dashboard'))->name('dashboard');
});

require __DIR__.'/administrator.php';
require __DIR__.'/budget.php';
require __DIR__.'/settings.php';
