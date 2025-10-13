<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB\Signatory;

use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

final readonly class SignatoryService
{
    public function __construct(
        private SignatoryRendererService $rendererService
    ) {}

    public function render(Worksheet $sheet, int &$row): void
    {
        $signatories = [
            ['label' => 'Prepared by:', 'name' => 'MARY JOY A. LLORCA, MBA-FM', 'position' => 'Administrative Officer V', 'column' => 'B'],
            ['label' => 'Prepared by:', 'name' => 'RESTY D. DAEP, CPA, MM', 'position' => 'Accountant III', 'column' => 'F'],
            ['label' => 'Recommending Approval:', 'name' => 'DANTE F. ATENTO', 'position' => 'Chief Administrative Officer', 'column' => 'K'],
            ['label' => 'Approved by:', 'name' => 'ROSA MARIA B. REMPILLO, MD, MCHM, CESE', 'position' => 'OIC - Director IV', 'column' => 'Z'],
        ];

        $this->rendererService->render($sheet, $row, $signatories);
    }
}
