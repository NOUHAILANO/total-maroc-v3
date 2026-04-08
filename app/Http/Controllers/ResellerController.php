<?php

namespace App\Http\Controllers;

use App\Models\Reseller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ResellerController extends Controller
{
    // 1. Afficher le formulaire
    public function index()
    {
        // Ila l-user deja 3ndu demande, n-reddouh l-home
        $existingRequest = Reseller::where('user_id', Auth::id())->first();
        
        if ($existingRequest) {
            return redirect()->route('home')->with('message', 'Vous avez déjà une demande en cours.');
        }

        return Inertia::render('Reseller/Apply');
    }

    // 2. Sauvegarder la demande
    public function store(Request $request)
    {
        $request->validate([
            'company_name' => 'required|string|max:255',
            'contact_name' => 'required|string|max:255',
            'email'        => 'required|email|unique:resellers,email',
            'phone'        => 'required|string',
            'address'      => 'required|string',
            'city'         => 'required|string',
            'tax_number'   => 'nullable|string', // ICE
        ]);

        Reseller::create([
            'company_name' => $request->company_name,
            'contact_name' => $request->contact_name,
            'email'        => $request->email,
            'phone'        => $request->phone,
            'address'      => $request->address,
            'city'         => $request->city,
            'tax_number'   => $request->tax_number,
            'user_id'      => Auth::id(),
            'status'       => 'pending', 
        ]);

        return redirect()->route('home')->with('message', 'Votre demande a été envoyée avec succès !');
    }
}