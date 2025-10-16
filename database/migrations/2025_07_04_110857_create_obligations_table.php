<?php

declare(strict_types=1);

use App\Models\Allocation;
use App\Models\ObjectDistribution;
use App\Models\Obligation;
use App\Models\OfficeAllotment;
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
        Schema::create('obligations', function (Blueprint $table): void {
            $table->id();
            $table->string('oras_number');
            $table->string('series');
            $table->decimal('amount', 12, 2)->default(0);
            $table->date('date');
            $table->string('creditor');
            $table->text('particulars');
            $table->string('reference_number')->nullable();
            $table->string('dtrak_number')->nullable();
            $table->boolean('is_transferred')->default(false);
            $table->string('recipient')->nullable();
            $table->string('norsa_type')->nullable();
            $table->boolean('is_cancelled')->default(false);
            $table->foreignIdFor(Allocation::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(OfficeAllotment::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(ObjectDistribution::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Obligation::class, 'tagged_obligation_id')->nullable()->constrained('obligations');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('obligations');
    }
};
