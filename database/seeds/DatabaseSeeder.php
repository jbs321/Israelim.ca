<?php

use Illuminate\Database\Seeder;
use App\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \Illuminate\Support\Facades\DB::table('users')->insert([
            User::FIELD_FIRST_NAME => 'Jacob',
            User::FIELD_LAST_NAME => 'Balabanov',
            User::FIELD_EMAIL => 'jacob@balabanov.ca',
            User::FIELD_PASSWORD => bcrypt('Aa123456'),
            User::FIELD_PHONE_NUMBER => "+1 (778) 882 - 0853",
        ]);

//        $this->call([
//            //
//        ]);
    }
}
