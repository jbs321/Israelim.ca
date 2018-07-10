<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMorphForLocation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::rename('business_locations', 'locations');

        Schema::table('locations', function (Blueprint $table) {
            $table->dropColumn("business_id");
            $table->string("related_id");
            $table->string("related_type");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::rename('locations', 'business_locations');

        Schema::table('business_locations', function (Blueprint $table) {
            $table->string("business_id");
            $table->dropColumn("related_id");
            $table->dropColumn("related_type");
        });
    }
}
