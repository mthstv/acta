<?php

use Illuminate\Database\Seeder;

class IncisesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('incises')->delete();
        
        \DB::table('incises')->insert(array (
            0 => 
            array (
                'id' => 1,
                'number' => 1,
                'text' => 'os crimes:',
                'article_id' => 7,
                'paragraph_id' => NULL,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 04:46:39',
                'updated_at' => '2020-02-15 04:46:39',
            ),
            1 => 
            array (
                'id' => 2,
                'number' => 2,
                'text' => 'os crimes:',
                'article_id' => 7,
                'paragraph_id' => NULL,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 04:50:26',
                'updated_at' => '2020-02-15 04:50:26',
            ),
            2 => 
            array (
                'id' => 3,
                'number' => 1,
                'text' => 'obrigar o condenado à reparação do dano, a restituições e a outros efeitos civis;',
                'article_id' => 9,
                'paragraph_id' => NULL,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 05:03:09',
                'updated_at' => '2020-02-15 05:03:09',
            ),
            3 => 
            array (
                'id' => 4,
                'number' => 2,
                'text' => 'sujeitá-lo a medida de segurança.',
                'article_id' => 9,
                'paragraph_id' => NULL,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 05:03:47',
                'updated_at' => '2020-02-15 05:03:47',
            ),
        ));
        
        
    }
}