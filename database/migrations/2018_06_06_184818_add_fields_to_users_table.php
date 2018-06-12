<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\User;

class AddFieldsToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn("name");
            $table->string(User::FIELD_FIRST_NAME);
            $table->string(User::FIELD_LAST_NAME);
            $table->string(User::FIELD_PHONE_NUMBER, 20);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                User::FIELD_FIRST_NAME,
                User::FIELD_LAST_NAME,
                User::FIELD_PHONE_NUMBER,
            ]);
        });
    }
}
