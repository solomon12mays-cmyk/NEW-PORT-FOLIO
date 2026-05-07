<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('icon_class')->nullable();
            $table->enum('category', [
                'frontend',
                'backend',
                'database',
                'devops',
                'ai_ml',
                'tools'
            ]);
            $table->integer('proficiency_level');
            $table->text('description')->nullable();
            $table->boolean('is_learning')->default(false);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('skills');
    }
};