<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * Attributes mass assignable.
     * Zdna 'role' bach t-9dri t-7ekmi f l-access.
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role', // 'user' (default) awla 'admin'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // --- 1. RELATIONSHIP ---
    
    public function reseller()
    {
        return $this->hasOne(Reseller::class);
    }

    // --- 2. LOGIQUE DYAL L-ACCESS (Roles & Permissions) ---

    /**
     * Wach hada Admin?
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    /**
     * Wach hada Reseller Approved (Partenaire)?
     */
    public function isReseller(): bool
    {
        // K-n-choufu wach 3ndu record o wach status approved
        return $this->reseller && $this->reseller->status === 'approved';
    }

    /**
     * Jib l-pourcentage dyal l-remise dyalu
     */
    public function getDiscountRate(): int
    {
        if ($this->isReseller()) {
            return (int) $this->reseller->discount_rate;
        }
        return 0;
    }
}