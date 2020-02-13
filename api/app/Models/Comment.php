<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'text'

    ];

 

    //belongsto

    public function user()
    {
        return $this->belongsTo('App\Models\User')->withDefault();
    }

    public function rule()
    {
        return $this->belongsTo('App\Models\Rule')->withDefault();
    }

    public function parent()
    {
        return $this->belongsTo('App\Models\Comment', 'comment_id');
    }

    //hasmany

    public function children()
    {
        return $this->hasMany('App\Models\Comment', 'comment_id');
    }
    //scopes
}
