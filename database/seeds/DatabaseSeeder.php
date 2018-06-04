<?php

use Illuminate\Database\Seeder;

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
            'name' => 'jacob',
            'email' => 'jacob@balabanov.ca',
            'password' => bcrypt('Aa123456'),
        ]);

        $this->call([
            UserLogTableSeeder::class,
            LogLabelTableSeeder::class,
        ]);
    }
}
