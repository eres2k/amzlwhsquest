/**
 * CreditsState.js
 * End credits roll
 */

import { State } from '../core/StateMachine.js';

export class CreditsState extends State {
    constructor(game) {
        super(game);
        this.credits = [
            '',
            'AMZL WHS COORDINATOR QUEST',
            '',
            'A Game About Workplace Safety',
            '',
            '',
            'GAME DESIGN & DEVELOPMENT',
            'Claude (Anthropic)',
            '',
            'ORIGINAL CONCEPT',
            'Amazon WHS Safety Training',
            '',
            'SPECIAL THANKS',
            'All WHS Coordinators',
            'Working to Keep Warehouses Safe',
            '',
            'CHARACTERS',
            'Carrie - The 5S Monk',
            'Nevena - The Oracle',
            'Joao - The Siren',
            'Roman - The Ghost',
            'Erwin - The Manager',
            '',
            'Simon Unglaube',
            'Regional WHS Manager',
            '',
            '',
            'TECHNOLOGY',
            'HTML5 Canvas',
            'ES6 Modules',
            'Procedural Generation',
            '',
            '',
            'THANK YOU FOR PLAYING!',
            '',
            'Stay Safe Out There',
            '',
            '',
            'Press SPACE to return'
        ];
        this.scrollY = 224;
    }

    onEnter(params) {
        console.log('[CreditsState] Entering credits');
        this.scrollY = 224;
    }

    onUpdate(deltaTime) {
        super.onUpdate(deltaTime);

        // Scroll credits
        if (this.scrollY > -this.credits.length * 15 - 100) {
            this.scrollY -= 0.3;
        }
    }

    onRender(context) {
        const canvas = context.canvas;
        const w = canvas.width;
        const h = canvas.height;

        // Black background
        context.fillStyle = '#0a0a12';
        context.fillRect(0, 0, w, h);

        // Render scrolling credits
        context.save();
        context.font = '7px "Press Start 2P"';
        context.textAlign = 'center';

        this.credits.forEach((line, index) => {
            const y = this.scrollY + index * 15;

            if (y > -20 && y < h + 20) {
                // Color coding
                if (line.toUpperCase() === line && line.trim() !== '') {
                    context.fillStyle = '#ffd700'; // Headers
                } else if (line.includes('-')) {
                    context.fillStyle = '#00ffff'; // Character names
                } else {
                    context.fillStyle = '#ffffff'; // Regular text
                }

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

export default CreditsState;
