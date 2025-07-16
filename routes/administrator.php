<?php

declare(strict_types=1);

use App\Http\Controllers\Administrator\AccountController;
use App\Http\Controllers\Administrator\AllotmentClassController;
use App\Http\Controllers\Administrator\AppropriationController;
use App\Http\Controllers\Administrator\AppropriationTypeController;
use App\Http\Controllers\Administrator\DivisionController;
use App\Http\Controllers\Administrator\ProgramClassificationController;
use App\Http\Controllers\Administrator\ProjectTypeController;
use App\Http\Controllers\Administrator\SectionController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'check_status', 'role:Administrator'])->prefix('administrator')->name('administrator.')->group(function () {
    Route::resource('divisions', DivisionController::class)->only('index', 'store', 'update', 'destroy');
    Route::resource('sections', SectionController::class)->only('index', 'store', 'update', 'destroy');
    Route::resource('accounts', AccountController::class)->only('index', 'store', 'update');
    Route::resource('allotment-classes', AllotmentClassController::class)->only('index', 'store', 'update', 'destroy');
    Route::resource('project-types', ProjectTypeController::class)->only('index', 'store', 'update', 'destroy');
    Route::resource('appropriations', AppropriationController::class)->only('index', 'store', 'update', 'destroy');
    Route::resource('appropriation-types', AppropriationTypeController::class)->only('index', 'store', 'update', 'destroy');
    Route::resource('program-classifications', ProgramClassificationController::class)->only('index', 'store', 'update', 'destroy');
});
