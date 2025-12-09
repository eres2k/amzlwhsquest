/**
 * GameOverState.js
 * Game over screen
 */

import { State } from '../core/StateMachine.js';

export class GameOverState extends State {
    constructor(game) {
        super(game);
        this.stats = {
            timeSpent: 0,
            booksFired: 0,
            opsPushed: 0,
            lives: 0
        };
    }

    onEnter(params) {
        console.log('[GameOverState] Game Over');

        this.stats = {
            timeSpent: params.timeSpent || 0,
            booksFired: params.booksFired || 0,
            opsPushed: params.opsPushed || 0,
            lives: params.lives || 0
        };
    }

    onRender(context) {
        const canvas = context.canvas;
        const w = canvas.width;
        const h = canvas.height;

        // Dark red background
        context.fillStyle = '#1a0505';
        context.fillRect(0, 0, w, h);

        // Game Over text
        context.fillStyle = '#ff4444';
        context.font = '16px "Press Start 2P"';
        context.textAlign = 'center';
        context.fillText('GAME OVER', w / 2, h / 2 - 40);

        // Stats
        context.font = '8px "Press Start 2P"';
        context.fillStyle = '#ffffff';
        context.fillText(`TIME: ${Math.floor(this.stats.timeSpent / 1000)}s`, w / 2, h / 2);
        context.fillText(`MANUALS THROWN: ${this.stats.booksFired}`, w / 2, h / 2 + 15);
        context.fillText(`OPS PUSHED: ${this.stats.opsPushed}`, w / 2, h / 2 + 30);

        // Continue hint
        context.fillStyle = '#ff9900';
        const blink = Math.floor(this.stateTimer / 500) % 2 === 0;
        if (blink) {
            context.fillText('PRESS SPACE TO CONTINUE', w / 2, h - 30);
        }
    }

    onInput(event) {
        if (event.type === 'keydown' && (event.key === ' ' || event.key === 'Enter')) {
            this.changeState('TITLE');
        }
    }
}

export default GameOverState;
