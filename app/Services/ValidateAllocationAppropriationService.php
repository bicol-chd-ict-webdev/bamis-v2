<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Allocation;
use App\Models\Appropriation;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

class ValidateAllocationAppropriationService
{
    public const QUERY_TO_APPROPRIATION = [
        'general_appropriation' => Appropriation::GENERAL_APPROPRIATION,
        'sub_allotment' => Appropriation::SUB_ALLOTMENT,
        'special_allotment' => Appropriation::SPECIAL_ALLOTMENT,
    ];

    public function handle(Request $request): Allocation
    {
        foreach (self::QUERY_TO_APPROPRIATION as $param => $expectedAppropriationId) {
            $value = $request->query($param);
            if ($value) {
                $allocation = Allocation::withSum('obligations', 'amount')
                    ->find((int) $value);

                if (! $allocation) {
                    throw new HttpException(404, 'Allocation not found.');
                }

                if ((int) $allocation->appropriation_id !== $expectedAppropriationId) {
                    throw new HttpException(403, 'Invalid appropriation for this allocation.');
                }

                return $allocation;
            }
        }

        throw new HttpException(404, 'No valid allocation ID provided.');
    }
}
