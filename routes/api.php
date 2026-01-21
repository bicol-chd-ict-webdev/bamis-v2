<?php

declare(strict_types=1);

use App\Http\Controllers\Api\DivisionController;
use App\Http\Controllers\Api\SectionController;
use Illuminate\Support\Facades\Route;

// Route::get('/user', fn (Request $request) => $request->user())->middleware('auth:sanctum');

Route::middleware(['auth:sanctum', 'throttle:60,1'])->prefix('v1')->name('api.v1.')->group(function (): void {
    Route::get('divisions', DivisionController::class)->name('divisions.index');
    Route::get('sections', SectionController::class)->name('sections.index');
});
