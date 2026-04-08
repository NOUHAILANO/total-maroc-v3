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
    Schema::table('users', function (Blueprint $table) {
        // Kan-t7eqqu wach 'role' ma-kaynach 3ad n-ziduha
        if (!Schema::hasColumn('users', 'role')) {
            $table->string('role')->default('customer');
        }
        
        if (!Schema::hasColumn('users', 'is_approved')) {
            $table->boolean('is_approved')->default(false);
        }

        if (!Schema::hasColumn('users', 'ice')) {
            $table->string('ice')->nullable();
        }

        if (!Schema::hasColumn('users', 'phone')) {
            $table->string('phone')->nullable();
        }
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};
