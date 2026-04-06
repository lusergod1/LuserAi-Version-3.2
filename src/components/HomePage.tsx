import { useEffect, useState } from 'react';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
}

export default function HomePage({ setCurrentPage }: HomePageProps) {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => {
      let v = 0;
      const i = setInterval(() => { v += 2.5; setCount1(Math.min(v, 99.9)); if (v >= 99.9) clearInterval(i); }, 20);
    }, 300);
    const t2 = setTimeout(() => {
      let v = 0;
      const i = setInterval(() => { v += 1; setCount2(Math.min(v, 24)); if (v >= 24) clearInterval(i); }, 50);
    }, 400);
    const t3 = setTimeout(() => {
      let v = 0;
      const i = setInterval(() => { v += 10; setCount3(Math.min(v, 500)); if (v >= 500) clearInterval(i); }, 20);
    }, 500);
    const t4 = setTimeout(() => {
      let v = 0;
      const i = setInterval(() => { v += 100000; setCount4(Math.min(v, 5000000)); if (v >= 5000000) clearInterval(i); }, 20);
    }, 600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <div className="min-h-screen text-white" style={{ paddingTop: '70px' }}>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Dragon bg image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/dragon-bg.png"
            alt="Dragon"
            className="absolute right-0 top-0 h-full w-1/2 object-cover"
            style={{ opacity: 0.25, maskImage: 'linear-gradient(to right, transparent, black 40%)' }}
          />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(153,27,27,0.2) 0%, transparent 70%)' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6"
              style={{ background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.4)', color: '#fca5a5' }}>
              🔥 Yeni: GPT-5 Draqon Modeli Aktiv
            </div>

            <h1 className="text-7xl font-black leading-none mb-2">
              <span className="text-red-500" style={{ textShadow: '0 0 40px rgba(220,38,38,0.8), 0 0 80px rgba(220,38,38,0.4)' }}>LUSER</span>
            </h1>
            <h1 className="text-7xl font-black leading-none mb-6">
              <span className="text-white" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>AI</span>
              <span className="text-red-500 text-8xl" style={{ textShadow: '0 0 40px rgba(220,38,38,1)' }}>.</span>
            </h1>

            <p className="text-lg text-red-100 mb-2 leading-relaxed">
              🐉 Ejderha qüvvəsi ilə çalışan <span className="text-red-400 font-bold">süni zəka sistemi</span>.
              Şirkətinizi rəqəmsal dünyada qoruyur, böyüdür və gücəndirir.
            </p>
            <p className="text-sm text-red-300 mb-8">
              Luser AI — müasir texnologiyaların zirvəsi. Hər sahədə ağıllı həllər.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setCurrentPage('aibot')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #dc2626, #7f1d1d)', boxShadow: '0 0 30px rgba(220,38,38,0.6)' }}
              >
                🐉 AI ilə Danış
              </button>
              <button
                onClick={() => setCurrentPage('services')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold border transition-all duration-300 hover:scale-105"
                style={{ borderColor: 'rgba(220,38,38,0.5)', color: '#fca5a5', background: 'rgba(220,38,38,0.1)' }}
              >
                ⚡ Xidmətlər
              </button>
              <button
                onClick={() => setCurrentPage('game')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold border transition-all duration-300 hover:scale-105"
                style={{ borderColor: 'rgba(251,191,36,0.5)', color: '#fbbf24', background: 'rgba(251,191,36,0.1)' }}
              >
                🎮 Oyun Oyna
              </button>
            </div>
          </div>

          {/* Dragon Image */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.3) 0%, transparent 70%)', filter: 'blur(40px)' }} />
            <img
              src="/dragon-hero.png"
              alt="Luser AI Dragon"
              className="relative z-10 w-full max-w-lg"
              style={{ filter: 'drop-shadow(0 0 40px rgba(220,38,38,0.8)) drop-shadow(0 0 80px rgba(220,38,38,0.4))' }}
            />
            {/* Floating badges */}
            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold animate-bounce"
              style={{ background: 'rgba(220,38,38,0.8)', boxShadow: '0 0 20px rgba(220,38,38,0.6)' }}>
              🔥 AKTIV
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: '⚡', value: `${count1.toFixed(1)}%`, label: 'Uptime', color: '#fbbf24' },
            { icon: '🐲', value: `${count2}/7`, label: 'Dəstək', color: '#dc2626' },
            { icon: '👥', value: `${count3}+`, label: 'Müştəri', color: '#6b7280' },
            { icon: '🔥', value: `${(count4 / 1000000).toFixed(1)}M+`, label: 'Sorğu/gün', color: '#f97316' },
          ].map((stat, i) => (
            <div key={i} className="rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105"
              style={{ background: 'rgba(20,0,0,0.8)', border: '1px solid rgba(220,38,38,0.2)', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}>
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-black mb-1" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-red-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black text-center mb-3">
            <span className="text-white">Niyə </span>
            <span className="text-red-500" style={{ textShadow: '0 0 20px rgba(220,38,38,0.6)' }}>Luser AI</span>
            <span className="text-white">?</span>
          </h2>
          <p className="text-red-300 text-center mb-12">Ejderha gücü ilə dəstəklənən xüsusiyyətlər</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🧠', title: 'Ağıllı Analiz', desc: 'Dərin öyrənmə alqoritmləri ilə məlumatlarınızı analiz edir və dəqiq nəticələr çıxarır.' },
              { icon: '🛡️', title: 'Maksimal Güvenlik', desc: 'Hərbi dərəcəli şifrələmə ilə məlumatlarınız tam qorunur. 0 pozuntu rekordumuz var.' },
              { icon: '⚡', title: 'Ultra Sürət', desc: 'Milisaniyə cavab müddəti ilə real vaxt rejimində işləyir. Heç bir gecikməyə yol verilmir.' },
              { icon: '🌐', title: 'Qlobal Şəbəkə', desc: '50+ ölkədə server infrastrukturumuz ilə hər yerdən eyni sürətlə istifadə edin.' },
              { icon: '🎯', title: 'Dəqiq Hədəf', desc: 'Maşın öyrənməsi ilə sizin üçün optimal həllər tapır. %99.7 dəqiqlik nisbəti.' },
              { icon: '🚀', title: 'Sonsuz Miqyas', desc: 'Kiçik startupdan Fortune 500-ə qədər hər ölçülü şirkət üçün uyğunlaşır.' },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl p-6 transition-all duration-300 hover:scale-105 group cursor-pointer"
                style={{ background: 'rgba(15,0,0,0.8)', border: '1px solid rgba(220,38,38,0.15)', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 30px rgba(220,38,38,0.3), 0 0 60px rgba(220,38,38,0.1)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)')}>
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-red-400 font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-red-200 text-sm leading-relaxed opacity-80">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative z-10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="rounded-3xl p-12"
            style={{ background: 'linear-gradient(135deg, rgba(127,29,29,0.4), rgba(15,0,0,0.8))', border: '1px solid rgba(220,38,38,0.3)', boxShadow: '0 0 60px rgba(220,38,38,0.2)' }}>
            <div className="text-6xl mb-4">🐉</div>
            <h2 className="text-4xl font-black text-white mb-4">İndi Başla</h2>
            <p className="text-red-300 mb-8">Ejderha qüvvəsini kəşf et. Pulsuz qeydiyyat. Kart tələb olunmur.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => setCurrentPage('register')}
                className="px-8 py-3 rounded-xl font-bold text-white transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #dc2626, #7f1d1d)', boxShadow: '0 0 30px rgba(220,38,38,0.6)' }}
              >
                🚀 Pulsuz Başla
              </button>
              <button
                onClick={() => setCurrentPage('aibot')}
                className="px-8 py-3 rounded-xl font-bold text-red-300 border border-red-700 hover:bg-red-900/20 transition-all"
              >
                🐲 Demo İzlə
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
