<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    const FIELD__USER_ID = "user_id";
    const FIELD__CONTENT = "content";
    const FIELD__CREATED_AT = "created_at";
    const FIELD__UPDATED_AT = "updated_at";


    protected $table = 'posts';

    protected $fillable = [
        self::FIELD__USER_ID,
        self::FIELD__CONTENT,
    ];

    public function user()
    {
        return $this->hasOne('App\User');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function categories()
    {
        return $this->hasMany('App\Category');
    }

    public function postImages()
    {
        return $this->hasMany('App\PostImage');
    }
}
