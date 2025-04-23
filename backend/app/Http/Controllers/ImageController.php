<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    // Fetch all images
    public function index()
    {
        $images = Image::all();
        return response()->json($images, 200);
    }

    // Store a new image with polymorphic relation
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'imageable_id' => 'required|integer',
            'imageable_type' => 'required|string',
            'url' => 'required|image|mimes:jpeg,jpg,png,gif,webp|max:2048',
            'city_id' => 'integer',
        ]);
        
        $path = $request->file('url')->store('images', 'public');
        
        $image = Image::create([
            'imageable_id' => $validatedData['imageable_id'],
            'imageable_type' => $validatedData['imageable_type'],
            'city_id' => $validatedData['city_id'],
            'url' => $path,
        ]);

        return response()->json(['message' => 'Image created successfully', 'image' => $image], 201);
    }

    // Fetch a single image by ID
    public function show($id)
    {
        $image = Image::find($id);

        if (!$image) {
            return response()->json(['message' => 'Image not found'], 404);
        }

        return response()->json($image, 200);
    }

    // Update an image
    public function update(Request $request, $id)
    {
        $image = Image::find($id);

        if (!$image) {
            return response()->json(['message' => 'Image not found'], 404);
        }

        $validatedData = $request->validate([
            'imageable_id' => 'required|integer',
            'imageable_type' => 'required|string',
            'city_id' => 'integer',
            'url' => 'nullable|image|mimes:jpeg,jpg,png,gif,webp|max:2048',
        ]);

        if ($request->hasFile('url')) {
            // Delete old file if needed
            Storage::disk('public')->delete($image->url);
            $validatedData['url'] = $request->file('url')->store('images', 'public');
        }

        $image->update($validatedData);

        return response()->json(['message' => 'Image updated successfully', 'image' => $image], 200);
    }

    // Delete an image
    public function destroy($id)
    {
        $image = Image::find($id);

        if (!$image) {
            return response()->json(['message' => 'Image not found'], 404);
        }

        // Delete file
        Storage::disk('public')->delete($image->url);

        $image->delete();

        return response()->json(['message' => 'Image deleted successfully'], 200);
    }

    // Optional: Filter images by imageable_type and id
    public function filter(Request $request)
    {
        $query = Image::query();

        if ($request->has('imageable_type') && $request->has('imageable_id')) {
            $query->where('imageable_type', $request->imageable_type)
                  ->where('imageable_id', $request->imageable_id);
        }

        $images = $query->get();

        return response()->json($images, 200);
    }
}