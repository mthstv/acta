<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('users')->delete();
        
        \DB::table('users')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Matheus Admin',
                'email' => 'admin@acta.tech',
                'password' => \Hash::make('1234'),
                'auth_token' => '',
                'created_at' => '2020-02-15 04:28:14',
                'updated_at' => '2020-02-15 04:31:03',
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'Matheus Consultor',
                'email' => 'consultor@acta.tech',
                'password' => \Hash::make('1234'),
                'auth_token' => '',
                'created_at' => '2020-02-15 04:28:14',
                'updated_at' => '2020-02-15 04:31:03',
            )
        ));
    }
}
