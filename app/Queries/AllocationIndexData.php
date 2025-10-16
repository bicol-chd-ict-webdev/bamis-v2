<?php

declare(strict_types=1);

namespace App\Queries;

use App\Enums\AppropriationSource;
use App\Http\Resources\AllocationResource;
use App\Http\Resources\AllotmentClassResource;
use App\Http\Resources\AppropriationTypeResource;
use App\Http\Resources\LineItemResource;
use App\Http\Resources\ProgramClassificationResource;
use App\Http\Resources\ProgramResource;
use App\Http\Resources\ProjectTypeResource;
use App\Http\Resources\SubprogramResource;
use App\Repositories\AllocationRepository;
use App\Repositories\AllotmentClassRepository;
use App\Repositories\AppropriationTypeRepository;
use App\Repositories\LineItemRepository;
use App\Repositories\ProgramClassificationRepository;
use App\Repositories\ProgramRepository;
use App\Repositories\ProjectTypeRepository;
use App\Repositories\SubprogramRepository;

final readonly class AllocationIndexData
{
    public function __construct(
        private AllocationRepository $allocationRepository,
        private LineItemRepository $lineItemRepository,
        private AppropriationTypeRepository $appropriationTypeRepository,
        private AllotmentClassRepository $allotmentClassRepository,
        private ProjectTypeRepository $projectTypeRepository,
        private ProgramRepository $programRepository,
        private SubprogramRepository $subprogramRepository,
        private ProgramClassificationRepository $programClassificationRepository,
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
            'programClassifications' => fn (): array => ProgramClassificationResource::collection(
                $this->programClassificationRepository->list()
            )->resolve(),
            'appropriationSources' => array_map(fn (AppropriationSource $case): array => [
                'name' => $case->name,
                'value' => $case->value,
            ], AppropriationSource::cases()),
        ];
    }
}
