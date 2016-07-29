<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Coords;



class CoordsController extends Controller
{
    public function getCoords() {
        return Coords::all();
    }

}
