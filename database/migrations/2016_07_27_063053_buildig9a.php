<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Buildig9a extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('building9a', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('section');
            $table->integer('floor');
            $table->integer('number');
            $table->integer('rooms');
            $table->float('area');
            $table->boolean('onSale');
            $table->boolean('sales');
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
        Schema::table('building9a', function (Blueprint $table) {
            Schema::drop('building9a');
        });
    }
}
