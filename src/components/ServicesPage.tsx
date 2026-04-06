interface ServicesPageProps {
  setCurrentPage: (page: string) => void;
}

export default function ServicesPage({ setCurrentPage }: ServicesPageProps) {
  const services = [
    {
      icon: '🧠', title: 'AI Analiz Platformu', price: '$49/ay',
      desc: 'Şirkətinizin məlumatlarını dərin öyrənmə ilə analiz edir. Real vaxt hesabatlar, trend proqnozları.',
      features: ['GPT-5 Draqon Model', 'Real-vaxt analiz', 'Xüsusi hesabatlar', '99.9% dəqiqlik'],
      color: '#dc2626',
    },
    {
      icon: '🛡️', title: 'Kibertəhlükəsizlik', price: '$89/ay',
      desc: 'Hərbi dərəcəli şifrələmə. DDoS qorunması, zərərli kod aşkarlaması, 7/24 monitorinq.',
      features: ['256-bit şifrələmə', 'DDoS qorunması', 'Zərərli kod analizi', '7/24 monitorinq'],
      color: '#7c3aed',
      popular: true,
    },
    {
      icon: '⚡', title: 'Avtomatlaşdırma', price: '$29/ay',
      desc: 'İş proseslərini avtomatlaşdırın. Vaxt qazanın, xərcləri azaldın. Sonsuz inteqrasiya imkanları.',
      features: ['1000+ inteqrasiya', 'Xüsusi iş axınları', 'API dəstəyi', 'Kod tələb olunmur'],
      color: '#d97706',
    },
    {
      icon: '☁️', title: 'Bulud Həlləri', price: '$19/ay',
      desc: 'Global bulud infrastrukturunuzda tətbiqlərinizi yerləşdirin. Sonsuz miqyaslanma.',
      features: ['Global CDN', 'Auto-scaling', '99.99% uptime', 'Backup sistemi'],
      color: '#16a34a',
    },
    {
      icon: '📊', title: 'Biznes Kəşfiyyatı', price: '$69/ay',
      desc: 'Rəqiblərinizi, bazarı və müştərilərinizi dərindən anlayın. Strateji üstünlük qazanın.',
      features: ['Rəqib analizi', 'Bazar trendləri', 'Müştəri davranışı', 'Öngörümlü analitik'],
      color: '#0891b2',
    },
    {
      icon: '🤖', title: 'Xüsusi AI Model', price: 'Fərdi',
      desc: 'Biznesinizə özel AI modeli hazırlayırıq. Tam fərdiləşdirilmiş, tam sizin.',
      features: ['Xüsusi öyrətmə', 'Tam fərdiləşdirmə', 'Biznesinizə uyğun', 'Dəstək & yeniləmə'],
      color: '#dc2626',
    },
  ];

  return (
    <div className="min-h-screen text-white" style={{ paddingTop: '70px' }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black mb-3">
            <span className="text-white">⚡ </span>
            <span className="text-red-500" style={{ textShadow: '0 0 20px rgba(220,38,38,0.6)' }}>Xidmətlər</span>
          </h1>
          <p className="text-red-300">Draqon gücü ilə işləyən premium xidmətlər</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className={`relative rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer ${s.popular ? 'ring-2' : ''}`}
              style={{
                background: 'rgba(10,0,0,0.9)',
                border: `1px solid ${s.color}33`,
                boxShadow: `0 0 20px rgba(0,0,0,0.5)`,
                outline: s.popular ? `2px solid ${s.color}` : undefined,
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 40px ${s.color}33`}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)'}>
              
              {s.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-black text-white"
                  style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}aa)`, boxShadow: `0 0 15px ${s.color}66` }}>
                  ⭐ ƏN POPULYAR
                </div>
              )}

              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-white font-black text-lg mb-2">{s.title}</h3>
              <div className="font-black text-2xl mb-3" style={{ color: s.color }}>{s.price}</div>
              <p className="text-red-200 text-sm mb-4 opacity-80 leading-relaxed">{s.desc}</p>

              <ul className="space-y-2 mb-6">
                {s.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-red-100">
                    <span style={{ color: s.color }}>✓</span> {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setCurrentPage('register')}
                className="w-full py-2.5 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90"
                style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}88)`, boxShadow: `0 0 15px ${s.color}44` }}>
                🚀 Başla
              </button>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-3xl font-black text-center text-white mb-8">❓ Tez-tez Sorulan Suallar</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {[
              { q: 'Pulsuz sınaq var mı?', a: '14 günlük tam pulsuz sınaq. Kart tələb olunmur.' },
              { q: 'İstənilən vaxt ləğv etmək mümkündür?', a: 'Bəli, istənilən vaxt, heç bir cəza olmadan.' },
              { q: 'Məlumatlarım qorunur mu?', a: 'Bəli, 256-bit şifrələmə ilə tam qorunur. GDPR uyğun.' },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl p-5"
                style={{ background: 'rgba(10,0,0,0.9)', border: '1px solid rgba(220,38,38,0.2)' }}>
                <div className="text-red-400 font-bold mb-2">🔸 {f.q}</div>
                <div className="text-red-100 text-sm">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
