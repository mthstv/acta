<?php

use Illuminate\Database\Seeder;

class UserRoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('user_role')->delete();
        
        \DB::table('user_role')->insert(array (
            0 => 
            array (
                'role_id' => 1,
                'user_id' => 1,
            ),
            1 => 
            array (
                'role_id' => 2,
                'user_id' => 2,
            ),
            2 => 
            array (
                'role_id' => 2,
                'user_id' => 3,
            ),
            3 => 
            array (
                'role_id' => 2,
                'user_id' => 4,
            ),
            4 => 
            array (
                'role_id' => 2,
                'user_id' => 5,
            ),
            5 => 
            array (
                'role_id' => 2,
                'user_id' => 6,
            )
        ));
    }
}
