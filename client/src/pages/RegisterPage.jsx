import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (!agreeTerms) {
      setError('Please accept the Terms of Service to create an account.');
      return;
    }

    setError('');
    setSuccessMsg('Account created successfully! Redirecting...');
    setTimeout(() => {
      navigate('/login');
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
            Create an account
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Compare prices across 100+ sites and save on your next trip.
          </p>
        </div>

        {/* Alerts */}
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

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="reg-name"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
            >
              Full name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                id="reg-name"
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  setError('');
                }}
                placeholder="Elena Rostova"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="reg-email"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
            >
              Email address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                id="reg-email"
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
            <label
              htmlFor="reg-password"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
            >
              Create password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Min. 6 characters"
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

          <div className="pt-1">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-xs text-slate-600 leading-tight">
                I agree to the{' '}
                <span className="text-blue-600 underline font-medium">Terms of Service</span> and{' '}
                <span className="text-blue-600 underline font-medium">Privacy Policy</span>.
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-md shadow-blue-600/25 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            Create Free Account
          </button>
        </form>

        {/* Bottom Switch Link */}
        <div className="text-center pt-4 border-t border-slate-100 text-xs text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
