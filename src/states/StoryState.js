/**
 * StoryState.js
 * Story text scroll
 */

import { State } from '../core/StateMachine.js';

export class StoryState extends State {
    constructor(game) {
        super(game);
        this.storyText = [
            "Deep in the heart of an Amazon warehouse,",
            "safety violations lurk in every corner...",
            "",
            "As a WHS Coordinator, you must",
            "identify and fix these hazards",
            "before Simon Unglaube finds them.",
            "",
            "Your mission: Fix 5 hazards and",
            "survive the warehouse floor.",
            "",
            "But beware... Simon is watching."
        ];
        this.scrollY = 0;
    }

    onEnter(params) {
        console.log('[StoryState] Entering story');
        this.scrollY = 224; // Start off-screen
    }

    onUpdate(deltaTime) {
        super.onUpdate(deltaTime);

        // Scroll text up
        if (this.scrollY > -this.storyText.length * 20 - 100) {
            this.scrollY -= 0.5;
        }
    }

    onRender(context) {
        const canvas = context.canvas;
        const w = canvas.width;
        const h = canvas.height;

        // Black background
        context.fillStyle = '#0a0a12';
        context.fillRect(0, 0, w, h);

        // Render scrolling text
        context.save();
        context.fillStyle = '#ffd700';
        context.font = '8px "Press Start 2P"';
        context.textAlign = 'center';

        this.storyText.forEach((line, index) => {
            const y = this.scrollY + index * 20;
            if (y > -20 && y < h + 20) {
                context.fillText(line, w / 2, y);
            }
        });

        context.restore();
    }

    onInput(event) {
        if (event.type === 'keydown' && (event.key === ' ' || event.key === 'Enter')) {
            this.changeState('TITLE');
        }
    }
}

export default StoryState;
