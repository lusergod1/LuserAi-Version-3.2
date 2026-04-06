import { useState, useRef, useEffect } from 'react';
import { addChatMessage, generateId, ChatMessage, UserRecord } from '../store';

const ADMIN_SECRET = 'LUSERINEJDERHASINAZLI';

interface ChatBotProps {
  currentUser: UserRecord | null;
  onAdminUnlock: () => void;
  adminUnlocked: boolean;
  setCurrentPage: (page: string) => void;
}

const AI_RESPONSES: Record<string, string> = {
  salam: '🐉 Salam! Mən Luser AI-nin draqon köməkçisiyəm. Sizə necə kömək edə bilərəm?',
  xidmet: '⚡ Luser AI aşağıdakı xidmətləri təqdim edir: AI Analiz, Kibertəhlükəsizlik, Avtomatlaşdırma, Bulud Həlləri. Ətraflı məlumat üçün Xidmətlər bölməsinə baxın.',
  qiymet: '💰 Qiymətlərimiz planlardan asılıdır: Starter (pulsuz), Pro ($29/ay), Enterprise (fərdi). Bizimlə əlaqə saxlayın.',
  necə: '🧠 Luser AI dərin öyrənmə alqoritmlərindən istifadə edir. GPT-5 Draqon Modeli ilə gücləndirilmişdir.',
  draqon: '🔥 Draqon! Ejderhalar gücün simvoludur. Luser AI-nin draqon modeli ən güclü AI modeldir!',
  default: '🤔 Maraqlı sualınız var! Mən sizə daha yaxşı kömək etmək üçün öyrənirəm. Zəhmət olmasa daha ətraflı izah edin.',
};

function getAIResponse(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes('salam') || lower.includes('hello') || lower.includes('hi')) return AI_RESPONSES.salam;
  if (lower.includes('xidmət') || lower.includes('service')) return AI_RESPONSES.xidmet;
  if (lower.includes('qiymət') || lower.includes('price') || lower.includes('pul')) return AI_RESPONSES.qiymet;
  if (lower.includes('necə') || lower.includes('how') || lower.includes('nə')) return AI_RESPONSES.necə;
  if (lower.includes('draqon') || lower.includes('ejder')) return AI_RESPONSES.draqon;
  return AI_RESPONSES.default;
}

export default function ChatBot({ currentUser, onAdminUnlock, adminUnlocked, setCurrentPage }: ChatBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      username: 'Luser AI',
      message: '🐉 Salam! Mən Luser AI draqon botuyam. Sizinlə necə kömək edə bilərəm? (Xüsusi kod daxil etmək üçün sadəcə yazın)',
      timestamp: new Date().toISOString(),
      isAdmin: true,
    }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const username = currentUser?.username || 'Qonaq';
    const userMsg: ChatMessage = {
      id: generateId(),
      username,
      message: input.trim(),
      timestamp: new Date().toISOString(),
    };

    // Check admin secret
    if (input.trim() === ADMIN_SECRET) {
      onAdminUnlock();
      const msg: ChatMessage = {
        id: generateId(),
        username: 'Luser AI 🔐',
        message: '🔓 Admin paneli aktivləşdirildi! Sol tərəfdəki Admin düyməsinə basın.',
        timestamp: new Date().toISOString(),
        isAdmin: true,
      };
      setMessages(prev => [...prev, userMsg, msg]);
      setInput('');
      addChatMessage(userMsg);
      return;
    }

    setMessages(prev => [...prev, userMsg]);
    addChatMessage(userMsg);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const aiMsg: ChatMessage = {
        id: generateId(),
        username: 'Luser AI 🐉',
        message: getAIResponse(input.trim()),
        timestamp: new Date().toISOString(),
        isAdmin: true,
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 800 + Math.random() * 800);
  };

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ paddingTop: '70px' }}>
      <div className="max-w-4xl mx-auto w-full px-4 py-8 flex flex-col flex-1">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-black mb-2">
            <span className="text-red-500" style={{ textShadow: '0 0 20px rgba(220,38,38,0.6)' }}>🐉 AI</span>
            <span className="text-white"> Bot</span>
          </h1>
          <p className="text-red-300 text-sm">Draqon gücü ilə işləyən süni zəka köməkçisi</p>
          {adminUnlocked && (
            <button
              onClick={() => setCurrentPage('admin')}
              className="mt-2 px-4 py-2 rounded-lg text-sm font-bold"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #4c1d95)', boxShadow: '0 0 20px rgba(124,58,237,0.5)' }}
            >
              🔐 Admin Paneli Aç
            </button>
          )}
        </div>

        {/* Chat Box */}
        <div className="flex-1 rounded-2xl overflow-hidden flex flex-col"
          style={{ background: 'rgba(10,0,0,0.9)', border: '1px solid rgba(220,38,38,0.3)', boxShadow: '0 0 40px rgba(220,38,38,0.1)', minHeight: '500px' }}>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{ maxHeight: '500px' }}>
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.isAdmin ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${msg.isAdmin ? 'rounded-tl-sm' : 'rounded-tr-sm'}`}
                  style={msg.isAdmin ? {
                    background: 'rgba(127,29,29,0.4)',
                    border: '1px solid rgba(220,38,38,0.3)',
                  } : {
                    background: 'linear-gradient(135deg, #dc2626, #991b1b)',
                    boxShadow: '0 0 15px rgba(220,38,38,0.3)',
                  }}>
                  <div className="text-xs text-red-400 mb-1 font-bold">{msg.username}</div>
                  <div className="text-white text-sm leading-relaxed">{msg.message}</div>
                  <div className="text-xs text-red-400 mt-1 opacity-60">
                    {new Date(msg.timestamp).toLocaleTimeString('az-AZ')}
                  </div>
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl rounded-tl-sm"
                  style={{ background: 'rgba(127,29,29,0.4)', border: '1px solid rgba(220,38,38,0.3)' }}>
                  <div className="flex gap-1 items-center">
                    <span className="text-red-400 text-sm">🐉 Yazır</span>
                    <span className="flex gap-1 ml-2">
                      {[0, 1, 2].map(i => (
                        <span key={i} className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t" style={{ borderColor: 'rgba(220,38,38,0.2)' }}>
            {!currentUser && (
              <div className="text-center text-red-400 text-xs mb-2">
                💡 Tam xüsusiyyətlər üçün{' '}
                <button onClick={() => setCurrentPage('login')} className="text-red-300 underline">daxil olun</button>
              </div>
            )}
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Mesajınızı yazın... (admin kodu daxil edə bilərsiniz)"
                className="flex-1 px-4 py-3 rounded-xl text-white text-sm outline-none"
                style={{ background: 'rgba(40,0,0,0.8)', border: '1px solid rgba(220,38,38,0.3)', caretColor: '#dc2626' }}
              />
              <button
                onClick={sendMessage}
                className="px-5 py-3 rounded-xl font-bold text-white transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #dc2626, #7f1d1d)', boxShadow: '0 0 20px rgba(220,38,38,0.4)' }}
              >
                🚀
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
