<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubSectionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subsections', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('number')->unsigned();
            $table->string('name',100);
            $table->bigInteger('section_id')->unsigned()->nullable();
            $table->foreign('section_id')->references('id')->on('sections')->onDelete('cascade');
            $table->integer('rule_reference')->index();
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
        Schema::dropIfExists('subsections');
    }
}
