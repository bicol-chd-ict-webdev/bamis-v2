<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB\ObjectDistribution;

use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

final readonly class ObjectDistributionWriterService
{
    public function __construct(
        private ObjectDistributionRowBuilder $rowBuilder,
    ) {}

    /**
     * @param array<int, array{
     *     name: string,
     *     code: int|string,
     *     gaa_conap: float|int,
     *     allotment_conap: float|int,
     *     saro: float|int,
     *     norsa: float|int,
     *     saa_transfer_to: float|int,
     *     saa_transfer_from: float|int,
     *     obligations: list<float|int>,
     *     disbursements: list<float|int>
     * }> $objectDistributions
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
