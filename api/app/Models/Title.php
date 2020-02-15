<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Title extends Model
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
    protected $with = ['chapters', 'articles'];

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
    public function book()
    {
        return $this->belongsTo('App\Models\Book')->withDefault();
    }
    public function part()
    {
        return $this->belongsTo('App\Models\Part')->withDefault();
    }

    //hasmany

    public function chapters()
    {
        return $this->hasMany('App\Models\Chapter');
    }

    public function articles()
    {
        return $this->hasMany('App\Models\Article');
    }

    //scopes
}
