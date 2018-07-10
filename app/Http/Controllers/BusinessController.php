<?php

namespace App\Http\Controllers;

use App\Business;
use App\File;
use App\FileUpload;
use App\Http\Requests\BusinessRequest;
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

        $business = new Business();
        $business->fill($details);
        $business->save();
        
        if (isset($details['images'])) {
            $paths = explode(",", $details['images']);

            foreach ($paths as $key => $path) {

                /** @var FileUpload $fileUpload */
                $fileUpload = FileUpload::where("path", $path)->firstOrFail();

                if (strpos($path, $token) === false) {
                    $fileUpload->{FileUpload::FIELD__ERROR_MESSAGE} = "Wrong session save attempt";
                } else {
                    //old/new paths
                    $tmpPath   = $fileUpload->{FileUpload::FIELD__PATH};
                    $extension = explode(".", $tmpPath)[1];
                    $newPath   = UploadController::PATH_BUSINESS_IMAGES . "/$business->id/$userId/$key.$extension";

                    //move file to new destination
                    Storage::move($tmpPath, $newPath);

                    //save new File Location
                    $fileUpload->{FileUpload::FIELD__PATH} = $newPath;

                    //save business file
                    $businessFile = new File();
                    $businessFile->fill($fileUpload->toArray());
                    $businessFile->{File::FIELD__BUSINESS_ID} = $business->id;
                    $businessFile->save();
                }

                $fileUpload->save();
            }

            Storage::deleteDirectory(UploadController::PATH_TEMP_IMAGES . "/$token");
        }

        $businessArr = array_merge($business->toArray(), ['business_id' => $business->id]);

        return new JsonResponse($businessArr);
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

        return new JsonResponse($business);
    }
}
