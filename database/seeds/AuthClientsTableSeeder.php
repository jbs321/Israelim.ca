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
            'secret' => '9L596Z3DirSkyJxstzbpxynUd17Inb8PWBNiOhEi',
            'redirect' => 'http://localhost',
            'personal_access_client' => 0,
            'password_client' => 1,
            'revoked' => 0,
        ]);
    }
}
