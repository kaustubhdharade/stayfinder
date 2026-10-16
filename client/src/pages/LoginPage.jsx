import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setSuccessMsg('Sign in simulated successfully! Redirecting...');
    setTimeout(() => {
      navigate('/');
    }, 1200);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xl">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">
              Stay<span className="text-blue-600">Finder</span>
            </span>
          </Link>

          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Welcome back
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Sign in to access saved stays and exclusive member rates.
          </p>
        </div>

        {/* Success / Error Banners */}
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium animate-fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="login-email"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
            >
              Email address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="name@example.com"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="login-password"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setError('Password reset demo: Please use your account email.')}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-xs text-slate-600 font-medium">Keep me signed in</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-md shadow-blue-600/25 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            Sign In
          </button>
        </form>

        {/* Bottom Switch Link */}
        <div className="text-center pt-4 border-t border-slate-100 text-xs text-slate-500">
          Don&rsquo;t have an account yet?{' '}
          <Link to="/register" className="font-bold text-blue-600 hover:text-blue-700">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
