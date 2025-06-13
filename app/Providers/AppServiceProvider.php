<?php

declare(strict_types=1);

namespace App\Providers;

use App\Models\Division;
use App\Observers\DivisionObserver;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureCommands();
        $this->configureModels();
        $this->configureVite();
        $this->configureDates();
        Division::observe(DivisionObserver::class);
    }

    private function configureCommands(): void
    {
        DB::prohibitDestructiveCommands(
            $this->app->isProduction(),
        );
    }

    private function configureModels(): void
    {
        Model::automaticallyEagerLoadRelationships();
    }

    private function configureVite(): void
    {
        Vite::useAggressivePrefetching();
    }

    private function configureDates(): void
    {
        Date::use(CarbonImmutable::class);
    }
}
