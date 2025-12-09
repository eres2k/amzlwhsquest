/**
 * DialogState.js
 * Dialog/conversation state
 */

import { State } from '../core/StateMachine.js';

export class DialogState extends State {
    constructor(game) {
        super(game);
        this.dialogText = '';
        this.dialogVisible = '';
        this.speaker = '';
        this.portrait = null;
        this.canAdvance = false;
        this.nextState = 'PLAY';
        this.typewriterIndex = 0;
        this.typewriterSpeed = 2; // frames per character
    }

    onEnter(params) {
        console.log('[DialogState] Entering dialog');

        this.dialogText = params.text || 'No dialog text provided.';
        this.speaker = params.speaker || 'System';
        this.portrait = params.portrait || null;
        this.nextState = params.nextState || 'PLAY';

        this.dialogVisible = '';
        this.typewriterIndex = 0;
        this.canAdvance = false;

        // Show dialog box
        const dialogBox = document.getElementById('dialog-box');
        if (dialogBox) {
            dialogBox.style.display = 'flex';

            const textContent = document.getElementById('dialog-text');
            if (textContent) {
                textContent.innerText = '';
            }

            const portrait = document.getElementById('portrait');
            if (portrait && this.portrait) {
                portrait.style.backgroundImage = `url(${this.portrait.toDataURL()})`;
            }
        }
    }

    onUpdate(deltaTime) {
        super.onUpdate(deltaTime);

        // Typewriter effect
        if (this.typewriterIndex < this.dialogText.length) {
            if (this.stateTimer % this.typewriterSpeed === 0) {
                this.dialogVisible += this.dialogText[this.typewriterIndex];
                this.typewriterIndex++;

                const textContent = document.getElementById('dialog-text');
                if (textContent) {
                    textContent.innerText = this.dialogVisible;
                }
            }
        } else {
            this.canAdvance = true;
        }
    }

    onRender(context) {
        // Dialog rendered via DOM elements
    }

    onInput(event) {
        if (event.type === 'keydown' && event.key === ' ') {
            if (this.canAdvance) {
                this.advance();
            } else {
                // Skip typewriter
                this.dialogVisible = this.dialogText;
                this.typewriterIndex = this.dialogText.length;
                this.canAdvance = true;

                const textContent = document.getElementById('dialog-text');
                if (textContent) {
                    textContent.innerText = this.dialogVisible;
                }
            }
        }
    }

    advance() {
        console.log(`[DialogState] Advancing to: ${this.nextState}`);

        // Hide dialog box
        const dialogBox = document.getElementById('dialog-box');
        if (dialogBox) {
            dialogBox.style.display = 'none';
        }

        // Transition to next state
        this.changeState(this.nextState);
    }

    onExit() {
        // Ensure dialog box is hidden
        const dialogBox = document.getElementById('dialog-box');
        if (dialogBox) {
            dialogBox.style.display = 'none';
        }
    }
}

export default DialogState;
