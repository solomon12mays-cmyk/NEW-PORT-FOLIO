<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'long_description',
        'technologies',
        'category',
        'github_link',
        'live_demo_link',
        'image',
        'accuracy',
        'model_type',
        'dataset_description',
        'confusion_matrix_image',
        'featured',
        'is_published',
        'sort_order',
    ];

    protected $casts = [
        'technologies' => 'array',
        'featured' => 'boolean',
        'is_published' => 'boolean',
        'accuracy' => 'decimal:2',
    ];

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    public function scopeAiMl($query)
    {
        return $query->whereIn('category', ['ai', 'ml']);
    }
}