<?php

namespace App\Http\Controllers;

use App\Models\Description;
use App\Models\Service;
use App\Models\SubService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DescriptionController extends Controller
{
    public function store(Request $request){
        $validator= Validator::make($request->all(),[
            'subservice_id' => 'integer',
            'service_id' => 'integer',
            'text' => 'string',

        ]);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        // Create new description
        $description = Description::create([
            'subservice_id' => $request->subservice_id,
            'service_id' => $request->service_id,
            'text' => $request->text,

        ]);

        return response()->json([
           'message' => 'Description created successfully',
            'description' => $description
        ]);
    }

    public function update(Request $request, $id){
        $validator = Validator::make($request->all(),[
            'subservice_id' => 'integer',
            'service_id' => 'integer',
            'text' => 'string',

        ]);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        // Update description
        $description = Description::find($id);
        if(!$description){
            return response()->json(['message' => 'Description not found'], 404);
        }
        $description->update($request->all());

        return response()->json([
           'message' => 'Description updated successfully',
            'description' => $description
        ]);
    }

    public function show(){
        $descriptions = Description::with(['service', 'subservice'])->get();
        $services = Service::all();
        $subservices = SubService::all();
    
        return response()->json([
            'description' => $descriptions,
            'services' => $services,
            'subservice' => $subservices,
        ]);
    }

    public function destroy($id){
        $description = Description::find($id);
        if(!$description){
            return response()->json(['message' => 'Description not found'], 404);
        }
        $description->delete();

        return response()->json(['message' => 'Description deleted successfully']);
    }
}