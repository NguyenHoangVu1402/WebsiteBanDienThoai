<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function index(){
        return view('admin.Menus.index');
    }

    public function create(){
        return view('admin.Menus.add');
    }
}
