<?php

use Illuminate\Database\Seeder;

class BooksTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('books')->delete();
        
        \DB::table('books')->insert(array (
            0 => 
            array (
                'id' => 1,
                'number' => 1,
                'name' => 'DAS PESSOAS',
                'rule_id' => NULL,
                'part_id' => 2,
                'created_at' => '2020-02-15 05:24:19',
                'updated_at' => '2020-02-15 05:24:19',
            ),
        ));
        
        
    }
}