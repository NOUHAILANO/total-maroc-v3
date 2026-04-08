<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiteSettingController extends Controller
{
    /**
     * Afficher les paramètres de contact.
     */
    public function index()
    {
        // Kan-jibou l-ma3loumat kamlin kima "key => value"
        // Hada k-i-khlli l-Inertia t-jbed ga3 l-keys (email, phone...) f deqqa wa7da
        $settings = SiteSetting::pluck('value', 'key')->all();

        return Inertia::render('Admin/Settings/Contact', [
            'settings' => $settings
        ]);
    }

    /**
     * Mettre à jour les paramètres de contact.
     */
    public function update(Request $request)
    {
        // 1. Validati l-data (zdt facebook bach i-t-sauva 7ta houwa)
        $validated = $request->validate([
            'email'    => 'nullable|email|max:255',
            'phone'    => 'nullable|string|max:50',
            'whatsapp' => 'nullable|string|max:255',
            'address'  => 'nullable|string',
            'facebook' => 'nullable|string|max:255',
        ]);

        // 2. Loop bach n-update-iw kolla setting
        // updateOrCreate k-t-chouf ila l-key kayna k-t-bdl l-value, ila ma-kaynach k-t-creeyiha
        foreach ($validated as $key => $value) {
            SiteSetting::updateOrCreate(
                ['key' => $key],
                ['value' => $value ?? ''] // ila kan khawi n-7etto string khawi
            );
        }

        // 3. Rdou l-user l-l-lor m3a message dial success
        return back()->with('success', 'Les coordonnées ont été mises à jour avec succès !');
    }
}