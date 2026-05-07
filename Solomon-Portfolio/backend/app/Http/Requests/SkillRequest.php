<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SkillRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:100'],
            'icon_class' => ['nullable', 'string', 'max:100'],
            'category' => [
                'required',
                Rule::in(['frontend', 'backend', 'database', 'devops', 'ai_ml', 'tools'])
            ],
            'proficiency_level' => ['required', 'integer', 'min:1', 'max:100'],
            'description' => ['nullable', 'string', 'max:500'],
            'is_learning' => ['boolean'],
            'sort_order' => ['integer', 'min:0'],
        ];
    }
}