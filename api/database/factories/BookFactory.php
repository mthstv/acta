<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Book;
use Faker\Generator as Faker;

$factory->define(Book::class, function (Faker $faker) {
    return [
        'number' => $faker->randomDigit,
        'name' => $faker->name,
        'rule_id' => null,
        'part_id' => 1
    ];
});
