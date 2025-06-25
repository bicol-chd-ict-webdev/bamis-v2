<?php

declare(strict_types=1);

use App\Models\AllotmentClass;
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
        Schema::create('expenditures', function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->string('code');
            $table->foreignIdFor(AllotmentClass::class)->constrained()->cascadeOnDelete()->index();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenditures');
    }
};
