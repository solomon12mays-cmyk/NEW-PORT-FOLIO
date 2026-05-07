<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [
                'total_projects' => Project::count(),
                'published_projects' => Project::published()->count(),
                'total_skills' => Skill::count(),
                'unread_messages' => Contact::unread()->count(),
                'total_messages' => Contact::count(),
            ],
        ]);
    }
}