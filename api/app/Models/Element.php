<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Element extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'label', 'child', 'parent'

    ];

    protected $casts = [
        'child' => 'array',
        'parent' => 'array',
    ];
}
