<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Session;

class LanguageController extends Controller
{
    public function changeLanguage($lang)
{
    $availableLangs = ['AR', 'FR'];
    if (in_array(strtoupper($lang), $availableLangs)) {
        // ✅ Khass t-koun 'app_locale' bach HandleInertiaRequests i-shoufha
        session()->put('app_locale', strtoupper($lang));
    }

    return back(); // Rejja3 l-user l-nefs l-page
}
}