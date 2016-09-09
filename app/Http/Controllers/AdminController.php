<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Building9a;
use App\Building30;
use App\Building33;

use View;

use Auth;


class AdminController extends Controller
{
    /**
     * Index
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function index() {
        if(!Auth::check()) {
            return View::make('welcome');
        }

        $flats = Building33::all();
        return View::make('admin-panel.index')
            ->with('flats', $flats);
    }

    public function store(Request $request) {
        $i = $request->input('number');
        $floor = $request->input('floor');
        for( $i ; $i <= 178 ; $i += 10 ) {
            $flats = new Building_30;
            $flats->section = $request->input('section');
            $flats->floor   = $floor;
            $flats->number  = $i;
            $flats->rooms   = $request->input('rooms');
            $flats->area    = $request->input('area');
            $flats->onPlan  = $request->input('onPlan');
            $flats->onSale  = $request->input('onSale');
            $flats->sales   = $request->input('sales');
            $flats->save();


            $floor++;
        }
        $newFlats = Building33::all();
        return View::make('admin-panel.index')
            ->with('flats', $newFlats);
    }
}
