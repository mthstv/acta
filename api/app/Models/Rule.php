<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rule extends Model
{
    /**
    * The attributes that are mass assignable.
    *
    * @var array
    */
    protected $fillable = [
        'description', 'preamble'

    ];

    /**
    * The relationships that should always be loaded.
    *
    * @var array
    */
    protected $with = ['parts', 'books', 'titles'];

    /**
    * The attributes that should be hidden for arrays.
    *
    * @var array
    */
    protected $hidden = ['created_at', 'updated_at'];

    //belongsto

    //hasmany

    public function parts()
    {
        return $this->hasMany('App\Models\Part');
    }

    public function books()
    {
        return $this->hasMany('App\Models\Book');
    }

    public function titles()
    {
        return $this->hasMany('App\Models\Title');
    }

    public function comments()
    {
        return $this->hasMany('App\Models\Comment');
    }
}
