<?php

declare(strict_types=1);

namespace App\Providers;

use App\Contracts\AccountInterface;
use App\Contracts\DivisionInterface;
use App\Contracts\LineItemInterface;
use App\Contracts\SectionInterface;
use App\Repositories\AccountRepository;
use App\Repositories\DivisionRepository;
use App\Repositories\LineItemRepository;
use App\Repositories\SectionRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $bindings = [
            AccountInterface::class => AccountRepository::class,
            DivisionInterface::class => DivisionRepository::class,
            SectionInterface::class => SectionRepository::class,
            LineItemInterface::class => LineItemRepository::class,
        ];

        foreach ($bindings as $interface => $repository) {
            $this->app->bind($interface, $repository);
        }
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
