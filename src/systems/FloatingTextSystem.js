/**
 * FloatingTextSystem.js
 * Floating text system for damage numbers, notifications, and messages
 * Extracted from monolithic version
 */

/**
 * FloatingTextSystem - Manages floating text effects
 */
export class FloatingTextSystem {
    constructor(config = {}) {
        // Configuration
        this.maxTexts = config.maxTexts || 30;
        this.defaultLife = config.defaultLife || 210; // ~3.5 seconds at 60 FPS
        this.defaultVelocity = config.defaultVelocity || -0.2; // Upward movement
        this.playSound = config.playSound !== undefined ? config.playSound : true;

        // Text pool
        this.texts = [];

        // Reference to audio system (optional)
        this.audioSystem = null;

        console.log('[FloatingTextSystem] Initialized with max', this.maxTexts, 'texts');
    }

    /**
     * Set audio system reference for sound effects
     */
    setAudioSystem(audioSystem) {
        this.audioSystem = audioSystem;
    }

    /**
     * Update all floating texts - applies movement and removes dead texts
     */
    update(deltaTime) {
        const texts = this.texts;
        let writeIdx = 0;

        // Performance: Avoid splice in hot loop, use write index instead
        for (let i = 0; i < texts.length; i++) {
            const t = texts[i];

            // Update position
            t.y += t.vy;

            // Update lifetime
            t.life--;

            // Keep alive texts
            if (t.life > 0) {
                if (writeIdx !== i) {
                    texts[writeIdx] = t;
                }
                writeIdx++;
            }
        }

        // Truncate array to remove dead texts
        texts.length = writeIdx;
    }

    /**
     * Spawn a floating text
     */
    spawn(x, y, text, color = '#ffffff', options = {}) {
        // Check pool limit
        if (this.texts.length >= this.maxTexts) {
            return null;
        }

        const floatingText = {
            x: x + (options.offsetX || 8),
            y: y + (options.offsetY || 0),
            text: text,
            color: color,
            life: options.life || this.defaultLife,
            vy: options.vy || this.defaultVelocity,
            fontSize: options.fontSize || 10,
            fontWeight: options.fontWeight || 'bold',
            alpha: 1
        };

        this.texts.push(floatingText);

        // Play sound effect
        if (this.playSound && this.audioSystem) {
            this.audioSystem.getSFX().pop();
        }

        return floatingText;
    }

    /**
     * Spawn multiple texts in sequence (for multi-line messages)
     */
    spawnMultiple(x, y, textArray, color = '#ffffff', spacing = 12) {
        const spawned = [];

        for (let i = 0; i < textArray.length; i++) {
            const text = this.spawn(x, y + (i * spacing), textArray[i], color);
            if (text) {
                spawned.push(text);
            }
        }

        return spawned;
    }

    /**
     * Render all floating texts to canvas
     */
    render(ctx, camera = { x: 0, y: 0 }) {
        const texts = this.texts;
        const textsLen = texts.length;

        // Get canvas bounds for culling
        const canvasWidth = ctx.canvas.width;
        const canvasHeight = ctx.canvas.height;
        const cx = camera.x;
        const cy = camera.y;

        ctx.save();
        ctx.font = 'bold 10px "Press Start 2P"';
        ctx.textAlign = 'center';

        for (let i = 0; i < textsLen; i++) {
            const t = texts[i];
            const dx = Math.floor(t.x - cx);
            const dy = Math.floor(t.y - cy);

            // Skip offscreen texts (performance optimization)
            if (dx < -50 || dx > canvasWidth + 50 || dy < -20 || dy > canvasHeight + 20) {
                continue;
            }

            // Calculate alpha (fade based on life)
            const alpha = Math.min(1, t.life / 60); // Fade out in last 60 frames

            // Apply font settings
            if (t.fontSize || t.fontWeight) {
                ctx.font = `${t.fontWeight || 'bold'} ${t.fontSize || 10}px "Press Start 2P"`;
            }

            // Draw text with outline
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
            ctx.strokeText(t.text, dx, dy);
            ctx.fillStyle = t.color;
            ctx.fillText(t.text, dx, dy);
        }

        ctx.restore();
    }

    /**
     * Clear all texts
     */
    clear() {
        this.texts.length = 0;
    }

    /**
     * Get current text count
     */
    getCount() {
        return this.texts.length;
    }

    /**
     * Get max texts
     */
    getMaxTexts() {
        return this.maxTexts;
    }

    /**
     * Check if at capacity
     */
    isFull() {
        return this.texts.length >= this.maxTexts;
    }

    /**
     * Get all texts (for debugging or custom rendering)
     */
    getTexts() {
        return this.texts;
    }

    /**
     * Preset text effects for common scenarios
     */

    // Damage number
    damage(x, y, amount, critical = false) {
        const color = critical ? '#ff4444' : '#ffffff';
        const text = critical ? `${amount}!` : `${amount}`;
        return this.spawn(x, y, text, color, { vy: -0.5 });
    }

    // Healing
    heal(x, y, amount) {
        return this.spawn(x, y, `+${amount}`, '#22c55e', { vy: -0.3 });
    }

    // Status message
    status(x, y, message, color = '#ffd700') {
        return this.spawn(x, y, message, color);
    }

    // Warning
    warning(x, y, message) {
        return this.spawn(x, y, message, '#ff4444');
    }

    // Success
    success(x, y, message) {
        return this.spawn(x, y, message, '#22c55e');
    }

    // Info
    info(x, y, message) {
        return this.spawn(x, y, message, '#60a5fa');
    }

    // Combo
    combo(x, y, count) {
        return this.spawn(x, y, `${count}x COMBO!`, '#ff9900', {
            vy: -0.4,
            fontSize: 12,
            fontWeight: 'bold'
        });
    }

    // Powerup
    powerup(x, y, name) {
        return this.spawn(x, y, name.toUpperCase(), '#a855f7', {
            vy: -0.3,
            fontSize: 10
        });
    }
}

export default FloatingTextSystem;
