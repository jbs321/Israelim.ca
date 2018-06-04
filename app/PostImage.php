<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PostImage extends Model
{
    const PLURAL = "postImages";

    const FIELD__USER_ID = "user_id";
    const FIELD__POST_ID = "post_id";
    const FIELD__EXTENSION = "extension";
    const FIELD__NAME = "name";
    const FIELD__PATH = "path";
    const FIELD__WIDTH = "width";
    const FIELD__HEIGHT = "height";

    protected $table = "post_images";

    public function user()
    {
        return $this->hasOne('App\User');
    }

    public function post()
    {
        return $this->hasOne('App\User');
    }
}
