<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\UserCreationRequest;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    protected function validator(Request $request)
    {
        $rules = (new UserCreationRequest)->rules();

        if ($request->get(User::FIELD_ID)) {
            $user = User::where('id', decrypt($request->get(User::FIELD_ID)))->first();
        }

        if (isset($user)) {
            if ($request->get(User::FIELD_EMAIL) !== $user->email) {
                $rules['email'] = 'required|unique:users';
            }
        } else {
            $rules['email'] = 'required|unique:users';
        }

        $validator = Validator::make($request->all(), $rules);

        if ( ! $validator->fails()) {
            return new JsonResponse(["validation" => "success"]);
        }

        $errors = $validator->errors();

        return new JsonResponse($errors);
    }

    /**
     * @param UserCreationRequest $request
     *
     * @return JsonResponse
     */
    protected function create(UserCreationRequest $request)
    {
        $request->validated([
            'email' => 'required|unique:users'
        ]);

        $details             = $request->all();
        $remember            = $details;
        $details['password'] = Hash::make($details['password']);

        $newUser = new User();
        $newUser->fill($details);
        $newUser->save();

        $remember['id'] = encrypt($newUser->id);

        return new JsonResponse($remember);
    }

    /**
     * @param UserCreationRequest $request
     * @param $user
     *
     * @return JsonResponse
     */
    protected function update(UserCreationRequest $request)
    {
        $request->validate([
            'id' => 'required',
        ]);

        $id      = decrypt($request->get('id'));
        $user    = User::where('id', $id)->first();
        $details = $request->all();

        $details[User::FIELD_PASSWORD] = Hash::make($request->get(User::FIELD_PASSWORD));

        $details['id'] = $id;
        unset($details['password_confirmation']);
        $user->update($details);
        $details['id'] = $request->get('id');

        $details[User::FIELD_PASSWORD] = $request->get(User::FIELD_PASSWORD);

        return new JsonResponse($details);
    }
}


