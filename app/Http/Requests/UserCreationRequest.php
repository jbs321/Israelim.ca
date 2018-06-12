<?php

namespace App\Http\Requests;

use App\User;
use Illuminate\Foundation\Http\FormRequest;

class UserCreationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
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
            User::FIELD_FIRST_NAME   => 'required|max:35',
            User::FIELD_LAST_NAME    => 'required|max:35',
            User::FIELD_EMAIL        => 'required|email|max:191',
            User::FIELD_PHONE_NUMBER => "required|regex:/^[+](\d[\s-]?)?[\(\[\s-]{0,2}?\d{3}[\)\]\s-]{0,2}?\d{3}[\s-]?\d{4}$/i",
            User::FIELD_PASSWORD     => 'required|confirmed|min:6|max:30'
        ];
    }
}
