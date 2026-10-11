import React, { useEffect, useRef } from 'react';
import { cyberNetworkGridUrl } from '../utils/assets';

export const ClassroomBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate electronic internet nodes and connection packets
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      glowColor: string;
      pulse: number;
    }

    interface Packet {
      fromIndex: number;
      toIndex: number;
      progress: number;
      speed: number;
    }

    const nodeCount = Math.min(36, Math.floor(width / 38));
    const nodes: Node[] = [];
    const colors = ['#00F0FF', '#38BDF8', '#818CF8', '#A855F7', '#2563EB'];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.5 + 1.5,
        color: colors[i % colors.length],
        glowColor: colors[i % colors.length],
        pulse: Math.random() * Math.PI * 2
      });
    }

    const packets: Packet[] = [];
    for (let i = 0; i < 14; i++) {
      packets.push({
        fromIndex: Math.floor(Math.random() * nodeCount),
        toIndex: Math.floor(Math.random() * nodeCount),
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.007
      });
    }

    const maxDist = 170;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw electronic connection traces between nearby nodes
      for (let i = 0; i < nodeCount; i++) {
        const n1 = nodes[i];
        n1.x += n1.vx;
        n1.y += n1.vy;
        n1.pulse += 0.03;

        if (n1.x < 0 || n1.x > width) n1.vx *= -1;
        if (n1.y < 0 || n1.y > height) n1.vy *= -1;

        for (let j = i + 1; j < nodeCount; j++) {
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.28;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw traveling internet data packets
      for (let p = 0; p < packets.length; p++) {
        const packet = packets[p];
        packet.progress += packet.speed;
        if (packet.progress >= 1) {
          packet.progress = 0;
          packet.fromIndex = Math.floor(Math.random() * nodeCount);
          packet.toIndex = Math.floor(Math.random() * nodeCount);
        }

        const n1 = nodes[packet.fromIndex];
        const n2 = nodes[packet.toIndex];
        if (n1 && n2) {
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist * 1.5) {
            const px = n1.x + dx * packet.progress;
            const py = n1.y + dy * packet.progress;

            ctx.beginPath();
            ctx.arc(px, py, 2.2, 0, Math.PI * 2);
            ctx.fillStyle = '#00F0FF';
            ctx.shadowColor = '#00F0FF';
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      // Draw glowing nodes
      for (let i = 0; i < nodeCount; i++) {
        const n = nodes[i];
        const pulsingRadius = n.radius + Math.sin(n.pulse) * 0.8;

        ctx.beginPath();
        ctx.arc(n.x, n.y, pulsingRadius, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowColor = n.glowColor;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#070C1B]"
      aria-hidden="true"
    >
      {/* High-tech Cyber Network Grid Image Wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen scale-105"
        style={{ backgroundImage: `url(${cyberNetworkGridUrl})` }}
      />

      {/* Cyber Digital Circuit Grid Overlay */}
      <div className="absolute inset-0 cyber-grid-pattern opacity-40" />

      {/* Interactive Electronic Connections Canvas (Fiber optic nodes & packets) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-70"
      />

      {/* Ambient Cyber Glow Orbs */}
      <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-[#00F0FF]/15 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-[550px] h-[550px] rounded-full bg-[#8B5CF6]/20 blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-32 left-10 w-[600px] h-[600px] rounded-full bg-[#2563EB]/20 blur-[160px] pointer-events-none" />

      {/* Digital Scanline & Edge Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#070C1B]/50 to-[#070C1B]/95 pointer-events-none" />
    </div>
  );
};
