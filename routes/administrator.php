<?php

declare(strict_types=1);

use App\Http\Controllers\Administrator\AccountController;
use App\Http\Controllers\Administrator\AppropriationController;
use App\Http\Controllers\Administrator\DivisionController;
use App\Http\Controllers\Administrator\SectionController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'check_status', 'role:Administrator'])->prefix('administrator')->name('administrator.')->group(function () {
    Route::resource('divisions', DivisionController::class)->only('index', 'store', 'update', 'destroy');
    Route::resource('sections', SectionController::class)->only('index', 'store', 'update', 'destroy');
    Route::resource('accounts', AccountController::class)->only('index', 'store', 'update');
    Route::resource('appropriations', AppropriationController::class)->only('index', 'store', 'update', 'destroy');
});
