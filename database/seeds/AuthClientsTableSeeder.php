<?php

use Illuminate\Database\Seeder;

class AuthClientsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('oauth_clients')->insert([
            'id'                     => 100,
            'name'                   => "Web Client",
            'secret'                 => "FkI9pTCbjIcs4sCpymlHfuBXAKF14O3UGpf0CRAr",
            'revoked'                => 0,
            'redirect'               => "israelim.ca/redirect",
            'password_client'        => 1,
            'personal_access_client' => 0,
        ]);
    }
}
