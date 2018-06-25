<?php

use Illuminate\Http\Request;

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


Route::post('/upload', 'UploadController@uploadImages');
Route::delete('/upload/delete', 'UploadController@deleteFile');


Route::post('/business', 'BusinessController@index');

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

    Route::post('posts/{post}/uploadImages', 'PostImageController@saveImages');

    Route::prefix('business')->group(function () {
        Route::post('/register', 'BusinessController@create');
        Route::post('/register/update', 'BusinessController@update');
        Route::post('/register/delete', 'BusinessController@delete');
    });
});



