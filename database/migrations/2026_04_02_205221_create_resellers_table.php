<?php

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
    Schema::create('resellers', function (Blueprint $table) {
        $table->id();
        $table->string('company_name');
        $table->string('contact_name'); // Smmiya dyal l-mas'oul
        $table->string('email')->unique();
        $table->string('phone');
        $table->text('address')->nullable(); // Reddiha nullable ila bghitiha optional f l-bdya
        $table->string('city');
        $table->string('tax_number')->nullable(); // ICE
        $table->decimal('discount_rate', 5, 2)->default(0);
        $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
        
        // MODIF HNA: Darori unique bach user wa7ed i-koun 3ndu demande we7da
        $table->foreignId('user_id')->unique()->constrained()->onDelete('cascade'); 
        
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resellers');
    }
};
