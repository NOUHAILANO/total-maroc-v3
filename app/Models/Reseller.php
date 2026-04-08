<?php



namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reseller extends Model
{
    protected $fillable = [
        'company_name', 
        'contact_name', 
        'email', 
        'phone', 
        'address', 
        'city', 
        'tax_number', 
        'status', 
        'discount_rate', 
        'user_id'
    ];

    /**
     * Relation m3a l-User
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}