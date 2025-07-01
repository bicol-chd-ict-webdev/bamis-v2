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

class GeneralAppropriationIndexData
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
    public function get(): array
    {
        return [
            'generalAppropriations' => fn () => AllocationResource::collection($this->allocationRepository->list())->resolve(),
            'lineItems' => fn () => LineItemResource::collection($this->lineItemRepository->dropdownList())->resolve(),
            'appropriationTypes' => fn () => AppropriationTypeResource::collection($this->appropriationTypeRepository->dropdownList())->resolve(),
            'allotmentClasses' => fn () => AllotmentClassResource::collection($this->allotmentClassRepository->dropdownList())->resolve(),
            'projectTypes' => fn () => ProjectTypeResource::collection($this->projectTypeRepository->dropdownList())->resolve(),
            'programClassifications' => array_map(fn ($case): array => [
                'name' => $case->name,
                'value' => $case->value,
            ], ProgramClassification::cases()),
            'programs' => fn () => ProgramResource::collection($this->programRepository->dropdownList())->resolve(),
            'subprograms' => fn () => SubprogramResource::collection($this->subprogramRepository->dropdownList())->resolve(),
            'appropriationSources' => array_map(fn ($case): array => [
                'name' => $case->name,
                'value' => $case->value,
            ], AppropriationSource::cases()),
        ];
    }
}
