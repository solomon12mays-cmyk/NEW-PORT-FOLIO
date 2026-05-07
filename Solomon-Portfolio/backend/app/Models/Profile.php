<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'title',
        'bio',
        'university',
        'field',
        'country',
        'avatar',
        'cv_url',
        'social_links',
    ];

    protected $casts = [
        'social_links' => 'array',
    ];
}