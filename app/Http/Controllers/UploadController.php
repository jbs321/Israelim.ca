<?php

namespace App\Http\Controllers;

use App\FileUpload;
use App\Http\Middleware\FileArrayValidationMiddleware;
use App\Http\Requests\FileUploadRequest;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    const PATH_TEMP = "tmp";
    const PATH_TEMP_IMAGES = "tmp/images";
    const PATH_TEMP_FILES = "tmp/files";
    const PATH_USER = "user";
    const PATH_USER_FILES = "user/files";
    const PATH_BUSINESS = "business";
    const PATH_BUSINESS_FILES = "business/files";
    const PATH_BUSINESS_IMAGES = "business/images";

    public function __construct()
    {
        //make sure the request returns files array
        $this->middleware(StartSession::class);
    }

    public function uploadImages(FileUploadRequest $request)
    {
        $token      = $request->session()->token();
        $paths      = [];
        $fileUpload = [];

        $images = $request->get('files');

        /** @var UploadedFile $image */
        foreach ($images as $image) {
            $path = $image->store(self::PATH_TEMP_IMAGES . "/{$token}");

            $request->session()->push("uploaded", $path);

            $paths[$image->getClientOriginalName()] = $path;
            $filePathChunks                         = explode("/", $path);


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
        $token      = $request->session()->token();
        $paths      = [];
        $fileUpload = [];
        $files      = $request->get('files');

        /** @var UploadedFile $file */
        foreach ($files as $file) {
            $path                                  = $file->store(self::PATH_TEMP_FILES);
            $paths[$file->getClientOriginalName()] = $path;
            $filePathChunks                        = explode("/", $path);

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

    public function deleteFile(Request $request)
    {
        $token = $request->session()->token();

        $this->validate($request, [
            'path' => [
                'required',
                'string',
                function ($attribute, $value, $fail) use ($token) {
                    if (!in_array($token, explode("/", $value))) {
                        return $fail("Can't remove requested files for path: {$value}");
                    }
                }
            ],
        ]);

        $path = $request->get("path");

        Storage::delete($path);

        FileUpload::where("path", $path)->delete();

        return new JsonResponse($path);
    }
}
