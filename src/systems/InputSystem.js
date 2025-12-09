/**
 * Input System - Keyboard and touch input handling
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
    }

    init(actionHandler) {
        this.actionHandler = actionHandler;

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
}
