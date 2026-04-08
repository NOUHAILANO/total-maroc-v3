<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ContactVille;
use Inertia\Inertia;

class ContactController extends Controller
{
    /**
     * Page Contact (Public)
     */
    public function index()
    {
        return Inertia::render('Contact', [
            'villes_contacts' => ContactVille::all()
        ]);
    }
}