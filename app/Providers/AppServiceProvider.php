<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL; // ✅ Zid had l-line

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // ✅ Zid had l-partie bach t-force l-HTTPS fach t-kouni khedama b Ngrok
        if (str_contains(request()->getHttpHost(), 'ngrok-free.dev')) {
            URL::forceScheme('https');
        }
    }
}