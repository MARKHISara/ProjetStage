<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    // Get all blog posts
    public function index()
    {
        return Blog::with('service')->get();
    }

    // Get a single blog post by ID
    public function show($id)
    {
        $blog = Blog::with('service')->findOrFail($id);
        return response()->json($blog);
    }

    // Create a new blog post
    public function store(Request $request)
{
    $validated = $request->validate([
        'service_id' => 'required|exists:services,id',
        'title' => 'required|string|max:255',
        'content' => 'required|string',
        'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
    ]);

    if ($request->hasFile('image')) {
        $path = $request->file('image')->store('blog_images', 'public');
        $validated['image'] = $path;
    }

    $blog = Blog::create($validated);
    return response()->json($blog, 201);
}

public function update(Request $request, $id)
{
    $blog = Blog::findOrFail($id);

    $validated = $request->validate([
        'service_id' => 'sometimes|exists:services,id',
        'title' => 'sometimes|string|max:255',
        'content' => 'sometimes|string',
        'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
    ]);

    if ($request->hasFile('image')) {
        $path = $request->file('image')->store('blog_images', 'public');
        $validated['image'] = $path;
    }

    $blog->update($validated);
    return response()->json($blog);
}


    // Delete a blog post
    public function destroy($id)
    {
        $blog = Blog::findOrFail($id);
        $blog->delete();

        return response()->json(['message' => 'Blog post deleted successfully']);
    }
}