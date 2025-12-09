/**
 * Particle System - Visual effects and floating text
 */

import { GAME_CONSTANTS } from '../constants.js';

export class ParticleSystem {
    constructor(objectPool) {
        this.objectPool = objectPool;
        this.particles = [];
        this.floatingTexts = [];
    }

    spawnParticle(x, y, color, forceY = null) {
        const p = this.objectPool.getParticle();
        p.x = x;
        p.y = y;
        p.color = color;
        p.vx = (Math.random() - 0.5) * 6;
        p.vy = forceY !== null ? forceY : -Math.random() * 6 - 1;
        p.life = GAME_CONSTANTS.PARTICLE_LIFE_BASE + Math.random() * GAME_CONSTANTS.PARTICLE_LIFE_VARIANCE;
        p.groundY = y + 20;
        p.size = Math.random() < 0.3 ? 3 : 2;
        p.alpha = 1;
        p.sparkle = false;
        this.particles.push(p);
    }

    spawnParticleBurst(x, y, colors, count = 12) {
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const speed = 2 + Math.random() * 2;
            const p = this.objectPool.getParticle();
            p.x = x;
            p.y = y;
            p.color = colors[i % colors.length];
            p.vx = Math.cos(angle) * speed;
            p.vy = Math.sin(angle) * speed;
            p.life = 40 + Math.random() * 20;
            p.groundY = y + 30;
            p.size = 2;
            p.alpha = 1;
            p.sparkle = false;
            this.particles.push(p);
        }
    }

    spawnSparkles(x, y, color) {
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const speed = 1.5;
            const p = this.objectPool.getParticle();
            p.x = x;
            p.y = y;
            p.color = color;
            p.vx = Math.cos(angle) * speed;
            p.vy = Math.sin(angle) * speed;
            p.life = 30;
            p.groundY = y + 20;
            p.size = 1;
            p.alpha = 1;
            p.sparkle = true;
            this.particles.push(p);
        }
    }

    spawnFloatingText(x, y, text, color) {
        const t = this.objectPool.getFloatingText();
        t.x = x;
        t.y = y;
        t.text = text;
        t.color = color;
        t.life = GAME_CONSTANTS.FLOATING_TEXT_LIFE;
        t.vy = -0.2;
        this.floatingTexts.push(t);
    }

    update() {
        // Update particles with physics
        let writeIdx = 0;
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            p.life--;
            if (p.life <= 0) {
                this.objectPool.releaseParticle(p);
                continue;
            }

            // Apply gravity
            p.vy += GAME_CONSTANTS.PARTICLE_GRAVITY;
            p.x += p.vx;
            p.y += p.vy;

            // Bounce off ground
            if (p.y >= p.groundY && p.vy > 0) {
                p.y = p.groundY;
                p.vy *= GAME_CONSTANTS.PARTICLE_BOUNCE;
                if (Math.abs(p.vy) < 0.5) p.vy = 0;
            }

            // Fade out
            p.alpha = p.life / (GAME_CONSTANTS.PARTICLE_LIFE_BASE + GAME_CONSTANTS.PARTICLE_LIFE_VARIANCE);

            this.particles[writeIdx++] = p;
        }
        this.particles.length = writeIdx;

        // Update floating texts
        writeIdx = 0;
        for (let i = 0; i < this.floatingTexts.length; i++) {
            const t = this.floatingTexts[i];
            t.life--;
            if (t.life <= 0) {
                this.objectPool.releaseFloatingText(t);
                continue;
            }
            t.y += t.vy;
            this.floatingTexts[writeIdx++] = t;
        }
        this.floatingTexts.length = writeIdx;
    }

    draw(ctx, camera) {
        // Draw particles
        for (const p of this.particles) {
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            if (p.sparkle) {
                ctx.fillRect(p.x - camera.x, p.y - camera.y, p.size, p.size);
                ctx.fillRect(p.x - camera.x - 1, p.y - camera.y, 1, 1);
                ctx.fillRect(p.x - camera.x + 1, p.y - camera.y, 1, 1);
                ctx.fillRect(p.x - camera.x, p.y - camera.y - 1, 1, 1);
                ctx.fillRect(p.x - camera.x, p.y - camera.y + 1, 1, 1);
            } else {
                ctx.fillRect(p.x - camera.x, p.y - camera.y, p.size, p.size);
            }
        }
        ctx.globalAlpha = 1;

        // Draw floating texts
        ctx.font = '8px "Press Start 2P"';
        ctx.textAlign = 'center';
        for (const t of this.floatingTexts) {
            const alpha = Math.min(1, t.life / 60);
            ctx.globalAlpha = alpha;
            ctx.fillStyle = '#000';
            ctx.fillText(t.text, t.x - camera.x + 1, t.y - camera.y + 1);
            ctx.fillStyle = t.color;
            ctx.fillText(t.text, t.x - camera.x, t.y - camera.y);
        }
        ctx.globalAlpha = 1;
    }

    reset() {
        for (const p of this.particles) {
            this.objectPool.releaseParticle(p);
        }
        for (const t of this.floatingTexts) {
            this.objectPool.releaseFloatingText(t);
        }
        this.particles = [];
        this.floatingTexts = [];
    }
}
