/**
 * particles.typscript
 * A cool background,for the proxy, (in beta
 * Typescript,2d render.
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

export class ParticleSystem {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationFrameId: number | null = null;
  private colors: string[] = ["#38bdf8", "#a78bfa", "#f472b6", "#34d399"];

  constructor(canvasId: string, count: number = 50) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) throw new Error(`Canvas with id ${canvasId} not found`);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("2D context not available");

    this.canvas = canvas;
    this.ctx = ctx;

    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());

    // Generate them!!
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle());
    }
  }

  private createParticle(): Particle {
    const speed = Math.random() * 1.5 + 0.5;
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      size: Math.random() * 3 + 1,
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
    };
  }

  private resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private updateParticles() {
    for (let p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;

      // Bounce off wallzzzz
      if (p.x <= 0 || p.x >= this.canvas.width) p.vx *= -1;
      if (p.y <= 0 || p.y >= this.canvas.height) p.vy *= -1;
    }
  }

  private drawParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let p of this.particles) {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.fill();
    }
  }

  start() {
    const animate = () => {
      this.updateParticles();
      this.drawParticles();
      this.animationFrameId = requestAnimationFrame(animate);
    };
    animate();
  }

  stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
}

// Develop particles:
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.createElement("canvas");
  canvas.id = "particleCanvas";
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = "-1"; // stays behind proxy iframes!!
  document.body.appendChild(canvas);

  const system = new ParticleSystem("particleCanvas", 80);
  system.start();

  // Optional: toggle with key press
  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "p") {
      if (Math.random() > 0.5) system.stop();
      else system.start();
    }
  });
});
