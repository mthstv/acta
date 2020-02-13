<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Part;
use Faker\Generator as Faker;

$factory->define(Part::class, function (Faker $faker) {
    return [
        'number' => $faker->randomDigit,
        'name' => $faker->name,
    ];
});
