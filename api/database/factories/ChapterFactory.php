<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Chapter;
use Faker\Generator as Faker;

$factory->define(Chapter::class, function (Faker $faker) {
    return [
        'number' => $faker->randomDigit,
        'name' => $faker->name,
        'title_id' => 1
    ];
});
