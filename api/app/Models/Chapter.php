<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
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
    protected $with = ['sections', 'articles'];

    /**
    * The attributes that should be hidden for arrays.
    *
    * @var array
    */
    protected $hidden = ['created_at', 'updated_at'];

    //belongsto

    public function title()
    {
        return $this->belongsTo('App\Models\Title')->withDefault();
    }

    //hasmany

    public function sections()
    {
        return $this->hasMany('App\Models\Section');
    }

    public function articles()
    {
        return $this->hasMany('App\Models\Article');
    }

    //scopes
}
