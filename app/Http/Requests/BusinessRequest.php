<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Business;
use Illuminate\Support\Facades\Auth;

class BusinessRequest extends FormRequest
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
            Business::FIELD_PHONE_NUMBER => 'required',
            Business::FIELD_NAME => 'required',
            Business::FIELD_EMAIL => 'required|email',
            Business::FIELD_ADDRESS => 'required',
            Business::FIELD_PROVINCE => 'required',
            Business::FIELD_CITY => 'required',
            Business::FIELD_COUNTRY => 'required',
            Business::FIELD_INDUSTRY => 'required',
        ];
    }
}
