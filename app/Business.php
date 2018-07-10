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
    const FIELD_IMAGE_ID = "business_image_id";
    const FIELD_STATUS = "status";

    const STATUS__INFO_REGISTERED = 1;
    const STATUS__LOCATION_REGISTERED = 2;
    const STATUS__LOCATION_CONFIRMED = 3;
    const STATUS__REGISTRATION_FINISHED = 4;

    const TABLE_NAME = "business";

    protected $table = "business";

    protected $fillable = [
        self::FIELD_PHONE_NUMBER,
        self::FIELD_NAME,
        self::FIELD_EMAIL,
        self::FIELD_USER_ID,
        self::FIELD_INDUSTRY,
        self::FIELD_IMAGE_ID,
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    /**
     * https://laravel.com/docs/5.6/eloquent-relationships#polymorphic-relations
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function images()
    {
        return $this->morphMany(File::class, 'related');
    }

    public function image()
    {
        return $this->hasOne(File::class, File::FIELD__ID, self::FIELD_IMAGE_ID);
    }

    /**
     * https://laravel.com/docs/5.6/eloquent-relationships#polymorphic-relations
     * @return \Illuminate\Database\Eloquent\Relations\MorphOne
     */
    public function location()
    {
        return $this->morphOne(Location::class, 'related');
    }

    public function getAllRelationships() {
        $this->location;
        $this->images;
        $this->user;

        return $this;
    }
}
