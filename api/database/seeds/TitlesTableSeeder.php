<?php

use Illuminate\Database\Seeder;

class TitlesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('titles')->delete();
        
        \DB::table('titles')->insert(array (
            0 => 
            array (
                'id' => 1,
                'number' => 1,
                'name' => 'DA APLICAÇÃO DA LEI PENAL',
                'rule_id' => NULL,
                'book_id' => NULL,
                'part_id' => 1,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 04:25:09',
                'updated_at' => '2020-02-15 04:27:01',
            ),
            1 => 
            array (
                'id' => 2,
                'number' => 2,
                'name' => 'DO CRIME',
                'rule_id' => NULL,
                'book_id' => NULL,
                'part_id' => 1,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 05:10:30',
                'updated_at' => '2020-02-15 05:10:30',
            ),
            2 => 
            array (
                'id' => 3,
                'number' => 1,
                'name' => 'DAS PESSOAS NATURAIS',
                'rule_id' => NULL,
                'book_id' => 1,
                'part_id' => NULL,
                'rule_reference' => 2,
                'created_at' => '2020-02-15 05:24:53',
                'updated_at' => '2020-02-15 05:24:53',
            ),
        ));
        
        
    }
}