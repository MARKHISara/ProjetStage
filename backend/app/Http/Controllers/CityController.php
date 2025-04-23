<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\Image;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CityController extends Controller
{

public function store(Request $request){
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|unique:cities,name',
        'service_id' => 'integer',
        'description' => 'string',
        'url' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
    ]);

    if($validator->fails()){
        return response()->json($validator->errors(), 400);
    }

    // Création de la ville
    $city = City::create([
        'name' => $request->name,
        'service_id' => $request->service_id,
        'description' => $request->description
    ]);

    // S'il y a une image, on la stocke et on l'ajoute à la table images
    if ($request->hasFile('url')) {
        $imageFile = $request->file('url');
        $imagePath = $imageFile->store('cities', 'public'); // stocke dans storage/app/public/cities

        Image::create([
            'url' => $imagePath,
            'imageable_id' => $city->id,
            'imageable_type' => City::class
        ]);
    }

    return response()->json([
        'message' => 'City created successfully',
        'city' => $city
    ]);
}


public function update(Request $request)
{
    $validator = Validator::make($request->all(), [
        'id' => 'required|integer',
        'name' => 'required|string',
        'description' => 'string',
        'service_id' => 'required|integer'
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 400);
    }

    $city = City::find($request->id);

    if ($city) {
        $city->update([
            'name' => $request->name,
            'service_id' => $request->service_id,
            'description' => $request->description


        ]);

        return response()->json([
            'message' => 'City updated successfully',
            'city' => $city
        ]);
    } else {
        return response()->json([
            'message' => 'City not found'
        ], 404);
    }
}



    public function show()
{
    $cities = City::with('images','service','subcities')->get(); 

    return response()->json([
        'message' => 'All cities with images',
        'cities' => $cities
    ]);
}


    public function destroy($id){
        $city = City::find($id);
        if($city){
            $city->delete();
            return response()->json([
               'message' => 'City deleted successfully'
            ]);
        }else{
            return response()->json([
               'message' => 'City not found'
            ], 404);
        }
    }
    //search for city by name
    public function filter(Request $request)
{
    $validator = Validator::make($request->all(), [
        'name' => 'string|required'
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 400);
    }

    $cities = City::where('name', 'like', '%' . $request->name . '%')->get();

    return response()->json([
        'message' => 'Filtered cities',
        'cities' => $cities
    ]);
}

}