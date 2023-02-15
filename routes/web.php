<?php

use App\Events\TestEvent;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Route;

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
    // $data = [
    //     'event' => 'testEvent',
    //     'data' => [
    //         'name' => 'John Doe',
    //         'Gender' => 'Male'
    //     ]
    // ];

    event(new TestEvent());

    // Redis::publish('test-channel', json_encode($data));

    return view('welcome');
});
