<?php
namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

class CartController extends Controller
{
    public function index()
    {
         // Obtener el carrito desde la sesión o cookie
        $cart = session('cart', []);
        if (!$cart && Cookie::has('cart')) {
            $cart = json_decode(Cookie::get('cart'), true);
            session()->put('cart', $cart);
        }
         $total = 0;
    foreach ($cart as $item) {
        $total += $item['price'] * $item['quantity'];
    }

    return view('cart.index', compact('cart', 'total'));
    }

    public function add($id)
{
    $product = Product::findOrFail($id);
    $cart = session()->get('cart', []);

    if (isset($cart[$product->product_id])) {
        $cart[$product->product_id]['quantity']++;
    } else {
        $cart[$product->product_id] = [
            "name" => $product->name,
            "price" => $product->price,
            "quantity" => 1,
        ];
    }

    session()->put('cart', $cart);
    Cookie::queue('cart', json_encode($cart), 60 * 24 * 10);
    return redirect()->back()->with('success', 'Producto agregado al carrito');
}


    public function remove($id)
{
    $cart = session()->get('cart', []);
    if (isset($cart[$id])) {
        if ($cart[$id]['quantity'] > 1) {
            $cart[$id]['quantity']--;
        } else {
            unset($cart[$id]);
        }
        session()->put('cart', $cart);
        Cookie::queue('cart', json_encode($cart), 60 * 24 * 10);
    }
    return redirect()->back()->with('success', 'Producto eliminado');
}


    public function clear()
    {
        session()->forget('cart');
        Cookie::queue(Cookie::forget('cart'));
        return redirect()->back()->with('success', 'Carrito vacío');
    }
}

