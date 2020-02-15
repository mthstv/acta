<?php

use Illuminate\Database\Seeder;

class ChaptersTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('chapters')->delete();
        
        \DB::table('chapters')->insert(array (
            0 => 
            array (
                'id' => 1,
                'number' => 1,
                'name' => 'Da Personalidade e da Capacidade',
                'title_id' => 3,
                'created_at' => '2020-02-15 05:26:45',
                'updated_at' => '2020-02-15 05:26:45',
            ),
        ));
        
        
    }
}