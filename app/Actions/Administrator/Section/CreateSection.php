<?php

declare(strict_types=1);

namespace App\Actions\Administrator\Section;

use App\Contracts\SectionInterface;

class CreateSection
{
    public function __construct(private readonly SectionInterface $sectionInterface) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): void
    {
        $this->sectionInterface->create($attributes);
    }
}
