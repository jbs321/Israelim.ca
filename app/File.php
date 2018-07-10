<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    const FIELD__ID = "id";
    const FIELD__EXTENSION = "extension";
    const FIELD__MIME_TYPE = "mimeType";
    const FIELD__SIZE = "size";
    const FIELD__NAME = "name";
    const FIELD__PATH = "path";
    const FIELD__COPIED_FROM_PATH = "copied_from_path";
    const FIELD__RELATED_ID = "related_id";
    const FIELD__RELATED_TYPE = "related_type";

    protected $fillable = [
        self::FIELD__EXTENSION,
        self::FIELD__MIME_TYPE,
        self::FIELD__SIZE,
        self::FIELD__NAME,
        self::FIELD__PATH,
        self::FIELD__RELATED_ID,
        self::FIELD__RELATED_TYPE,
        self::FIELD__COPIED_FROM_PATH,
    ];

    public function business()
    {
        return $this->hasOne(Business::class);
    }

    /**
     * https://laravel.com/docs/5.6/eloquent-relationships#polymorphic-relations
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function related()
    {
        return $this->morphTo();
    }
}
