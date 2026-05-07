<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\SkillController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ChatController;
/*
|--------------------------------------------------------------------------
| Public API Routes
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/chat/users', [ChatController::class, 'users']);
    Route::get('/chat/messages/{userId}', [ChatController::class, 'messages']);
    Route::post('/chat/send', [ChatController::class, 'send']);
    Route::delete('/chat/messages/{id}', [ChatController::class, 'destroy']);
    Route::delete('/chat/clear/{userId}', [ChatController::class, 'clearChat']);
});

// Public register
Route::post('/chat/register', [ChatController::class, 'register']);
// Profile
Route::get('/profile', [ProfileController::class, 'show']);
Route::get('/github-repos', [ProfileController::class, 'githubRepos']);

// Skills
Route::get('/skills', [SkillController::class, 'index']);
Route::get('/skills/categories', [SkillController::class, 'categories']);

// Projects
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{slug}', [ProjectController::class, 'show']);
Route::get('/featured-projects', [ProjectController::class, 'featured']);

// Contact
Route::post('/contact', [ContactController::class, 'store']);

// Auth
Route::post('/auth/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Admin Protected Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:sanctum', 'admin'])->group(function () {

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // Projects Management
    Route::post('/admin/projects', [ProjectController::class, 'store']);
    Route::put('/admin/projects/{project}', [ProjectController::class, 'update']);
    Route::delete('/admin/projects/{project}', [ProjectController::class, 'destroy']);

    // Skills Management
    Route::post('/admin/skills', [SkillController::class, 'store']);
    Route::put('/admin/skills/{skill}', [SkillController::class, 'update']);
    Route::delete('/admin/skills/{skill}', [SkillController::class, 'destroy']);

    // Messages Management
    Route::get('/admin/messages', [ContactController::class, 'index']);
    Route::get('/admin/messages/{contact}', [ContactController::class, 'show']);
    Route::post('/admin/messages/{contact}/mark-read', [ContactController::class, 'markAsRead']);
    Route::delete('/admin/messages/{contact}', [ContactController::class, 'destroy']);

    // Profile Management
    Route::put('/admin/profile', [ProfileController::class, 'update']);

    // Auth
    Route::get('/auth/user', [AuthController::class, 'user']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
});