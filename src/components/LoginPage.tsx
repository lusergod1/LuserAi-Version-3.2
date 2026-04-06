import { useState } from 'react';
import { findUserByEmail, updateUser, generateId, addVisitor, UserRecord } from '../store';

interface LoginPageProps {
  setCurrentPage: (page: string) => void;
  onLogin: (user: UserRecord) => void;
  userIp: string;
}

export default function LoginPage({ setCurrentPage, onLogin, userIp }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleLogin = () => {
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Email və şifrəni daxil edin');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const user = findUserByEmail(email.trim());
      if (!user) { setError('Bu email ilə hesab tapılmadı'); setLoading(false); return; }
      if (user.password !== password) { setError('Şifrə yanlışdır'); setLoading(false); return; }

      const now = new Date().toISOString();
      updateUser(user.id, { lastLogin: now, loginCount: (user.loginCount || 0) + 1, ip: userIp });
      const updated = { ...user, lastLogin: now, loginCount: (user.loginCount || 0) + 1, ip: userIp };

      addVisitor({
        id: generateId(),
        ip: userIp,
        userAgent: navigator.userAgent,
        visitedAt: now,
        page: 'Login',
        referrer: '',
      });

      onLogin(updated);
      setCurrentPage('home');
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white px-4" style={{ paddingTop: '70px' }}>
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-3xl p-8"
          style={{ background: 'rgba(10,0,0,0.95)', border: '1px solid rgba(220,38,38,0.3)', boxShadow: '0 0 60px rgba(220,38,38,0.15)' }}>
          
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">🐉</div>
            <h1 className="text-3xl font-black text-white mb-1">Xoş Gəldin</h1>
            <p className="text-red-300 text-sm">Hesabınıza daxil olun</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-red-300 text-sm font-bold mb-2 block">📧 Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="email@nümunə.com"
                className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all"
                style={{ background: 'rgba(40,0,0,0.8)', border: '1px solid rgba(220,38,38,0.3)', caretColor: '#dc2626' }}
                onFocus={e => e.target.style.borderColor = 'rgba(220,38,38,0.7)'}
                onBlur={e => e.target.style.borderColor = 'rgba(220,38,38,0.3)'}
              />
            </div>

            <div>
              <label className="text-red-300 text-sm font-bold mb-2 block">🔑 Şifrə</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all pr-12"
                  style={{ background: 'rgba(40,0,0,0.8)', border: '1px solid rgba(220,38,38,0.3)', caretColor: '#dc2626' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(220,38,38,0.7)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(220,38,38,0.3)'}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 hover:text-red-300"
                >
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl text-red-300 text-sm"
                style={{ background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.4)' }}>
                ⚠️ {error}
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3 rounded-xl font-black text-white transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #dc2626, #7f1d1d)', boxShadow: '0 0 30px rgba(220,38,38,0.4)' }}
            >
              {loading ? '⏳ Giriş edilir...' : '🚀 Daxil Ol'}
            </button>
          </div>

          <div className="text-center mt-6 pt-6" style={{ borderTop: '1px solid rgba(220,38,38,0.2)' }}>
            <p className="text-red-300 text-sm">
              Hesabınız yoxdur?{' '}
              <button onClick={() => setCurrentPage('register')}
                className="text-red-400 font-bold hover:text-red-300 underline">
                Qeydiyyatdan keçin
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
