<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\AccountsPayableInterface;
use App\Models\Obligation;
use Illuminate\Database\Eloquent\Collection;

class AccountsPayableRepository implements AccountsPayableInterface
{
    public function list(): Collection
    {
        return Obligation::withoutTrashed()
            ->with([
                'disbursements',
                'officeAllotment:id,section_id',
                'officeAllotment.section:id,name,acronym',
                'objectDistribution.expenditure',
            ])
            ->whereNull('norsa_type')
            ->nonZeroBalance()
            ->oldest('date')
            ->get([
                'id',
                'date',
                'creditor',
                'particulars',
                'amount',
                'allocation_id',
                'object_distribution_id',
                'office_allotment_id',
                'oras_number',
                'recipient',
                'is_transferred',
                'norsa_type',
                'series',
                'dtrak_number',
                'reference_number',
            ]);
    }
}
