<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Building9a;

use App\Building29a;

use App\Building30;

class Building9aController extends Controller
{
    /**
     * Index
     */
    public function index() {

    }

    /**
     * Add new
     * @param Request $request
     */
    public function store(Request $request) {

    }

    /**
     * Show one
     * @param $id
     */
    public function show($id) {

    }

    /**
     * Update
     * @param Request $request
     * @param $id
     */
    public function update(Request $request, $id) {

    }

    /**
     * Delete
     * @param Request $request
     */
    public function destroy(Request $request) {

    }

    public function getOnSaleFlats($section) {

        switch ($section) {
            case '9a':
                $flat['count'] = Building9a::all()->where('onSale', 1)->count();
                $flat['oneroom'] = Building9a::all()->where('onSale', 1)->where('rooms', 1)->count();
                $flat['tworooms'] = Building9a::all()->where('onSale', 1)->where('rooms', 2)->count();
                $flat['threerooms'] = Building9a::all()->where('onSale', 1)->where('rooms', 3)->count();     
                break;
            case '29a':
                $flat['count'] = Building29a::all()->where('onSale', 1)->count();
                $flat['oneroom'] = Building29a::all()->where('onSale', 1)->where('rooms', 1)->count();
                $flat['tworooms'] = Building29a::all()->where('onSale', 1)->where('rooms', 2)->count();
                $flat['threerooms'] = Building29a::all()->where('onSale', 1)->where('rooms', 3)->count();
                break;   
            case '30':
                $flat['count'] = Building30::all()->where('onSale', 1)->count();
                $flat['oneroom'] = Building30::all()->where('onSale', 1)->where('rooms', 1)->count();
                $flat['tworooms'] = Building30::all()->where('onSale', 1)->where('rooms', 2)->count();
                $flat['threerooms'] = Building30::all()->where('onSale', 1)->where('rooms', 3)->count();     
                break;
            default:
                $flat = 'error';
                break;
        }
        
        return $flat;
    }

    public function getSection_1() {
        $flat['count'] = Building9a::all()->where('onSale', 1)->where('section', 1)->count();
        $flat['oneroom'] = Building9a::all()->where('onSale', 1)->where('section', 1)->where('rooms', 1)->count();
        $flat['tworooms'] = Building9a::all()->where('onSale', 1)->where('section', 1)->where('rooms', 2)->count();
        $flat['threerooms'] = Building9a::all()->where('onSale', 1)->where('section', 1)->where('rooms', 3)->count();
        return $flat;
    }

    public function getSection_2() {
        $flat['count'] = Building9a::all()->where('onSale', 1)->where('section', 2)->count();
        $flat['oneroom'] = Building9a::all()->where('onSale', 1)->where('section', 2)->where('rooms', 1)->count();
        $flat['tworooms'] = Building9a::all()->where('onSale', 1)->where('section', 2)->where('rooms', 2)->count();
        $flat['threerooms'] = Building9a::all()->where('onSale', 1)->where('section', 2)->where('rooms', 3)->count();
        return $flat;
    }

    public function getFloorFlats($section, $floor) {
        $section = (int) $section;
        $floor = (int) $floor;
        $flat['count'] = Building9a::all()->where('onSale', 1)->where('section', $section)->where('floor', $floor)->count();
        $flat['oneroom'] = Building9a::all()->where('onSale', 1)->where('section', $section)->where('rooms', 1)->where('floor', $floor)->count();
        $flat['tworooms'] = Building9a::all()->where('onSale', 1)->where('section', $section)->where('rooms', 2)->where('floor', $floor)->count();
        $flat['threerooms'] = Building9a::all()->where('onSale', 1)->where('section', $section)->where('rooms', 3)->where('floor', $floor)->count();
        return $flat;
    }

    public function getRoomNumber($section, $floor, $room) {
        $section = (int) $section;
        $floor = (int) $floor;
        $room = (int) $room;
        $arr = [$section, $floor, $room];
        $number = Building9a::all()->where('section', $section)->where('floor', $floor)->where('onPlan', $room);
        $number1 = 0;
        foreach($number as $num) {
            $number1 = $num;
        }
        return $number1;
    }
}
