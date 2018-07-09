<?php

namespace App\Http\Requests;

use App\Business;
use App\BusinessLocation;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class BusinessLocationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        //TODO::change it to Auth::check();
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            BusinessLocation::FIELD_BUSINESS_ID => [
                'required',
                function($attribute, $value, $fail) {
                    if(!Business::find($value)) {
                        return $fail("Business Not Found");
                    }
                },
            ],
            BusinessLocation::FIELD_APARTMENT   => 'required',
            BusinessLocation::FIELD_CITY        => 'required',
            BusinessLocation::FIELD_ADDRESS     => 'required',
            BusinessLocation::FIELD_POSTAL_CODE => 'required',
        ];
    }
}
