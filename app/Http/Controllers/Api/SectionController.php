<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SectionResource;
use App\Repositories\SectionRepository;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

final class SectionController extends Controller
{
    public function __invoke(SectionRepository $repository): AnonymousResourceCollection
    {
        return SectionResource::collection($repository->list());
    }
}
