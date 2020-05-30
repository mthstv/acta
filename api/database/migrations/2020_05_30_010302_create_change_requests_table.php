<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChangeRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('change_requests', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('status', 10)->default('PENDING');
            $table->bigInteger('consultant_id')->unsigned();
            $table->foreign('consultant_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('element_name', 20);
            $table->bigInteger('element_id');
            $table->longText('old_text');
            $table->longText('new_text');
            $table->dateTime('reviewed_at')->nullable();
            $table->bigInteger('admin_id')->unsigned()->nullable();
            $table->foreign('admin_id')->references('id')->on('users')->onDelete('cascade');
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
        Schema::dropIfExists('change_requests');
    }
}
