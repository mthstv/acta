<?php

use Illuminate\Database\Seeder;

class ChapterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Models\Chapter::class, 3)
        ->create()
        ->each(function ($chapter) {
             $chapter->article()->save(factory(App\Models\Article::class)->make());
        });
    }
}
