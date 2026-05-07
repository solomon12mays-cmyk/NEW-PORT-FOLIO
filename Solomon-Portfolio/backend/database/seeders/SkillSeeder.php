<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    public function run(): void
    {
        $skills = [
            // Frontend
            ['name' => 'React.js', 'category' => 'frontend', 'proficiency_level' => 85, 'sort_order' => 1],
            ['name' => 'JavaScript', 'category' => 'frontend', 'proficiency_level' => 80, 'sort_order' => 2],
            ['name' => 'Tailwind CSS', 'category' => 'frontend', 'proficiency_level' => 90, 'sort_order' => 3],
            ['name' => 'HTML/CSS', 'category' => 'frontend', 'proficiency_level' => 95, 'sort_order' => 4],

            // Backend
            ['name' => 'Laravel', 'category' => 'backend', 'proficiency_level' => 85, 'sort_order' => 1],
            ['name' => 'PHP', 'category' => 'backend', 'proficiency_level' => 80, 'sort_order' => 2],
            ['name' => 'REST API', 'category' => 'backend', 'proficiency_level' => 85, 'sort_order' => 3],

            // Database
            ['name' => 'MySQL', 'category' => 'database', 'proficiency_level' => 80, 'sort_order' => 1],
            ['name' => 'SQLite', 'category' => 'database', 'proficiency_level' => 70, 'sort_order' => 2],

            // AI/ML
            ['name' => 'Python', 'category' => 'ai_ml', 'proficiency_level' => 80, 'sort_order' => 1],
            ['name' => 'TensorFlow', 'category' => 'ai_ml', 'proficiency_level' => 65, 'sort_order' => 2],
            ['name' => 'Scikit-learn', 'category' => 'ai_ml', 'proficiency_level' => 70, 'sort_order' => 3],
            ['name' => 'Machine Learning', 'category' => 'ai_ml', 'proficiency_level' => 75, 'sort_order' => 4],

            // Tools
            ['name' => 'Git & GitHub', 'category' => 'tools', 'proficiency_level' => 85, 'sort_order' => 1],
            ['name' => 'VS Code', 'category' => 'tools', 'proficiency_level' => 90, 'sort_order' => 2],
            ['name' => 'Postman', 'category' => 'tools', 'proficiency_level' => 80, 'sort_order' => 3],
        ];

        foreach ($skills as $skill) {
            Skill::create($skill);
        }
    }
}