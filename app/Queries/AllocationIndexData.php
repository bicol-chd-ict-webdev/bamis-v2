<?php

declare(strict_types=1);

namespace App\Queries;

use App\Enums\AppropriationSource;
use App\Enums\ProgramClassification;
use App\Http\Resources\AllocationResource;
use App\Http\Resources\AllotmentClassResource;
use App\Http\Resources\AppropriationTypeResource;
use App\Http\Resources\LineItemResource;
use App\Http\Resources\ProgramResource;
use App\Http\Resources\ProjectTypeResource;
use App\Http\Resources\SubprogramResource;
use App\Repositories\AllocationRepository;
use App\Repositories\AllotmentClassRepository;
use App\Repositories\AppropriationTypeRepository;
use App\Repositories\LineItemRepository;
use App\Repositories\ProgramRepository;
use App\Repositories\ProjectTypeRepository;
use App\Repositories\SubprogramRepository;

class AllocationIndexData
{
    public function __construct(
        protected AllocationRepository $allocationRepository,
        protected LineItemRepository $lineItemRepository,
        protected AppropriationTypeRepository $appropriationTypeRepository,
        protected AllotmentClassRepository $allotmentClassRepository,
        protected ProjectTypeRepository $projectTypeRepository,
        protected ProgramRepository $programRepository,
        protected SubprogramRepository $subprogramRepository
    ) {}

    /**
     * @return array<string, callable(): array<mixed>|array<int, array{name: string, value: string}>>
     */
    public function get(?int $appropriationId = null): array
    {
        return [
            'allocations' => fn (): array => AllocationResource::collection(
                $this->allocationRepository->list($appropriationId)
            )->resolve(),
            'lineItems' => fn (): array => LineItemResource::collection(
                $this->lineItemRepository->dropdownList()
            )->resolve(),
            'appropriationTypes' => fn (): array => AppropriationTypeResource::collection(
                $this->appropriationTypeRepository->listWithAllocationCount($appropriationId)
            )->resolve(),
            'allotmentClasses' => fn (): array => AllotmentClassResource::collection(
                $this->allotmentClassRepository->listWithAllocationCount($appropriationId)
            )->resolve(),
            'projectTypes' => fn (): array => ProjectTypeResource::collection(
                $this->projectTypeRepository->dropdownList()
            )->resolve(),
            'programs' => fn (): array => ProgramResource::collection(
                $this->programRepository->dropdownList()
            )->resolve(),
            'subprograms' => fn (): array => SubprogramResource::collection(
                $this->subprogramRepository->dropdownList()
            )->resolve(),
            'appropriationSources' => array_map(fn ($case): array => [
                'name' => $case->name,
                'value' => $case->value,
            ], AppropriationSource::cases()),
            'programClassifications' => array_map(fn ($case): array => [
                'name' => $case->name,
                'value' => $case->value,
            ], ProgramClassification::cases()),
        ];
    }
}
