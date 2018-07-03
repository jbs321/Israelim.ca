<?php

namespace App\Http\Controllers;

use Google\Facades\Google;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GooglePlacesController extends Controller
{
    public function findAddress($query)
    {
        $result = Google::placesAutoComplete()->findAddressByQuery($query);
        return new JsonResponse($result);
    }
}
