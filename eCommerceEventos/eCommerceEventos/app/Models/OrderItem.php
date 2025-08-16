<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
    protected $fillable = ['order_id', 'product_id', 'quantity', 'price'];

    // Relación con el producto
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id'); 
    }

    // Relación con la orden
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}


