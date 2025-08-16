<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{               //nombre de la tabla
    protected $table = 'Blog';
               // llave primaria
    protected $primaryKey = 'blog_id';

    
}