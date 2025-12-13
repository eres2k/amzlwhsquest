/**
 * Player Entity - Playable character with abilities
 */

import { GAME_CONSTANTS } from '../constants.js';
import { getCharStats, getAttackData } from '../data/characters.js';

export class Player {
    constructor(x, y, characterName) {
        const stats = getCharStats(characterName);
        const attackData = getAttackData(characterName);

        this.x = x;
        this.y = y;
        this.dir = 1; // Direction: 1 = right, -1 = left, 0 = down, 2 = up
        this.speed = stats.speed;
        this.maxLives = stats.lives;
        this.lives = stats.lives;
        this.iframe = 0;
        this.cooldown = 0;
        this.cooldownMax = attackData.cooldown;
        this.characterName = characterName;
        this.attackData = attackData;

        // Last movement direction for projectile targeting
        this.lastDX = 1;
        this.lastDY = 0;

        // Special ability flags
        this.ability = this.getAbility(characterName);
    }

    getAbility(name) {
        const abilities = {
            "Carrie": "PRECISION_FOCUS", // 2x damage to bosses
            "Nevena": "FORESIGHT", // Longer iframe
            "Joao": "CAFFEINE_RUSH", // Faster cooldown
            "Roman": "PHANTOM_STEP", // Smaller collision radius for hazards
            "Erwin": "TESLA_RUSH" // Already applied in stats (faster speed, 1 life)
        };
        return abilities[name] || null;
    }

    update(input, collisionSystem) {
        // Update cooldown
        if (this.cooldown > 0) this.cooldown--;
        if (this.iframe > 0) this.iframe--;

        // Get movement input
        const { dx, dy } = input.getMovement();

        if (dx !== 0 || dy !== 0) {
            // Normalize diagonal movement
            let moveX = dx;
            let moveY = dy;

            if (dx !== 0 && dy !== 0) {
                moveX *= GAME_CONSTANTS.DIAGONAL_FACTOR;
                moveY *= GAME_CONSTANTS.DIAGONAL_FACTOR;
            }

            // Try to move
            const newX = this.x + moveX * this.speed;
            const newY = this.y + moveY * this.speed;

            // Check collision
            if (!collisionSystem.checkTileCollision(newX, newY)) {
                this.x = newX;
                this.y = newY;

                // Track last movement direction for projectile targeting
                this.lastDX = dx;
                this.lastDY = dy;

                // Update direction
                if (dx > 0) this.dir = 1;
                else if (dx < 0) this.dir = -1;
                else if (dy > 0) this.dir = 0;
                else if (dy < 0) this.dir = 2;
            }
        }
    }

    draw(ctx, assets) {
        // Flash when invincible
        if (this.iframe > 0 && Math.floor(this.iframe / 5) % 2 === 0) {
            return; // Skip drawing (blink effect)
        }

        // Draw player
        if (assets && assets.player) {
            ctx.drawImage(assets.player, this.x - 8, this.y - 8);
        } else {
            // Fallback: draw a simple rectangle
            ctx.fillStyle = '#22c55e';
            ctx.fillRect(this.x - 6, this.y - 6, 12, 12);
            // Draw face
            ctx.fillStyle = '#c4956a';
            ctx.fillRect(this.x - 4, this.y - 8, 8, 6);
        }
    }

    takeDamage() {
        if (this.iframe > 0) return false;

        this.lives--;

        // Apply Nevena's ability (longer iframe)
        if (this.ability === "FORESIGHT") {
            this.iframe = 180; // 3 seconds instead of 2
        } else {
            this.iframe = GAME_CONSTANTS.IFRAME_DURATION;
        }

        return true;
    }

    canAttack() {
        return this.cooldown === 0;
    }

    attack() {
        if (!this.canAttack()) return false;

        // Apply Joao's ability (faster cooldown)
        if (this.ability === "CAFFEINE_RUSH") {
            this.cooldown = Math.floor(this.cooldownMax * 0.65); // 35% faster
        } else {
            this.cooldown = this.cooldownMax;
        }

        return true;
    }

    getCollisionRadius() {
        // Roman's ability (smaller collision radius)
        return this.ability === "PHANTOM_STEP" ? 6 : 10;
    }

    getDamageMultiplier() {
        // Carrie's ability (2x damage to bosses)
        return this.ability === "PRECISION_FOCUS" ? 2 : 1;
    }

    heal() {
        if (this.lives < this.maxLives) {
            this.lives++;
            return true;
        }
        return false;
    }

    isAlive() {
        return this.lives > 0;
    }
}
