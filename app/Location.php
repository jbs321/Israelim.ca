<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $table = 'locations';

    const TABLE_NAME = "locations";

    const FIELD_ID = "id";
    const FIELD_RELATED_ID = "related_id";
    const FIELD_RELATED_TYPE = "related_type";
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
        self::FIELD_RELATED_ID,
        self::FIELD_RELATED_TYPE,
        self::FIELD_PROVINCE,
        self::FIELD_ADDRESS,
        self::FIELD_CITY,
        self::FIELD_APARTMENT,
        self::FIELD_POSTAL_CODE,
        self::FIELD_LAT,
        self::FIELD_LNG,
        self::FIELD_IS_CONFIRMED,
    ];

    /**
     * https://laravel.com/docs/5.6/eloquent-relationships#polymorphic-relations
     */
    public function related()
    {
        return $this->morphTo();
    }
}
