<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'title' => 'Student Dropout Prediction AI',
                'slug' => 'student-dropout-prediction-ai',
                'description' => 'ML model that predicts student dropout risk with 89% accuracy. Logistic Regression is the best algorithm for this model.',
                'long_description' => 'This AI model analyzes student data to predict the likelihood of dropout from university. Built using Python and various ML algorithms, Logistic Regression proved to be the most effective with 89% accuracy.',
                'technologies' => json_encode(['Python', 'Machine Learning', 'Logistic Regression', 'Data Science']),
                'category' => 'ai',
                'github_link' => 'https://github.com/solomon12mays-cmyk/Student-drop-out-pridiction-AI',
                'accuracy' => 89.00,
                'model_type' => 'Logistic Regression',
                'dataset_description' => 'Student academic and demographic data',
                'featured' => true,
                'is_published' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'Student Registration Management System',
                'slug' => 'student-management-system',
                'description' => 'Full-stack web application for managing university student registration, courses, and grades.',
                'long_description' => 'A comprehensive student management system built with Laravel and React. Features include student registration, course management, grade tracking, and admin dashboard.',
                'technologies' => json_encode(['Laravel', 'React', 'MySQL', 'Tailwind CSS']),
                'category' => 'web',
                'github_link' => 'https://github.com/solomon12mays-cmyk/Student-Registration-Management-system',
                'featured' => true,
                'is_published' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'YouTube Video Downloader',
                'slug' => 'youtube-video-downloader',
                'description' => 'Desktop application that downloads YouTube videos by simply pasting the video URL.',
                'long_description' => 'A Python-based YouTube video downloader with a simple GUI. Users can paste a YouTube URL and download videos in various formats and quality options.',
                'technologies' => json_encode(['Python', 'Tkinter', 'pytube', 'FFmpeg']),
                'category' => 'other',
                'github_link' => 'https://github.com/solomon12mays-cmyk/VIDEO_DOWNLOADER_APP2',
                'featured' => true,
                'is_published' => true,
                'sort_order' => 3,
            ],
            [
                'title' => 'Personal Portfolio Website',
                'slug' => 'portfolio-website',
                'description' => 'Modern responsive portfolio website built with Laravel API and React frontend with real-time chat.',
                'long_description' => 'A full-stack portfolio website showcasing projects, skills, and experience. Features include admin dashboard, contact form with email notification, real-time chat system, and dark/light mode.',
                'technologies' => json_encode(['Laravel', 'React', 'MySQL', 'Tailwind CSS', 'Firebase']),
                'category' => 'fullstack',
                'github_link' => 'https://github.com/Solomon-21may/NEW-PORT-FOLIO',
                'featured' => false,
                'is_published' => true,
                'sort_order' => 4,
            ],
        ];

        foreach ($projects as $project) {
            Project::updateOrCreate(
                ['slug' => $project['slug']],
                $project
            );
        }
    }
}