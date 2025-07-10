<?php

declare(strict_types=1);

namespace App\Providers;

use App\Contracts\AccountInterface;
use App\Contracts\AllocationInterface;
use App\Contracts\AllotmentClassInterface;
use App\Contracts\AppropriationInterface;
use App\Contracts\AppropriationTypeInterface;
use App\Contracts\DivisionInterface;
use App\Contracts\ExpenditureInterface;
use App\Contracts\LineItemInterface;
use App\Contracts\ObjectDistributionInterface;
use App\Contracts\ObligationInterface;
use App\Contracts\OfficeAllotmentInterface;
use App\Contracts\ProgramInterface;
use App\Contracts\ProjectTypeInterface;
use App\Contracts\SectionInterface;
use App\Contracts\SubprogramInterface;
use App\Repositories\AccountRepository;
use App\Repositories\AllocationRepository;
use App\Repositories\AllotmentClassRepository;
use App\Repositories\AppropriationRepository;
use App\Repositories\AppropriationTypeRepository;
use App\Repositories\DivisionRepository;
use App\Repositories\ExpenditureRepository;
use App\Repositories\LineItemRepository;
use App\Repositories\ObjectDistributionRepository;
use App\Repositories\ObligationRepository;
use App\Repositories\OfficeAllotmentRepository;
use App\Repositories\ProgramRepository;
use App\Repositories\ProjectTypeRepository;
use App\Repositories\SectionRepository;
use App\Repositories\SubprogramRepository;
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
            AllocationInterface::class => AllocationRepository::class,
            AllotmentClassInterface::class => AllotmentClassRepository::class,
            AppropriationInterface::class => AppropriationRepository::class,
            AppropriationTypeInterface::class => AppropriationTypeRepository::class,
            DivisionInterface::class => DivisionRepository::class,
            ExpenditureInterface::class => ExpenditureRepository::class,
            LineItemInterface::class => LineItemRepository::class,
            ObjectDistributionInterface::class => ObjectDistributionRepository::class,
            ObligationInterface::class => ObligationRepository::class,
            OfficeAllotmentInterface::class => OfficeAllotmentRepository::class,
            ProgramInterface::class => ProgramRepository::class,
            ProjectTypeInterface::class => ProjectTypeRepository::class,
            SectionInterface::class => SectionRepository::class,
            SubprogramInterface::class => SubprogramRepository::class,
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
