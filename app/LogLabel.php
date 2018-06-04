<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LogLabel extends Model
{
    protected $table = 'log_labels';

    protected $fillable = [
        'user_id',
        'log_id',
        'description',
    ];

    protected $hidden = [
        'id',
        'user_id',
        'log_id'
    ];

    public function user()
    {
        return $this->hasOne('App\User');
    }


    public function logs()
    {
        return $this->hasOne('App\UserLog');
    }
}
