/**
 * HowToState.js
 * How to play instructions with premium styling
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
        const t = this.stateTimer;

        // Premium animated background
        const grad = context.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, '#050510');
        grad.addColorStop(0.3, '#0a1525');
        grad.addColorStop(0.6, '#0f172a');
        grad.addColorStop(1, '#0a0a18');
        context.fillStyle = grad;
        context.fillRect(0, 0, w, h);

        // Animated particles
        for (let i = 0; i < 12; i++) {
            const x = (i * 43 + t * 0.25) % w;
            const y = (i * 37 + Math.sin(t * 0.015 + i) * 8) % h;
            const alpha = 0.15 + Math.sin(t * 0.04 + i) * 0.1;
            context.fillStyle = `rgba(34, 211, 238, ${alpha})`;
            context.fillRect(x, y, 2, 2);
        }

        // Animated grid lines
        const offset = (t * 0.6) % 32;
        for (let i = -1; i < 16; i++) {
            const y = i * 16 + offset;
            context.strokeStyle = `rgba(251, 191, 36, ${0.05 + (y / h) * 0.08})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(w, y);
            context.stroke();
        }

        // Panel background with gold glow
        context.shadowColor = '#fbbf24';
        context.shadowBlur = 12;
        context.fillStyle = 'rgba(10, 10, 20, 0.9)';
        context.fillRect(12, 12, w - 24, h - 28);
        context.shadowBlur = 0;

        // Panel border (double border effect)
        context.strokeStyle = '#fbbf24';
        context.lineWidth = 2;
        context.strokeRect(12, 12, w - 24, h - 28);
        context.strokeStyle = '#92400e';
        context.lineWidth = 1;
        context.strokeRect(14, 14, w - 28, h - 32);

        // Title with glow effect
        context.textAlign = 'center';
        const glowIntensity = Math.sin(t * 0.08) * 0.3 + 0.7;
        context.shadowColor = '#fbbf24';
        context.shadowBlur = 12 * glowIntensity;
        context.font = '11px "Press Start 2P"';
        context.fillStyle = '#92400e';
        context.fillText('HOW TO PLAY', w / 2 + 1, 31);
        context.fillStyle = '#fbbf24';
        context.fillText('HOW TO PLAY', w / 2, 30);
        context.shadowBlur = 0;

        // Decorative line under title
        context.fillStyle = '#fbbf24';
        context.fillRect(30, 38, w - 60, 2);
        context.fillStyle = '#22d3ee';
        context.fillRect(45, 42, w - 90, 1);

        context.textAlign = 'left';

        // CONTROLS section header
        context.fillStyle = '#22d3ee';
        context.font = '7px "Press Start 2P"';
        context.fillText('CONTROLS', 20, 58);

        // Control key boxes
        context.fillStyle = 'rgba(34, 211, 238, 0.15)';
        context.fillRect(20, 64, 55, 16);
        context.strokeStyle = '#22d3ee';
        context.lineWidth = 1;
        context.strokeRect(20, 64, 55, 16);
        context.fillStyle = '#22d3ee';
        context.font = '6px "Press Start 2P"';
        context.fillText('W A S D', 25, 75);

        context.fillStyle = '#94a3b8';
        context.font = '6px monospace';
        context.fillText('Move around', 80, 75);

        context.fillStyle = 'rgba(34, 211, 238, 0.15)';
        context.fillRect(20, 84, 55, 16);
        context.strokeStyle = '#22d3ee';
        context.lineWidth = 1;
        context.strokeRect(20, 84, 55, 16);
        context.fillStyle = '#22d3ee';
        context.font = '6px "Press Start 2P"';
        context.fillText('SPACE', 27, 95);

        context.fillStyle = '#94a3b8';
        context.font = '6px monospace';
        context.fillText('Attack / Interact', 80, 95);

        // YOUR MISSION section
        context.fillStyle = '#ef4444';
        context.font = '7px "Press Start 2P"';
        context.fillText('YOUR MISSION', 20, 118);

        context.font = '6px "Press Start 2P"';

        context.fillStyle = '#22c55e';
        context.fillText('1', 25, 132);
        context.fillStyle = '#e2e8f0';
        context.font = '6px monospace';
        context.fillText('Find and fix 5 safety hazards', 35, 132);

        context.fillStyle = '#f97316';
        context.font = '6px "Press Start 2P"';
        context.fillText('2', 25, 145);
        context.fillStyle = '#e2e8f0';
        context.font = '6px monospace';
        context.fillText('Dodge crazy Ops requests!', 35, 145);

        context.fillStyle = '#a855f7';
        context.font = '6px "Press Start 2P"';
        context.fillText('3', 25, 158);
        context.fillStyle = '#e2e8f0';
        context.font = '6px monospace';
        context.fillText('Defeat the surprise visitor', 35, 158);

        // TIPS section
        context.fillStyle = '#22d3ee';
        context.font = '7px "Press Start 2P"';
        context.fillText('TIPS', 20, 178);

        context.fillStyle = '#fbbf24';
        context.font = '6px monospace';
        context.fillText('> Collect packages for power-ups', 25, 191);
        context.fillText('> Fire books to push back enemies', 25, 203);

        // Animated prompt
        context.textAlign = 'center';
        const blink = Math.sin(t * 0.12) > 0;
        if (blink) {
            context.fillStyle = '#fff';
            context.font = '7px "Press Start 2P"';
            context.fillText('[SPACE TO CONTINUE]', w / 2, 218);
        }
    }

    onInput(event) {
        if (event.type === 'keydown' && (event.key === ' ' || event.key === 'Enter')) {
            this.changeState('SELECT');
        }
    }
}

export default HowToState;
