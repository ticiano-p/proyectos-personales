<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blog;

class AgeVerificationController extends Controller

{
    public function show (int $id){
          return view('blog.age-verification', [
    'blog' => Blog::findOrFail($id)
]);

    }
    public function save ( Request $request, Blog $blog)
    {                          //marca la verificacion del ususario como true
         $request->session()->put('age-verified', true);
         return to_route('blog.view',['blog'=>$blog]);
    }
}
