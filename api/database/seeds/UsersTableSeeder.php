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
                'name' => 'Acta Admin',
                'email' => 'admin@acta.tech',
                'password' => \Hash::make('1234'),
                'avatar_url' => 'https://pbs.twimg.com/profile_images/1233968586538000386/O8YabEGa_400x400.jpg',
                'auth_token' => '',
                'created_at' => '2020-02-15 04:28:14',
                'updated_at' => '2020-02-15 04:31:03',
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'Acta Consultor',
                'email' => 'consultor@acta.tech',
                'password' => \Hash::make('1234'),
                'avatar_url' => '',
                'auth_token' => '',
                'created_at' => '2020-02-15 04:28:14',
                'updated_at' => '2020-02-15 04:31:03',
            ),
            2 => 
            array (
                'id' => 3,
                'name' => 'Acta Usuário Teste 1',
                'email' => 'usuario_teste1@acta.tech',
                'password' => \Hash::make('1234'),
                'avatar_url' => '',
                'auth_token' => '',
                'created_at' => '2020-02-15 04:28:14',
                'updated_at' => '2020-02-15 04:31:03',
            ),
            3 => 
            array (
                'id' => 4,
                'name' => 'Acta Usuário Teste 2',
                'email' => 'usuario_teste2@acta.tech',
                'password' => \Hash::make('1234'),
                'avatar_url' => '',
                'auth_token' => '',
                'created_at' => '2020-02-15 04:28:14',
                'updated_at' => '2020-02-15 04:31:03',
            ),
            4 => 
            array (
                'id' => 5,
                'name' => 'Acta Usuário Teste 3',
                'email' => 'usuario_teste3@acta.tech',
                'password' => \Hash::make('1234'),
                'avatar_url' => '',
                'auth_token' => '',
                'created_at' => '2020-02-15 04:28:14',
                'updated_at' => '2020-02-15 04:31:03',
            ),
            5 => 
            array (
                'id' => 6,
                'name' => 'Acta Usuário Teste 4',
                'email' => 'usuario_teste4@acta.tech',
                'password' => \Hash::make('1234'),
                'avatar_url' => '',
                'auth_token' => '',
                'created_at' => '2020-02-15 04:28:14',
                'updated_at' => '2020-02-15 04:31:03',
            )
        ));
    }
}
