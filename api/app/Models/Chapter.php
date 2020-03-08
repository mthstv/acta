<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Chapter extends Model
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
        $array['name'] = $this->name;
        $array['rule_reference'] = $this->rule_reference;
        $array['label'] = 'chapter';

        return $array;
    }


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
