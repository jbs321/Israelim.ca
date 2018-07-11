<?php

namespace App\Services;

use App\Business;
use App\File;
use App\FileUpload;
use App\Http\Controllers\UploadController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class BusinessService extends Service
{
    /**
     * @param Business $business
     * @param string $basePath
     *
     * @return string
     */
    public function createBusinessImagePath(
        Business $business,
        $basePath = UploadController::PATH_BUSINESS_IMAGES
    ): string {
        $userId     = Auth::user()->id;
        $businessId = $business->id;

        $path = $basePath;
        $path .= $businessId ? "/$businessId" : "";
        $path .= $userId ? "/$userId" : "";
        $path .= "/images/";

        return $path;
    }

    /**
     * Save Files Uploaded to TMP folder into Business folder
     * 1. Files Uploaded in TMP folder must exist
     * 3. if files not removed or directory not deleted there will be a log fired
     *
     * @param String $token
     * @param array $paths
     * @param Business $business
     *
     * @throws \Exception
     */
    public function saveMultipleFilesFromTmp(String $token, array $paths, Business $business)
    {
        if (empty($token)) {
            throw new \Exception("Token can't be empty");
        }

        $directory    = UploadController::PATH_TEMP_FILES . "/{$token}";
        $newDirectory = $this->createBusinessImagePath($business);

        //Delete Destination Directory files
//        $business->images()->delete();

//        if ( ! Storage::deleteDirectory($newDirectory)) {
//            Log::warning("Directory '{$newDirectory}' wasn't deleted");
//        }

        if (empty($paths)) {
            return;
        }

        array_walk($paths, function (string $path, int $key) use ($directory, $token, $newDirectory, $business) {
            /** @var FileUpload $fileUpload */
            $fileUpload = FileUpload::where("path", $path)->firstOrFail();
            $files      = Storage::files($directory);
            $count      = $business->images()->count() + $key + 1;

            if ( ! in_array($path, $files)) {
                throw new \Exception("Missing file in directory");
            }

            if (strpos($path, $token) === false) {
                $fileUpload->{FileUpload::FIELD__ERROR_MESSAGE} = "Session expired for token";
            } else {
                $curPath   = $fileUpload->{FileUpload::FIELD__PATH};
                $extension = explode(".", $curPath)[1];
                $fileName  = join(".", [$count, $extension]);
                $newPath   = $newDirectory . $fileName;

                //move file to new destination
                if (Storage::exists($newPath)) {
                    Storage::delete($newPath);
                }

                if ( ! Storage::copy($curPath, $newPath)) {
                    throw new \Exception("Files not copied");
                }


                //delete temp file
                $fileUpload->delete();

                if ( ! Storage::delete($curPath)) {
                    Log::warning("File '{$curPath}' not deleted");
                }

                //save business file
                $file = new File();
                $file->fill($fileUpload->toArray());
                $file->{File::FIELD__NAME}             = $fileName;
                $file->{File::FIELD__PATH}             = $newPath;
                $file->{File::FIELD__EXTENSION}        = $extension;
                $file->{File::FIELD__RELATED_ID}       = $business->id;
                $file->{File::FIELD__RELATED_TYPE}     = Business::class;
                $file->{File::FIELD__COPIED_FROM_PATH} = $curPath;
                $file->save();
            }

            $fileUpload->save();
        });

        if ( ! Storage::deleteDirectory($directory)) {
            Log::warning("Directory '{$newDirectory}' wasn't deleted");
        }
    }
}
