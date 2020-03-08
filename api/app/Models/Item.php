<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Item extends Model
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
        $array['label'] = 'item';

        return $array;
    }

    //belongsto

    public function line()
    {
        return $this->belongsTo('App\Models\Line')->withDefault();
    }
}
