<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SkillRequest;
use App\Models\Skill;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Skill::orderBy('sort_order');

        if ($request->has('category')) {
            $query->byCategory($request->category);
        }

        $skills = $query->get()->groupBy('category');

        return response()->json([
            'success' => true,
            'data' => $skills,
        ]);
    }

    public function categories(): JsonResponse
    {
        $categories = Skill::select('category')
            ->distinct()
            ->pluck('category');

        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }

    public function store(SkillRequest $request): JsonResponse
    {
        $skill = Skill::create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Skill created successfully',
            'data' => $skill,
        ], 201);
    }

    public function update(SkillRequest $request, Skill $skill): JsonResponse
    {
        $skill->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Skill updated successfully',
            'data' => $skill->fresh(),
        ]);
    }

    public function destroy(Skill $skill): JsonResponse
    {
        $skill->delete();

        return response()->json([
            'success' => true,
            'message' => 'Skill deleted successfully',
        ]);
    }
}