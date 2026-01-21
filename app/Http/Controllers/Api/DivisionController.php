<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DivisionResource;
use App\Repositories\DivisionRepository;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

final class DivisionController extends Controller
{
    public function __invoke(DivisionRepository $repository): AnonymousResourceCollection
    {
        return DivisionResource::collection($repository->listWithSectionCount());
    }
}
