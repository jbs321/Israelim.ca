<?php

namespace App\Http\Controllers;

use App\FileUpload;
use App\Http\Middleware\FileArrayValidationMiddleware;
use App\Http\Requests\FileUploadRequest;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

class UploadController extends Controller
{
    const PATH_TEMP = "tmp";
    const PATH_TEMP_IMAGES = "tmp/images";
    const PATH_TEMP_FILES = "tmp/files";
    const PATH_USER = "user";
    const PATH_USER_FILES = "user/files";
    const PATH_BUSINESS = "business";
    const PATH_BUSINESS_FILES = "business/files";
    const PATH_BUSINESS_IMAGES = "business/files";

    public function __construct()
    {
        $this->middleware(FileArrayValidationMiddleware::class);
    }


    public function uploadImages(FileUploadRequest $request)
    {
        $paths      = [];
        $fileUpload = [];
        $images     = $request->get('files');

        /** @var UploadedFile $image */
        foreach ($images as $image) {
            $path           = $image->store(self::PATH_TEMP_IMAGES);
            $paths[]        = $path;
            $filePathChunks = explode("/", $path);


            $fileUpload[] = [
                FileUpload::FIELD__PATH          => $path,
                FileUpload::FIELD__EXTENSION     => $image->getExtension(),
                FileUpload::FIELD__MIME_TYPE     => $image->getMimeType(),
                FileUpload::FIELD__SIZE          => $image->getSize(),
                FileUpload::FIELD__NAME          => end($filePathChunks),
                FileUpload::FIELD__ERROR_MESSAGE => $image->getError(),
                FileUpload::FIELD__CREATED_AT    => Carbon::now(),
                FileUpload::FIELD__UPDATED_AT    => Carbon::now(),
            ];
        }

        DB::table(FileUpload::TABLE_NAME)->insert($fileUpload);

        return new JsonResponse($paths);
    }

    public function uploadFiles(FileUploadRequest $request)
    {
        $paths      = [];
        $fileUpload = [];
        $files      = $request->get('files');

        /** @var UploadedFile $file */
        foreach ($files as $file) {
            $path    = $file->store(self::PATH_TEMP_FILES);
            $paths[] = $path;
            $filePathChunks = explode("/", $path);

            $fileUpload[] = [
                FileUpload::FIELD__PATH          => $path,
                FileUpload::FIELD__EXTENSION     => $file->getExtension(),
                FileUpload::FIELD__MIME_TYPE     => $file->getMimeType(),
                FileUpload::FIELD__SIZE          => $file->getSize(),
                FileUpload::FIELD__NAME          => end($filePathChunks),
                FileUpload::FIELD__ERROR_MESSAGE => $file->getError(),
                FileUpload::FIELD__CREATED_AT    => Carbon::now(),
                FileUpload::FIELD__UPDATED_AT    => Carbon::now(),
            ];
        }

        DB::table(FileUpload::TABLE_NAME)->insert($fileUpload);

        return new JsonResponse($paths);
    }
}
