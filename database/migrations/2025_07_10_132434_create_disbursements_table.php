<?php

declare(strict_types=1);

use App\Models\Obligation;
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
        Schema::create('disbursements', function (Blueprint $table): void {
            $table->id();
            $table->decimal('net_amount', 12, 2)->default(0);
            $table->date('date');
            $table->foreignIdFor(Obligation::class)->constrained()->cascadeOnDelete();
            $table->date('check_date')->nullable();
            $table->string('check_number')->nullable();
            $table->decimal('tax', 12, 2)->default(0)->nullable();
            $table->decimal('retention', 12, 2)->default(0)->nullable();
            $table->decimal('penalty', 12, 2)->default(0)->nullable();
            $table->decimal('absences', 12, 2)->default(0)->nullable();
            $table->decimal('other_deductions', 12, 2)->default(0)->nullable();
            $table->string('remarks')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('date');
            $table->index('check_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('disbursements');
    }
};
