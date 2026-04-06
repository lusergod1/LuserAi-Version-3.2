import { useState, useEffect } from 'react';
import { getUsers, getVisitors, getChatMessages, UserRecord, VisitorRecord, ChatMessage } from '../store';

const ADMIN_IP = '94.20.98.115';
// Admin chat secret: LUSERINEJDERHASINAZLI

interface AdminPanelProps {
  userIp: string;
  chatUnlocked: boolean;
}

export default function AdminPanel({ userIp, chatUnlocked }: AdminPanelProps) {
  const [tab, setTab] = useState<'users' | 'visitors' | 'chat' | 'stats'>('stats');
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [visitors, setVisitors] = useState<VisitorRecord[]>([]);
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [searchUser, setSearchUser] = useState('');

  const isAllowed = userIp === ADMIN_IP || chatUnlocked;

  useEffect(() => {
    if (!isAllowed) return;
    setUsers(getUsers());
    setVisitors(getVisitors());
    setChat(getChatMessages());
  }, [isAllowed]);

  if (!isAllowed) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white" style={{ paddingTop: '70px' }}>
        <div className="text-center p-12 rounded-3xl max-w-md"
          style={{ background: 'rgba(10,0,0,0.9)', border: '1px solid rgba(220,38,38,0.3)' }}>
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-red-500 font-black text-3xl mb-4">GİRİŞ QADAĞANDIR</h2>
          <p className="text-red-300 mb-2">Bu səhifəyə giriş yalnız icazəli IP ünvanından mümkündür.</p>
          <p className="text-red-400 text-sm opacity-70">Sizin IP: <span className="font-mono text-red-300">{userIp || 'Yüklənir...'}</span></p>
        </div>
      </div>
    );
  }

  const filteredUsers = users.filter(u =>
    u.username.toLowerCase().includes(searchUser.toLowerCase()) ||
    u.email.toLowerCase().includes(searchUser.toLowerCase()) ||
    u.ip.includes(searchUser)
  );

  return (
    <div className="min-h-screen text-white" style={{ paddingTop: '70px' }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #4c1d95)', boxShadow: '0 0 30px rgba(124,58,237,0.5)' }}>
            🔐
          </div>
          <div>
            <h1 className="text-3xl font-black text-white">Admin Paneli</h1>
            <p className="text-purple-300 text-sm">
              {userIp === ADMIN_IP ? `✅ IP ilə doğrulandı: ${userIp}` : '✅ Chat kodu ilə doğrulandı'}
            </p>
          </div>
          <div className="ml-auto flex gap-4">
            <div className="text-center px-4 py-2 rounded-xl" style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.3)' }}>
              <div className="text-purple-400 text-xs">İstifadəçi</div>
              <div className="text-white font-black text-xl">{users.length}</div>
            </div>
            <div className="text-center px-4 py-2 rounded-xl" style={{ background: 'rgba(220,38,38,0.2)', border: '1px solid rgba(220,38,38,0.3)' }}>
              <div className="text-red-400 text-xs">Ziyarətçi</div>
              <div className="text-white font-black text-xl">{visitors.length}</div>
            </div>
            <div className="text-center px-4 py-2 rounded-xl" style={{ background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.3)' }}>
              <div className="text-green-400 text-xs">Chat</div>
              <div className="text-white font-black text-xl">{chat.length}</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {[
            { id: 'stats', label: '📊 Statistika' },
            { id: 'users', label: '👥 İstifadəçilər' },
            { id: 'visitors', label: '🌐 Ziyarətçilər' },
            { id: 'chat', label: '💬 Chat Logu' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id as any)}
              className="px-4 py-2 rounded-xl font-bold text-sm transition-all"
              style={tab === t.id ? {
                background: 'linear-gradient(135deg, #7c3aed, #4c1d95)',
                color: '#fff', boxShadow: '0 0 15px rgba(124,58,237,0.4)'
              } : {
                background: 'rgba(20,0,0,0.8)',
                color: '#c4b5fd', border: '1px solid rgba(124,58,237,0.2)'
              }}>
              {t.label}
            </button>
          ))}
          <button
            onClick={() => { setUsers(getUsers()); setVisitors(getVisitors()); setChat(getChatMessages()); }}
            className="px-4 py-2 rounded-xl text-sm font-bold ml-auto"
            style={{ background: 'rgba(34,197,94,0.2)', color: '#86efac', border: '1px solid rgba(34,197,94,0.3)' }}>
            🔄 Yenilə
          </button>
        </div>

        {/* Content */}
        <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(10,0,0,0.9)', border: '1px solid rgba(124,58,237,0.2)' }}>
          
          {/* Stats */}
          {tab === 'stats' && (
            <div className="p-6">
              <h2 className="text-xl font-black text-purple-300 mb-6">📊 Sistem Statistikası</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Ümumi İstifadəçi', value: users.length, icon: '👥', color: '#7c3aed' },
                  { label: 'Ümumi Ziyarət', value: visitors.length, icon: '🌐', color: '#dc2626' },
                  { label: 'Chat Mesajı', value: chat.length, icon: '💬', color: '#16a34a' },
                  { label: 'Aktiv Sessiya', value: users.filter(u => u.lastLogin && new Date(u.lastLogin) > new Date(Date.now() - 86400000)).length, icon: '⚡', color: '#d97706' },
                ].map((s, i) => (
                  <div key={i} className="p-4 rounded-xl text-center"
                    style={{ background: `rgba(${s.color === '#7c3aed' ? '124,58,237' : s.color === '#dc2626' ? '220,38,38' : s.color === '#16a34a' ? '22,163,74' : '217,119,6'},0.15)`, border: `1px solid ${s.color}44` }}>
                    <div className="text-3xl mb-2">{s.icon}</div>
                    <div className="text-2xl font-black text-white">{s.value}</div>
                    <div className="text-xs opacity-70 mt-1" style={{ color: s.color }}>{s.label}</div>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold text-purple-300 mb-4">🕐 Son Qeydiyyatlar</h3>
              <div className="space-y-2">
                {users.slice(-5).reverse().map(u => (
                  <div key={u.id} className="flex items-center justify-between p-3 rounded-xl"
                    style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">👤</span>
                      <div>
                        <div className="text-white font-bold">{u.username}</div>
                        <div className="text-purple-300 text-xs">{u.email}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-purple-300 text-xs font-mono">{u.ip}</div>
                      <div className="text-purple-400 text-xs">{new Date(u.registeredAt).toLocaleString('az-AZ')}</div>
                    </div>
                  </div>
                ))}
                {users.length === 0 && <p className="text-purple-400 text-sm text-center py-8">Hələ qeydiyyat yoxdur</p>}
              </div>
            </div>
          )}

          {/* Users */}
          {tab === 'users' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-purple-300">👥 İstifadəçilər ({users.length})</h2>
                <input
                  type="text"
                  value={searchUser}
                  onChange={e => setSearchUser(e.target.value)}
                  placeholder="Axtar..."
                  className="px-3 py-2 rounded-lg text-white text-sm outline-none"
                  style={{ background: 'rgba(40,0,40,0.8)', border: '1px solid rgba(124,58,237,0.3)', width: '200px' }}
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(124,58,237,0.3)' }}>
                      {['#', 'İstifadəçi', 'Email', 'IP', 'Tarix', 'Giriş Sayı', 'Son Giriş'].map(h => (
                        <th key={h} className="text-left py-3 px-3 text-purple-400 font-bold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u, i) => (
                      <tr key={u.id} style={{ borderBottom: '1px solid rgba(124,58,237,0.1)' }}
                        className="hover:bg-purple-900/10 transition-colors">
                        <td className="py-3 px-3 text-purple-400">{i + 1}</td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">👤</span>
                            <span className="text-white font-bold">{u.username}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-purple-200">{u.email}</td>
                        <td className="py-3 px-3 font-mono text-red-300 text-xs">{u.ip}</td>
                        <td className="py-3 px-3 text-purple-300 text-xs">{new Date(u.registeredAt).toLocaleString('az-AZ')}</td>
                        <td className="py-3 px-3 text-center">
                          <span className="px-2 py-1 rounded-full text-xs font-bold"
                            style={{ background: 'rgba(124,58,237,0.3)', color: '#c4b5fd' }}>
                            {u.loginCount || 1}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-purple-300 text-xs">
                          {u.lastLogin ? new Date(u.lastLogin).toLocaleString('az-AZ') : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredUsers.length === 0 && (
                  <p className="text-purple-400 text-sm text-center py-12">İstifadəçi tapılmadı</p>
                )}
              </div>
            </div>
          )}

          {/* Visitors */}
          {tab === 'visitors' && (
            <div className="p-6">
              <h2 className="text-xl font-black text-red-300 mb-6">🌐 Ziyarətçilər ({visitors.length})</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(220,38,38,0.3)' }}>
                      {['#', 'IP', 'Səhifə', 'Tarix', 'Brauzer'].map(h => (
                        <th key={h} className="text-left py-3 px-3 text-red-400 font-bold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {visitors.slice().reverse().slice(0, 100).map((v, i) => (
                      <tr key={v.id} style={{ borderBottom: '1px solid rgba(220,38,38,0.1)' }}
                        className="hover:bg-red-900/10 transition-colors">
                        <td className="py-2 px-3 text-red-400">{i + 1}</td>
                        <td className="py-2 px-3 font-mono text-red-300 text-xs">{v.ip}</td>
                        <td className="py-2 px-3 text-white">{v.page}</td>
                        <td className="py-2 px-3 text-red-300 text-xs">{new Date(v.visitedAt).toLocaleString('az-AZ')}</td>
                        <td className="py-2 px-3 text-red-200 text-xs max-w-48 truncate">{v.userAgent.split('(')[0].trim()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {visitors.length === 0 && (
                  <p className="text-red-400 text-sm text-center py-12">Hələ ziyarət qeydə alınmayıb</p>
                )}
              </div>
            </div>
          )}

          {/* Chat */}
          {tab === 'chat' && (
            <div className="p-6">
              <h2 className="text-xl font-black text-green-300 mb-6">💬 Chat Logu ({chat.length})</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {chat.slice().reverse().map((m) => (
                  <div key={m.id} className="flex items-start gap-3 p-3 rounded-xl"
                    style={{ background: m.isAdmin ? 'rgba(22,163,74,0.1)' : 'rgba(20,0,0,0.5)', border: `1px solid ${m.isAdmin ? 'rgba(22,163,74,0.2)' : 'rgba(220,38,38,0.1)'}` }}>
                    <span className="text-xl">{m.isAdmin ? '🤖' : '👤'}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm" style={{ color: m.isAdmin ? '#86efac' : '#fca5a5' }}>{m.username}</span>
                        <span className="text-xs opacity-50">{new Date(m.timestamp).toLocaleString('az-AZ')}</span>
                      </div>
                      <p className="text-white text-sm">{m.message}</p>
                    </div>
                  </div>
                ))}
                {chat.length === 0 && <p className="text-green-400 text-sm text-center py-12">Chat logu boşdur</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
