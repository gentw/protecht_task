<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
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

Route::get('/', function () {
    return redirect('/login');
});

Route::get('/home', [App\Http\Controllers\ProductController::class, 'index'])->name('home');

Route::get('/web/{any}', function () {
    return view('app');
})->where('any', '.*')->middleware('auth');

Route::middleware('auth')->group(function () {
    Route::prefix('api')->group(function () {
        Route::post('addProduct', [ProductController::class, 'addProduct']);
        Route::put('updateProduct/{id}', [ProductController::class, 'update']);
        Route::get('viewProduct/{id}', [ProductController::class, 'viewProduct']);
        Route::get('deleteProduct/{id}', [ProductController::class, 'deleteProduct']);
        Route::get('fetchProducts', [ProductController::class, 'fetchProducts']);
    });
});

Auth::routes();