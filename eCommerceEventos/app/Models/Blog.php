<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Blog extends Model
{               //nombre de la tabla
    protected $table = 'Blog';
               // llave primaria
    protected $primaryKey = 'blog_id';
    
     protected $fillable = [
    'titulo',
    'resumen',
    'contenido',
    'cover ',
    'cover_description',
    'category',
    'fecha_publicacion'
];
  public function category(): BelongsToMany
  {
    return $this->belongsToMany(
        Category::class,
        'blog_have_categories',
        'blog_fk',
        'categories_fk',
        'blog_id',
        'category_id',
    );
  }
}
