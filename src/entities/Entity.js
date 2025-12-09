/**
 * Entity - Generic NPC entity (runners, ops managers, Simon)
 */

export class Entity {
    constructor(type, x, y) {
        this.type = type; // 'runner', 'ops', 'simon'
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.speed = 1.0;
        this.dir = 1;
        this.frozen = false;
        this.freezeTimer = 0;

        // Simon-specific properties
        this.isSimon = (type === 'simon');
        this.simonAngry = false;
    }

    update() {
        // Update freeze timer
        if (this.freezeTimer > 0) {
            this.freezeTimer--;
            if (this.freezeTimer === 0) {
                this.frozen = false;
            }
        }

        if (this.frozen) return;

        // Move entity
        this.x += this.vx;
        this.y += this.vy;

        // Update direction based on velocity
        if (Math.abs(this.vx) > Math.abs(this.vy)) {
            this.dir = this.vx > 0 ? 1 : -1;
        } else if (this.vy !== 0) {
            this.dir = this.vy > 0 ? 0 : 2;
        }
    }

    freeze(duration) {
        this.frozen = true;
        this.freezeTimer = duration;
    }

    setVelocity(vx, vy) {
        this.vx = vx;
        this.vy = vy;
    }

    setSimonAngry(angry) {
        if (this.isSimon) {
            this.simonAngry = angry;
        }
    }
}
