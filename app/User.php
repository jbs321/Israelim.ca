<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    const PLURAL               = "users";

    const FIELD_ID             = 'id';
    const FIELD_PHONE_NUMBER   = 'phone_number';
    const FIELD_FIRST_NAME     = 'first_name';
    const FIELD_LAST_NAME      = 'last_name';
    const FIELD_EMAIL          = 'email';
    const FIELD_PASSWORD       = 'password';
    const FIELD_REMEMBER_TOKEN = 'remember_token';

    protected $table = "users";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        self::FIELD_FIRST_NAME,
        self::FIELD_LAST_NAME,
        self::FIELD_PHONE_NUMBER,
        self::FIELD_EMAIL,
        self::FIELD_PASSWORD,
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        self::FIELD_PASSWORD,
        self::FIELD_REMEMBER_TOKEN,
    ];

    /**
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function logs()
    {
        return $this->hasMany('App\UserLog');
    }

    public function logLabels()
    {
        return $this->hasMany('App\LogLabel');
    }

    /**
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function posts()
    {
        return $this->hasMany('App\Post')
                    ->orderByDesc("id");
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function business()
    {
        return $this->hasMany(Business::class);
    }
}
