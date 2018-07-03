<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Business extends Model
{
    const FIELD_ID = "id";
    const FIELD_PHONE_NUMBER = "phone_number";
    const FIELD_NAME = "name";
    const FIELD_EMAIL = "email";
    const FIELD_USER_ID = "user_id";
    const FIELD_INDUSTRY = "industry";

    const TABLE_NAME = "business";

    protected $table = "business";

    protected $fillable = [
        self::FIELD_PHONE_NUMBER,
        self::FIELD_NAME,
        self::FIELD_EMAIL,
        self::FIELD_USER_ID,
        self::FIELD_INDUSTRY,
    ];

    protected $hidden = [
        self::FIELD_ID,
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function user()
    {
        return $this->hasOne(User::class);
    }

    public function images()
    {
        return $this->hasMany(BusinessFile::class);
    }

    public function location()
    {
        return $this->hasOne(BusinessLocation::class);
    }
}
