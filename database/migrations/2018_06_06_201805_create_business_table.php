<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Business;

class CreateBusinessTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('business', function (Blueprint $table) {
            $table->increments(Business::FIELD_ID);
            $table->string(Business::FIELD_NAME);
            $table->string(Business::FIELD_EMAIL);
            $table->string(Business::FIELD_PHONE_NUMBER);
            $table->string(Business::FIELD_ADDRESS);
            $table->string(Business::FIELD_PROVINCE);
            $table->integer(Business::FIELD_USER_ID);
            $table->string(Business::FIELD_CITY);
            $table->string(Business::FIELD_COUNTRY);
            $table->string(Business::FIELD_INDUSTRY);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('business');
    }
}
