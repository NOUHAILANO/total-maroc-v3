<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    // Ila smit l-table f DB machi "categories", t-akkdi t-zidih hna:
    // protected $table = 'categories';

    // Ila bghiti t-3emri l-data (Mass Assignment)
    protected $fillable = ['name', 'slug', 'image']; 

    // Relation: Category 3ndha bzzaf d l-produits (HasMany)
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}