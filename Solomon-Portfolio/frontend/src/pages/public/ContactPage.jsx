import { useState } from 'react';
import { sendMessage } from '../../services/contactService';
import { FaPaperPlane, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await sendMessage(form);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-white drop-shadow">
          Get In Touch
        </h1>
        <p className="text-center text-gray-300 mb-12 max-w-xl mx-auto">
          Have a project in mind or want to collaborate? Fill out the form below and I'll get back to you!
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <div className="bg-white/10 dark:bg-gray-800/40 backdrop-blur-sm 
                          rounded-xl p-6 border border-white/20 text-center
                          hover:border-blue-400/50 transition-all">
              <div className="w-12 h-12 bg-blue-500/30 rounded-full flex items-center 
                            justify-center mx-auto mb-4">
                <FaEnvelope className="text-xl text-blue-300" />
              </div>
              <h3 className="text-white font-bold mb-2">Email</h3>
              <p className="text-gray-300 text-sm">solomon12may@gmail.com</p>
            </div>

            <div className="bg-white/10 dark:bg-gray-800/40 backdrop-blur-sm 
                          rounded-xl p-6 border border-white/20 text-center
                          hover:border-blue-400/50 transition-all">
              <div className="w-12 h-12 bg-purple-500/30 rounded-full flex items-center 
                            justify-center mx-auto mb-4">
                <FaMapMarkerAlt className="text-xl text-purple-300" />
              </div>
              <h2 className="text-white font-bold mb-2">Location</h2>
              <p className="text-gray-300 text-sm">Debre Birhan, Ethiopia</p>
            </div>

            <div className="bg-white/10 dark:bg-gray-800/40 backdrop-blur-sm 
                          rounded-xl p-6 border border-white/20 text-center
                          hover:border-blue-400/50 transition-all">
              <div className="w-12 h-12 bg-green-500/30 rounded-full flex items-center 
                            justify-center mx-auto mb-4">
                <FaPhone className="text-xl text-green-300" />
              </div>
              <h3 className="text-white font-bold mb-2">Phone</h3>
              <p className="text-gray-300 text-sm">+251 929172178</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} 
                  className="bg-white/10 dark:bg-gray-800/40 backdrop-blur-sm 
                           rounded-2xl p-8 border border-white/20 shadow-xl">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-200 text-sm mb-2">Your Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 
                             text-white placeholder-gray-400 focus:outline-none 
                             focus:border-blue-400 transition-colors"
                    placeholder="Solomon Alex"
                  />
                </div>
                <div>
                  <label className="block text-gray-200 text-sm mb-2">Your Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 
                             text-white placeholder-gray-400 focus:outline-none 
                             focus:border-blue-400 transition-colors"
                    placeholder="ethio@gmail.com"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-200 text-sm mb-2">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 
                           text-white placeholder-gray-400 focus:outline-none 
                           focus:border-blue-400 transition-colors"
                  placeholder="Project Collaboration"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-200 text-sm mb-2">Your Message *</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows="6"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 
                           text-white placeholder-gray-400 focus:outline-none 
                           focus:border-blue-400 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-600 
                         text-white rounded-xl hover:from-blue-700 hover:to-green-700 
                         transition-all flex items-center justify-center gap-3 font-bold
                         shadow-lg hover:shadow-blue-500/25 disabled:opacity-50"
              >
                {status === 'sending' ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white 
                                 rounded-full animate-spin"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <FaPaperPlane />
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="mt-4 p-4 bg-green-500/20 border border-green-500/30 
                              rounded-lg text-green-300 text-center">
                  ✅ Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 
                              rounded-lg text-red-300 text-center">
                  ❌ Failed to send. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;