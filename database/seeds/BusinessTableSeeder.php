<?php

use App\Business;
use App\User;
use Faker\Factory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BusinessTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Factory::create();

        for ($i = 0; $i < 10; $i++) {
            $email = $faker->email();

            $user = new User([
                User::FIELD_FIRST_NAME   => $faker->firstName(),
                User::FIELD_LAST_NAME    => $faker->lastName(),
                User::FIELD_EMAIL        => $email,
                User::FIELD_PASSWORD     => bcrypt('Aa123456'),
                User::FIELD_PHONE_NUMBER => $faker->phoneNumber(),
            ]);

            $user->save();

            DB::table('business')->insert([
                Business::FIELD_USER_ID      => $user->id,
                Business::FIELD_PHONE_NUMBER => $faker->phoneNumber(),
                Business::FIELD_NAME         => $faker->name(),
                Business::FIELD_EMAIL        => $email,
                Business::FIELD_INDUSTRY     => $faker->jobTitle(),
            ]);
        }

    }
}
