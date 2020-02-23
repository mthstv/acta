<?php

use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('roles')->delete();
        
        \DB::table('roles')->insert(array (
            0 => 
            array (
                'id' => 1,
                'label' => 'ADMIN',
                'created_at' => '2020-02-15 04:28:14',
                'updated_at' => '2020-02-15 04:31:03',
            ),
            1 => 
            array (
                'id' => 2,
                'label' => 'CONSULTANT',
                'created_at' => '2020-02-15 04:28:14',
                'updated_at' => '2020-02-15 04:31:03',
            ),
        ));
    }
}
