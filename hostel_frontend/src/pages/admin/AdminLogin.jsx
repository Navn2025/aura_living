import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from '../../api/axios.config';

export default function AdminLogin()
{
  const [username, setUsername]=useState('');
  const [password, setPassword]=useState('');
  const [error, setError]=useState('');
  const [loading, setLoading]=useState(false);
  const navigate=useNavigate();

  const handleSubmit=async (e) =>
  {
    e.preventDefault();
    setError('');
    setLoading(true);
    try
    {
      const response=await axios.post('/admin/login', {username, password});
      localStorage.setItem('adminToken', response.data.token);
      navigate('/admin/dashboard');
    } catch (err)
    {
      setError(err.response?.data?.message||'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0d1b2a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#f0ebd8] rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#0d1b2a]">Admin Panel</h1>
            <p className="text-[#0d1b2a]/70 mt-2">AuraLiving</p>
          </div>

          {error&&(
            <div className="mb-4 bg-red-500/20 border border-red-400 text-red-300 p-3 rounded-xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#0d1b2a] font-medium mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white text-[#0d1b2a] border-2 border-[#0d1b2a]/20 focus:border-[#0d1b2a] outline-none transition-all"
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label className="block text-[#0d1b2a] font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white text-[#0d1b2a] border-2 border-[#0d1b2a]/20 focus:border-[#0d1b2a] outline-none transition-all"
                placeholder="Enter password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#0d1b2a] text-[#f0ebd8] font-bold hover:bg-[#1a2d40] transition-all disabled:opacity-50"
            >
              {loading? 'Logging in...':'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-[#0d1b2a]/70 hover:text-[#0d1b2a] text-sm">
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
