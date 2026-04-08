<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\App; // ✅ Darori t-zidi hadi

class SetLanguage
{
   public function handle(Request $request, Closure $next): Response
{
    // 1. Kan-choufou wach l-user bdel l-lugha (app_locale hiya li derti f HandleInertia)
    $locale = session('app_locale', 'FR'); 

    // 2. Kan-goulo l Laravel ikhdem b had l-lugha f l-backend
    App::setLocale(strtolower($locale)); 

    return $next($request);
}
}