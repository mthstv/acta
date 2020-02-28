<?php

use Illuminate\Database\Seeder;

class PartsTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('parts')->delete();
        
        \DB::table('parts')->insert(array (
            0 => 
            array (
                'id' => 1,
                'number' => 1,
                'name' => 'Parte Geral',
                'rule_id' => 1,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 04:24:55',
                'updated_at' => '2020-02-15 04:24:55',
            ),
            1 => 
            array (
                'id' => 2,
                'number' => 1,
                'name' => 'Parte Geral',
                'rule_id' => 2,
                'rule_reference' => 2,
                'created_at' => '2020-02-15 05:23:38',
                'updated_at' => '2020-02-15 05:23:38',
            ),
        ));
        
        
    }
}