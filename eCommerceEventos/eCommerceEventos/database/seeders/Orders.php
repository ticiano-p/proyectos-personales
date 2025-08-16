<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Orders extends Seeder
{
    public function run()
    {
        // Insertar órdenes vinculadas a usuarios ya insertados
        DB::table('orders')->insert([
            [
                'user_id' => 1,
                'total' => 160000, 
                'status' => 'pendiente',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2,
                'total' => 530000,
                'status' => 'completado',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 3,
                'total' => 120000,
                'status' => 'completado',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 3,
                'total' => 95000,
                'status' => 'pendiente',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 3,
                'total' => 142000,
                'status' => 'cancelado',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 3,
                'total' => 183000,
                'status' => 'completado',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2,
                'total' => 1080000,
                'status' => 'completado',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
        
        
        
        DB::table('order_items')->insert([
            [
                'order_id' => 1,
                'product_id' => 1,
                'quantity' => 1,
                'price' => 80000,  
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 1,
                'product_id' => 2,
                'quantity' => 1,
                'price' => 80000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 2,
                'product_id' => 3,
                'quantity' => 1,
                'price' => 650000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 2,
                'product_id' => 7,
                'quantity' => 1,
                'price' => 210000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 3,
                'product_id' => 4,
                'quantity' => 2,
                'price' => 60000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 4,
                'product_id' => 5,
                'quantity' => 1,
                'price' => 95000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 5,
                'product_id' => 2,
                'quantity' => 1,
                'price' => 42000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 5,
                'product_id' => 6,
                'quantity' => 1,
                'price' => 100000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 6,
                'product_id' => 1,
                'quantity' => 1,
                'price' => 83000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 6,
                'product_id' => 3,
                'quantity' => 1,
                'price' => 100000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 7,
                'product_id' => 3,
                'quantity' => 1,
                'price' => 650000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 7,
                'product_id' => 2,
                'quantity' => 1,
                'price' => 230000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 7,
                'product_id' => 4,
                'quantity' => 2,
                'price' => 100000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

