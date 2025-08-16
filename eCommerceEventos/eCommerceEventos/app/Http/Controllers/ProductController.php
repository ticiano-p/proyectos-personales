<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {     // Iniciar la consulta
       $productsQuery = Product::query();
        $serchParams = [
            's-name'=> $request->query('s-name')
        ];
        if ($serchParams['s-name']) {
            $productsQuery->where('name', 'like', '%'.$serchParams['s-name'].'%');
        }
        $products = $productsQuery->paginate(8)->withQueryString();
        
        return view('product.index', [
            'products'=> $products,
            'serchParams' => $serchParams
        ]);
    }
    public function view( int $id)
    {       
        return view('product.view', [
            'products'=> Product::findorFail($id)
        ]);
    }
}