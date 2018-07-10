<?php

use Illuminate\Http\Request;
use App\Http\Middleware\FileArrayValidationMiddleware;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/ping', function (Request $request) {
    return new \Illuminate\Http\JsonResponse(["pong" => [1, 2, 3, 4]]);
});

Route::get('/address/{query}', 'GooglePlacesController@findAddress');

Route::post('/business', 'BusinessController@index');
Route::get('/business/{business}', 'BusinessController@show');

Route::post('/register', 'Auth\RegisterController@create');
Route::post('/register/update', 'Auth\RegisterController@update');
Route::post('/register/validator', 'Auth\RegisterController@validator');

Route::middleware(['auth:api'])->group(function () {
    Route::post('/chart/sugar', 'HomeController@index');
    Route::get('posts/{post}', 'PostController@findByPost');
    Route::post('posts/{post}', 'PostController@update');
    Route::get('/user/posts', 'PostController@findAllByUser');
    Route::post('post/store', 'PostController@store');
    Route::delete('posts/{post}/delete', 'PostController@destroy');

    //File Uploads
    Route::post('/upload', 'UploadController@upload');
    Route::delete('/upload/delete', 'UploadController@delete');

    Route::prefix('business')->group(function () {
        Route::prefix('register')->group(function () {
            Route::post('general', 'BusinessController@create');
            Route::put('/general', 'BusinessController@update');
            Route::delete('/general', 'BusinessController@delete');

            Route::post('location', 'BusinessLocationController@create');
            Route::post('location/validate', 'BusinessLocationController@validateLocation');
            Route::post('location/confirm/{location}', 'BusinessLocationController@confirmLocation');
        });
    });
});
