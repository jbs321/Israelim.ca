<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FileUpload extends Model
{
    use SoftDeletes;

    const TABLE_NAME = "file_uploads";

    const FIELD__ID = "id";
    const FIELD__EXTENSION = "extension";
    const FIELD__MIME_TYPE = "mimeType";
    const FIELD__SIZE = "size";
    const FIELD__ERROR_MESSAGE = "error_message";
    const FIELD__NAME = "name";
    const FIELD__PATH = "path";
    const FIELD__CREATED_AT = "created_at";
    const FIELD__UPDATED_AT = "updated_at";

    protected $table = self::TABLE_NAME;

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        self::FIELD__ID,
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        self::FIELD__EXTENSION,
        self::FIELD__MIME_TYPE,
        self::FIELD__SIZE,
        self::FIELD__NAME,
        self::FIELD__PATH,
        self::FIELD__ERROR_MESSAGE,
        self::FIELD__CREATED_AT,
        self::FIELD__UPDATED_AT,
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];
}
