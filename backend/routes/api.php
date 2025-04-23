<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\SubCityController;
use App\Http\Controllers\StatiquesController;
use App\Http\Controllers\SubServiceController;
use App\Http\Controllers\DescriptionController;



Route::post('/login', [AuthController::class, 'login']);  
Route::get('/service', [ServiceController::class, 'show']);
Route::get('/city', [CityController::class, 'show']);
Route::get('/cities/filter', [CityController::class, 'filter']); //search for city by name
Route::get('/description', [DescriptionController::class, 'show']);
Route::get('/images', [ImageController::class, 'index']);
Route::get('/images/filter', [ImageController::class, 'filter']); // For filtering by city, service, or description
// SubService API routes
Route::get('/subservices', [SubServiceController::class, 'index']);
Route::get('/subservices/{id}', [SubServiceController::class, 'show']);
Route::get('/subcities', [SubCityController::class, 'index']);        // Get all subcities
Route::get('/subcities/{id}', [SubCityController::class, 'show']);    // Get one subcity
Route::get('/images/filter', [ImageController::class, 'filter']);
Route::get('/blogs', [BlogController::class, 'index']);
Route::get('/blogs/{id}', [BlogController::class, 'show']);
Route::post('/forgot-password', [UserController::class, 'forgotPassword']);
Route::post('/reset-password', [UserController::class, 'resetPassword']);
Route::get('/statics', [StatiquesController::class, 'index']); 

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/service', [ServiceController::class, 'store']);
    Route::put('/service_update/{id}', [ServiceController::class, 'update']);
    Route::delete('/service_destroy/{id}', [ServiceController::class, 'destroy']);
    Route::post('/city', [CityController::class, 'store']);
    Route::post('/city_update/{id}', [CityController::class, 'update']);
    Route::delete('/city_destroy/{id}', [CityController::class, 'destroy']);
    Route::post('/description', [DescriptionController::class, 'store']);
    Route::post('/description_update', [DescriptionController::class, 'update']);
    Route::delete('/description_destroy{$id}', [DescriptionController::class, 'destroy']);
    Route::post('/addimages', [ImageController::class, 'store']);
    Route::get('/images/{id}', [ImageController::class, 'show']);
    Route::put('/images/{id}', [ImageController::class, 'update']);
    Route::post('/subservices', [SubServiceController::class, 'store']);
    Route::put('/subservices/{id}', [SubServiceController::class, 'update']);
    Route::patch('/subservices/{id}', [SubServiceController::class, 'update']);
    Route::delete('/subservices/{id}', [SubServiceController::class, 'destroy']);
    Route::post('/subcities', [SubCityController::class, 'store']);       // Create a subcity
    Route::put('/subcities/{id}', [SubCityController::class, 'update']);
    Route::delete('/subcities/{id}', [SubCityController::class, 'destroy']);
    Route::delete('/images/{id}', [ImageController::class, 'destroy']);
    Route::apiresource('users', UserController::class);
    Route::post('/blogs', [BlogController::class, 'store']);
    Route::put('/blogs/{id}', [BlogController::class, 'update']);
    Route::delete('/blogs/{id}', [BlogController::class, 'destroy']);
    Route::post('/logout', [AuthController::class, 'logout']);  
    Route::get('/user', [AuthController::class, 'user']); 
   

});