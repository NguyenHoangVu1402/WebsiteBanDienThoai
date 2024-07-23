<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GioHangController extends Controller
{
    public function index()
    {
        return view('user.gio_hang');
    }
}
