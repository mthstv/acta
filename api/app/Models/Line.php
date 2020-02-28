<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Line extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'letter', 'text', 'rule_reference'

    ];

    /**
    * The relationships that should always be loaded.
    *
    * @var array
    */
    protected $with = ['items'];

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

    public function incise()
    {
        return $this->belongsTo('App\Models\Incise')->withDefault();
    }

    //hasmany

    public function items()
    {
        return $this->hasMany('App\Models\Item');
    }
}
