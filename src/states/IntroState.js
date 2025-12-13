/**
 * IntroState.js
 * DVI1 Delivery Station introduction sequence with premium styling
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
        const t = this.stateTimer;

        // Premium animated background
        const grad = context.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, '#050510');
        grad.addColorStop(0.3, '#0a1525');
        grad.addColorStop(0.6, '#0f172a');
        grad.addColorStop(1, '#0a0a18');
        context.fillStyle = grad;
        context.fillRect(0, 0, w, h);

        // Animated particles (floating packages)
        for (let i = 0; i < 15; i++) {
            const x = (i * 41 + t * 0.2) % w;
            const y = (i * 53 + Math.sin(t * 0.02 + i) * 5) % h;
            const alpha = 0.2 + Math.sin(t * 0.05 + i) * 0.15;
            context.fillStyle = `rgba(251, 191, 36, ${alpha})`;
            context.fillRect(x, y, 3, 3);
        }

        // Animated grid lines
        const offset = (t * 0.8) % 32;
        for (let i = -1; i < 16; i++) {
            const y = i * 16 + offset;
            context.strokeStyle = `rgba(34, 211, 238, ${0.08 + (y / h) * 0.1})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(w, y);
            context.stroke();
        }

        context.save();
        context.globalAlpha = this.fadeAlpha;

        // Panel background with glow
        context.shadowColor = '#ff9900';
        context.shadowBlur = 15;
        context.fillStyle = 'rgba(10, 10, 20, 0.85)';
        context.fillRect(15, 25, w - 30, h - 55);
        context.shadowBlur = 0;

        // Panel border
        context.strokeStyle = '#ff9900';
        context.lineWidth = 2;
        context.strokeRect(15, 25, w - 30, h - 55);
        context.strokeStyle = '#7c2d12';
        context.lineWidth = 1;
        context.strokeRect(17, 27, w - 34, h - 59);

        // Title with glow effect
        context.textAlign = 'center';
        const glowIntensity = Math.sin(t * 0.08) * 0.3 + 0.7;
        context.shadowColor = '#ff9900';
        context.shadowBlur = 12 * glowIntensity;
        context.font = '14px "Press Start 2P"';
        context.fillStyle = '#7c2d12';
        context.fillText('DVI1', w / 2 + 2, 52);
        context.fillStyle = '#ea580c';
        context.fillText('DVI1', w / 2 + 1, 51);
        context.fillStyle = '#fbbf24';
        context.fillText('DVI1', w / 2, 50);
        context.shadowBlur = 0;

        // Subtitle
        context.shadowColor = '#22d3ee';
        context.shadowBlur = 6;
        context.fillStyle = '#22d3ee';
        context.font = '6px "Press Start 2P"';
        context.fillText('DELIVERY STATION', w / 2, 65);
        context.shadowBlur = 0;

        // Decorative line
        context.fillStyle = '#ff9900';
        context.fillRect(40, 75, w - 80, 2);
        context.fillStyle = '#22d3ee';
        context.fillRect(60, 79, w - 120, 1);

        // Story text with styling
        context.textAlign = 'left';
        context.font = '7px "Press Start 2P"';

        context.fillStyle = '#94a3b8';
        context.fillText('Ops Managers obsess over', 30, 100);
        context.fillStyle = '#ef4444';
        context.fillText('rates.', 180, 100);

        context.fillStyle = '#94a3b8';
        context.fillText('They throw', 30, 120);
        context.fillStyle = '#f97316';
        context.fillText('Crazy Requests.', 105, 120);

        context.fillStyle = '#94a3b8';
        context.fillText('You must protect', 30, 140);
        context.fillStyle = '#22c55e';
        context.fillText('Safety.', 155, 140);

        context.fillStyle = '#94a3b8';
        context.fillText('Stop runners.', 30, 160);
        context.fillStyle = '#22d3ee';
        context.fillText('Fix hazards.', 130, 160);

        // Animated prompt
        context.textAlign = 'center';
        const blink = Math.sin(t * 0.12) > 0;
        if (blink) {
            context.fillStyle = '#fff';
            context.font = '7px "Press Start 2P"';
            context.fillText('[SPACE TO SKIP]', w / 2, 195);
        }

        context.restore();
    }

    onInput(event) {
        if (event.type === 'keydown' && (event.key === ' ' || event.key === 'Enter')) {
            this.changeState('STORY');
        }
    }
}

export default IntroState;
