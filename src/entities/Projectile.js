/**
 * Projectile - Bullets/attacks from player and bosses
 */

export class Projectile {
    constructor(x, y, vx, vy, owner, sprite, color, damage = 1) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.owner = owner; // 'player' or 'boss'
        this.sprite = sprite;
        this.color = color;
        this.damage = damage;
        this.active = true;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
    }

    isOffscreen(screenWidth, screenHeight, cameraX, cameraY) {
        const screenX = this.x - cameraX;
        const screenY = this.y - cameraY;
        return screenX < -20 || screenX > screenWidth + 20 ||
               screenY < -20 || screenY > screenHeight + 20;
    }

    deactivate() {
        this.active = false;
    }
}
