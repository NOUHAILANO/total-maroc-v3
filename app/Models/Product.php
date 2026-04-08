<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use App\Models\Category; 

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'category', 'price', 'reseller_price', 
        'discount_percentage', 'stock', 'image', 'description', 'is_active',
    ];

    // ✅ Darori bach t-ban current_price f l-Inertia props
    protected $appends = ['current_price'];

    public function getCurrentPriceAttribute()
    {
        // Check ila l-user reseller approved
        if (Auth::check() && method_exists(Auth::user(), 'isReseller') && Auth::user()->isReseller()) {
            if ($this->reseller_price > 0) {
                return (float) $this->reseller_price;
            }
        }
        return (float) $this->price;
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category', 'id');
    }
}