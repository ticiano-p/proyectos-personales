<?php

namespace Database\Seeders;

use GuzzleHttp\Promise\Create;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            ['category_id'=>1, 'name'=>'Consejos',             'created_at'=>now(), 'updated_at'=>now()],
            ['category_id'=>2, 'name'=>'Novedades',            'created_at'=>now(), 'updated_at'=>now()],
            ['category_id'=>3, 'name'=>'Iluminacion',         'created_at'=>now(), 'updated_at'=>now()],
            ['category_id'=>4, 'name'=>'Equipos de sonido',    'created_at'=>now(), 'updated_at'=>now()],
            ['category_id'=>5, 'name'=>'armado',               'created_at'=>now(), 'updated_at'=>now()],  
            ['category_id'=>6, 'name'=>'Tendencias',           'created_at'=>now(), 'updated_at'=>now()],  
            ['category_id'=>7, 'name'=>'Bar y coctelería',     'created_at'=>now(), 'updated_at'=>now()],  

        ]);
        
        
    }
}
