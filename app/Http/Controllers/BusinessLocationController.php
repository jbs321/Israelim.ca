<?php

namespace App\Http\Controllers;

use App\Business;
use App\BusinessLocation;
use App\Http\Requests\BusinessLocationRequest;
use Google\Facades\Google;
use Google\Types\GooglePlacesResponse;
use Google\Types\GooglePlacesResult;
use Illuminate\Http\JsonResponse;

class BusinessLocationController extends Controller
{
    /**
     * @param BusinessLocationRequest $request
     *
     * @return JsonResponse
     * @throws \Exception
     */
    public function create(BusinessLocationRequest $request)
    {
        $location = new BusinessLocation();
        $location->fill($request->all());

        $query = join(", ", [
            $location->{BusinessLocation::FIELD_COUNTRY},
            $location->{BusinessLocation::FIELD_PROVINCE},
            $location->{BusinessLocation::FIELD_CITY},
            $location->{BusinessLocation::FIELD_ADDRESS},
            $location->{BusinessLocation::FIELD_POSTAL_CODE},
        ]);

        $address = Google::placesAutoComplete()->findAddressByQuery($query);
        $place   = Google::places()->findAddressByQuery($query);

        if (empty($address) && $place->getStatus() != GooglePlacesResponse::STATUS_TYPE__OK) {
            return new JsonResponse(["status" => "not found", "message" => "Address not found"], 404);
        }

        /** @var GooglePlacesResult $location */
        $place = $place->getResults()->first();

        $location->{BusinessLocation::FIELD_LAT} = $place->getLat();
        $location->{BusinessLocation::FIELD_LNG} = $place->getLng();
        BusinessLocation::updateOrCreate($location->toArray());

        /** @var Business $business */
        $business = $location->business;
        $business->location;

        return new JsonResponse($business);
    }

    /**
     * @param BusinessLocation $businessLocation
     *
     * @return JsonResponse
     */
    public function confirmLocation(BusinessLocation $businessLocation)
    {
        $businessLocation->update([
            BusinessLocation::FIELD_IS_CONFIRMED => true
        ]);

        /** @var Business $business */
        $business = $businessLocation->business();
        $business->location;

        return new JsonResponse($business);
    }
}
