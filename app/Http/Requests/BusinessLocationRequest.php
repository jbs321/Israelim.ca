<?php

namespace App\Http\Requests;

use App\Business;
use App\Location;
use App\User;
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
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            Location::FIELD_RELATED_ID => [
                'required',
                function($attribute, $value, $fail) {
                    if(!Business::find($value)) {
                        return $fail("Business Not Found");
                    }
                },
            ],
            Location::FIELD_CITY        => 'required',
            Location::FIELD_ADDRESS     => 'required',
            Location::FIELD_POSTAL_CODE => 'required',
        ];
    }
}
