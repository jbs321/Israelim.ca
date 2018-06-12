<?php

namespace App\Http\Controllers;

use App\Business;
use App\Http\Requests\BusinessRequest;
use function Couchbase\defaultDecoder;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class BusinessController extends Controller
{
    public function create(BusinessRequest $request)
    {
        $details = $request->all();
        $details[Business::FIELD_USER_ID] = Auth::user()->id;
        $business = new Business();
        $business->fill($details);
        $business->save();

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