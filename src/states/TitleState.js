/**
 * TitleState.js
 * Main title screen with menu options
 */

import { State } from '../core/StateMachine.js';

export class TitleState extends State {
    constructor(game) {
        super(game);
        this.menuOptions = ['START GAME', 'HOW TO PLAY', 'SETTINGS'];
        this.selectedIndex = 0;
        this.blinkTimer = 0;
        this.showPrompt = true;
    }

    onEnter(params) {
        console.log('[TitleState] Entering title screen');
        this.selectedIndex = 0;

        // Initialize music if available
        if (this.game.audio && this.game.audio.playMusic) {
            this.game.audio.playMusic('title');
        }
    }

    onUpdate(deltaTime) {
        super.onUpdate(deltaTime);

        // Blink prompt
        this.blinkTimer += deltaTime;
        if (this.blinkTimer > 500) {
            this.showPrompt = !this.showPrompt;
            this.blinkTimer = 0;
        }
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
        context.font = '24px "Press Start 2P"';
        context.textAlign = 'center';
        context.fillText('AMZL WHS', w / 2, 60);
        context.fillText('COORDINATOR', w / 2, 90);
        context.fillText('QUEST', w / 2, 120);

        // Menu options
        context.font = '12px "Press Start 2P"';
        this.menuOptions.forEach((option, index) => {
            const y = 180 + index * 30;

            if (index === this.selectedIndex) {
                context.fillStyle = '#00ffff';
                context.fillText('> ' + option + ' <', w / 2, y);
            } else {
                context.fillStyle = '#ffffff';
                context.fillText(option, w / 2, y);
            }
        });

        // Start prompt (blinking)
        if (this.showPrompt) {
            context.font = '10px "Press Start 2P"';
            context.fillStyle = '#ffd700';
            context.fillText('PRESS ENTER TO SELECT', w / 2, h - 50);
        }
    }

    onInput(event) {
        if (event.type !== 'keydown') return;

        switch(event.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                this.selectedIndex = (this.selectedIndex - 1 + this.menuOptions.length) % this.menuOptions.length;
                break;

            case 'ArrowDown':
            case 's':
            case 'S':
                this.selectedIndex = (this.selectedIndex + 1) % this.menuOptions.length;
                break;

            case 'Enter':
            case ' ':
                this.selectOption();
                break;
        }
    }

    selectOption() {
        switch(this.selectedIndex) {
            case 0: // Start Game
                this.changeState('SELECT');
                break;
            case 1: // How to Play
                this.changeState('HOWTO');
                break;
            case 2: // Settings
                this.changeState('SETTINGS');
                break;
        }
    }

    onExit() {
        console.log('[TitleState] Exiting title screen');
    }
}

export default TitleState;
