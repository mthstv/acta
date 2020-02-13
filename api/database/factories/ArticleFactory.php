<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Article;
use Faker\Generator as Faker;

$factory->define(Article::class, function (Faker $faker) {
    return [
        'number' => $faker->randomDigit,
        'text' => $faker->text,
        'chapter_id' => 1
    ];
});
