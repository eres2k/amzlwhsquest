/**
 * HowToState.js
 * How to play instructions
 */

import { State } from '../core/StateMachine.js';

export class HowToState extends State {
    constructor(game) {
        super(game);
    }

    onEnter(params) {
        console.log('[HowToState] Entering how to play');
    }

    onRender(context) {
        const canvas = context.canvas;
        const w = canvas.width;
        const h = canvas.height;

        // Background
        context.fillStyle = '#0a0a12';
        context.fillRect(0, 0, w, h);

        // Title
        context.fillStyle = '#ffd700';
        context.font = '12px "Press Start 2P"';
        context.textAlign = 'center';
        context.fillText('HOW TO PLAY', w / 2, 25);

        // Instructions
        context.font = '8px "Press Start 2P"';
        context.fillStyle = '#ffffff';
        context.textAlign = 'left';

        const instructions = [
            'WASD / ARROW KEYS - Move',
            'SPACE - Throw Safety Manual',
            '',
            'OBJECTIVE:',
            '  Fix 5 safety hazards',
            '  Avoid OPS managers',
            '  Survive Simon\'s inspections',
            '',
            'HAZARDS:',
            '  Approach and press SPACE',
            '  to fix them',
            '',
            'LIVES:',
            '  Don\'t let hazards hit you!',
            '  Game over at 0 lives'
        ];

        instructions.forEach((line, index) => {
            context.fillText(line, 20, 50 + index * 12);
        });

        // Continue hint
        context.textAlign = 'center';
        context.fillStyle = '#ff9900';
        const blink = Math.floor(this.stateTimer / 500) % 2 === 0;
        if (blink) {
            context.fillText('PRESS SPACE TO CONTINUE', w / 2, h - 15);
        }
    }

    onInput(event) {
        if (event.type === 'keydown' && (event.key === ' ' || event.key === 'Enter')) {
            this.changeState('SELECT');
        }
    }
}

export default HowToState;
