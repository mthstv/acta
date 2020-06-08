<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChangeRequest extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [ 
        'status', 'consultant_id', 'element_name', 'element_id', 'old_text', 'new_text', 'reviewed_at', 'admin_id', 'rule_reference'
    ];

    /**
    * The relationships that should always be loaded.
    *
    * @var array
    */
    protected $with = ['consultant', 'admin'];
    
    /**
    * The attributes that should be hidden for arrays.
    *
    * @var array
    */
    protected $hidden = ['updated_at', 'consultant_id', 'admin_id'];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['rule_title'];


    //belongsto

    public function consultant()
    {
        return $this->belongsTo('App\Models\User', 'consultant_id');
    }

    public function admin()
    {
        return $this->belongsTo('App\Models\User', 'admin_id');
    }

    public function getRuleTitleAttribute()
    {
        $rule = Rule::find($this->rule_reference);
        return $rule->rule_title;
    }
}
