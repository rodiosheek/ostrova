<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Building9a;

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

        $flats = Building9a::all();
        return View::make('admin-panel.index')
            ->with('flats', $flats);
    }

    public function store(Request $request) {
        $i = $request->input('number');
        $floor = $request->input('floor');
        for( $i ; $i <= 298 ; $i += 8 ) {
            $flats = new Building9a;
            $flats->section = $request->input('section');
            $flats->floor   = $floor;
            $flats->number  = $i;
            $flats->rooms   = $request->input('rooms');
            $flats->area    = $request->input('area');
            $flats->onSale  = $request->input('onSale');
            $flats->sales   = $request->input('sales');
            $flats->save();


            $floor++;
        }
        $newFlats = Building9a::all();
        return View::make('admin-panel.index')
            ->with('flats', $newFlats);
    }
}
