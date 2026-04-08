<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminOrderController extends Controller
{
    public function index()
    {
        // Jib l-orders m3a l-user dyalhom
        return Inertia::render('Admin/Orders/Index', [
            'orders' => Order::with('user')->latest()->get()
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|string'
        ]);

        $order->update(['status' => $request->status]);

        return back()->with('success', 'Statut de la commande mis à jour !');
    }

    public function destroy(Order $order)
    {
        $order->delete();
        return back()->with('success', 'Commande supprimée.');
    }
}