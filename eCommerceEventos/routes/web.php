<?php

use Illuminate\Support\Facades\Route;

Route::get('/',[\App\Http\Controllers\HomeController::class, 'index'])
    ->name('home.index');
// BLOG:
// Novedades, consejos, noticias sobre eventos
Route::get('/blog', [\App\Http\Controllers\BlogController::class, 'index'])
->name('blog.index')
->middleware(['auth' ]);


// Detalles de los novedades, consejos, noticias sobre eventos
Route::get('/blog/{blog}', [\App\Http\Controllers\BlogController::class, 'view'])
->middleware('require-age')
->name('blog.view');

// Productos:
// Productos a la venta
Route::get('/product', [\App\Http\Controllers\ProductController::class, 'index'])
->name('Product.index');
//Detalles de los productos a la venta
Route::get('/product/{id}', [\App\Http\Controllers\ProductController::class, 'view'])
->name('Product.view')
->whereNumber('id');



Route::get('/admin', [\App\Http\Controllers\AdminController::class, 'index'])
    ->name('admin.index')
    ->middleware(['auth', 'admin']);

// Vista crear nuevo articulo
Route::get('/admin/crear', [\App\Http\Controllers\AdminController::class, 'create'])
->name('admin.create')
->middleware(['auth', 'admin']);
// agrega nuevo articulo
Route::post('/admin/crear', [\App\Http\Controllers\AdminController::class, 'store'])
->name('admin.store')
->middleware(['auth', 'admin']);

//Vista del articulo
Route::get('/admin/articulo/{blog}', [\App\Http\Controllers\AdminController::class, 'view'])
->name('admin.view')
->middleware(['auth', 'admin']);

//Vista editar articulo
Route::get('/admin/editar/{blog}', [\App\Http\Controllers\AdminController::class, 'edit'])
->name('admin.edit')
->middleware(['auth', 'admin']);
//editar articulo
Route::put('/admin/editar/{blog}', [\App\Http\Controllers\AdminController::class, 'update'])
->name('admin.update')
->middleware(['auth', 'admin']);

// Vista eliminar  articulo
Route::get('/admin/articulo/{blog}/eliminar', [\App\Http\Controllers\AdminController::class, 'eliminar'])
->name('admin.eliminar')
->middleware(['auth', 'admin']);
// eliminar  articulo
Route::delete('/admin/articulo/{blog}', [\App\Http\Controllers\AdminController::class, 'destroy'])
->name('admin.destroy')
->middleware(['auth', 'admin']);
// historial de comras
Route::get('/admin/historial/{user}', [\App\Http\Controllers\AdminController::class, 'historial'])
->name('admin.historial')
->middleware(['auth']);
// Login:
// Vista a formulario Login
Route::get('iniciar-sesion', [\App\Http\Controllers\AuthController::class, 'login'])
->name('auth.login');
// envio del formulario Login
Route::post('iniciar-sesion', [\App\Http\Controllers\AuthController::class, 'authenticate'])
->name('auth.authenticate');

// Vista a formulario registrarse
Route::get('registrarse', [\App\Http\Controllers\AuthController::class, 'register'])
->name('auth.register');
// envio del formulario registrarse
Route::post('registrarse', [\App\Http\Controllers\AuthController::class, 'store'])
->name('auth.store');
// envio del boton cerrar sesion
Route::post('cerrar-sesion', [\App\Http\Controllers\AuthController::class, 'logout'])
->name('auth.logout');
// verifica si es mayor de edad para ver los CONSEJOS del blog
Route::get('Blog/{blog}/verificar-edad', [\App\Http\Controllers\AgeVerificationController::class, 'show'])
->name('blog.age-verification.show')
->whereNumber('blog');

Route::post('Blog/{blog}/verificar-edad', [\App\Http\Controllers\AgeVerificationController::class, 'save'])
->name('blog.age-verification.save')
->whereNumber('blog');


//carrito:
Route::get('/cart', [\App\Http\Controllers\CartController::class, 'index'])
->name('cart.index')
->middleware(['auth' ]);
Route::post('/cart/add/{product}', [\App\Http\Controllers\CartController::class, 'add'])->name('cart.add')
->middleware(['auth' ]);
Route::get('/cart/remove/{id}', [\App\Http\Controllers\CartController::class, 'remove'])->name('cart.remove')
->middleware(['auth' ]);
Route::get('/cart/clear', [\App\Http\Controllers\CartController::class, 'clear'])
->name('cart.clear')
->middleware(['auth' ]);

//
Route::post('/checkout', [\App\Http\Controllers\OrderController::class, 'checkout'])
->name('checkout')
->middleware(['auth' ]);
Route::get('/orders/{order}', [\App\Http\Controllers\OrderController::class, 'show'])
->name('orders.show')
->middleware(['auth' ]);
// historial de compra
Route::get('/historial_compras', [\App\Http\Controllers\AuthController::class, 'history'])
->name('product.history')
->middleware(['auth' ]);
//info i editar perfil de usuario
Route::get('/Perfil_usuario', [\App\Http\Controllers\AuthController::class, 'profileUser'])
->name('auth.profileUser')
->middleware(['auth' ]);
Route::put('/Perfil_usuario', [\App\Http\Controllers\AuthController::class, 'profileUserEdit'])
->name('auth.profileEdit')
->middleware(['auth' ]);

// mercado pago
Route::get('/verificar-compra', [\App\Http\Controllers\MercadoPagoController::class, 'showBuyForm'])
    ->name('Mp.show-Buy-Form')
    ->middleware(['auth']);

// Inicia Mercado Pago
Route::get('/mp/comprar', [\App\Http\Controllers\MercadoPagoController::class, 'showBuyForm'])
    ->name('mercadopago.buy-form')
    ->middleware(['auth']);

// El pago fue exitoso (crea orden, mails, etc)
Route::get('/checkout/success', [App\Http\Controllers\OrderController::class, 'checkout'])
    ->name('checkout.success')
    ->middleware(['auth']);
