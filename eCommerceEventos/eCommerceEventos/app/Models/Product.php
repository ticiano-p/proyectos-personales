<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{               //nombre de la tabla
    protected $table = 'products';
               // llave primaria
    protected $primaryKey = 'product_id';
}
