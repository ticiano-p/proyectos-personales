<?php

namespace App\Http\Controllers;


use MercadoPago\Client\Preference\PreferenceClient;
use MercadoPago\MercadoPagoConfig;

use MercadoPago\Exceptions\MPApiException;
use \Illuminate\Support\Facades\Cookie;
class MercadoPagoController extends Controller
{
    
public function showBuyForm()
{
    try {
        $cart = session('cart', []);

   if (!$cart && Cookie::has('cart')) {
    $cart = json_decode(Cookie::get('cart'), true);
    session()->put('cart', $cart);
}

        MercadoPagoConfig::setAccessToken(env('MP_ACCESS_TOKEN'));
        session()->put('mp_checkout_cart', $cart);

        $items = [];
        foreach ($cart as $productId => $item) {
            $items[] = [
                'title' => $item['name'],
                'unit_price' => (float)$item['price'],
                'quantity' => (int)$item['quantity'],
            ];
        }

        $client = new PreferenceClient();
        
        $preference = $client->create([
            "items" => $items,
            "back_urls" => [
                "success" => route('checkout.success'),
                "failure" => route('cart.index'),
                "pending" => route('cart.index'),

            ],
            "auto_return" => "approved",
        ]);
        return view('mercadopago.Buy-Form', [
            'cartItems' => $cart,
            'total' => collect($cart)->sum(fn($i) => $i['price'] * $i['quantity']),
            'preferenceId' => $preference->id,
        ]);
    } catch (MPApiException $e) {
        dd($e->getApiResponse()); // Muestra el error de Mercado Pago
    } catch (\Exception $e) {
        dd($e->getMessage()); // Error general
    }
}


}
