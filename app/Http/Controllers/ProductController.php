<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    public function addProduct(Request $request)
    {   

        $validatedData = $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
        ]);

        $product = Product::create([
            "name" => $validatedData['name'],
            "price" => $validatedData['price']
        ]);

        return response()->json(['message' => 'Product added successfully', 'product' => $product]);
    }

    public function update($id, Request $request){
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->update([
            "name" => $request->input('name'),
            "price" => $request->input('price')
        ]);

        return response()->json('success');
    }

    public function viewProduct($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        return response()->json($product);
    }

    public function deleteProduct($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->delete();

        return response()->json('success');
    }

    public function fetchProducts(Request $request)
    {
        $perPage = $request['perPage'];
        $page = $request['page'];
        $sortBy = $request['sortBy'];
        $sortDesc = $request['sortDesc']; 

        $products = Product::orderBy($sortBy, $sortDesc ? 'desc' : 'asc')
                    ->paginate($perPage, ['*'], 'page', $page); 

        $total_rows = $products->total();
        $products = $products->items();

        return response()->json([
            "products" => $products,
            "total" => $total_rows,
        ]);
    }
}
