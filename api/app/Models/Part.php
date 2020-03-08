<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
class Part extends Model
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
    protected $with = ['books', 'titles'];

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
        $array['label'] = 'part';

        return $array;
    }

    //belongsto

    public function rule()
    {
        return $this->belongsTo('App\Models\Rule')->withDefault();
    }

    //hasmany

    public function books()
    {
        return $this->hasMany('App\Models\Book');
    }
    public function titles()
    {
        return $this->hasMany('App\Models\Title');
    }
}
