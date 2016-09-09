<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class AppController extends Controller
{
    public function index(Request $request) {
        //return view('index');
        if($request->is('news')) {
        	return 'news';
        } else {
        	return view('index');
        }
    }
}
