<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTitlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('titles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('number')->unsigned();
            $table->string('name', 100);
            $table->bigInteger('rule_id')->unsigned()->nullable();
            $table->foreign('rule_id')->references('id')->on('rules')->onDelete('cascade');
            $table->bigInteger('book_id')->unsigned()->nullable();
            $table->foreign('book_id')->references('id')->on('books')->onDelete('cascade');
            $table->bigInteger('part_id')->unsigned()->nullable();
            $table->foreign('part_id')->references('id')->on('parts')->onDelete('cascade');
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
        Schema::dropIfExists('titles');
    }
}
