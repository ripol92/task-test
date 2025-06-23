<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->timestamp('created_at')->useCurrent();
            $table->string('passenger_phone');
            $table->string('from_address');
            $table->decimal('from_lat', 10, 7);
            $table->decimal('from_lng', 10, 7);
            $table->string('from_description')->nullable();
            $table->string('to_address');
            $table->decimal('to_lat', 10, 7);
            $table->decimal('to_lng', 10, 7);
            $table->string('to_description')->nullable();
            $table->enum('status', ['new', 'driving', 'canceled', 'completed'])->default('new');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
