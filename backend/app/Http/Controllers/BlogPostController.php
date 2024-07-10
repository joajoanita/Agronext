<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BlogPost;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BlogPostController extends Controller
{
    public function blogPostStore(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:50',
            'description' => 'required|string|max:255',
            'blogImage' => 'nullable|image|mimes:jpg,jpeg,png|max:2048', 
            'blogTag' => 'nullable|string',
        ]);

        DB::beginTransaction();

        try {
            $imageName = null;
            if ($request->hasFile('blogImage')) {
                $imageName = time().'.'.$request->blogImage->extension();
                $request->blogImage->move(public_path('images/blogPost'), $imageName);
            }

            $blogPost = BlogPost::create([
                'title' => $request->title,
                'description' => $request->description,
                'blogImage' => $imageName,
                'blogTag' => $request->blogTag,
                'id_user' => Auth::id(),
            ]);

            DB::commit();

            return response()->json(['message' => 'Blog post created successfully', 'blogPost' => $blogPost], 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json(['message' => 'Failed to create blog post', 'error' => $e->getMessage()], 500);
        }
    }

    public function index()
    {
        $blogPosts = BlogPost::all();

        return response()->json($blogPosts, 200);
    }
}