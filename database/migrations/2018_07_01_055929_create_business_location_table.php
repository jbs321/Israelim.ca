<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBusinessLocationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create("business_locations", function (Blueprint $table) {
            $table->increments("id");
            $table->string("business_id");
            $table->string("address");
            $table->string("apartment");
            $table->string("postal_code");
            $table->string("province");
            $table->string("city");
            $table->string("country")->default('canada');
            $table->timestamps();

            $table->index("business_id");
            $table->index("address");
            $table->index("city");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists("business_locations");
    }
}
