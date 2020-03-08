<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Paragraph extends Model
{
    use Searchable;

    /**
     * Sets Eager Loading from environment
     */
    function __construct(array $attributes = array())
    { 
        parent::__construct($attributes);
        if(!env('APP_EAGER_LOADING')) {
            $this->with = [];
        }
    }

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
    protected $with = ['incises', 'lines'];

    /**
    * The attributes that should be hidden for arrays.
    *
    * @var array
    */
    protected $hidden = ['created_at', 'updated_at'];

    /**
     * Get the indexable data array for the model.
     *
     * @return array
     */
    public function toSearchableArray()
    {
        $array = [];
        
        $array['id'] = $this->id;
        $array['number'] = $this->number;
        $array['text'] = $this->text;
        $array['rule_reference'] = $this->rule_reference;
        $array['label'] = 'paragraph';

        return $array;
    }

    //belongsto

    public function article()
    {
        return $this->belongsTo('App\Models\Article')->withDefault();
    }

    //hasmany

    public function incises()
    {
        return $this->hasMany('App\Models\Incise');
    }

    public function lines()
    {
        return $this->hasMany('App\Models\Line');
    }
}
