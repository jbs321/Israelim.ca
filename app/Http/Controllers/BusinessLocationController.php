<?php

namespace App\Http\Controllers;

use App\Business;
use App\Location;
use App\Http\Requests\BusinessLocationRequest;
use Google\Facades\Google;
use Google\Types\GooglePlacesResponse;
use Google\Types\GooglePlacesResult;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
        $location = new Location();
        $location->fill($request->all());
        $location->{Location::FIELD_RELATED_TYPE} = Business::class;

        $query = join(", ", [
            $location->{Location::FIELD_COUNTRY},
            $location->{Location::FIELD_PROVINCE},
            $location->{Location::FIELD_CITY},
            $location->{Location::FIELD_ADDRESS},
            $location->{Location::FIELD_POSTAL_CODE},
        ]);

        $place = Google::places()->findAddressByQuery($query);

        if ($place->getStatus() != GooglePlacesResponse::STATUS_TYPE__OK) {
            return new JsonResponse(["status" => "not found", "message" => "Address not found"], 404);
        }

        /** @var GooglePlacesResult $location */
        $place = $place->getResults()->first();

        $location->{Location::FIELD_LAT} = $place->getLat();
        $location->{Location::FIELD_LNG} = $place->getLng();
        Location::updateOrCreate($location->toArray());

        /** @var Business $business */
        $business         = $location->related;
        $business->status = Business::STATUS__LOCATION_REGISTERED;
        $business->save();
        $business->getAllRelationships();

        return new JsonResponse($business);
    }

    /**
     * @param Location $location
     *
     * @return JsonResponse
     */
    public function confirmLocation(Location $location)
    {
        $location->update([
            Location::FIELD_IS_CONFIRMED => true
        ]);

        /** @var Business $business */
        $business         = $location->related;
        $business->status = Business::STATUS__REGISTRATION_FINISHED;
        $business->save();
        $business->getAllRelationships();

        return new JsonResponse($business);
    }

    public function validateLocation(Request $request, Location $location)
    {
        $rules     = [
            Location::FIELD_CITY        => 'required',
            Location::FIELD_ADDRESS     => 'required',
            Location::FIELD_POSTAL_CODE => 'required',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return new JsonResponse($validator->errors());
        }

        $location->fill($request->all());

        $query = join(", ", [
            $location->{Location::FIELD_COUNTRY},
            $location->{Location::FIELD_PROVINCE},
            $location->{Location::FIELD_CITY},
            $location->{Location::FIELD_ADDRESS},
            $location->{Location::FIELD_POSTAL_CODE},
        ]);

        $place = Google::places()->findAddressByQuery($query);

        $validator = Validator::make($request->all(), [
            Location::FIELD_ADDRESS => [
                function ($attribute, $value, $fail) use ($place) {
                    if ($place->getStatus() != GooglePlacesResponse::STATUS_TYPE__OK) {
                        return $fail('Address not exists');
                    }
                },
            ]
        ]);

        if ($validator->fails()) {
            return new JsonResponse($validator->errors());
        }

        return new JsonResponse(["validation" => "success"]);
    }
}
