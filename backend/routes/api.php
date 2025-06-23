<?php

use Illuminate\Support\Facades\Route;

Route::prefix('orders')->group(function () {
    Route::post('/', function () { /* ... */ });
    Route::get('/{uuid}', function () { /* ... */ });
    Route::delete('/{uuid}', function () { /* ... */ });
    Route::get('/', function () { /* ... */ });
});
