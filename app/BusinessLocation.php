<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BusinessLocation extends Model
{
    protected $table = 'business_locations';

    const TABLE_NAME = "business_locations";

    const FIELD_ID = "id";
    const FIELD_BUSINESS_ID = "business_id";
    const FIELD_PROVINCE = "province";
    const FIELD_ADDRESS = "address";
    const FIELD_CITY = "city";
    const FIELD_APARTMENT = "apartment";
    const FIELD_COUNTRY = "country";
    const FIELD_POSTAL_CODE = "postal_code";
    const FIELD_LAT = "lat";
    const FIELD_LNG = "lng";
    const FIELD_IS_CONFIRMED = "is_confirmed";


    protected $fillable = [
        self::FIELD_BUSINESS_ID,
        self::FIELD_PROVINCE,
        self::FIELD_ADDRESS,
        self::FIELD_CITY,
        self::FIELD_APARTMENT,
        self::FIELD_POSTAL_CODE,
        self::FIELD_LAT,
        self::FIELD_LNG,
        self::FIELD_IS_CONFIRMED,
    ];

    public function business()
    {
        return $this->hasOne(Business::class, Business::FIELD_ID, BusinessLocation::FIELD_BUSINESS_ID);
    }
}
