import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ChatBot from './components/ChatBot';
import SnakeGame from './components/SnakeGame';
import AdminPanel from './components/AdminPanel';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ServicesPage from './components/ServicesPage';
import { UserRecord, setCurrentUser, getCurrentUser, addVisitor, generateId } from './store';

const ADMIN_IP = '94.20.98.115';

function SecurityPage() {
  return (
    <div className="min-h-screen text-white" style={{ paddingTop: '70px' }}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black mb-3">
            <span className="text-red-500" style={{ textShadow: '0 0 20px rgba(220,38,38,0.6)' }}>🛡️ Güvenlik</span>
          </h1>
          <p className="text-red-300">Hərbi dərəcəli təhlükəsizlik sistemi</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: '🔒', title: 'AES-256 Şifrələmə', desc: 'Bütün məlumatlar hərbi standartda şifrələnir.' },
            { icon: '🌐', title: 'DDoS Qorunması', desc: 'Global CDN ilə saniyədə milyonlarla hücumu bloklayır.' },
            { icon: '🔍', title: 'Zərərli Kod Analizi', desc: 'AI ilə real vaxt rejimində təhdidlər aşkarlanır.' },
            { icon: '📋', title: 'GDPR Uyğunluq', desc: 'Avropa məlumat qorunma qanunlarına tam uyğun.' },
            { icon: '🚨', title: '7/24 SOC Monitorinq', desc: 'Təhlükəsizlik əməliyyatları mərkəzi daim aktiv.' },
            { icon: '🔑', title: 'Zero-Trust Arxitektura', desc: 'Heç kəsə etibar edilmir. Hər şey doğrulanır.' },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl p-6 transition-all hover:scale-105"
              style={{ background: 'rgba(10,0,0,0.9)', border: '1px solid rgba(220,38,38,0.2)', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}>
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-red-400 font-black text-lg mb-2">{item.title}</h3>
              <p className="text-red-200 text-sm opacity-80">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="min-h-screen text-white" style={{ paddingTop: '70px' }}>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black mb-3">
            <span className="text-red-500" style={{ textShadow: '0 0 20px rgba(220,38,38,0.6)' }}>👤 Haqqımda</span>
          </h1>
        </div>
        <div className="rounded-3xl p-8 text-center mb-8"
          style={{ background: 'rgba(10,0,0,0.9)', border: '1px solid rgba(220,38,38,0.3)', boxShadow: '0 0 40px rgba(220,38,38,0.1)' }}>
          <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl"
            style={{ background: 'linear-gradient(135deg, #dc2626, #7f1d1d)', boxShadow: '0 0 30px rgba(220,38,38,0.5)' }}>
            🐉
          </div>
          <h2 className="text-3xl font-black text-white mb-2">Luser AI Komandası</h2>
          <p className="text-red-300 mb-6">Draqon Texnologiyaları Şirkəti</p>
          <p className="text-red-200 leading-relaxed mb-6">
            Luser AI, süni zəka sahəsində innovativ həllər təqdim edən öncü texnologiya şirkətidir.
            Ejderha qüvvəsi ilə işləyən sistemimiz şirkətlərin rəqəmsal dönüşümünə kömək edir.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Quruluş ili', value: '2021' },
              { label: 'Komanda', value: '50+' },
              { label: 'Ölkə', value: '20+' },
            ].map((s, i) => (
              <div key={i} className="rounded-xl p-4"
                style={{ background: 'rgba(127,29,29,0.3)', border: '1px solid rgba(220,38,38,0.2)' }}>
                <div className="text-red-500 font-black text-xl">{s.value}</div>
                <div className="text-red-300 text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Floating particles component
function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `rgba(220,38,38,${Math.random() * 0.5 + 0.1})`,
            animation: `float-particle ${Math.random() * 10 + 8}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
            boxShadow: '0 0 6px rgba(220,38,38,0.5)',
          }}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentUser, setUser] = useState<UserRecord | null>(null);
  const [userIp, setUserIp] = useState('');
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [ipLoaded, setIpLoaded] = useState(false);

  // Fetch IP
  useEffect(() => {
    const savedUser = getCurrentUser();
    if (savedUser) setUser(savedUser);

    // Try to get real IP
    fetch('https://api.ipify.org?format=json')
      .then(r => r.json())
      .then(d => {
        setUserIp(d.ip || '');
        setIpLoaded(true);
        // Log visitor
        addVisitor({
          id: generateId(),
          ip: d.ip || 'unknown',
          userAgent: navigator.userAgent,
          visitedAt: new Date().toISOString(),
          page: 'Site Visit',
          referrer: document.referrer || 'direct',
        });
      })
      .catch(() => {
        setUserIp('unknown');
        setIpLoaded(true);
        addVisitor({
          id: generateId(),
          ip: 'unknown',
          userAgent: navigator.userAgent,
          visitedAt: new Date().toISOString(),
          page: 'Site Visit',
          referrer: document.referrer || 'direct',
        });
      });
  }, []);

  // Track page visits
  useEffect(() => {
    if (!ipLoaded) return;
    addVisitor({
      id: generateId(),
      ip: userIp || 'unknown',
      userAgent: navigator.userAgent,
      visitedAt: new Date().toISOString(),
      page: currentPage,
      referrer: '',
    });
  }, [currentPage, ipLoaded]);

  const handleLogin = (user: UserRecord) => {
    setUser(user);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentUser(null);
    setAdminUnlocked(false);
    setCurrentPage('home');
  };

  const handleAdminUnlock = () => {
    setAdminUnlocked(true);
  };

  // Auto-unlock admin panel for admin IP
  const canAccessAdmin = userIp === ADMIN_IP || adminUnlocked;

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage setCurrentPage={setCurrentPage} />;
      case 'aibot': return (
        <ChatBot
          currentUser={currentUser}
          onAdminUnlock={handleAdminUnlock}
          adminUnlocked={adminUnlocked || userIp === ADMIN_IP}
          setCurrentPage={setCurrentPage}
        />
      );
      case 'game': return <SnakeGame />;
      case 'services': return <ServicesPage setCurrentPage={setCurrentPage} />;
      case 'security': return <SecurityPage />;
      case 'about': return <AboutPage />;
      case 'login': return <LoginPage setCurrentPage={setCurrentPage} onLogin={handleLogin} userIp={userIp} />;
      case 'register': return <RegisterPage setCurrentPage={setCurrentPage} onLogin={handleLogin} userIp={userIp} />;
      case 'admin': return <AdminPanel userIp={userIp} chatUnlocked={adminUnlocked} />;
      default: return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen relative" style={{ background: '#060000', color: '#fff' }}>
      {/* Animated background */}
      <div className="fixed inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(127,29,29,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(220,38,38,0.08) 0%, transparent 40%), radial-gradient(ellipse at 50% 100%, rgba(127,29,29,0.1) 0%, transparent 50%)',
        }}
      />

      {/* Floating particles */}
      <FloatingParticles />

      {/* Dragon image bg overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/dragon-bg.png"
          alt=""
          className="absolute"
          style={{
            right: '-5%',
            bottom: '-5%',
            width: '45%',
            opacity: 0.04,
            filter: 'blur(1px)',
          }}
        />
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes float-particle {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) rotate(720deg); opacity: 0; }
        }
        @keyframes dragon-glow {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(220,38,38,0.6)); }
          50% { filter: drop-shadow(0 0 40px rgba(220,38,38,1)) drop-shadow(0 0 80px rgba(220,38,38,0.4)); }
        }
        * { scrollbar-width: thin; scrollbar-color: rgba(220,38,38,0.5) rgba(10,0,0,0.8); }
        *::-webkit-scrollbar { width: 6px; }
        *::-webkit-scrollbar-track { background: rgba(10,0,0,0.8); }
        *::-webkit-scrollbar-thumb { background: rgba(220,38,38,0.5); border-radius: 3px; }
      `}</style>

      {/* Navbar */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Admin quick access for admin IP */}
      {canAccessAdmin && currentPage !== 'admin' && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setCurrentPage('admin')}
            className="flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-white text-sm transition-all hover:scale-110 shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #4c1d95)', boxShadow: '0 0 30px rgba(124,58,237,0.6)' }}
          >
            🔐 Admin
          </button>
        </div>
      )}

      {/* Page content */}
      <main className="relative z-10">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t py-8 text-center"
        style={{ borderColor: 'rgba(220,38,38,0.2)', background: 'rgba(5,0,0,0.8)' }}>
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="text-2xl">🐉</span>
          <span className="text-red-500 font-black text-lg">LUSER AI</span>
        </div>
        <p className="text-red-300 text-sm">© 2025 Luser AI. Bütün hüquqlar qorunur. Ejderha qüvvəsi ilə işləyir 🔥</p>
        <p className="text-red-400 text-xs mt-2 opacity-50">
          Sizin IP: <span className="font-mono">{userIp || 'Yüklənir...'}</span>
        </p>
      </footer>
    </div>
  );
}
