<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactVille extends Model
{
    protected $fillable = [
        'ville', 
        'email', 
        'phones', 
        'whatsapps', 
        'adresses', 
        'facebook', 
        'instagram'
    ];

    // ✅ Hada houwa l-mohim bach i-banu f l-Footer k-Array
    protected $casts = [
        'phones' => 'array',
        'whatsapps' => 'array',
        'adresses' => 'array',
    ];
}