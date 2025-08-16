<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Blog;
class RequireAgeOver18
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
{
    $blog = $request->route('blog');

    // Verificamos si tiene categoría con ID 1
    if ($blog->category()->where('category_id', 7)->exists() && !$request->session()->has('age-verified')) {
        return to_route('blog.age-verification.show', ['blog' => $blog->blog_id]);
    }

    return $next($request);
}


}
