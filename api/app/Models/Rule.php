<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Rule extends Model
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
        'rule_title', 'description', 'preamble'

    ];

    /**
    * The relationships that should always be loaded.
    *
    * @var array
    */
    protected $with = ['parts', 'books', 'titles'];

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
        $array['rule_title'] = $this->rule_title;
        $array['description'] = $this->description;
        $array['preamble'] = $this->preamble;
        $array['label'] = 'rule';

        return $array;
    }

    //belongsto

    //hasmany

    public function parts()
    {
        return $this->hasMany('App\Models\Part');
    }

    public function books()
    {
        return $this->hasMany('App\Models\Book');
    }

    public function titles()
    {
        return $this->hasMany('App\Models\Title');
    }

    public function comments()
    {
        return $this->hasMany('App\Models\Comment');
    }
}
