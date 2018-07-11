<?php

namespace App\Http\Controllers;

use App\Business;
use App\File;
use App\FileUpload;
use App\Http\Requests\BusinessRequest;
use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class BusinessController extends Controller
{
    public function __construct()
    {
        $this->middleware(StartSession::class);
    }

    public function show(Request $request, Business $business)
    {
        $business->images;
        $business->location;

        return new JsonResponse($business);
    }

    public function index()
    {
        /** @var Collection $list */
        $list = Business::paginate(8);

        $list->each(function (Business &$item, $key) {
            $item->images;
            $item->idx = encrypt($item->id);

            return $item;
        });

        return new JsonResponse($list);
    }

    public function create(BusinessRequest $request)
    {
        $token                            = $request->session()->token();
        $details                          = $request->all();
        $userId                           = Auth::user()->id;
        $details[Business::FIELD_USER_ID] = $userId;

        $business         = new Business();
        $business->status = Business::STATUS__INFO_REGISTERED;
        $business->fill($details);
        $business->save();

        $directory = UploadController::PATH_TEMP_FILES . "/{$token}";

        if (isset($details['images'])) {
            $paths = explode(",", $details['images']);

            foreach ($paths as $key => $path) {
                /** @var FileUpload $fileUpload */
                $fileUpload = FileUpload::where("path", $path)->firstOrFail();
                $files      = Storage::files($directory);

                if ( ! in_array($path, $files)) {
                    throw new \Exception("Missing file in directory");
                }

                if (strpos($path, $token) === false) {
                    $fileUpload->{FileUpload::FIELD__ERROR_MESSAGE} = "Wrong session save attempt";
                } else {
                    $curPath   = $fileUpload->{FileUpload::FIELD__PATH};
                    $extension = explode(".", $curPath)[1];
                    $fileName  = join(".", [$key, $extension]);
                    $newPath   = $this->createBusinessImagePath($business) . $fileName;

                    //move file to new destination
                    if (Storage::exists($newPath)) {
                        Storage::delete($newPath);
                    }

                    Storage::copy($curPath, $newPath);


                    //delete temp file
                    $fileUpload->delete();
                    Storage::delete($curPath);

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
            }

            Storage::deleteDirectory($directory);
        }

        $business->images;

        return new JsonResponse($business);
    }

    /**
     * @param Business $business
     * @param string $basePath
     *
     * @return string
     */
    protected function createBusinessImagePath(
        Business $business,
        $basePath = UploadController::PATH_BUSINESS_IMAGES
    ): string {
        $userId     = Auth::user()->id;
        $businessId = $business->id;

        $sections   = [];
        $sections[] = $basePath;

        if (isset($businessId)) {
            $sections[] = $businessId;
        }

        if (isset($userId)) {
            $sections[] = $userId;
        }

        $path = join("/", $sections) . "/";

        return $path;
    }

    public function delete(Business $business)
    {
        $business->delete();

        return new JsonResponse($business);
    }

    public function update(BusinessRequest $request, Business $business)
    {
        $business->update($request->all());
        $business->save();
        $business->getAllRelationships();

        return new JsonResponse($business);
    }

    public function reload()
    {
        /** @var User $user */
        $user = Auth::user();
        /** @var Business $business */
        $business = Business::where([
            [Business::FIELD_USER_ID, '=', $user->id],
            [Business::FIELD_STATUS, '<>', Business::STATUS__REGISTRATION_FINISHED],
        ])->first();

        $business->getAllRelationships();
        return new JsonResponse($business);
    }
}
