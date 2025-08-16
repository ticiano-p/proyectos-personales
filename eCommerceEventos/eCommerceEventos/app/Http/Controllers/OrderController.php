<?php

namespace App\Http\Controllers;

use App\Mail\ShoppingCart;
use App\Mail\ShoppingCartAdmin;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Session;
class OrderController extends Controller
{
    use AuthorizesRequests; 
    public function checkout(Request $request)
    {
        
        $user = Auth::user();
        $cart = session('cart', []);

if (!$cart && \Illuminate\Support\Facades\Cookie::has('cart')) {
    $cart = json_decode(\Illuminate\Support\Facades\Cookie::get('cart'), true);
    session()->put('cart', $cart);
}
        $total = 0;
        foreach ($cart as $item) {
            $total += $item['price'] * $item['quantity'];
        }

        $order = Order::create([
            'user_id' => $user->id,
            'total' => $total,
            'status' => 'pendiente',
        ]);

        foreach ($cart as $product_id => $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product_id,
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
        }
        // Mail::to(Auth::user())->send(new ShoppingCart($cart,));
        // Mail::to('pedidos@articulos360.com.ar')->send(new ShoppingCartAdmin($cart, $user, $total));

        Session::forget('cart');
       Cookie::queue(Cookie::forget('cart'));
        return redirect()->route('orders.show', $order->id)
                         ->with('success', 'Compra finalizada con éxito.');
    }

    public function show(Order $order)
    {
        $order->load('items.product');
         return redirect()
      ->intended(route('home.index'))
      ->with('feedback.message', '¡Compra realizada!');
    }

}
