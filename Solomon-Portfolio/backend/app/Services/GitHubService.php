<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class GitHubService
{
    private string $baseUrl = 'https://api.github.com';
    private string $username;

    public function __construct()
    {
        $this->username = config('services.github.username', 'https://github.com/solomon12mays-cmyk/student-hub');
    }

    public function getRepositories(int $perPage = 6): array
    {
        return Cache::remember('github_repos', 3600, function () use ($perPage) {
            $response = Http::get("{$this->baseUrl}/users/{$this->username}/repos", [
                'sort' => 'updated',
                'per_page' => $perPage,
                'type' => 'public',
            ]);

            if ($response->successful()) {
                return $this->formatRepositories($response->json());
            }

            return [];
        });
    }

    private function formatRepositories(array $repos): array
    {
        return array_map(function ($repo) {
            return [
                'name' => $repo['name'],
                'description' => $repo['description'],
                'url' => $repo['html_url'],
                'stars' => $repo['stargazers_count'],
                'forks' => $repo['forks_count'],
                'language' => $repo['language'],
                'topics' => $repo['topics'] ?? [],
                'updated_at' => $repo['updated_at'],
                'homepage' => $repo['homepage'],
            ];
        }, $repos);
    }
}