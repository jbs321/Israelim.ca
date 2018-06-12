<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Business extends Model
{
    const FIELD_ID = "id";
    const FIELD_PHONE_NUMBER = "phone_number";
    const FIELD_NAME = "name";
    const FIELD_EMAIL = "email";
    const FIELD_ADDRESS = "address";
    const FIELD_USER_ID = "user_id";
    const FIELD_PROVINCE = "province";
    const FIELD_CITY = "city";
    const FIELD_COUNTRY = "country";
    const FIELD_INDUSTRY = "industry";

    protected $table = "business";

    protected $fillable = [
        self::FIELD_PHONE_NUMBER,
        self::FIELD_NAME,
        self::FIELD_EMAIL,
        self::FIELD_ADDRESS,
        self::FIELD_USER_ID,
        self::FIELD_PROVINCE,
        self::FIELD_CITY,
        self::FIELD_COUNTRY,
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
}
