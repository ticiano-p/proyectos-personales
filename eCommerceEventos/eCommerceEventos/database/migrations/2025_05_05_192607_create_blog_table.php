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
        Schema::create('blog', function (Blueprint $table) {
            $table->id('blog_id');

            $table->string('titulo');
            $table->text('resumen');
            $table->text('contenido');
            $table->string('cover')->nullable();
            $table->string('cover_description')->nullable();
           
            $table->date('fecha_publicacion');
       
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blog');
    }
};
