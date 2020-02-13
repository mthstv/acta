<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'number', 'text'

    ];


    /**
    * The relationships that should always be loaded.
    *
    * @var array
    */
    protected $with = ['paragraphs', 'incises', 'lines'];

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

    public function chapter()
    {
        return $this->belongsTo('App\Models\Chapter')->withDefault();
    }

    public function section()
    {
        return $this->belongsTo('App\Models\Section')->withDefault();
    }

    public function sub_section()
    {
        return $this->belongsTo('App\Models\SubSection')->withDefault();
    }

    //hasmany

    public function paragraphs()
    {
        return $this->hasMany('App\Models\Paragraph');
    }

    public function incises()
    {
        return $this->hasMany('App\Models\Incise');
    }

    public function lines()
    {
        return $this->hasMany('App\Models\Line');
    }
}
