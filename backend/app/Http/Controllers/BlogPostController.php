<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\blogPost;
use Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class blogPostController extends Controller
{
    public function blogPostStore(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:50',
            'description' => 'required|string|max:255',
            'blogImage' => 'nullable|mimes:jpg,jpeg,png',
            'blogTag' => 'nullable|string',
        ]);

        DB::beginTransaction();

        try {
            $blogPost = BlogPost::create([
                'title' => $request->title,
                'description' => $request->description,
                'blogImage' => $request->blogImage,
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
        $blogPosts = BlogPost::all(); // Obtener todos los registros de la tabla blog_posts

        return response()->json($blogPosts, 200); // Devolver los blog posts como respuesta JSON con código de estado 200 (OK)
    }
}