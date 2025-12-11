/**
 * Input System - Keyboard and touch input handling
 * Supports mobile on-screen controls with vibration feedback
 */

export class InputSystem {
    constructor() {
        this.keys = {
            up: false,
            down: false,
            left: false,
            right: false,
            action: false
        };

        this.actionHandler = null;
        this.isMobile = false;
        this.vibrationEnabled = true;
    }

    init(actionHandler) {
        this.actionHandler = actionHandler;

        // Detect mobile device
        this.isMobile = this.detectMobile();

        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (e.code === 'KeyW' || e.code === 'ArrowUp') this.keys.up = true;
            if (e.code === 'KeyS' || e.code === 'ArrowDown') this.keys.down = true;
            if (e.code === 'KeyA' || e.code === 'ArrowLeft') this.keys.left = true;
            if (e.code === 'KeyD' || e.code === 'ArrowRight') this.keys.right = true;
            if (e.code === 'Space') {
                if (!this.keys.action && this.actionHandler) {
                    this.actionHandler();
                }
                this.keys.action = true;
            }
        });

        document.addEventListener('keyup', (e) => {
            if (e.code === 'KeyW' || e.code === 'ArrowUp') this.keys.up = false;
            if (e.code === 'KeyS' || e.code === 'ArrowDown') this.keys.down = false;
            if (e.code === 'KeyA' || e.code === 'ArrowLeft') this.keys.left = false;
            if (e.code === 'KeyD' || e.code === 'ArrowRight') this.keys.right = false;
            if (e.code === 'Space') this.keys.action = false;
        });

        // Initialize mobile controls if on mobile
        if (this.isMobile) {
            this.initMobileControls();
        }
    }

    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               ('ontouchstart' in window) ||
               (navigator.maxTouchPoints > 0);
    }

    vibrate(pattern) {
        if (this.vibrationEnabled && navigator.vibrate) {
            navigator.vibrate(pattern);
        }
    }

    initMobileControls() {
        // Show mobile controls container
        const mobileControls = document.getElementById('mobile-controls');
        if (mobileControls) {
            mobileControls.style.display = 'flex';
        }

        // D-Pad buttons
        this.setupDpadButton('dpad-up', 'up');
        this.setupDpadButton('dpad-down', 'down');
        this.setupDpadButton('dpad-left', 'left');
        this.setupDpadButton('dpad-right', 'right');

        // Action button
        const actionBtn = document.getElementById('action-btn');
        if (actionBtn) {
            actionBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.vibrate(30); // Short vibration for action
                if (!this.keys.action && this.actionHandler) {
                    this.actionHandler();
                }
                this.keys.action = true;
                actionBtn.classList.add('pressed');
            }, { passive: false });

            actionBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.keys.action = false;
                actionBtn.classList.remove('pressed');
            }, { passive: false });

            actionBtn.addEventListener('touchcancel', (e) => {
                this.keys.action = false;
                actionBtn.classList.remove('pressed');
            }, { passive: false });
        }

        // Prevent default touch behaviors on the game wrapper
        const gameWrapper = document.getElementById('game-wrapper');
        if (gameWrapper) {
            gameWrapper.addEventListener('touchmove', (e) => {
                e.preventDefault();
            }, { passive: false });
        }
    }

    setupDpadButton(buttonId, direction) {
        const btn = document.getElementById(buttonId);
        if (!btn) return;

        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.vibrate(15); // Light vibration for movement
            this.keys[direction] = true;
            btn.classList.add('pressed');
        }, { passive: false });

        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.keys[direction] = false;
            btn.classList.remove('pressed');
        }, { passive: false });

        btn.addEventListener('touchcancel', (e) => {
            this.keys[direction] = false;
            btn.classList.remove('pressed');
        }, { passive: false });
    }

    // Public method to trigger vibration from game events (damage, attacks, etc.)
    triggerHapticFeedback(type = 'light') {
        switch (type) {
            case 'light':
                this.vibrate(15);
                break;
            case 'medium':
                this.vibrate(30);
                break;
            case 'heavy':
                this.vibrate(50);
                break;
            case 'damage':
                this.vibrate([50, 30, 50]); // Pattern for taking damage
                break;
            case 'attack':
                this.vibrate(25);
                break;
            case 'success':
                this.vibrate([20, 50, 20]); // Pattern for success
                break;
            case 'boss':
                this.vibrate([100, 50, 100, 50, 100]); // Intense pattern for boss
                break;
            default:
                this.vibrate(20);
        }
    }

    setVibrationEnabled(enabled) {
        this.vibrationEnabled = enabled;
    }

    getMovement() {
        return {
            dx: (this.keys.right ? 1 : 0) - (this.keys.left ? 1 : 0),
            dy: (this.keys.down ? 1 : 0) - (this.keys.up ? 1 : 0)
        };
    }

    isActionPressed() {
        return this.keys.action;
    }

    isMobileDevice() {
        return this.isMobile;
    }
}
