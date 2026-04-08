<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    // 📦 Orders dyal user
    public function userOrders()
    {
        $orders = Order::where('user_id', Auth::id())
            ->latest()
            ->get();

        return Inertia::render('Client/Orders/Index', [
            'orders' => $orders
        ]);
    }

    // 🔍 Tracking
    public function show(Order $order)
    {
        if ($order->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('Client/Orders/Show', [
            'order' => $order->load('products')
        ]);
    }

    // 🛒 Checkout page
    public function index()
    {
        return Inertia::render('Checkout');
    }

    // 💾 Store Order
    public function store(Request $request)
    {
        $request->validate([
            'phone' => 'required',
            'address' => 'required',
            'city' => 'required',
            'cart' => 'required|array|min:1',
        ]);

        try {
            return DB::transaction(function () use ($request) {

                $user = Auth::user();

                $subtotal = 0;
                $orderProducts = [];

                foreach ($request->cart as $item) {

                    // ✅ نجيب المنتج من DB (ما نعتمدش على frontend)
                    $product = Product::findOrFail($item['id']);

                    // ✅ السعر الوحيد المعتمد (FIX النهائي 🔥)
                    $priceToCharge = (float) $product->current_price;

                    // ✅ حساب subtotal
                    $subtotal += $priceToCharge * $item['qty'];

                    // ✅ تجهيز pivot table
                    $orderProducts[$product->id] = [
                        'quantity' => $item['qty'],
                        'price' => $priceToCharge
                    ];

                    // ✅ نقص stock
                    $product->decrement('stock', $item['qty']);
                }

                // 🎯 Discount logic
                $discount = ($subtotal > 10000) ? ($subtotal * 0.10) : 0;

                $total = $subtotal - $discount;

                // 🧾 Create Order
                $order = Order::create([
                    'user_id' => $user->id,
                    'subtotal' => $subtotal,
                    'discount' => $discount,
                    'total' => $total,
                    'status' => 'en_attente',
                    'phone' => $request->phone,
                    'address' => $request->address,
                    'city' => $request->city,
                ]);

                // 🔗 Attach products
                $order->products()->attach($orderProducts);

                return redirect()->route('orders.thanks', $order->id);
            });

        } catch (\Exception $e) {
            return back()->withErrors([
                'error' => 'Mouchkil: ' . $e->getMessage()
            ]);
        }
    }

    // 🙏 Thanks page
    public function thanks($id)
    {
        $order = Order::with('products')->findOrFail($id);

        if ($order->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('Orders/Thanks', [
            'order' => $order
        ]);
    }
}