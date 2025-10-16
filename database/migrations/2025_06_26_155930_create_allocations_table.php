<?php

declare(strict_types=1);

use App\Models\AllotmentClass;
use App\Models\Appropriation;
use App\Models\AppropriationType;
use App\Models\LineItem;
use App\Models\Program;
use App\Models\ProgramClassification;
use App\Models\ProjectType;
use App\Models\Subprogram;
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
        Schema::create('allocations', function (Blueprint $table): void {
            $table->id();
            $table->decimal('amount', 12, 2);
            $table->date('date_received');
            $table->string('appropriation_source');
            $table->foreignIdFor(LineItem::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Appropriation::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(AppropriationType::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(AllotmentClass::class)->constrained()->cascadeOnDelete();
            $table->string('particulars')->nullable();
            $table->string('saa_number')->nullable();
            $table->string('department_order')->nullable();
            $table->string('remarks')->nullable();
            $table->string('saro_number')->nullable();
            $table->foreignIdFor(ProgramClassification::class)->nullable()->constrained()->cascadeOnDelete();
            $table->foreignIdFor(ProjectType::class)->nullable()->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Program::class)->nullable()->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Subprogram::class)->nullable()->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('allocations');
    }
};
