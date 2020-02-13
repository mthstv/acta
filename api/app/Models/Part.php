<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Part extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'number', 'name'

    ];

    /**
    * The relationships that should always be loaded.
    *
    * @var array
    */
    protected $with = ['books'];

    /**
    * The attributes that should be hidden for arrays.
    *
    * @var array
    */
    protected $hidden = ['created_at', 'updated_at'];

 

    //belongsto

    public function rule()
    {
        return $this->belongsTo('App\Models\Rule')->withDefault();
    }

    //hasmany

    public function books()
    {
        return $this->hasMany('App\Models\Book');
    }

    //scopes

}
