<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChiTietSanPhamController;
use App\Http\Controllers\GioHangController;
use App\Http\Controllers\TrangChuController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MenuController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', [TrangChuController::class, 'index_user']);
Route::get('/Admin_Admin', [TrangChuController::class, 'index_admin']);
Route::get('/chi_tiet_san_pham', [ChiTietSanPhamController::class, 'index']);
Route::get('/gio_hang', [GioHangController::class, 'index']);


Route::prefix('categories')->group(function (){
    Route::get('/create',[
        'as' => 'categories.create',
        'uses' => 'App\Http\Controllers\CategoryController@create'
    ]);
    Route::get('/',[
        'as' => 'categories.index',
        'uses' => 'App\Http\Controllers\CategoryController@index'
    ]);
    Route::post('/store',[
        'as' => 'categories.store',
        'uses' => 'App\Http\Controllers\CategoryController@store'
    ]);
    Route::get('/edit/{id}',[
        'as' => 'categories.edit',
        'uses' => 'App\Http\Controllers\CategoryController@edit'
    ]);
    Route::post('/update/{id}',[
        'as' => 'categories.update',
        'uses' => 'App\Http\Controllers\CategoryController@update'
    ]);
    Route::get('/delete/{id}',[
        'as' => 'categories.delete',
        'uses' => 'App\Http\Controllers\CategoryController@delete'
    ]);
});

Route::prefix('menus')->group(function (){
    Route::get('/',[
        'as' => 'menus.index',
        'uses' => 'App\Http\Controllers\MenuController@index'
    ]);
    Route::get('/create',[
        'as' => 'menus.create',
        'uses' => 'App\Http\Controllers\MenuController@create'
    ]);
    Route::post('/store',[
        'as' => 'menus.store',
        'uses' => 'App\Http\Controllers\MenuController@store'
    ]);
    
});