/**
 * StoryState.js
 * Mission Briefing screen with premium styling
 */

import { State } from '../core/StateMachine.js';

export class StoryState extends State {
    constructor(game) {
        super(game);
    }

    onEnter(params) {
        console.log('[StoryState] Entering mission briefing');
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

        // Animated stars
        for (let i = 0; i < 20; i++) {
            const x = (i * 37 + t * 0.15) % w;
            const y = (i * 47) % h;
            const twinkle = Math.sin(t * 0.08 + i * 0.5) * 0.4 + 0.5;
            context.fillStyle = `rgba(255, 255, 255, ${twinkle * 0.5})`;
            context.fillRect(x, y, 1, 1);
        }

        // Animated vertical grid lines (data stream effect)
        for (let i = 0; i < 17; i++) {
            const x = i * 16;
            context.strokeStyle = `rgba(34, 211, 238, ${0.05 + Math.sin(t * 0.03 + i) * 0.03})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, h);
            context.stroke();
        }

        // Panel background with blue glow
        context.shadowColor = '#3b82f6';
        context.shadowBlur = 15;
        context.fillStyle = 'rgba(10, 15, 30, 0.9)';
        context.fillRect(15, 20, w - 30, h - 45);
        context.shadowBlur = 0;

        // Panel border (blue theme for mission)
        context.strokeStyle = '#3b82f6';
        context.lineWidth = 2;
        context.strokeRect(15, 20, w - 30, h - 45);
        context.strokeStyle = '#1d4ed8';
        context.lineWidth = 1;
        context.strokeRect(17, 22, w - 34, h - 49);

        // Title with glow effect
        context.textAlign = 'center';
        const glowIntensity = Math.sin(t * 0.08) * 0.3 + 0.7;
        context.shadowColor = '#3b82f6';
        context.shadowBlur = 12 * glowIntensity;
        context.font = '10px "Press Start 2P"';
        context.fillStyle = '#1d4ed8';
        context.fillText('MISSION BRIEFING', w / 2 + 1, 42);
        context.fillStyle = '#60a5fa';
        context.fillText('MISSION BRIEFING', w / 2, 41);
        context.shadowBlur = 0;

        // Decorative lines
        context.fillStyle = '#3b82f6';
        context.fillRect(35, 52, w - 70, 2);
        context.fillStyle = '#22d3ee';
        context.fillRect(50, 56, w - 100, 1);

        // Simon icon area (small box)
        context.fillStyle = 'rgba(59, 130, 246, 0.2)';
        context.fillRect(20, 68, 30, 30);
        context.strokeStyle = '#3b82f6';
        context.lineWidth = 1;
        context.strokeRect(20, 68, 30, 30);

        // "S" for Simon
        context.fillStyle = '#60a5fa';
        context.font = '12px "Press Start 2P"';
        context.textAlign = 'center';
        context.fillText('S', 35, 88);

        // Mission text
        context.textAlign = 'left';
        context.font = '7px "Press Start 2P"';
        context.fillStyle = '#94a3b8';
        context.fillText('Simon asks you to:', 58, 83);

        // Mission objectives with bullet styling
        context.font = '7px "Press Start 2P"';

        context.fillStyle = '#22c55e';
        context.fillText('>', 25, 115);
        context.fillStyle = '#e2e8f0';
        context.fillText('Do the safety audit', 38, 115);

        context.fillStyle = '#f97316';
        context.fillText('>', 25, 133);
        context.fillStyle = '#e2e8f0';
        context.fillText('Dodge crazy Ops requests', 38, 133);

        context.fillStyle = '#a855f7';
        context.fillText('>', 25, 151);
        context.fillStyle = '#e2e8f0';
        context.fillText('Push back with rules', 38, 151);

        context.fillStyle = '#ef4444';
        context.fillText('>', 25, 169);
        context.fillStyle = '#e2e8f0';
        context.fillText('Deal with "visitors"', 38, 169);

        // Animated prompt
        context.textAlign = 'center';
        const blink = Math.sin(t * 0.12) > 0;
        if (blink) {
            context.fillStyle = '#fff';
            context.font = '7px "Press Start 2P"';
            context.fillText('[PRESS SPACE]', w / 2, 198);
        }
    }

    onInput(event) {
        if (event.type === 'keydown' && (event.key === ' ' || event.key === 'Enter')) {
            this.changeState('TITLE');
        }
    }
}

export default StoryState;
