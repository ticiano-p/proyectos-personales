<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;
use App\Models\OrderItem;
class Order extends Model
{
    protected $fillable = ['user_id', 'total', 'status'];

    // Relación con OrderItem
    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    // Relación con el usuario
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

