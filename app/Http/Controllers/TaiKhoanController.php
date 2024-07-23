<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TaiKhoanController extends Controller
{
    public function dangnhap(){
        return view('user.dang_nhap');
    }

    public function dangki(){
        return view('user.dang_ki');
    }
}
