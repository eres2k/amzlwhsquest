/**
 * Object Pool System - Reduces GC pressure by reusing objects
 * Performance optimization for particles and floating texts
 */

import { GAME_CONSTANTS } from '../constants.js';

export class ObjectPool {
    constructor() {
        this.particles = [];
        this.floatingTexts = [];
    }

    // Get a particle from pool or create new one
    getParticle() {
        const pool = this.particles;
        for (let i = 0; i < pool.length; i++) {
            if (!pool[i].active) {
                pool[i].active = true;
                return pool[i];
            }
        }
        // Create new if pool is empty or all active
        if (pool.length < GAME_CONSTANTS.MAX_PARTICLES) {
            const p = {
                active: true,
                x: 0,
                y: 0,
                vx: 0,
                vy: 0,
                life: 0,
                color: '',
                size: 2,
                alpha: 1,
                groundY: 0,
                sparkle: false
            };
            pool.push(p);
            return p;
        }
        // Reuse oldest if at max capacity
        pool[0].active = true;
        return pool[0];
    }

    releaseParticle(p) {
        p.active = false;
    }

    // Get a floating text from pool or create new one
    getFloatingText() {
        const pool = this.floatingTexts;
        for (let i = 0; i < pool.length; i++) {
            if (!pool[i].active) {
                pool[i].active = true;
                return pool[i];
            }
        }
        if (pool.length < GAME_CONSTANTS.MAX_FLOATING_TEXTS) {
            const t = {
                active: true,
                x: 0,
                y: 0,
                text: '',
                color: '#fff',
                life: 0,
                vy: 0
            };
            pool.push(t);
            return t;
        }
        pool[0].active = true;
        return pool[0];
    }

    releaseFloatingText(t) {
        t.active = false;
    }

    // Reset all pools (call on game restart)
    reset() {
        this.particles.forEach(p => p.active = false);
        this.floatingTexts.forEach(t => t.active = false);
    }
}
