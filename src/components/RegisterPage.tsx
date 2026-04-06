import { useState } from 'react';
import { findUserByEmail, findUserByUsername, addUser, generateId, addVisitor, UserRecord } from '../store';

interface RegisterPageProps {
  setCurrentPage: (page: string) => void;
  onLogin: (user: UserRecord) => void;
  userIp: string;
}

export default function RegisterPage({ setCurrentPage, onLogin, userIp }: RegisterPageProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const validate = () => {
    if (!username.trim()) return 'İstifadəçi adı daxil edin';
    if (username.length < 3) return 'İstifadəçi adı ən az 3 simvol olmalıdır';
    if (!email.trim() || !email.includes('@')) return 'Düzgün email daxil edin';
    if (password.length < 6) return 'Şifrə ən az 6 simvol olmalıdır';
    if (password !== confirm) return 'Şifrələr uyğun gəlmir';
    return '';
  };

  const handleRegister = () => {
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    setLoading(true);
    setTimeout(() => {
      if (findUserByEmail(email.trim())) { setError('Bu email artıq qeydiyyatdadır'); setLoading(false); return; }
      if (findUserByUsername(username.trim())) { setError('Bu istifadəçi adı artıq mövcuddur'); setLoading(false); return; }

      const now = new Date().toISOString();
      const newUser: UserRecord = {
        id: generateId(),
        username: username.trim(),
        email: email.trim().toLowerCase(),
        password,
        ip: userIp,
        userAgent: navigator.userAgent,
        registeredAt: now,
        lastLogin: now,
        loginCount: 1,
      };
      addUser(newUser);
      addVisitor({
        id: generateId(),
        ip: userIp,
        userAgent: navigator.userAgent,
        visitedAt: now,
        page: 'Register',
        referrer: '',
      });
      onLogin(newUser);
      setCurrentPage('home');
    }, 800);
  };

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthColors = ['', '#dc2626', '#d97706', '#16a34a'];
  const strengthLabels = ['', 'Zəif', 'Orta', 'Güclü'];

  return (
    <div className="min-h-screen flex items-center justify-center text-white px-4 py-8" style={{ paddingTop: '80px' }}>
      <div className="w-full max-w-md">
        <div className="rounded-3xl p-8"
          style={{ background: 'rgba(10,0,0,0.95)', border: '1px solid rgba(220,38,38,0.3)', boxShadow: '0 0 60px rgba(220,38,38,0.15)' }}>
          
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">🐉</div>
            <h1 className="text-3xl font-black text-white mb-1">Qeydiyyat</h1>
            <p className="text-red-300 text-sm">Draqon ailəsinə qatılın</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-red-300 text-sm font-bold mb-2 block">👤 İstifadəçi Adı</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="draqon_usta"
                className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                style={{ background: 'rgba(40,0,0,0.8)', border: '1px solid rgba(220,38,38,0.3)', caretColor: '#dc2626' }}
              />
            </div>

            <div>
              <label className="text-red-300 text-sm font-bold mb-2 block">📧 Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email@nümunə.com"
                className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                style={{ background: 'rgba(40,0,0,0.8)', border: '1px solid rgba(220,38,38,0.3)', caretColor: '#dc2626' }}
              />
            </div>

            <div>
              <label className="text-red-300 text-sm font-bold mb-2 block">🔑 Şifrə</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none pr-12"
                  style={{ background: 'rgba(40,0,0,0.8)', border: '1px solid rgba(220,38,38,0.3)', caretColor: '#dc2626' }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400">
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
              {password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1, 2, 3].map(s => (
                      <div key={s} className="flex-1 h-1.5 rounded-full transition-all"
                        style={{ background: strength >= s ? strengthColors[strength] : 'rgba(100,0,0,0.3)' }} />
                    ))}
                  </div>
                  <p className="text-xs mt-1" style={{ color: strengthColors[strength] }}>
                    {strengthLabels[strength]} şifrə
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="text-red-300 text-sm font-bold mb-2 block">🔐 Şifrəni Təsdiqlə</label>
              <input
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleRegister()}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                style={{
                  background: 'rgba(40,0,0,0.8)',
                  border: `1px solid ${confirm && confirm === password ? 'rgba(22,163,74,0.5)' : confirm ? 'rgba(220,38,38,0.5)' : 'rgba(220,38,38,0.3)'}`,
                  caretColor: '#dc2626'
                }}
              />
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl text-red-300 text-sm"
                style={{ background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.4)' }}>
                ⚠️ {error}
              </div>
            )}

            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full py-3 rounded-xl font-black text-white transition-all hover:scale-105 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #dc2626, #7f1d1d)', boxShadow: '0 0 30px rgba(220,38,38,0.4)' }}
            >
              {loading ? '⏳ Qeydiyyat olunur...' : '🚀 Qeydiyyatdan Keç'}
            </button>
          </div>

          <div className="text-center mt-6 pt-6" style={{ borderTop: '1px solid rgba(220,38,38,0.2)' }}>
            <p className="text-red-300 text-sm">
              Hesabınız var?{' '}
              <button onClick={() => setCurrentPage('login')}
                className="text-red-400 font-bold hover:text-red-300 underline">
                Daxil olun
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
