<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Services\GitHubService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show(): JsonResponse
    {
        $profile = Profile::first();

        if (!$profile) {
            return response()->json([
                'success' => true,
                'data' => [
                    'full_name' => 'Solomon Alemayehu',
                    'title' => 'Full Stack Developer & AI/ML Engineer',
                    'bio' => 'Computer Science student at Debre Birhan University',
                    'university' => 'Debre Birhan University',
                    'field' => 'Computer Science',
                    'country' => 'Ethiopia',
                ],
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $profile,
        ]);
    }

    public function update(Request $request): JsonResponse
    {
        $profile = Profile::first();

        if ($profile) {
            $profile->update($request->all());
        } else {
            $profile = Profile::create($request->all());
        }

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully',
            'data' => $profile,
        ]);
    }

    public function githubRepos(GitHubService $gitHubService): JsonResponse
    {
        $repos = $gitHubService->getRepositories();

        return response()->json([
            'success' => true,
            'data' => $repos,
        ]);
    }
}