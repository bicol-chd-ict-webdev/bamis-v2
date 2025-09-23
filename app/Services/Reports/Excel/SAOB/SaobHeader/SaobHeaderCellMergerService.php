<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB\SaobHeader;

use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class SaobHeaderCellMergerService
{
    public function merge(Worksheet $sheet): void
    {
        $merges = [
            'B11:B12', 'C11:C12', 'E11:E12', 'F11:F12', 'G11:G12', 'H11:H12',
            'I11:I12', 'J11:J12', 'K11:K12', 'L11:L12', 'M11:M12', 'N11:Z11',
            'AA11:AM11', 'AN11:AN12', 'AO11:AO12', 'AP11:AQ11', 'AR11:AS11',
        ];

        foreach ($merges as $range) {
            $sheet->mergeCells($range);
        }
    }
}
