<?php

use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Models\Book::class, 3)
        ->create()
        ->each(function ($book) {
             $book->title()->save(factory(App\Models\Title::class)->make());
        });
    }
}
