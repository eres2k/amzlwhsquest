/**
 * IntroState.js
 * Story introduction sequence
 */

import { TimedState } from '../core/StateMachine.js';

export class IntroState extends TimedState {
    constructor(game) {
        super(game, 5000, 'STORY');
        this.fadeAlpha = 0;
    }

    onEnter(params) {
        console.log('[IntroState] Entering intro sequence');
        this.fadeAlpha = 0;
    }

    onUpdate(deltaTime) {
        super.onUpdate(deltaTime);

        // Fade in animation
        if (this.stateTimer < 1000) {
            this.fadeAlpha = this.stateTimer / 1000;
        } else if (this.stateTimer > 4000) {
            this.fadeAlpha = (5000 - this.stateTimer) / 1000;
        } else {
            this.fadeAlpha = 1;
        }
    }

    onRender(context) {
        const canvas = context.canvas;
        const w = canvas.width;
        const h = canvas.height;

        // Black background
        context.fillStyle = '#0a0a12';
        context.fillRect(0, 0, w, h);

        context.save();
        context.globalAlpha = this.fadeAlpha;

        // Title
        context.fillStyle = '#ff9900';
        context.font = '12px "Press Start 2P"';
        context.textAlign = 'center';
        context.fillText('AMAZON LOGISTICS', w / 2, h / 2 - 20);
        context.fillText('WAREHOUSE', w / 2, h / 2);
        context.fillText('COORDINATOR QUEST', w / 2, h / 2 + 20);

        context.restore();
    }

    onInput(event) {
        if (event.type === 'keydown' && (event.key === ' ' || event.key === 'Enter')) {
            this.changeState('STORY');
        }
    }
}

export default IntroState;
