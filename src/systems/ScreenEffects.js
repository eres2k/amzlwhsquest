/**
 * ScreenEffects.js
 * Visual screen effects: shake, flash, vignette
 * Extracted from monolithic version
 */

/**
 * ScreenEffects - Manages visual screen effects
 */
export class ScreenEffects {
    constructor(config = {}) {
        // Shake effect
        this.shake = 0;
        this.shakeDecay = config.shakeDecay || 1; // Amount to decrease per frame

        // Flash effect
        this.flash = 0;
        this.flashDecay = config.flashDecay || 1; // Amount to decrease per frame

        // Vignette effect
        this.vignetteEnabled = config.vignetteEnabled !== undefined ? config.vignetteEnabled : false;
        this.vignetteAlpha = config.vignetteAlpha || 0.3;
        this.vignetteFlicker = config.vignetteFlicker !== undefined ? config.vignetteFlicker : false;

        // Internal state
        this.time = 0;

        console.log('[ScreenEffects] Initialized');
    }

    /**
     * Update effects - decrement intensities
     */
    update(deltaTime) {
        // Decrement shake
        if (this.shake > 0) {
            this.shake = Math.max(0, this.shake - this.shakeDecay);
        }

        // Decrement flash
        if (this.flash > 0) {
            this.flash = Math.max(0, this.flash - this.flashDecay);
        }

        // Update time for animated effects
        this.time++;
    }

    /**
     * Set shake intensity
     */
    setShake(intensity) {
        this.shake = Math.max(0, intensity);
    }

    /**
     * Add to current shake (stacks)
     */
    addShake(intensity) {
        this.shake = Math.max(0, this.shake + intensity);
    }

    /**
     * Set flash intensity
     */
    setFlash(intensity) {
        this.flash = Math.max(0, intensity);
    }

    /**
     * Add to current flash (stacks)
     */
    addFlash(intensity) {
        this.flash = Math.max(0, this.flash + intensity);
    }

    /**
     * Get shake offset for current frame
     * Returns {x, y} offset to apply
     */
    getShakeOffset() {
        if (this.shake <= 0) {
            return { x: 0, y: 0 };
        }

        return {
            x: (Math.random() - 0.5) * this.shake,
            y: (Math.random() - 0.5) * this.shake
        };
    }

    /**
     * Apply shake to canvas context
     * Call this BEFORE rendering
     */
    applyShake(ctx) {
        if (this.shake > 0) {
            const offset = this.getShakeOffset();
            ctx.translate(offset.x, offset.y);
        }
    }

    /**
     * Render flash effect
     * Call this AFTER rendering everything else
     */
    renderFlash(ctx) {
        if (this.flash <= 0) return;

        const alpha = this.flash / 10;
        ctx.save();
        ctx.globalAlpha = Math.min(1, alpha);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.restore();
    }

    /**
     * Render vignette effect
     * Call this AFTER rendering everything else
     */
    renderVignette(ctx) {
        if (!this.vignetteEnabled) return;

        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = width * 0.8;

        // Calculate alpha (with optional flicker)
        let alpha = this.vignetteAlpha;
        if (this.vignetteFlicker) {
            alpha = this.vignetteAlpha + Math.sin(this.time / 20) * 0.1;
        }

        // Create radial gradient
        const gradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, radius
        );
        gradient.addColorStop(0, 'rgba(0,0,0,0)');
        gradient.addColorStop(1, `rgba(0,0,0,${alpha})`);

        ctx.save();
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
    }

    /**
     * Render all effects
     * Convenience method to render flash + vignette
     */
    renderEffects(ctx) {
        this.renderFlash(ctx);
        this.renderVignette(ctx);
    }

    /**
     * Clear all effects
     */
    clear() {
        this.shake = 0;
        this.flash = 0;
    }

    /**
     * Enable vignette
     */
    enableVignette(alpha = 0.3, flicker = false) {
        this.vignetteEnabled = true;
        this.vignetteAlpha = alpha;
        this.vignetteFlicker = flicker;
    }

    /**
     * Disable vignette
     */
    disableVignette() {
        this.vignetteEnabled = false;
    }

    /**
     * Get current shake intensity
     */
    getShake() {
        return this.shake;
    }

    /**
     * Get current flash intensity
     */
    getFlash() {
        return this.flash;
    }

    /**
     * Check if any effects are active
     */
    hasActiveEffects() {
        return this.shake > 0 || this.flash > 0;
    }

    /**
     * Preset effects for common scenarios
     */

    // Light damage
    damageLight() {
        this.setShake(8);
        this.setFlash(10);
    }

    // Medium damage
    damageMedium() {
        this.setShake(15);
        this.setFlash(12);
    }

    // Heavy damage
    damageHeavy() {
        this.setShake(20);
        this.setFlash(15);
    }

    // Boss attack
    bossAttack(intensity = 5) {
        this.setShake(intensity);
    }

    // Victory/success
    victory() {
        this.setFlash(10);
    }

    // Explosion
    explosion(intensity = 30) {
        this.setShake(intensity);
        this.setFlash(20);
    }
}

export default ScreenEffects;
