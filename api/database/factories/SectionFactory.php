<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Section;
use Faker\Generator as Faker;

$factory->define(Section::class, function (Faker $faker) {
    return [
        'number' => $faker->randomDigit,
        'name' => $faker->name,
        'article_id' => 1
    ];
});
