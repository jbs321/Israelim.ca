<?php

namespace App\Http\Controllers;

use App\Business;
use App\File;
use App\FileUpload;
use App\Http\Requests\BusinessRequest;
use App\Services\BusinessService;
use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Validator;

class BusinessController extends Controller
{
    /** @var BusinessService $businessService */
    protected $businessService;

    public function __construct(BusinessService $businessService)
    {
        $this->middleware(StartSession::class);
        $this->businessService = $businessService;
    }

    public function show(Request $request, Business $business)
    {
        $business->getAllRelationships();

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
        $business                            = new Business();
        $business->{Business::FIELD_USER_ID} = Auth::user()->id;
        $business->{Business::FIELD_STATUS}  = Business::STATUS__INFO_REGISTERED;
        $business->fill($request->all());
        $business->save();

        $token  = $request->session()->token();
        $images = $request->get('images');
        $paths  = isset($images) ? explode(",", $images) : [];
        $this->businessService->saveMultipleFilesFromTmp($token, $paths, $business);

        $business->getAllRelationships();

        return new JsonResponse($business);
    }

    public function delete(Business $business)
    {
        $business->delete();
        return new JsonResponse($business);
    }

    public function update(BusinessRequest $request, Business $business)
    {
        $token  = $request->session()->token();
        $images = $request->get('images');
        $paths  = isset($images) ? explode(",", $images) : [];
        $this->businessService->saveMultipleFilesFromTmp($token, $paths, $business);

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

    public function deleteImage(Request $request, File $file)
    {
        /** @var Collection $business */
        $business = $file->related()->first();

        if(Auth::user()->id !== $business->user->id) {
            throw new \Exception("No permission to remove this image");
        }

        if(!Storage::delete($file->{File::FIELD__PATH})) {
            Log::warning("File in path: {$file->{File::FIELD__PATH}} wasn't deleted");
        }

        $file->delete();

        return new JsonResponse($file);
    }
}
