<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TrangChuController extends Controller
{
    public function index_user()
    {
        return view('user.trangchu');
    }
    
    public function index_admin()
    {
        return view('admin.trangchu');
    }
}
