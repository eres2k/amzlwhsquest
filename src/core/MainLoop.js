/**
 * MainLoop.js
 * Main game loop with fixed timestep
 * Handles timing, updates, and rendering
 */

export class MainLoop {
    constructor(game) {
        this.game = game;
        this.running = false;
        this.lastTimestamp = 0;
        this.accumulator = 0;
        this.fixedDelta = 16.67; // 60 FPS
        this.maxFrameTime = 250; // Prevent spiral of death

        // Performance monitoring
        this.fps = 60;
        this.frameCount = 0;
        this.lastFpsUpdate = 0;

        // Bind methods
        this.loop = this.loop.bind(this);
    }

    /**
     * Start the game loop
     */
    start() {
        if (this.running) {
            console.warn('[MainLoop] Already running');
            return;
        }

        console.log('[MainLoop] Starting game loop');
        this.running = true;
        this.lastTimestamp = performance.now();
        this.accumulator = 0;
        this.frameCount = 0;
        this.lastFpsUpdate = this.lastTimestamp;

        requestAnimationFrame(this.loop);
    }

    /**
     * Stop the game loop
     */
    stop() {
        console.log('[MainLoop] Stopping game loop');
        this.running = false;
    }

    /**
     * Main loop iteration
     */
    loop(timestamp) {
        if (!this.running) return;

        // Calculate delta time
        const deltaTime = Math.min(timestamp - this.lastTimestamp, this.maxFrameTime);
        this.lastTimestamp = timestamp;

        // Accumulate time
        this.accumulator += deltaTime;

        // Fixed timestep updates
        let updateCount = 0;
        const maxUpdates = 5; // Prevent too many updates in one frame

        while (this.accumulator >= this.fixedDelta && updateCount < maxUpdates) {
            this.update(this.fixedDelta);
            this.accumulator -= this.fixedDelta;
            updateCount++;
        }

        // If we hit max updates, reset accumulator
        if (updateCount >= maxUpdates) {
            this.accumulator = 0;
        }

        // Render with interpolation
        const alpha = this.accumulator / this.fixedDelta;
        this.render(alpha);

        // Update FPS counter
        this.updateFPS(timestamp);

        // Continue loop
        requestAnimationFrame(this.loop);
    }

    /**
     * Update game logic
     */
    update(deltaTime) {
        // Update state machine
        if (this.game.stateMachine) {
            this.game.stateMachine.update(deltaTime);
        }

        // Update music system
        if (this.game.audio) {
            this.game.audio.update(deltaTime);
        }

        // Update TTS loading indicator
        if (this.game.tts) {
            this.game.tts.update(deltaTime);
        }
    }

    /**
     * Render game
     */
    render(alpha) {
        const context = this.game.context;
        if (!context) return;

        const canvas = context.canvas;

        // Clear screen
        context.fillStyle = '#0a0a12';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Render current state via renderers
        if (this.game.stateMachine && this.game.renderers) {
            const state = this.game.stateMachine.getCurrentState();

            if (state) {
                // World rendering
                if (this.game.renderers.world && state.player) {
                    this.game.renderers.world.render(context, state);
                }

                // State-specific rendering
                if (state.render) {
                    state.render(context);
                }

                // UI rendering (always on top)
                if (this.game.renderers.ui) {
                    this.game.renderers.ui.render(context, state);
                }
            }
        }

        // Render transitions
        if (this.game.transition && this.game.transition.isActive()) {
            this.game.transition.render(context, canvas.width, canvas.height);
        }

        // Debug info
        if (this.game.debug) {
            this.renderDebugInfo(context);
        }
    }

    /**
     * Update FPS counter
     */
    updateFPS(timestamp) {
        this.frameCount++;

        if (timestamp - this.lastFpsUpdate >= 1000) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.lastFpsUpdate = timestamp;

            if (this.game.debug) {
                console.log(`[MainLoop] FPS: ${this.fps}`);
            }
        }
    }

    /**
     * Render debug information
     */
    renderDebugInfo(context) {
        context.save();

        context.fillStyle = 'rgba(0, 0, 0, 0.7)';
        context.fillRect(10, 10, 150, 80);

        context.fillStyle = '#00ff00';
        context.font = '10px monospace';
        context.textAlign = 'left';

        context.fillText(`FPS: ${this.fps}`, 15, 25);

        if (this.game.stateMachine) {
            const stateName = this.game.stateMachine.getCurrentStateName();
            context.fillText(`State: ${stateName}`, 15, 40);
        }

        if (this.game.stateMachine?.currentState?.player) {
            const player = this.game.stateMachine.currentState.player;
            context.fillText(`Player: ${Math.floor(player.x)},${Math.floor(player.y)}`, 15, 55);
            context.fillText(`Lives: ${player.lives}`, 15, 70);
        }

        context.restore();
    }

    /**
     * Pause the game loop
     */
    pause() {
        this.running = false;
    }

    /**
     * Resume the game loop
     */
    resume() {
        if (this.running) return;

        this.running = true;
        this.lastTimestamp = performance.now();
        this.accumulator = 0;
        requestAnimationFrame(this.loop);
    }

    /**
     * Get current FPS
     */
    getFPS() {
        return this.fps;
    }

    /**
     * Check if running
     */
    isRunning() {
        return this.running;
    }
}

export default MainLoop;
