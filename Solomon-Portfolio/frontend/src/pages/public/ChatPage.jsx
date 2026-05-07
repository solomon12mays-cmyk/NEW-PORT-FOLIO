import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaTrash, FaSignOutAlt, FaUser } from 'react-icons/fa';
import api from '../../services/api';

const ChatPage = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('chat_token'));
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [input, setInput] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const messagesEndRef = useRef(null);

  // Auto-select admin if current user is NOT admin
  useEffect(() => {
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      loadUsers();
    }
  }, [token]);

  // Auto-select admin for non-admin users
  useEffect(() => {
    if (users.length > 0 && !user?.is_admin && !selectedUser) {
      const adminUser = users.find(u => u.is_admin);
      if (adminUser) {
        setSelectedUser(adminUser);
      }
    }
  }, [users, user]);

  useEffect(() => {
    if (selectedUser && token) {
      loadMessages(selectedUser.id);
      const interval = setInterval(() => loadMessages(selectedUser.id), 2000);
      return () => clearInterval(interval);
    }
  }, [selectedUser]);

  /*useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);*/
  // Only auto-scroll when YOU send a message, not when receiving
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  };
  const loadUsers = async () => {
    try {
      const res = await api.get('/chat/users');
      setUsers(res.data.data);
      // Set current user info
      const userRes = await api.get('/auth/user');
      setUser(userRes.data.data);
    } catch {
      logout();
    }
  };

  const loadMessages = async (userId) => {
    try {
      const res = await api.get(`/chat/messages/${userId}`);
      setMessages(res.data.data);
    } catch {}
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await api.post('/auth/login', { email, password });
        setToken(res.data.data.token);
        localStorage.setItem('chat_token', res.data.data.token);
        api.defaults.headers.Authorization = `Bearer ${res.data.data.token}`;
        setUser(res.data.data.user);
      } else {
        await api.post('/chat/register', { name, username: email, password });
        setIsLogin(true);
        alert('Registered! Now login with your email.');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !selectedUser) return;
    try {
      await api.post('/chat/send', {
        receiver_id: selectedUser.id,
        message: input,
      });
      setInput('');
      loadMessages(selectedUser.id);
    } catch {}
  };

  const handleDelete = async (messageId) => {
    if (!confirm('Delete this message?')) return;
    try {
      await api.delete(`/chat/messages/${messageId}`);
      loadMessages(selectedUser.id);
    } catch {}
  };

  const handleClear = async () => {
    if (!confirm('Clear your messages in this chat?')) return;
    try {
      await api.delete(`/chat/clear/${selectedUser.id}`);
      loadMessages(selectedUser.id);
    } catch {}
  };

  const logout = () => {
    localStorage.removeItem('chat_token');
    setToken(null);
    setUser(null);
    setSelectedUser(null);
    setMessages([]);
    setUsers([]);
  };

  // Login/Register Screen
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div 
          className="bg-white/10 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl 
                    border border-white/20 p-8 w-full max-w-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            {isLogin ? 'Login to Chat' : 'Create Account'}
          </h2>
          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 
                         text-white placeholder-gray-400 focus:outline-none"
              />
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 
                       text-white placeholder-gray-400 focus:outline-none"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 
                       text-white placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl 
                       hover:bg-blue-700 transition-all font-medium"
            >
              {isLogin ? 'Login' : 'Register'}
            </button>
          </form>
          <p className="text-gray-400 text-center mt-4 text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-400 hover:underline"
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div 
        className="w-full max-w-4xl bg-white/10 dark:bg-gray-800/40 backdrop-blur-sm 
                  rounded-2xl border border-white/20 shadow-xl overflow-hidden"
        style={{ height: '70vh' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0 border-r border-white/10 flex flex-col h-full">
            <div className="p-4 bg-blue-600/50 flex-shrink-0 flex justify-between items-center">
              <h3 className="text-white font-bold text-sm">
                {user?.is_admin ? 'All Users' : 'Chat'}
              </h3>
              <button onClick={logout} className="text-white/70 hover:text-white">
                <FaSignOutAlt />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {users.length === 0 ? (
                <p className="text-gray-400 text-center p-4 text-sm">No users yet</p>
              ) : (
                users.map((u) => (
                  <div
                    key={u.id}
                    onClick={() => setSelectedUser(u)}
                    className={`p-4 cursor-pointer hover:bg-white/10 transition-all flex items-center gap-3
                              ${selectedUser?.id === u.id ? 'bg-white/20 border-l-2 border-blue-400' : ''}`}
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                      <FaUser className="text-white text-sm" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">
                        {u.name}
                        {u.is_admin && <span className="text-yellow-400 text-xs ml-1">(Admin)</span>}
                      </p>
                      {u.unread > 0 && (
                        <span className="inline-block bg-red-500 text-white text-xs px-2 py-0.5 rounded-full mt-1">
                          {u.unread} new
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col h-full min-w-0">
            {selectedUser ? (
              <>
                <div className="p-4 bg-blue-600/50 flex-shrink-0 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <FaUser className="text-white text-sm" />
                    </div>
                    <span className="text-white font-medium truncate">{selectedUser.name}</span>
                  </div>
                  <button
                    onClick={handleClear}
                    className="text-white/70 hover:text-red-400 transition-colors text-sm flex-shrink-0"
                    title="Clear my messages"
                  >
                    <FaTrash />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">No messages yet. Say hello!</p>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.user_id === user?.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className="group relative max-w-[70%]">
                          <div className={`p-3 rounded-2xl text-sm break-words ${
                            msg.user_id === user?.id
                              ? 'bg-blue-600 text-white rounded-tr-none'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-tl-none'
                          }`}>
                            {msg.message}
                          </div>
                          {msg.user_id === user?.id && (
                            <button
                              onClick={() => handleDelete(msg.id)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full 
                                       w-5 h-5 flex items-center justify-center text-xs
                                       opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSend} className="p-4 border-t border-white/10 flex gap-2 flex-shrink-0">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 
                             text-white placeholder-gray-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 
                             transition-all flex-shrink-0"
                  >
                    <FaPaperPlane />
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400 px-4 text-center">
                <p>{user?.is_admin ? '👈 Select a user to start chatting' : 'Loading chat...'}</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatPage;