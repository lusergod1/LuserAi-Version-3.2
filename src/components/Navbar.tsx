import { UserRecord } from '../store';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  currentUser: UserRecord | null;
  onLogout: () => void;
}

export default function Navbar({ currentPage, setCurrentPage, currentUser, onLogout }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3"
      style={{ background: 'rgba(10,0,0,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(220,38,38,0.3)' }}>
      {/* Logo */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl"
          style={{ background: 'linear-gradient(135deg, #dc2626, #7f1d1d)', boxShadow: '0 0 20px rgba(220,38,38,0.6)' }}>
          🐉
        </div>
        <div>
          <div className="text-red-500 font-black text-lg tracking-wider leading-none">LUSER AI</div>
          <div className="text-red-300 text-xs tracking-widest">SÜNİ ZƏKA SİSTEMİ</div>
        </div>
      </div>

      {/* Nav Links */}
      <div className="flex items-center gap-1">
        {[
          { id: 'home', label: '🏠 Ana Səhifə' },
          { id: 'aibot', label: '🐉 AI Bot' },
          { id: 'game', label: '🎮 Oyun' },
          { id: 'services', label: '⚡ Xidmətlər' },
          { id: 'security', label: '🛡️ Güvenlik' },
          { id: 'about', label: '👤 Haqqımda' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              background: currentPage === item.id ? 'linear-gradient(135deg, #dc2626, #991b1b)' : 'transparent',
              color: currentPage === item.id ? '#fff' : '#fca5a5',
              boxShadow: currentPage === item.id ? '0 0 15px rgba(220,38,38,0.5)' : 'none',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Auth */}
      <div className="flex items-center gap-2">
        {currentUser ? (
          <>
            <span className="text-red-300 text-sm">👋 {currentUser.username}</span>
            <button
              onClick={onLogout}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-red-300 border border-red-800 hover:bg-red-900/30 transition-all"
            >
              Çıxış
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setCurrentPage('login')}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-red-300 border border-red-800 hover:bg-red-900/30 transition-all"
            >
              Giriş
            </button>
            <button
              onClick={() => setCurrentPage('register')}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #dc2626, #991b1b)', boxShadow: '0 0 10px rgba(220,38,38,0.4)' }}
            >
              Qeydiyyat
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
