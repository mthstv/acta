<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'number', 'name', 'rule_reference'

    ];

    /**
    * The relationships that should always be loaded.
    *
    * @var array
    */
    protected $with = ['subsections', 'articles'];

    /**
    * The attributes that should be hidden for arrays.
    *
    * @var array
    */
    protected $hidden = ['created_at', 'updated_at'];

    //belongsto

    public function chapter()
    {
        return $this->belongsTo('App\Models\Chapter')->withDefault();
    }

    //hasmany

    public function subsections()
    {
        return $this->hasMany('App\Models\Subsection');
    }

    public function articles()
    {
        return $this->hasMany('App\Models\Article');
    }

    //scopes
}
