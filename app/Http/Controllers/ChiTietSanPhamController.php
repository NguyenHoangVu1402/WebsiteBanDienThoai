<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChiTietSanPhamController extends Controller
{
    public function index()
    {
        return view('user.chi_tiet_san_pham');
    }
}
