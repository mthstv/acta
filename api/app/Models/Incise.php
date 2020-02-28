<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Incise extends Model
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
    * The relationships that should always be loaded.
    *
    * @var array
    */
    protected $with = ['lines'];

    /**
    * The attributes that should be hidden for arrays.
    *
    * @var array
    */
    protected $hidden = ['created_at', 'updated_at'];

    //belongsto

    public function article()
    {
        return $this->belongsTo('App\Models\Article')->withDefault();
    }

    public function paragraph()
    {
        return $this->belongsTo('App\Models\Paragraph')->withDefault();
    }

    //hasmany

    public function lines()
    {
        return $this->hasMany('App\Models\Line');
    }
}
