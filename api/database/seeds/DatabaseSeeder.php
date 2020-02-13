<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RuleSeeder::class);
        $this->call(BookSeeder::class);
        $this->call(TitleSeeder::class);
        $this->call(ChapterSeeder::class);
        $this->call(ArticleSeeder::class);
        $this->call(SectionSeeder::class);
    }
}
