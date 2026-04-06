import { useEffect, useRef } from 'react';

export default function DragonBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; alpha: number; color: string; life: number; maxLife: number;
    }> = [];

    const fireColors = ['#ff0000', '#ff3300', '#ff6600', '#ff9900', '#ffcc00', '#cc0000', '#990000'];

    function spawnParticle() {
      const side = Math.random() > 0.5 ? 'left' : 'right';
      const x = side === 'left'
        ? canvas!.width * 0.75 + Math.random() * 200
        : canvas!.width * 0.75 + Math.random() * 200;
      const y = canvas!.height * 0.3 + Math.random() * canvas!.height * 0.4;
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: -Math.random() * 3 - 1,
        size: Math.random() * 6 + 2,
        alpha: 1,
        color: fireColors[Math.floor(Math.random() * fireColors.length)],
        life: 0,
        maxLife: Math.random() * 80 + 40,
      });
    }

    let animId: number;
    let frame = 0;

    function animate() {
      animId = requestAnimationFrame(animate);
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      frame++;
      if (frame % 2 === 0) {
        for (let i = 0; i < 3; i++) spawnParticle();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        p.alpha = 1 - p.life / p.maxLife;
        p.size *= 0.99;

        if (p.life >= p.maxLife || p.size < 0.5) {
          particles.splice(i, 1);
          continue;
        }

        ctx!.save();
        ctx!.globalAlpha = p.alpha * 0.7;
        const grad = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        grad.addColorStop(0, p.color);
        grad.addColorStop(1, 'transparent');
        ctx!.fillStyle = grad;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      }
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  );
}
