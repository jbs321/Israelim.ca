<?php

use Illuminate\Database\Seeder;
use App\LogLabel;

class LogLabelTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();

        for ($i = 0; $i < 50; $i++) {
            for ($j = 0; $j < random_int(1, 10); $j++) {
                $label              = new LogLabel();
                $label->user_id     = 1;
                $label->log_id      = random_int(0, 49);
                $label->description = $faker->word();
                $label->save();
            }
        }
    }
}
