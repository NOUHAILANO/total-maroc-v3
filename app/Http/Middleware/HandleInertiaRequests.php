<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\ContactVille;
use App\Models\SiteSetting;
use Illuminate\Support\Facades\File;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        // 1. Nejbdou l-locale mn s-session (Default: FR)
        $locale = session('app_locale', 'FR');

        // 2. Definir l-path (Laravel 10/11 ghaliban kikon f /lang f root aw resources/lang)
        // Ghadi n-diro check 3la l-blasa lli fiha l-fichiers dba
        $langPath = base_path("lang"); 
        if (!File::exists($langPath)) {
            $langPath = resource_path("lang");
        }
        
        // 3. Logic dyal qrayet l-fichiers JSON
        // ✅ Optimisation: Kan-loadiw ghir l-lugha lli khdamin biha dba bach n-khaffou l-page
        $translations = [
            $locale => File::exists("$langPath/" . strtolower($locale) . ".json") 
                    ? json_decode(File::get("$langPath/" . strtolower($locale) . ".json"), true) 
                    : [],
        ];

        return [
            ...parent::share($request),
            
            'auth' => [
                'user' => $request->user() ? [
                    'id'    => $request->user()->id,
                    'name'  => $request->user()->name,
                    'email' => $request->user()->email,
                    'role'  => $request->user()->role,
                    'reseller' => $request->user()->reseller ? [
                        'status' => $request->user()->reseller->status,
                    ] : null,
                ] : null,
            ],

            // Nejbdou settings ghir merra whda
            'villes_contacts' => ContactVille::all(), 
            'site_settings' => SiteSetting::first(),

            // ✅ Hadou houma l-mohimmin l-React
            'translations' => $translations,
            'current_lang' => $locale,

            'flash' => [
                'success' => $request->session()->get('success'),
                'error'   => $request->session()->get('error'),
            ],
        ];
    }
}