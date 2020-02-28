<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'number', 'text', 'rule_reference'

    ];

    /**
    * The attributes that should be hidden for arrays.
    *
    * @var array
    */
    protected $hidden = ['created_at', 'updated_at'];

    //belongsto

    public function line()
    {
        return $this->belongsTo('App\Models\Line')->withDefault();
    }
}
