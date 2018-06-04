<?php

use Illuminate\Database\Seeder;
use App\UserLog;

class UserLogTableSeeder extends Seeder
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
            $log              = new UserLog();
            $log->user_id     = 1;
            $log->description = $faker->words(20, true);
            $log->save();
        }
    }
}
