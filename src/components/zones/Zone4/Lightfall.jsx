import React, { useRef, useEffect, useCallback } from 'react';

/**
 * Lightfall — Canvas-based particle streak background.
 * Renders falling colored lines with glow, mouse interaction, and twinkle effects.
 */
const Lightfall = ({
  colors = ['#A6C8FF', '#5227FF', '#FF9FFC'],
  backgroundColor = '#0A29FF',
  speed = 0.5,
  streakCount = 2,
  streakWidth = 1,
  streakLength = 1,
  glow = 1,
  density = 0.6,
  twinkle = 1,
  zoom = 3,
  backgroundGlow = 0.5,
  opacity = 1,
  mouseInteraction = true,
  mouseStrength = 0.5,
  mouseRadius = 1,
  color1 = '#A6C8FF',
  color2 = '#5227FF',
  color3 = '#FF9FFC',
}) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999, targetX: -9999, targetY: -9999 });
  const animFrameRef = useRef(null);
  const particlesRef = useRef([]);

  // Use provided colors array or fall back to individual color props
  const colorPalette = colors.length >= 3 ? colors : [color1, color2, color3];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w, h;

    const resize = () => {
      const parent = canvas.parentElement;
      w = parent ? parent.offsetWidth : window.innerWidth;
      h = parent ? parent.offsetHeight : window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Init particles — much bigger and more visible ──
    const particleCount = Math.floor(w * h * density * 0.0002); // 2.5x more particles
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h * -1,
        length: (20 + Math.random() * 80) * streakLength,  // 4x longer
        width: (1 + Math.random() * 3) * streakWidth,       // 2x thicker
        speed: (0.3 + Math.random() * 1.2) * speed,
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        alpha: 0.3 + Math.random() * 0.7,                   // much brighter
        twinkleSpeed: 0.02 + Math.random() * 0.06,
        twinklePhase: Math.random() * Math.PI * 2,
        glowSize: (6 + Math.random() * 20) * glow
      });
    }
    particlesRef.current = particles;

    // ── Animation ──
    const animate = () => {
      // Clear to transparent — let the page background show through
      ctx.clearRect(0, 0, w, h);

      // Mouse smoothing
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.05;
      m.y += (m.targetY - m.y) * 0.05;

      // Draw particles
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Movement
        p.y += p.speed * (1 + (mouseInteraction ? mouseStrength * 0.3 : 0));
        p.x += Math.sin(p.y * 0.005) * 0.3;

        // Twinkle
        const twinkleVal = twinkle > 0
          ? 0.6 + 0.4 * Math.sin(p.twinklePhase + performance.now() * p.twinkleSpeed)
          : 1;

        // Mouse interaction
        let mouseInfluence = 0;
        if (mouseInteraction) {
          const dx = p.x - m.x;
          const dy = p.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius * 150) {
            mouseInfluence = (1 - dist / (mouseRadius * 150)) * mouseStrength * 2;
            p.x += dx * mouseInfluence * 0.02;
          }
        }

        const alpha = p.alpha * twinkleVal * opacity;

        // Glow
        if (p.glowSize > 2) {
          ctx.shadowBlur = p.glowSize * backgroundGlow;
          ctx.shadowColor = p.color;
        }

        // Draw streak
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + Math.sin(p.y * 0.005) * 2, p.y - p.length);
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = p.width;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Reset
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        // Reset position when off screen
        if (p.y > h + p.length) {
          p.y = -p.length;
          p.x = Math.random() * w;
        }
      }

      // Draw extra bright streaks (sparse, bright falling lines)
      const extraCount = Math.floor(streakCount * 3);
      for (let i = 0; i < extraCount; i++) {
        const sx = (i / extraCount) * w + (performance.now() * speed * 0.02) % w;
        const sy = ((i * 137) % h);
        const slen = (30 + (i % 7) * 10) * streakLength;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + Math.sin(sy * 0.01) * 3, sy - slen);
        ctx.strokeStyle = colorPalette[i % colorPalette.length];
        ctx.globalAlpha = (0.1 + (i % 3) * 0.08) * opacity;
        ctx.lineWidth = (0.5 + (i % 2)) * streakWidth;
        ctx.shadowBlur = 10 * glow;
        ctx.shadowColor = colorPalette[i % colorPalette.length];
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [speed, streakCount, streakWidth, streakLength, glow, density, twinkle, zoom, backgroundGlow, opacity, mouseInteraction, mouseStrength, mouseRadius, backgroundColor, colorPalette]);

  // Mouse handler
  const handleMouseMove = useCallback((e) => {
    if (!mouseInteraction) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current.targetX = e.clientX - rect.left;
    mouseRef.current.targetY = e.clientY - rect.top;
  }, [mouseInteraction]);

  const handleMouseLeave = useCallback(() => {
    if (!mouseInteraction) return;
    mouseRef.current.targetX = -9999;
    mouseRef.current.targetY = -9999;
  }, [mouseInteraction]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1,
        display: 'block',
      }}
    />
  );
};

export default Lightfall;