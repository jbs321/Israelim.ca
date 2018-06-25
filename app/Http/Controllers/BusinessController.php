<?php

namespace App\Http\Controllers;

use App\Business;
use App\BusinessFile;
use App\FileUpload;
use App\Http\Requests\BusinessRequest;
use function Couchbase\defaultDecoder;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class BusinessController extends Controller
{
    public function index()
    {
        /** @var Collection $list */
        $list = Business::paginate(8);

        $list->each(function (Business &$item, $key) {
            $item->idx = $key;

            return $item;
        });

        return new JsonResponse($list);
    }

    public function create(BusinessRequest $request)
    {
        $details                          = $request->all();
        $details[Business::FIELD_USER_ID] = Auth::user()->id;
        $business                         = new Business();
        $business->fill($details);
        $business->save();

        $paths = explode(",", $details['images']);

        foreach ($paths as $path) {
            /** @var FileUpload $fileUpload */
            $fileUpload = FileUpload::where("path", $path)->firstOrFail();

            //old/new paths
            $tmpPath    = $fileUpload->{FileUpload::FIELD__PATH};
            $newPath    = UploadController::PATH_BUSINESS_IMAGES . "/" . $business->id;

            //move file to new destination
            Storage::move($tmpPath, $newPath);

            //save new File Location
            $fileUpload->{FileUpload::FIELD__PATH} = $newPath;
            $fileUpload->save();

            //save business file
            $businesFile = new BusinessFile();
            $businesFile->fill($fileUpload->toArray());
            $businesFile->{BusinessFile::FIELD__BUSINESS_ID} = $business->id;
            $businesFile->save();
        }

        return new JsonResponse($business);
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
