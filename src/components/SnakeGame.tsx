import { useState, useEffect, useRef } from 'react';

const GRID = 20;
const CELL = 22;

type Point = { x: number; y: number };
type Dir = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

function randomFood(snake: Point[]): Point {
  let pos: Point;
  do {
    pos = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
  } while (snake.some(s => s.x === pos.x && s.y === pos.y));
  return pos;
}

export default function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [, setDir] = useState<Dir>('RIGHT');
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('snake_hs') || '0'));
  const [dead, setDead] = useState(false);
  const [speed, setSpeed] = useState(150);
  const dirRef = useRef<Dir>('RIGHT');
  const gameRef = useRef<HTMLDivElement>(null);

  const reset = () => {
    const initSnake = [{ x: 10, y: 10 }];
    setSnake(initSnake);
    setFood(randomFood(initSnake));
    setDir('RIGHT');
    dirRef.current = 'RIGHT';
    setScore(0);
    setDead(false);
    setRunning(true);
    setSpeed(150);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const map: Record<string, Dir> = {
        ArrowUp: 'UP', ArrowDown: 'DOWN', ArrowLeft: 'LEFT', ArrowRight: 'RIGHT',
        w: 'UP', s: 'DOWN', a: 'LEFT', d: 'RIGHT',
        W: 'UP', S: 'DOWN', A: 'LEFT', D: 'RIGHT',
      };
      const newDir = map[e.key];
      if (!newDir) return;
      e.preventDefault();
      const opposites: Record<Dir, Dir> = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' };
      if (newDir !== opposites[dirRef.current]) {
        dirRef.current = newDir;
        setDir(newDir);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    if (!running || dead) return;
    const interval = setInterval(() => {
      setSnake(prev => {
        const head = prev[0];
        const moves: Record<Dir, Point> = {
          UP: { x: head.x, y: head.y - 1 },
          DOWN: { x: head.x, y: head.y + 1 },
          LEFT: { x: head.x - 1, y: head.y },
          RIGHT: { x: head.x + 1, y: head.y },
        };
        const newHead = moves[dirRef.current];

        // Wall collision
        if (newHead.x < 0 || newHead.x >= GRID || newHead.y < 0 || newHead.y >= GRID) {
          setDead(true);
          setRunning(false);
          return prev;
        }
        // Self collision
        if (prev.some(s => s.x === newHead.x && s.y === newHead.y)) {
          setDead(true);
          setRunning(false);
          return prev;
        }

        const newSnake = [newHead, ...prev];
        setFood(f => {
          if (newHead.x === f.x && newHead.y === f.y) {
            setScore(sc => {
              const ns = sc + 10;
              if (ns > highScore) {
                setHighScore(ns);
                localStorage.setItem('snake_hs', String(ns));
              }
              if (ns % 50 === 0) setSpeed(sp => Math.max(60, sp - 15));
              return ns;
            });
            return randomFood(newSnake);
          } else {
            newSnake.pop();
            return f;
          }
        });
        return newSnake;
      });
    }, speed);
    return () => clearInterval(interval);
  }, [running, dead, speed, highScore]);

  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    const opposites: Record<Dir, Dir> = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' };
    let newDir: Dir;
    if (Math.abs(dx) > Math.abs(dy)) {
      newDir = dx > 0 ? 'RIGHT' : 'LEFT';
    } else {
      newDir = dy > 0 ? 'DOWN' : 'UP';
    }
    if (newDir !== opposites[dirRef.current]) {
      dirRef.current = newDir;
      setDir(newDir);
    }
    touchStart.current = null;
  };

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center" style={{ paddingTop: '70px' }}>
      <div className="max-w-2xl w-full mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-black mb-2">
            <span className="text-red-500" style={{ textShadow: '0 0 20px rgba(220,38,38,0.6)' }}>🐍 Draqon</span>
            <span className="text-white"> Oyunu</span>
          </h1>
          <p className="text-red-300 text-sm">Draqonu idarə et, xalları topla!</p>
        </div>

        {/* Score */}
        <div className="flex justify-center gap-8 mb-4">
          <div className="text-center px-6 py-3 rounded-xl" style={{ background: 'rgba(20,0,0,0.8)', border: '1px solid rgba(220,38,38,0.3)' }}>
            <div className="text-red-400 text-xs mb-1">XAL</div>
            <div className="text-white font-black text-2xl">{score}</div>
          </div>
          <div className="text-center px-6 py-3 rounded-xl" style={{ background: 'rgba(20,0,0,0.8)', border: '1px solid rgba(251,191,36,0.3)' }}>
            <div className="text-yellow-400 text-xs mb-1">🏆 REKORD</div>
            <div className="text-yellow-400 font-black text-2xl">{highScore}</div>
          </div>
          <div className="text-center px-6 py-3 rounded-xl" style={{ background: 'rgba(20,0,0,0.8)', border: '1px solid rgba(34,197,94,0.3)' }}>
            <div className="text-green-400 text-xs mb-1">UZUNLUQ</div>
            <div className="text-green-400 font-black text-2xl">{snake.length}</div>
          </div>
        </div>

        {/* Game Grid */}
        <div className="flex justify-center mb-4">
          <div
            ref={gameRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative rounded-2xl overflow-hidden select-none"
            style={{
              width: GRID * CELL,
              height: GRID * CELL,
              background: 'rgba(5,0,0,0.95)',
              border: '2px solid rgba(220,38,38,0.5)',
              boxShadow: '0 0 40px rgba(220,38,38,0.3), inset 0 0 40px rgba(0,0,0,0.5)',
            }}
          >
            {/* Grid lines */}
            {Array.from({ length: GRID }).map((_, i) => (
              <div key={`h${i}`} className="absolute left-0 right-0"
                style={{ top: i * CELL, height: 1, background: 'rgba(220,38,38,0.05)' }} />
            ))}
            {Array.from({ length: GRID }).map((_, i) => (
              <div key={`v${i}`} className="absolute top-0 bottom-0"
                style={{ left: i * CELL, width: 1, background: 'rgba(220,38,38,0.05)' }} />
            ))}

            {/* Food */}
            <div className="absolute flex items-center justify-center text-lg"
              style={{
                left: food.x * CELL + 1, top: food.y * CELL + 1,
                width: CELL - 2, height: CELL - 2,
                animation: 'pulse 1s infinite',
              }}>
              🍖
            </div>

            {/* Snake */}
            {snake.map((seg, i) => (
              <div key={i} className="absolute rounded-sm transition-all"
                style={{
                  left: seg.x * CELL + 1, top: seg.y * CELL + 1,
                  width: CELL - 2, height: CELL - 2,
                  background: i === 0
                    ? 'linear-gradient(135deg, #ff4444, #cc0000)'
                    : `rgba(${Math.max(100, 220 - i * 5)}, ${Math.max(0, 30 - i * 2)}, ${Math.max(0, 30 - i * 2)}, ${Math.max(0.4, 1 - i * 0.03)})`,
                  boxShadow: i === 0 ? '0 0 10px rgba(220,38,38,0.8)' : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: i === 0 ? '12px' : undefined,
                }}>
                {i === 0 ? '👁️' : ''}
              </div>
            ))}

            {/* Overlay states */}
            {!running && !dead && (
              <div className="absolute inset-0 flex flex-col items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.8)' }}>
                <div className="text-6xl mb-4">🐉</div>
                <p className="text-red-300 text-sm mb-4 text-center">← → ↑ ↓ düymələri ilə idarə et</p>
                <button onClick={reset}
                  className="px-8 py-3 rounded-xl font-black text-white transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #dc2626, #7f1d1d)', boxShadow: '0 0 30px rgba(220,38,38,0.6)' }}>
                  🚀 BAŞLA
                </button>
              </div>
            )}

            {dead && (
              <div className="absolute inset-0 flex flex-col items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.85)' }}>
                <div className="text-5xl mb-2">💀</div>
                <h2 className="text-red-500 font-black text-2xl mb-1">OYUN BİTDİ!</h2>
                <p className="text-red-300 mb-1">Xal: <span className="font-black text-white">{score}</span></p>
                {score >= highScore && score > 0 && (
                  <p className="text-yellow-400 font-bold mb-2">🏆 Yeni Rekord!</p>
                )}
                <button onClick={reset}
                  className="px-8 py-3 rounded-xl font-black text-white mt-3 transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #dc2626, #7f1d1d)', boxShadow: '0 0 30px rgba(220,38,38,0.6)' }}>
                  🔄 Yenidən Oyna
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Controls hint */}
        <div className="text-center text-red-400 text-xs opacity-60">
          ⌨️ W/A/S/D və ya ox düymələri · 📱 Toxunma ilə sürüşdür
        </div>

        {/* Mobile controls */}
        <div className="flex flex-col items-center gap-2 mt-4">
          <button onClick={() => { dirRef.current !== 'DOWN' && (dirRef.current = 'UP', setDir('UP')); }}
            className="w-14 h-14 rounded-xl text-2xl font-bold text-white flex items-center justify-center"
            style={{ background: 'rgba(220,38,38,0.3)', border: '1px solid rgba(220,38,38,0.5)' }}>▲</button>
          <div className="flex gap-2">
            <button onClick={() => { dirRef.current !== 'RIGHT' && (dirRef.current = 'LEFT', setDir('LEFT')); }}
              className="w-14 h-14 rounded-xl text-2xl font-bold text-white flex items-center justify-center"
              style={{ background: 'rgba(220,38,38,0.3)', border: '1px solid rgba(220,38,38,0.5)' }}>◄</button>
            <button onClick={() => { dirRef.current !== 'UP' && (dirRef.current = 'DOWN', setDir('DOWN')); }}
              className="w-14 h-14 rounded-xl text-2xl font-bold text-white flex items-center justify-center"
              style={{ background: 'rgba(220,38,38,0.3)', border: '1px solid rgba(220,38,38,0.5)' }}>▼</button>
            <button onClick={() => { dirRef.current !== 'LEFT' && (dirRef.current = 'RIGHT', setDir('RIGHT')); }}
              className="w-14 h-14 rounded-xl text-2xl font-bold text-white flex items-center justify-center"
              style={{ background: 'rgba(220,38,38,0.3)', border: '1px solid rgba(220,38,38,0.5)' }}>►</button>
          </div>
        </div>
      </div>
    </div>
  );
}
