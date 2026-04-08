<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of products with search & category filter.
     */
    public function index(Request $request)
    {
        $query = Product::query();

        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->category) {
            $query->where('category', $request->category);
        }

        return Inertia::render('Admin/Products/Index', [
            'products' => $query->latest()->paginate(10)->withQueryString(),
            'filters' => $request->only(['search', 'category']),
        ]);
    }

    /**
     * Show form to create a new product.
     */
    public function create()
    {
        return Inertia::render('Admin/Products/Create');
    }

    /**
     * Show form to edit an existing product.
     */
    public function edit(Product $product)
    {
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product
        ]);
    }

    /**
     * Store a newly created product.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'                => 'required|string|max:255',
            'description'         => 'nullable|string',
            'price'               => 'required|numeric',
            'discount_percentage' => 'required|numeric|min:0|max:100',
            'stock'               => 'required|integer',
            'category'            => 'required|string',
            'image'               => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        // Calculate reseller price
        $originalPrice = $validated['price'];
        $discount = $validated['discount_percentage'];
        $validated['reseller_price'] = $originalPrice - ($originalPrice * ($discount / 100));

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $validated['image'] = $path;
        }

        Product::create($validated);

        return redirect()->route('admin.products.index')->with('success', 'Produit ajouté avec succès !');
    }

    /**
     * Update an existing product.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name'                => 'required|string|max:255',
            'description'         => 'nullable|string',
            'price'               => 'required|numeric',
            'discount_percentage' => 'required|numeric|min:0|max:100',
            'stock'               => 'required|integer',
            'category'            => 'required|string',
            'image'               => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        // Recalculate reseller price
        $originalPrice = $validated['price'];
        $discount = $validated['discount_percentage'];
        $validated['reseller_price'] = $originalPrice - ($originalPrice * ($discount / 100));

        // Handle image
        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $path = $request->file('image')->store('products', 'public');
            $validated['image'] = $path;
        } else {
            unset($validated['image']);
        }

        $product->update($validated);

        return redirect()->route('admin.products.index')->with('success', 'Produit modifié avec succès !');
    }

    /**
     * Delete a product.
     */
    public function destroy(Product $product)
    {
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Produit supprimé !');
    }
}