<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;

Route::post('/order', [OrderController::class, 'store']);
Route::get('/order/{uuid}', [OrderController::class, 'show']);
Route::delete('/order/{uuid}', [OrderController::class, 'destroy']);
Route::get('/orders', [OrderController::class, 'index']);
