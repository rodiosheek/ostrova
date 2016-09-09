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

use App\Rating;

use App\RatingIp;

/**
 * Map AJAX
 */


    Route::get('/get-coordinate', 'CoordsController@getCoords');

    Route::get('/get-onsale-flats/{section}', 'Building9aController@getOnSaleFlats');

    Route::get('/get-flats-section/{building}/{section}', 'Building9aController@getSection');

    Route::get('/get-flats-section-2', 'Building9aController@getSection_2');

    Route::get('/get-floor-flats/{section}/{floor}', 'Building9aController@getFloorFlats');

    Route::get('/get-room-number/{building}/{section}/{floor}/{room}', 'Building9aController@getRoomNumber');

    Route::get('/get-sales-flats/{building}/{section}/{floor}', 'Building9aController@getSalesFats');

    Route::get('/get-all-rooms/{building}/{section}/{floor}', 'Building9aController@getAllRooms');

    
    
Route::post('/send/{building}/{id}', function($building, $id){
    Mail::send('emails.action', array(
        'username' => Input::get('name'),
        'email' => Input::get('email'),
        'phone' => Input::get('phone'),
        'building' => $building,
        'id' => $id),
        function($message){
            $message->to('cevinroody@gmail.com', 'Острова почта тест')->cc('rodion.tokovchuk@gmail.com')->subject('Прошу забронировать квартиру');
        });
    return 'OK';
});

    Route::get('/rating-all', function() {
        $rating = Rating::all();
        return $rating;
    });

    Route::get('/rating-plus/{id}', function($id) {
        $ip = (string) $_SERVER['REMOTE_ADDR'];
    
        //$rating_ip = RatingIp::all()->where('ip', $ip)->count();
        $rating_ip = 0;
        if($rating_ip == 0) {
            $old_rating = Rating::find($id)->rating_plus;
            Rating::where('manager_id', $id)->update(array('rating_plus' => $old_rating + 1));
            $new_ip = new RatingIp();
            $new_ip->ip = $ip;
            $new_ip->save();
            $message = 'done';
        } else {
            $message = 'not';
        }

        return $message;
    });

    Route::get('/rating-minus/{id}', function($id) {
        $ip = $_SERVER['REMOTE_ADDR'];
    
        //$rating_ip = RatingIp::all()->where('ip', $ip)->count();
        $rating_ip = 0;
        if($rating_ip == 0) {
            $old_rating = Rating::find($id)->rating_minus;
            Rating::where('manager_id', $id)->update(array('rating_minus' => $old_rating + 1));
            $message = 'done';
        } else {
            $message = 'not';
        }

        return $message;
    });








Route::auth();

Route::get('/home', 'HomeController@index');

Route::get('auth/login', 'Auth\AuthController@getLogin');
Route::post('auth/login', 'Auth\AuthController@postLogin');
Route::get('auth/logout', 'Auth\AuthController@getLogout');

Route::get('/admin-panel', 'AdminController@index');

Route::post('/admin-panel/store', 'AdminController@store');

Route::any('{path?}', 'AppController@index')->where('path', '.+');



/**
 * Send email
 */

/*

*/