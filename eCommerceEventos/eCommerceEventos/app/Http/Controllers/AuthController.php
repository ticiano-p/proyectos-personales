<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
  public function login(){
    return view('auth.login');
  }
  public function authenticate(Request $request){
    
    $request->validate([
            'email'=>'required',
            'password'=>'required',
        ],
        [
            'email.required'=>'El email es obligatorio',

            'password.required'=>'El password es obligatorio',
        ]);
       

        $credentials = $request->only(['email', 'password']);
        if (Auth::attempt($credentials)) {
            return redirect()
            ->intended(route('admin.index'))
            ->with('feedback.message', 'Iniciaste sesion como Administrador');
        }

        return redirect()
        ->back()
        ->withInput()
        ->with('feedback.message', 'Las credenciales no coinciden.')
        ->with('feedback.type', 'danger');
  }

  public function register(){
    return view('auth.register');
  }
  public function store(Request $request){
    
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|confirmed',
    ], [
        'name.required' => 'El nombre es obligatorio',
        'email.required' => 'El email es obligatorio',
        'email.unique' => 'El email ya está registrado',
        'password.required' => 'El password es obligatorio',
        'password.confirmed' => 'Las contraseñas no coinciden',
    ]);
       
   // creamos el Usuario
   $user = User::create([
    'name'=> $request->name,
    'email' =>$request->email,
    'password'=>$request->password,
    'role' => 'user',
   ]);
   // Iniciar sesión 
    Auth::login($user);
    
    return redirect()
      ->intended(route('home.index'))
      ->with('feedback.message', '¡Registro exitoso e inicio de sesión!');
  }

  public function logout( Request $request){
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return redirect()
    ->route('home.index')
    ->with('feedback.message', 'Sesion de ADMIN cerrada con exito');

  }
  
  public function history()
{
    $userId = Auth::id();
    $user = User::with('orders.items.product')->findOrFail($userId);

    return view('product.history', [
        'user' => $user
    ]);
}


public function profileUser()
{
    $user = Auth::user();
    return view('auth.profileUser', compact('user'));
}

public function profileUserEdit(Request $request)
{
    $user = Auth::user();

    $request->validate([
        'name' => 'required|string|max:255',
        'phone' => 'nullable|string|max:20',
        'address' => 'nullable|string|max:500',
        'birthdate' => 'nullable|date',
    ]);

    $user->update([
        'name' => $request->name,
        'phone' => $request->phone,
        'address' => $request->address,
        'birthdate' => $request->birthdate,
    ]);

    return redirect()
    ->route('home.index')
    ->with('feedback.message', 'Perfil actualizado correctamente.');
}

}
