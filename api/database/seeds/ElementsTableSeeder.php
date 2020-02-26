<?php

use Illuminate\Database\Seeder;

class ElementsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('elements')->delete();
        
        \DB::table('elements')->insert(array (
            0 => 
            array (
              'id' => 1,
              'label' => 'rule',
              'parent' => '[]',
              'child' => '["part", "book", "title"]'
            ), 
            1 => 
            array (
              'id' => 2,
              'label' => 'part',
              'parent' => '["rule"]' ,
              'child' => '["book", "title"]'
            ),
            2 => 
            array (
              'id' => 3,
              'label' => 'book',
              'parent' => '["rule", "part"]' ,
              'child' => '["title"]'
            ),
            3 => 
            array (
              'id' => 4,
              'label' => 'title',
              'parent' => '["rule", "book", "part"]' ,
              'child' => '["chapter", "article"]'
            ),
            4 => 
            array (
              'id' => 5,
              'label' => 'chapter',
              'parent' => '["title"]' ,
              'child' => '["section", "article"]'
            ),
            5 => 
            array (
              'id' => 6,
              'label' => 'section',
              'parent' => '["chapter"]' ,
              'child' => '["subsection", "article"]'
            ),
            6 => 
            array (
              'id' => 7,
              'label' => 'subsection',
              'parent' => '["section"]' ,
              'child' => '["article"]'
            ),
            7 => 
            array (
              'id' => 8,
              'label' => 'article',
              'parent' => '["title", "chapter", "section", "subsection"]' ,
              'child' => '["paragraph", "incise", "line"]'
            ),
            8 => 
            array (
              'id' => 9,
              'label' => 'paragraph',
              'parent' => '["article"]' ,
              'child' => '["incise", "line"]'
            ),
            9 => 
            array (
              'id' => 10,
              'label' => 'incise',
              'parent' => '["article", "paragraph"]' ,
              'child' => '["line"]'
            ),
            10 => 
            array (
              'id' => 11,
              'label' => 'line',
              'parent' => '["article", "paragraph", "incise"]' ,
              'child' => '["item"]'
            ),
            11 => 
            array (
              'id' => 12,
              'label' => 'item',
              'parent' => '["line"]' ,
              'child' => '[]'
            )
        ));
    }
}
