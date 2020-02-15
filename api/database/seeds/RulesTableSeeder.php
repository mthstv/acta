<?php

use Illuminate\Database\Seeder;

class RulesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('rules')->delete();
        
        \DB::table('rules')->insert(array (
            0 => 
            array (
                'id' => 1,
                'description' => 'Código Penal',
                'preamble' => 'preamble',
                'created_at' => '2020-02-15 04:24:39',
                'updated_at' => '2020-02-15 04:24:39',
            ),
            1 => 
            array (
                'id' => 2,
                'description' => 'Código Civil',
                'preamble' => NULL,
                'created_at' => '2020-02-15 05:22:07',
                'updated_at' => '2020-02-15 05:22:51',
            ),
        ));
        
        
    }
}