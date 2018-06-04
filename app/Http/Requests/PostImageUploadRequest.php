<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostImageUploadRequest extends FormRequest
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
        $rules = [
            'num_photos' => 'required|numeric|min:1|max:10',
        ];

        for($i = 0; $i < $this->input('num_photos'); $i++) {
            $rules["photo[{$i}]"] = 'image|mimes:jpeg,bmp,png|max:2000';
        }

        return $rules;
    }
}
