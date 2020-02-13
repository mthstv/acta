<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Rule;
use Faker\Generator as Faker;

$factory->define(Rule::class, function (Faker $faker) {
    return [
        'description' => $faker->name,
        'preamble' => $faker->text,
       
    ];
});