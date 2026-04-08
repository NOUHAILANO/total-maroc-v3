<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ResellerController; 
use App\Http\Controllers\Admin\AdminResellerController; 
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\AdminOrderController; 
use App\Http\Controllers\OrderController;
use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\SiteSettingController;
use App\Http\Controllers\ContactController;
use App\Http\Middleware\AdminMiddleware; 
use App\Http\Controllers\Admin\ContactVilleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\LanguageController; // ✅ Import Controller

// --- 🟢 Public Routes ---

Route::get('/', function (Request $request) {
    $query = Product::query();

    if ($request->filled('category')) {
        $query->where('category', 'LIKE', $request->category);
    }

    if ($request->filled('search')) {
        $query->where('name', 'like', '%' . $request->search . '%');
    }

    return Inertia::render('Welcome', [
        'products' => $query->latest()->get(), 
        'filters' => $request->only(['search', 'category']),
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('home');

Route::get('/products/{product}', function (Product $product) {
    return Inertia::render('ProductDetails', [
        'product' => $product
    ]);
})->name('products.show');

Route::get('/panier', fn() => Inertia::render('Cart'))->name('cart.index');
Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

// ✅ 1. ROUTE DIAL CHANGE LANGUAGE (M-qada dba)
// Hna n-khdmo b l-Controller bach n-tأkdou mn l-Logic
Route::get('language/{lang}', [LanguageController::class, 'changeLanguage'])->name('language.change');

// --- 🔵 Auth Routes ---

Route::middleware(['auth', 'verified'])->group(function () {
    
    // ✅ Historique & Tracking
    Route::get('/mes-commandes', [OrderController::class, 'userOrders'])->name('orders.index');
    Route::get('/commande/{order}', [OrderController::class, 'show'])->name('orders.show');

    // Revendeur Application
    Route::get('/devenir-revendeur', [ResellerController::class, 'index'])->name('reseller.apply');
    Route::post('/devenir-revendeur', [ResellerController::class, 'store'])->name('reseller.store');

    // User Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Order & Checkout Logic
    Route::get('/checkout', [OrderController::class, 'index'])->name('checkout');
    Route::post('/checkout', [OrderController::class, 'store'])->name('orders.store');
    Route::get('/thanks/{id}', [OrderController::class, 'thanks'])->name('orders.thanks');
});

// --- 🔴 Admin Routes ---

Route::middleware(['auth', AdminMiddleware::class])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        
        // 📦 GESTION DES COMMANDES (Admin Side)
        Route::get('/orders', [AdminOrderController::class, 'index'])->name('orders.index');
        Route::patch('/orders/{order}/status', [AdminOrderController::class, 'updateStatus'])->name('orders.updateStatus');
        // ✅ Correction: dima patch awla post f update, delete f destroy
        Route::delete('/orders/{order}', [AdminOrderController::class, 'destroy'])->name('orders.destroy');

        // Resellers Management
        Route::get('/resellers', [AdminResellerController::class, 'index'])->name('resellers.index');
        Route::post('/resellers/{reseller}/approve', [AdminResellerController::class, 'approve'])->name('resellers.approve');

        // Settings & Resources
        Route::resource('villes-contacts', ContactVilleController::class);
        Route::get('/settings/contact', [SiteSettingController::class, 'index'])->name('settings.index');
        Route::post('/settings/contact', [SiteSettingController::class, 'update'])->name('settings.update');
        
        // Products Management
        Route::resource('products', AdminProductController::class);
});

// ✅ ROUTE DIAL TEST
Route::get('/test-lang', function () {
    $resourcePath = resource_path("lang/ar.json");
    $rootPath = base_path("lang/ar.json");

    return [
        'checking_resource_path' => [
            'path' => $resourcePath,
            'exists' => file_exists($resourcePath),
        ],
        'checking_root_path' => [
            'path' => $rootPath,
            'exists' => file_exists($rootPath),
        ],
        'current_session_lang' => session('app_locale', 'FR'),
    ];
});

require __DIR__.'/auth.php';