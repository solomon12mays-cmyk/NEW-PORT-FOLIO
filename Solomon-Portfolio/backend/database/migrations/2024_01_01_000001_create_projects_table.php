<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->text('long_description')->nullable();
            $table->json('technologies');
            $table->enum('category', ['web', 'ai', 'ml', 'fullstack', 'other']);
            $table->string('github_link')->nullable();
            $table->string('live_demo_link')->nullable();
            $table->string('image')->nullable();
            $table->decimal('accuracy', 5, 2)->nullable();
            $table->string('model_type')->nullable();
            $table->text('dataset_description')->nullable();
            $table->string('confusion_matrix_image')->nullable();
            $table->boolean('featured')->default(false);
            $table->boolean('is_published')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};