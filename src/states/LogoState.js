/**
 * LogoState.js
 * Initial splash screen showing game logo
 */

import { TimedState } from '../core/StateMachine.js';

export class LogoState extends TimedState {
    constructor(game) {
        super(game, 3000, 'INTRO'); // 3 second duration, then go to INTRO
        this.logoAlpha = 0;
        this.fadeIn = true;
    }

    onEnter(params) {
        console.log('[LogoState] Entering logo screen');
        this.logoAlpha = 0;
        this.fadeIn = true;
    }

    onUpdate(deltaTime) {
        super.onUpdate(deltaTime);

        // Fade in/out animation
        if (this.fadeIn) {
            this.logoAlpha += deltaTime / 1000;
            if (this.logoAlpha >= 1) {
                this.logoAlpha = 1;
                this.fadeIn = false;
            }
        } else if (this.stateTimer > 2000) {
            // Fade out in last second
            this.logoAlpha -= deltaTime / 1000;
            if (this.logoAlpha < 0) this.logoAlpha = 0;
        }
    }

    onRender(context) {
        const canvas = context.canvas;
        const w = canvas.width;
        const h = canvas.height;

        // Black background
        context.fillStyle = '#0a0a12';
        context.fillRect(0, 0, w, h);

        // Draw logo with fade
        context.save();
        context.globalAlpha = this.logoAlpha;

        // Logo
        if (this.game.assets && this.game.assets.logo) {
            const logoSize = 96;
            context.drawImage(
                this.game.assets.logo,
                (w - logoSize) / 2,
                (h - logoSize) / 2 - 20,
                logoSize,
                logoSize
            );
        }

        // Title text
        context.fillStyle = '#ffd700';
        context.font = '16px "Press Start 2P"';
        context.textAlign = 'center';
        context.fillText('AMZL WHS COORDINATOR QUEST', w / 2, h / 2 + 60);

        context.restore();
    }

    onInput(event) {
        // Allow skip with space or enter
        if (event.type === 'keydown' && (event.key === ' ' || event.key === 'Enter')) {
            this.changeState('INTRO');
        }
    }
}

export default LogoState;
