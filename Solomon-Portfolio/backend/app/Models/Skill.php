<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'icon_class',
        'category',
        'proficiency_level',
        'description',
        'is_learning',
        'sort_order',
    ];

    protected $casts = [
        'is_learning' => 'boolean',
        'proficiency_level' => 'integer',
    ];

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }
}