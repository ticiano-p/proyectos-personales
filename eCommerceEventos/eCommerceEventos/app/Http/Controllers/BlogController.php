<?php

namespace App\Http\Controllers;
use App\Models\Blog;
use App\Models\Category;

use Illuminate\Http\Request;


class BlogController extends Controller
{
    public function index(Request $request)
{
    $BlogQuery = Blog::with('category');
    $searchParams = [
        's-category' => $request->query('s-category')
    ];
    if (!empty($searchParams['s-category'])) {
        $BlogQuery->whereHas('category', function ($query) use ($searchParams) {
            $query->where('category_id', $searchParams['s-category']);
        });
    }
    $Blog = $BlogQuery->paginate(6)->withQueryString();
    return view('blog.index', [
        'blogs' => $Blog,
        'category' => Category::all()
    ]);
}
    public function view( Blog $blog)
    {       
        return view('blog.view', [
            'Blog'=> $blog
        ]);
    }
    
}