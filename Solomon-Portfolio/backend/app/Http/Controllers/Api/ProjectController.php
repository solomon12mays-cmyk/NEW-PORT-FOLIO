<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Project::published()->orderBy('sort_order');

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        if ($request->boolean('featured')) {
            $query->featured();
        }

        if ($request->boolean('ai_ml')) {
            $query->aiMl();
        }

        $projects = $query->paginate($request->per_page ?? 12);

        return response()->json([
            'success' => true,
            'data' => $projects,
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $project = Project::published()->where('slug', $slug)->firstOrFail();

        $relatedProjects = Project::published()
            ->where('category', $project->category)
            ->where('id', '!=', $project->id)
            ->limit(3)
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'project' => $project,
                'related_projects' => $relatedProjects,
            ],
        ]);
    }

    public function featured(): JsonResponse
    {
        $projects = Project::published()->featured()->limit(6)->get();

        return response()->json([
            'success' => true,
            'data' => $projects,
        ]);
    }

    public function store(ProjectRequest $request): JsonResponse
    {
        $project = Project::create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Project created successfully',
            'data' => $project,
        ], 201);
    }

    public function update(ProjectRequest $request, Project $project): JsonResponse
    {
        $project->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Project updated successfully',
            'data' => $project->fresh(),
        ]);
    }

    public function destroy(Project $project): JsonResponse
    {
        $project->delete();

        return response()->json([
            'success' => true,
            'message' => 'Project deleted successfully',
        ]);
    }
}