/**
 * Boss Entity - Enemy boss with attack patterns
 */

export class Boss {
    constructor(bossData, x, y) {
        this.name = bossData.name;
        this.sprite = bossData.sprite;
        this.title = bossData.title;
        this.desc = bossData.desc;
        this.attackName = bossData.attackName;
        this.attackPattern = bossData.attackPattern;

        this.x = x;
        this.y = y;
        this.maxHp = bossData.hp;
        this.hp = bossData.hp;
        this.speed = bossData.speed;
        this.attackDelay = bossData.attackDelay;
        this.timer = 0;

        // Taunt thresholds
        this.tauntThresholds = [0.75, 0.5, 0.25];
        this.lastTauntIndex = -1;

        // Special boss flags
        this.isMecha = false;
        this.mechaTimer = 0;
        this.transformTriggered = false;
    }

    update(playerX, playerY) {
        // Move towards player
        const dx = playerX - this.x;
        const dy = playerY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 0) {
            this.x += (dx / dist) * this.speed;
            this.y += (dy / dist) * this.speed;
        }

        // Update attack timer
        this.timer++;

        // Update mecha timer if applicable
        if (this.isMecha && this.mechaTimer > 0) {
            this.mechaTimer--;
        }
    }

    canAttack() {
        return this.timer >= this.attackDelay;
    }

    resetAttackTimer() {
        this.timer = 0;
    }

    takeDamage(amount) {
        this.hp -= amount;
        return this.hp <= 0;
    }

    getHealthPercent() {
        return this.hp / this.maxHp;
    }

    shouldTaunt() {
        const currentPercent = this.getHealthPercent();

        for (let i = 0; i < this.tauntThresholds.length; i++) {
            if (i > this.lastTauntIndex && currentPercent <= this.tauntThresholds[i]) {
                this.lastTauntIndex = i;
                return true;
            }
        }

        return false;
    }

    isAlive() {
        return this.hp > 0;
    }

    setMechaMode(mechaTimer) {
        this.isMecha = true;
        this.mechaTimer = mechaTimer;
    }
}
