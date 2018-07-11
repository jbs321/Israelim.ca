<?php
Route::post('/business', 'BusinessController@index');
Route::get('/business/{businessEncrypted}', 'BusinessController@show');

Route::post('/register', 'Auth\RegisterController@create');
Route::post('/register/update', 'Auth\RegisterController@update');
Route::post('/register/validator', 'Auth\RegisterController@validator');


Route::middleware(['auth:api'])->group(function () {
    //File Uploads
    Route::post('/upload', 'UploadController@upload');
    Route::delete('/upload/delete', 'UploadController@delete');

    Route::prefix('business')->group(function () {
        Route::prefix('register')->group(function () {
            Route::post('/reload', 'BusinessController@reload');
            Route::post('general', 'BusinessController@create');
            Route::post('/general/update/{business}', 'BusinessController@update');
            Route::delete('/general', 'BusinessController@delete');
            Route::post('general/image/{file}', 'BusinessController@deleteImage');

            Route::post('location', 'BusinessLocationController@create');
            Route::post('location/validate', 'BusinessLocationController@validateLocation');
            Route::post('location/confirm/{location}', 'BusinessLocationController@confirmLocation');
        });
    });
});
