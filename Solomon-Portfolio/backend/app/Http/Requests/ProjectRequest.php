<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('projects')->ignore($this->project)
            ],
            'description' => ['required', 'string', 'max:500'],
            'long_description' => ['nullable', 'string'],
            'technologies' => ['required', 'array', 'min:1'],
            'technologies.*' => ['string', 'max:50'],
            'category' => ['required', Rule::in(['web', 'ai', 'ml', 'fullstack', 'other'])],
            'github_link' => ['nullable', 'url', 'max:255'],
            'live_demo_link' => ['nullable', 'url', 'max:255'],
            'image' => ['nullable', 'image', 'max:2048'],
            'accuracy' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'model_type' => ['nullable', 'string', 'max:100'],
            'dataset_description' => ['nullable', 'string', 'max:1000'],
            'featured' => ['boolean'],
            'is_published' => ['boolean'],
            'sort_order' => ['integer', 'min:0'],
        ];
    }
}