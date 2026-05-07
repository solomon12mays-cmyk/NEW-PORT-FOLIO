import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { logout } from '../../services/authService';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/dashboard')
      .then(res => setStats(res.data.data))
      .catch(() => navigate('/admin/login'));
  }, []);

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem('auth_token');
    navigate('/admin/login');
  };

  if (!stats) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Projects', value: stats.total_projects, color: 'bg-blue-500' },
            { label: 'Published', value: stats.published_projects, color: 'bg-green-500' },
            { label: 'Skills', value: stats.total_skills, color: 'bg-purple-500' },
            { label: 'New Messages', value: stats.unread_messages, color: 'bg-orange-500' },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.color} rounded-xl p-6 text-white`}>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm opacity-90">{stat.label}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 dark:text-gray-500">
          Total Messages: {stats.total_messages}
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;