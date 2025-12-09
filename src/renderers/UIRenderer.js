/**
 * UIRenderer.js
 * Renders UI elements (HUD, dialogs, menus)
 */

export class UIRenderer {
    constructor(game) {
        this.game = game;
    }

    /**
     * Render UI overlays
     */
    render(context, state) {
        this.renderHUD(context, state);
        this.renderDialog(context, state);
        this.renderBossHUD(context, state);
    }

    /**
     * Render HUD (health, score)
     */
    renderHUD(context, state) {
        if (!state.player) return;

        const w = context.canvas.width;
        const h = context.canvas.height;

        // Background panel
        context.fillStyle = 'rgba(10, 15, 30, 0.95)';
        context.fillRect(w - 160, 10, 150, 70);

        // Border
        context.strokeStyle = '#fbbf24';
        context.lineWidth = 2;
        context.strokeRect(w - 160, 10, 150, 70);

        // Lives
        context.fillStyle = '#ef4444';
        context.font = '11px "Press Start 2P"';
        context.textAlign = 'left';
        context.fillText(`LIVES: ${state.player.lives}`, w - 150, 35);

        // Hazards fixed
        const fixedCount = state.issuesFixed || 0;
        context.fillStyle = '#22c55e';
        context.fillText(`FIXED: ${fixedCount}/5`, w - 150, 60);
    }

    /**
     * Render dialog box
     */
    renderDialog(context, state) {
        if (!state.showDialog) return;

        const w = context.canvas.width;
        const h = context.canvas.height;

        // Dialog background
        const dialogHeight = 140;
        const dialogY = h - dialogHeight - 20;

        context.fillStyle = 'rgba(10, 22, 40, 0.95)';
        context.fillRect(20, dialogY, w - 40, dialogHeight);

        // Border
        context.strokeStyle = '#3b82f6';
        context.lineWidth = 3;
        context.strokeRect(20, dialogY, w - 40, dialogHeight);

        // Portrait
        if (state.dialogPortrait) {
            context.drawImage(state.dialogPortrait, 30, dialogY + 10, 64, 64);
        }

        // Text
        if (state.dialogText) {
            context.fillStyle = '#f0f0ff';
            context.font = '13px "Press Start 2P"';
            context.textAlign = 'left';

            const textX = 110;
            const textY = dialogY + 30;
            const maxWidth = w - 140;

            this.wrapText(context, state.dialogText, textX, textY, maxWidth, 20);
        }

        // Continue prompt
        if (state.dialogCanAdvance) {
            const blinkOn = Math.floor(Date.now() / 500) % 2 === 0;
            if (blinkOn) {
                context.fillStyle = '#ffd700';
                context.font = '10px "Press Start 2P"';
                context.textAlign = 'center';
                context.fillText('PRESS SPACE', w / 2, dialogY + dialogHeight - 15);
            }
        }
    }

    /**
     * Render boss HUD
     */
    renderBossHUD(context, state) {
        if (!state.boss) return;

        const w = context.canvas.width;

        // Boss name and HP bar
        const barWidth = w * 0.65;
        const barX = (w - barWidth) / 2;
        const barY = 12;

        // Background
        context.fillStyle = 'rgba(40, 10, 10, 0.9)';
        context.fillRect(barX, barY, barWidth, 50);

        // Border
        context.strokeStyle = '#dc2626';
        context.lineWidth = 2;
        context.strokeRect(barX, barY, barWidth, 50);

        // Boss name
        context.fillStyle = '#fbbf24';
        context.font = '10px "Press Start 2P"';
        context.textAlign = 'center';
        context.fillText(state.boss.name || 'BOSS', w / 2, barY + 20);

        // HP bar background
        const hpBarWidth = barWidth - 40;
        const hpBarX = barX + 20;
        const hpBarY = barY + 30;

        context.fillStyle = '#1a1a1a';
        context.fillRect(hpBarX, hpBarY, hpBarWidth, 14);

        // HP bar fill
        const hpPercent = state.boss.hp / state.boss.maxHp;
        const fillWidth = hpBarWidth * hpPercent;

        const gradient = context.createLinearGradient(hpBarX, 0, hpBarX + fillWidth, 0);
        gradient.addColorStop(0, '#dc2626');
        gradient.addColorStop(1, '#ef4444');
        context.fillStyle = gradient;
        context.fillRect(hpBarX, hpBarY, fillWidth, 14);

        // HP border
        context.strokeStyle = '#444';
        context.lineWidth = 2;
        context.strokeRect(hpBarX, hpBarY, hpBarWidth, 14);
    }

    /**
     * Wrap text to fit width
     */
    wrapText(context, text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ');
        let line = '';
        let lineY = y;

        for (let word of words) {
            const testLine = line + word + ' ';
            const metrics = context.measureText(testLine);

            if (metrics.width > maxWidth && line !== '') {
                context.fillText(line, x, lineY);
                line = word + ' ';
                lineY += lineHeight;
            } else {
                line = testLine;
            }
        }

        context.fillText(line, x, lineY);
    }
}

export default UIRenderer;
