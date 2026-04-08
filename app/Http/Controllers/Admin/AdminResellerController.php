<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Reseller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminResellerController extends Controller
{
    // Afficher la liste des demandes
    public function index()
    {
        return Inertia::render('Admin/Resellers/Index', [
            // K-n-jibou l-user m3ahom bach n-biyynou smit l-mou9awil
            'resellers' => Reseller::with('user')->latest()->get()
        ]);
    }

    // Approuver un revendeur
    public function approve(Request $request, Reseller $reseller)
    {
        // 1. Validation sghira l-taman dyal l-remise
        $request->validate([
            'discount_rate' => 'nullable|numeric|min:0|max:50',
        ]);

        // 2. Mise à jour du statut
        $reseller->update([
            'status' => 'approved',
            'discount_rate' => $request->discount_rate ?? 10.00
        ]);

        return back()->with('message', "L'accès 'Revendeur' est activé pour " . $reseller->company_name);
    }

    // ✅ ZDT LIK HADI: Refuser wahed l-demande
    public function reject(Reseller $reseller)
    {
        $reseller->update(['status' => 'rejected']);
        
        return back()->with('error', 'La demande a été rejetée.');
    }
}