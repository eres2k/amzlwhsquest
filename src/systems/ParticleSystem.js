/**
 * ParticleSystem.js
 * High-performance particle system with 200-particle pool
 * Extracted from monolithic version
 */

/**
 * ParticleSystem - Manages particle lifecycle, physics, and rendering
 */
export class ParticleSystem {
    constructor(config = {}) {
        // Configuration
        this.maxParticles = config.maxParticles || 200;
        this.gravity = config.gravity !== undefined ? config.gravity : 0.2;
        this.bounce = config.bounce !== undefined ? config.bounce : -0.6;
        this.particleLifeBase = config.particleLifeBase || 50;
        this.particleLifeVariance = config.particleLifeVariance || 20;

        // Particle pool
        this.particles = [];

        console.log('[ParticleSystem] Initialized with max', this.maxParticles, 'particles');
    }

    /**
     * Update all particles - applies physics and removes dead particles
     */
    update(deltaTime) {
        const particles = this.particles;
        let writeIdx = 0;

        // Performance: Avoid splice in hot loop, use write index instead
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            // Update lifetime
            p.life--;

            // Apply velocity
            p.x += p.vx;
            p.y += p.vy;

            // Apply gravity
            p.vy += this.gravity;

            // Ground bounce
            if (p.y > p.groundY) {
                p.y = p.groundY;
                p.vy *= this.bounce;
            }

            // Keep alive particles
            if (p.life > 0) {
                if (writeIdx !== i) {
                    particles[writeIdx] = p;
                }
                writeIdx++;
            }
        }

        // Truncate array to remove dead particles
        particles.length = writeIdx;
    }

    /**
     * Spawn a single particle
     */
    spawn(x, y, color, forceY = 0) {
        // Check pool limit
        if (this.particles.length >= this.maxParticles) {
            return null;
        }

        const particle = {
            x: x,
            y: y,
            color: color,
            life: this.particleLifeBase + Math.random() * this.particleLifeVariance,
            vx: (Math.random() - 0.5) * 3,
            vy: forceY || (Math.random() * -3 - 1),
            groundY: y + 5,
            size: 1 + Math.random() * 2,
            alpha: 1,
            sparkle: false
        };

        this.particles.push(particle);
        return particle;
    }

    /**
     * Spawn a burst of particles in a circular pattern
     */
    burst(x, y, colors, count = 10) {
        if (!Array.isArray(colors)) {
            colors = [colors];
        }

        const maxToAdd = Math.min(count, this.maxParticles - this.particles.length);
        const colorsLen = colors.length;
        const spawned = [];

        for (let i = 0; i < maxToAdd; i++) {
            const angle = (i / count) * Math.PI * 2;
            const speed = 1 + Math.random() * 2;
            const color = colors[Math.floor(Math.random() * colorsLen)];

            const particle = {
                x: x,
                y: y,
                color: color,
                life: 30 + Math.random() * 30,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 1,
                groundY: y + 20,
                size: 1 + Math.random() * 2,
                alpha: 1,
                sparkle: false
            };

            this.particles.push(particle);
            spawned.push(particle);
        }

        return spawned;
    }

    /**
     * Spawn sparkle particles for special effects
     */
    sparkle(x, y, color, count = 8) {
        const maxToAdd = Math.min(count, this.maxParticles - this.particles.length);
        const spawned = [];

        for (let i = 0; i < maxToAdd; i++) {
            const particle = {
                x: x + (Math.random() - 0.5) * 10,
                y: y + (Math.random() - 0.5) * 10,
                color: color,
                life: 20 + Math.random() * 20,
                vx: (Math.random() - 0.5) * 4,
                vy: -Math.random() * 3,
                groundY: y + 30,
                size: 1 + Math.random(),
                alpha: 1,
                sparkle: true
            };

            this.particles.push(particle);
            spawned.push(particle);
        }

        return spawned;
    }

    /**
     * Render all particles to canvas
     */
    render(ctx, camera = { x: 0, y: 0 }) {
        const particles = this.particles;
        const particleLen = particles.length;

        // Get canvas bounds for culling
        const canvasWidth = ctx.canvas.width;
        const canvasHeight = ctx.canvas.height;
        const cx = camera.x;
        const cy = camera.y;

        for (let i = 0; i < particleLen; i++) {
            const p = particles[i];
            const px = p.x - cx;
            const py = p.y - cy;

            // Skip offscreen particles (performance optimization)
            if (px < -10 || px > canvasWidth + 10 || py < -10 || py > canvasHeight + 10) {
                continue;
            }

            // Calculate alpha (fade based on life)
            const alpha = p.alpha || (p.life / 50);
            ctx.globalAlpha = Math.min(1, alpha);

            // Sparkle particles have special rendering (cross shape)
            if (p.sparkle) {
                ctx.fillStyle = '#fff';
                ctx.fillRect(px - 1, py, 3, 1);
                ctx.fillRect(px, py - 1, 1, 3);
            }

            // Draw particle
            ctx.fillStyle = p.color;
            ctx.fillRect(px, py, p.size || 2, p.size || 2);
        }

        // Reset alpha
        ctx.globalAlpha = 1;
    }

    /**
     * Clear all particles
     */
    clear() {
        this.particles.length = 0;
    }

    /**
     * Get current particle count
     */
    getCount() {
        return this.particles.length;
    }

    /**
     * Get max particles
     */
    getMaxParticles() {
        return this.maxParticles;
    }

    /**
     * Check if at capacity
     */
    isFull() {
        return this.particles.length >= this.maxParticles;
    }

    /**
     * Get all particles (for debugging or custom rendering)
     */
    getParticles() {
        return this.particles;
    }
}

export default ParticleSystem;
