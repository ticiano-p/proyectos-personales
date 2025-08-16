<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
        [
          'id'=>1,
          'name'=>'admin',
          'email'=>'admin@gmail.com',
          'password'=>Hash::make('1234'),
          'role' => 'admin',
          'created_at'=>now(),
          'updated_at'=>now(),
          'phone' => null,
          'address' => null,
          'birthdate' => null,
          ],
        [
          'id'=>2,
          'name'=>'usuario',
          'email'=>'usuario@gmail.com',
          'password'=>Hash::make('1234'),
          'role' => 'user',
          'created_at'=>now(),
          'updated_at'=>now(),
          'phone' => '02355550543',
          'address'=>'paso-760-6A-Balvanera-CABA-Buenos Aires',
          'birthdate'=>'2005-06-21',
         ],
        [
          'id' => 3,
          'name' => 'juan',
          'email' => 'juan@example.com',
          'password' => Hash::make('1234'),
          'role' => 'user',
          'created_at' => now(),
          'updated_at' => now(),
          'phone' => null,
          'address' => null,
          'birthdate' => null,
          ],
        [
          'id' => 4,
          'name' => 'maria',
          'email' => 'maria@example.com',
          'password' => Hash::make('1234'),
          'role' => 'user',
          'created_at' => now(),
          'updated_at' => now(),
          'phone' => null,
          'address' => null,
          'birthdate' => null,
          ],
        ]);
      }
}
