<?php

declare(strict_types=1);

namespace App\Contracts;

use App\Models\Program;
use Illuminate\Database\Eloquent\Collection;

interface ProgramInterface
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(array $attributes): Program;

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(Program $program, array $attributes): void;

    public function delete(Program $program): void;

    /**
     * @return Collection<int, Program>
     */
    public function list(): Collection;

    /**
     * @return Collection<int, Program>
     */
    public function listOrderByName(): Collection;

    /**
     * @return Collection<int, Program>
     */
    public function dropdownList(): Collection;
}
