import { useEffect, useState } from 'react';
import { getSkills } from '../../services/skillService';

const SkillsPage = () => {
  const [skills, setSkills] = useState({});

  useEffect(() => {
    getSkills()
      .then(res => setSkills(res.data.data))
      .catch(() => {});
  }, []);

  const categoryColors = {
    frontend: 'from-blue-400 to-blue-600',
    backend: 'from-green-400 to-green-600',
    database: 'from-yellow-400 to-yellow-600',
    ai_ml: 'from-purple-400 to-purple-600',
    tools: 'from-gray-400 to-gray-600',
    devops: 'from-red-400 to-red-600',
  };

  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">
          Skills & Technologies
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(skills).map(([category, categorySkills]) => (
            <div key={category} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-6 capitalize text-gray-900 dark:text-white">
                {category}
              </h2>
              <div className="space-y-4">
                {categorySkills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                      <span className="text-gray-500">{skill.proficiency_level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${categoryColors[category] || 'from-blue-400 to-blue-600'}`}
                        style={{ width: `${skill.proficiency_level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;