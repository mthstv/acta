<?php

use Illuminate\Database\Seeder;

class RuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $rule = factory(App\Models\Rule::class)->make();
        factory(App\Models\Rule::class, 3)
        ->create()
        ->each(function ($rule) {
             $rule->part()->save(factory(App\Models\Part::class)->make());
        });
    }
}
