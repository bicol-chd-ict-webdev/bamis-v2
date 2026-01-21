<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB\ObjectDistribution;

use App\Services\Reports\Excel\SAOB\AllocationGrouper;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

/**
 * @phpstan-import-type SAOBObjectDistribution from AllocationGrouper
 */
final readonly class ObjectDistributionWriterService
{
    public function __construct(
        private ObjectDistributionRowBuilder $rowBuilder,
    ) {}

    /**
     * @param  array<int, SAOBObjectDistribution>  $objectDistributions
     */
    public function write(Worksheet $sheet, array $objectDistributions, int &$row): void
    {
        foreach ($objectDistributions as $distribution) {
            $this->rowBuilder->build($sheet, $distribution, $row);
            $row++;
        }

        $row++; // space after block
    }
}
