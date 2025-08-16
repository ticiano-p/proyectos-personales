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
        Schema::create('blog_have_categories', function (Blueprint $table) {
            $table->foreignId('blog_fk')->constrained(table:'blog', column:'blog_id');
            $table->unsignedSmallInteger('categories_fk');
            $table->foreign('categories_fk')->references('category_id')->on('categories');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blog_have_categories');
    }
};
