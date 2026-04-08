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
    Schema::create('contact_villes', function (Blueprint $table) {
    $table->id();
    $table->string('ville');
    $table->json('adresses')->nullable(); // Array dyal l-3anawin
    $table->json('phones')->nullable();   // Array dyal l-ar9am
    $table->json('whatsapps')->nullable(); // Array dyal l-whatsapps
    $table->string('email')->nullable();
    $table->string('facebook')->nullable();
    $table->string('instagram')->nullable();
    $table->timestamps();
});
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact_villes');
    }
};
