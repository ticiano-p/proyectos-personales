<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            if (Auth::user()->role === 'admin') {
                return $next($request);
            }
            // Si está autenticado pero no es admin, redirigimos a home 
            return redirect()
                ->route('home.index')
                ->with('feedback.message', 'Iniciaste sesion ');
        }

        // Si no está autenticado, redirigimos al login
        return redirect()
            ->route('auth.login')
            ->with('feedback.message', 'Debes iniciar sesión para acceder')
            ->with('feedback.type', 'warning');
    }
}
