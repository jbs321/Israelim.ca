<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BusinessFile extends Model
{
    const FIELD__ID = "id";
    const FIELD__BUSINESS_ID = "business_id";
    const FIELD__EXTENSION = "extension";
    const FIELD__MIME_TYPE = "mimeType";
    const FIELD__SIZE = "size";
    const FIELD__NAME = "name";
    const FIELD__PATH = "path";

    protected $fillable = [
        self::FIELD__BUSINESS_ID,
        self::FIELD__EXTENSION,
        self::FIELD__MIME_TYPE,
        self::FIELD__SIZE,
        self::FIELD__NAME,
        self::FIELD__PATH,
    ];

    public function business()
    {
        return $this->hasOne(Business::class);
    }
}
