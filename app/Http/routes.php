<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

use Illuminate\Support\Facades\Input;

Route::get('/', 'AppController@index');

Route::resource('api/building9a', 'Building9aCtrl');

Route::auth();

Route::get('/home', 'HomeController@index');

Route::get('auth/login', 'Auth\AuthController@getLogin');
Route::post('auth/login', 'Auth\AuthController@postLogin');
Route::get('auth/logout', 'Auth\AuthController@getLogout');

Route::get('/admin-panel', 'AdminController@index');

Route::post('/admin-panel/store', 'AdminController@store');

/**
 * Map AJAX
 */
Route::get('/get-coordinate', 'CoordsController@getCoords');

Route::get('/get-onsale-flats/{section}', 'Building9aController@getOnSaleFlats');

Route::get('/get-flats-section/{building}/{section}', 'Building9aController@getSection');

Route::get('/get-flats-section-2', 'Building9aController@getSection_2');

Route::get('/get-floor-flats/{section}/{floor}', 'Building9aController@getFloorFlats');

Route::get('/get-room-number/{section}/{floor}/{room}', 'Building9aController@getRoomNumber');


/**
 * Send email
 */
Route::post('send/{id}', function($id){
    Mail::send('emails.action', array(
        'username' => Input::get('name'),
        'email' => Input::get('email'),
        'phone' => Input::get('phone'),
        'id' => $id),
        function($message){
            $message->to('cevinroody@gmail.com', 'Острова почта тест')->subject('Прошу забронировать квартиру');
        });
    return Redirect::to('/');
});