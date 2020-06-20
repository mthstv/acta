<?php

namespace App\Models;

use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Support\Facades\Storage;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'avatar', 'password', 'auth_token'
    ];
    
    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['role', 'avatar_url', 'is_admin', 'is_consultant'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    //belongsto

    public function role()
    {
        return $this->belongsToMany('App\Models\Role', 'user_role', 'user_id', 'role_id');
    }

    //hasmany

    public function comments()
    {
        return $this->hasMany('App\Models\Comment');
    }
    
    public function changeRequests()
    {
        return $this->hasMany('App\Models\ChangeRequest', 'consultant_id');
    }
    
    public function changeRequestReviews()
    {
        return $this->hasMany('App\Models\ChangeRequest', 'admin_id');
    }
    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function getRoleAttribute()
    {
        $roles = $this->role()->first();
        return $this->attributes['role'] = $roles->label;
    }

    public function getAvatarUrlAttribute()
    {
        if($this->avatar || $this->avatar !== '') {
            return env('APP_URL') . Storage::url($this->avatar);
        } else {
            return null;
        }
    }

    public function getIsAdminAttribute()
    {
        $roles = $this->role()->first();
        return $this->attributes['is_admin'] = $roles->label === 'ADMIN';
    }

    public function getIsConsultantAttribute()
    {
        $roles = $this->role()->first();
        return $this->attributes['is_consultant'] = $roles->label === 'CONSULTANT';
    }
}
