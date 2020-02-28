<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('number')->unsigned();
            $table->longText('text');
            $table->bigInteger('title_id')->unsigned()->nullable();
            $table->foreign('title_id')->references('id')->on('titles')->onDelete('cascade');
            $table->bigInteger('chapter_id')->unsigned()->nullable();
            $table->foreign('chapter_id')->references('id')->on('chapters')->onDelete('cascade');
            $table->bigInteger('section_id')->unsigned()->nullable();
            $table->foreign('section_id')->references('id')->on('sections')->onDelete('cascade');
            $table->bigInteger('sub_section_id')->unsigned()->nullable();
            $table->foreign('sub_section_id')->references('id')->on('sub_sections')->onDelete('cascade');
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
        Schema::dropIfExists('articles');
    }
}
