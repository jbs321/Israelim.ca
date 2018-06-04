<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class UserLog extends Model
{
    protected $table = 'user_logs';
    protected $fillable = [
        "id",
        "user_id",
        "description",
    ];

    //hide the id from client side
    public function getIdAttribute($val)
    {
        return Crypt::encryptString($val);
    }


    public function getUserIdAttribute($val)
    {
        return Crypt::encryptString($val);
    }

    
    public function user()
    {
        return $this->hasOne('App\User');
    }

    public function labels()
    {
        return $this->hasMany('App\LogLabel', 'log_id', 'id');
    }
}
