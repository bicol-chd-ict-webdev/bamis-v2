<?php

declare(strict_types=1);

use App\Http\Controllers\FundTrackerController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('welcome'))->name('home');

Route::middleware(['auth', 'verified'])->group(function (): void {
    Route::get('dashboard', fn () => Inertia::render('dashboard'))->name('dashboard');
});

Route::get('fund-tracker', FundTrackerController::class)->name('fund-tracker');

require __DIR__.'/administrator.php';
require __DIR__.'/budget.php';
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
