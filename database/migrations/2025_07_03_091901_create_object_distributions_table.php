<?php

declare(strict_types=1);

use App\Models\Allocation;
use App\Models\Expenditure;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('object_distributions', function (Blueprint $table): void {
            $table->id();
            $table->decimal('amount', 12, 2)->default(0);
            $table->foreignIdFor(Allocation::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Expenditure::class)->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('object_distributions');
    }
};
