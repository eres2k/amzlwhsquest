/**
 * SelectState.js
 * Character selection screen
 */

import { State } from '../core/StateMachine.js';

export class SelectState extends State {
    constructor(game) {
        super(game);
        this.charIndex = 0;
        this.charList = ['Carrie', 'Nevena', 'Joao', 'Roman', 'Erwin'];
    }

    onEnter(params) {
        console.log('[SelectState] Entering character select');
        this.charIndex = 0;
    }

    onUpdate(deltaTime) {
        super.onUpdate(deltaTime);
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
        context.fillText('SELECT COORDINATOR', w / 2, 30);

        // Current character
        const charName = this.charList[this.charIndex];
        const charData = this.game.characters[charName];

        // Character sprite
        if (this.game.assets && this.game.assets.chars && this.game.assets.chars[charName]) {
            const sprite = this.game.assets.chars[charName];
            const scale = 4;
            context.drawImage(
                sprite,
                w / 2 - (16 * scale) / 2,
                h / 2 - 40,
                16 * scale,
                16 * scale
            );
        }

        // Character info
        if (charData) {
            context.font = '10px "Press Start 2P"';
            context.fillStyle = charData.color;
            context.fillText(charName, w / 2, h / 2 + 50);

            context.font = '8px "Press Start 2P"';
            context.fillStyle = '#ffffff';
            context.fillText(charData.title, w / 2, h / 2 + 65);

            context.font = '7px "Press Start 2P"';
            context.fillStyle = '#aaaaaa';
            context.fillText(`SPEED: ${charData.speed}`, w / 2, h / 2 + 80);
            context.fillText(`LIVES: ${charData.lives}`, w / 2, h / 2 + 92);

            context.font = '6px "Press Start 2P"';
            context.fillStyle = '#00ffff';
            context.fillText(`ABILITY: ${charData.ability}`, w / 2, h / 2 + 107);
            context.fillText(charData.description, w / 2, h / 2 + 117);
        }

        // Navigation hints
        context.font = '8px "Press Start 2P"';
        context.fillStyle = '#ff9900';
        const blink = Math.floor(this.stateTimer / 500) % 2 === 0;
        if (blink) {
            context.fillText('◄ ►  TO CHANGE', w / 2, h - 30);
            context.fillText('SPACE TO SELECT', w / 2, h - 15);
        }
    }

    onInput(event) {
        if (event.type !== 'keydown') return;

        switch(event.key) {
            case 'ArrowLeft':
            case 'a':
            case 'A':
                this.charIndex = (this.charIndex - 1 + this.charList.length) % this.charList.length;
                break;

            case 'ArrowRight':
            case 'd':
            case 'D':
                this.charIndex = (this.charIndex + 1) % this.charList.length;
                break;

            case ' ':
            case 'Enter':
                const selectedChar = this.charList[this.charIndex];
                console.log(`[SelectState] Selected: ${selectedChar}`);
                this.changeState('PLAY', { character: selectedChar });
                break;
        }
    }
}

export default SelectState;
