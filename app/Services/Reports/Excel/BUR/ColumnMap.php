<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\BUR;

use App\Enums\BURGroup;

final class ColumnMap
{
    public const array MAP = [
        BURGroup::GRAND_TOTAL->value => ['E', 'F', 'G', 'H', 'I', 'J', 'K'],
        BURGroup::GAA_CURRENT->value => ['L', 'M', 'N', 'O', 'P', 'Q', 'R'],
        BURGroup::SAA_CURRENT->value => ['S', 'T', 'U', 'V', 'W', 'X', 'Y'],
        BURGroup::SARO_CURRENT->value => ['Z', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF'],
        BURGroup::GAA_CONAP->value => ['AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'AM'],
        BURGroup::SAA_CONAP->value => ['AN', 'AO', 'AP', 'AQ', 'AR', 'AS', 'AT'],
        BURGroup::CURRENT_TOTAL->value => ['AV', 'AW', 'AX', 'AY', 'AZ', 'BA', 'BB'],
        BURGroup::CONAP_TOTAL->value => ['BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ'],
    ];
}
