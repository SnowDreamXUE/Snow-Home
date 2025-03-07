<template>
  <canvas ref="canvas" class="flying-lines-canvas"></canvas>
</template>

<script>
export default {
  name: 'FlyingLines',
  data() {
    return {
      canvas: null,
      ctx: null,
      particles: [],
      mousePosition: { x: 0, y: 0 },
      animationId: null,
      totalParticles: 120, // 增加粒子数量
      connectDistance: 150,
      speed: 0.4
    };
  },
  mounted() {
    this.initCanvas();
    this.createParticles();
    this.addEventListeners();
    this.animate();
  },
  beforeUnmount() {
    this.cleanup();
  },
  methods: {
    initCanvas() {
      this.canvas = this.$refs.canvas;
      this.ctx = this.canvas.getContext('2d');

      this.resizeCanvas();
      window.addEventListener('resize', this.resizeCanvas);
    },

    resizeCanvas() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    },

    createParticles() {
      this.particles = [];
      for (let i = 0; i < this.totalParticles; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          vx: Math.random() * this.speed - this.speed / 2,
          vy: Math.random() * this.speed - this.speed / 2,
          color: `rgba(140, 158, 255, ${Math.random() * 0.35 + 0.25})` // 增加不透明度范围
        });
      }
    },

    addEventListeners() {
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('touchmove', this.onTouchMove);
    },

    onMouseMove(e) {
      this.mousePosition.x = e.clientX;
      this.mousePosition.y = e.clientY;
    },

    onTouchMove(e) {
      if (e.touches.length > 0) {
        this.mousePosition.x = e.touches[0].clientX;
        this.mousePosition.y = e.touches[0].clientY;
      }
    },

    animate() {
      this.animationId = requestAnimationFrame(this.animate);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.updateParticles();
      this.drawParticles();
      this.connectParticles();
    },

    updateParticles() {
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];

        // 移动粒子
        p.x += p.vx;
        p.y += p.vy;

        // 边界检测
        if (p.x < 0 || p.x > this.canvas.width) p.vx = -p.vx;
        if (p.y < 0 || p.y > this.canvas.height) p.vy = -p.vy;

        // 靠近鼠标的粒子受到吸引
        const dx = this.mousePosition.x - p.x;
        const dy = this.mousePosition.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.connectDistance * 1.5) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (this.connectDistance - distance) / this.connectDistance;

          p.vx += forceDirectionX * force * 0.02;
          p.vy += forceDirectionY * force * 0.02;
        }

        // 限制速度
        const maxSpeed = 1.5;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }
      }
    },

    drawParticles() {
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];

        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color;
        this.ctx.fill();
      }
    },

    connectParticles() {
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const p1 = this.particles[i];
          const p2 = this.particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < this.connectDistance) {
            // 略微增加线条的不透明度
            const opacity = 1 - distance / this.connectDistance;
            this.ctx.strokeStyle = `rgba(140, 158, 255, ${opacity * 0.55})`; // 增加不透明度
            this.ctx.lineWidth = 0.8;
            this.ctx.beginPath();
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.stroke();
          }
        }

        // 连接到鼠标
        const p = this.particles[i];
        const dx = p.x - this.mousePosition.x;
        const dy = p.y - this.mousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.connectDistance * 1.5) {
          const opacity = 1 - distance / (this.connectDistance * 1.5);
          this.ctx.strokeStyle = `rgba(255, 183, 197, ${opacity * 0.65})`; // 增加不透明度
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y);
          this.ctx.stroke();
        }
      }
    },

    cleanup() {
      window.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('touchmove', this.onTouchMove);
      window.removeEventListener('resize', this.resizeCanvas);
      cancelAnimationFrame(this.animationId);
    }
  }
}
</script>

<style scoped>
.flying-lines-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}
</style>
