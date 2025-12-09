/**
 * UI Renderer - MVP Version
 * Renders HUD, dialog, and UI elements
 */

export class UIRenderer {
    constructor() {
        this.hudElement = document.getElementById('hud-layer');
        this.lifeElement = document.getElementById('life-val');
        this.scoreElement = document.getElementById('score-val');
        this.bossHudElement = document.getElementById('boss-hud');
        this.bossNameElement = document.getElementById('boss-name-el');
        this.bossHealthElement = document.getElementById('boss-health-el');
        this.dialogElement = document.getElementById('dialog-box');
        this.dialogTextElement = document.getElementById('text-content');
    }

    updateHUD(game) {
        if (!this.hudElement) return;

        // Show/hide HUD based on game state
        if (game.state === 'PLAY' || game.state === 'BOSS') {
            this.hudElement.style.display = 'block';

            // Update lives
            if (this.lifeElement && game.player) {
                const hearts = '❤️'.repeat(Math.max(0, game.player.lives));
                this.lifeElement.textContent = hearts;
            }

            // Update score
            if (this.scoreElement) {
                this.scoreElement.textContent = `${game.issuesFixed}/5`;
            }
        } else {
            this.hudElement.style.display = 'none';
        }
    }

    updateBossHUD(game) {
        if (!this.bossHudElement) return;

        if ((game.state === 'BOSS' || game.state === 'BOSS_TRANSFORM') && game.boss) {
            this.bossHudElement.style.display = 'block';

            if (this.bossNameElement) {
                this.bossNameElement.textContent = game.boss.name;
            }

            if (this.bossHealthElement) {
                // Use animated health bar if available for smooth transformation effect
                const percent = game.boss.getAnimatedHealthPercent ?
                    game.boss.getAnimatedHealthPercent() * 100 :
                    (game.boss.hp / game.boss.maxHp) * 100;
                this.bossHealthElement.style.width = percent + '%';
            }
        } else {
            this.bossHudElement.style.display = 'none';
        }
    }

    updateDialog(game) {
        if (!this.dialogElement) return;

        if (game.dialogText && game.dialogVisible) {
            this.dialogElement.style.display = 'flex';
            if (this.dialogTextElement) {
                this.dialogTextElement.textContent = game.dialogVisible;
            }
        } else {
            this.dialogElement.style.display = 'none';
        }
    }

    update(game) {
        this.updateHUD(game);
        this.updateBossHUD(game);
        this.updateDialog(game);
    }
}
