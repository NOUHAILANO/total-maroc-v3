<?php

namespace App\Http\Controllers\Admin; // ✅ Khlli ghir hada

use App\Http\Controllers\Controller;
use App\Models\ContactVille;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactVilleController extends Controller
{
    /**
     * Afficher la liste des villes/agences dans l'Admin
     */
    public function index()
    {
        return Inertia::render('Admin/VillesContacts/Index', [
            'villes_contacts' => ContactVille::latest()->get()
        ]);
    }

    /**
     * Enregistrer une nouvelle ville
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'ville'     => 'required|string|max:255',
            'email'     => 'nullable|email',
            'phones'    => 'nullable|array',
            'whatsapps' => 'nullable|array',
            'adresses'  => 'nullable|array',
            'facebook'  => 'nullable|string',
            'instagram' => 'nullable|string',
        ]);

        ContactVille::create($validated);

        return redirect()->route('admin.villes-contacts.index')
            ->with('success', 'Agence ajoutée avec succès !');
    }

    /**
     * Modifier une ville existante
     */
    public function update(Request $request, $id)
    {
        $villes_contact = ContactVille::findOrFail($id);

        $validated = $request->validate([
            'ville'     => 'required|string|max:255',
            'email'     => 'nullable|email',
            'phones'    => 'nullable|array',
            'whatsapps' => 'nullable|array',
            'adresses'  => 'nullable|array',
            'facebook'  => 'nullable|string',
            'instagram' => 'nullable|string',
        ]);

        $villes_contact->update($validated);

        return redirect()->route('admin.villes-contacts.index')
            ->with('success', 'Agence mise à jour !');
    }

    /**
     * Supprimer une ville
     */
    public function destroy($id)
    {
        $villes_contact = ContactVille::findOrFail($id);
        $villes_contact->delete();
        
        return redirect()->route('admin.villes-contacts.index')
            ->with('success', 'Agence supprimée !');
    }
}