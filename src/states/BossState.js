/**
 * BossState.js
 * Boss battle state
 */

import { State } from '../core/StateMachine.js';

export class BossState extends State {
    constructor(game) {
        super(game);
        this.boss = null;
    }

    onEnter(params) {
        console.log('[BossState] Entering boss battle');

        // Initialize boss
        this.initBoss(params.bossType || 'simon');

        // Keep player from PlayState
        // Boss starts in center
        this.boss.x = 128;
        this.boss.y = 112;
    }

    initBoss(bossType) {
        const bossTypes = {
            simon: {
                name: 'Simon Unglaube',
                hp: 10,
                maxHp: 10,
                speed: 0.8,
                attackPattern: 'sweep',
                sprite: 'simonBoss'
            },
            inspector: {
                name: 'Labour Inspector',
                hp: 12,
                maxHp: 12,
                speed: 0.7,
                attackPattern: 'tracking',
                sprite: 'boss_inspector'
            },
            compliance: {
                name: 'Compliance Auditor',
                hp: 14,
                maxHp: 14,
                speed: 0.6,
                attackPattern: 'burst',
                sprite: 'boss_compliance'
            }
        };

        const bossData = bossTypes[bossType] || bossTypes.simon;

        this.boss = {
            ...bossData,
            x: 128,
            y: 112,
            vx: 0,
            vy: 0,
            attackTimer: 0,
            attackCooldown: 120,
            vulnerable: true
        };
    }

    onUpdate(deltaTime) {
        super.onUpdate(deltaTime);

        if (!this.boss) return;

        // Update boss AI
        this.updateBossAI(deltaTime);

        // Update boss attacks
        this.updateBossAttacks(deltaTime);

        // Check projectile collisions with boss
        if (this.game.stateMachine.currentState.projectiles) {
            this.game.stateMachine.currentState.projectiles.forEach(proj => {
                if (!proj.active) return;

                const dx = proj.x - this.boss.x;
                const dy = proj.y - this.boss.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 20 && this.boss.vulnerable) {
                    proj.active = false;
                    this.boss.hp -= proj.damage || 1;

                    // Particle burst
                    if (this.game.stateMachine.currentState.spawnParticleBurst) {
                        this.game.stateMachine.currentState.spawnParticleBurst(
                            this.boss.x,
                            this.boss.y,
                            '#ff4444'
                        );
                    }

                    // Check if defeated
                    if (this.boss.hp <= 0) {
                        this.onBossDefeated();
                    }
                }
            });
        }
    }

    updateBossAI(deltaTime) {
        if (!this.boss || !this.game.stateMachine.currentState.player) return;

        const player = this.game.stateMachine.currentState.player;
        const boss = this.boss;

        // Simple AI - move towards player
        const dx = player.x - boss.x;
        const dy = player.y - boss.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 50) {
            boss.vx = (dx / dist) * boss.speed;
            boss.vy = (dy / dist) * boss.speed;
        } else {
            boss.vx *= 0.9;
            boss.vy *= 0.9;
        }

        boss.x += boss.vx;
        boss.y += boss.vy;

        // Keep in bounds
        boss.x = Math.max(20, Math.min(236, boss.x));
        boss.y = Math.max(20, Math.min(204, boss.y));
    }

    updateBossAttacks(deltaTime) {
        if (!this.boss) return;

        this.boss.attackTimer++;

        if (this.boss.attackTimer >= this.boss.attackCooldown) {
            this.boss.attackTimer = 0;
            this.fireBossAttack();
        }
    }

    fireBossAttack() {
        // Boss fires projectile towards player
        const player = this.game.stateMachine.currentState.player;
        if (!player) return;

        const dx = player.x - this.boss.x;
        const dy = player.y - this.boss.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (this.game.stateMachine.currentState.projectiles) {
            this.game.stateMachine.currentState.projectiles.push({
                x: this.boss.x,
                y: this.boss.y,
                vx: (dx / dist) * 3,
                vy: (dy / dist) * 3,
                character: 'boss',
                damage: 1,
                active: true,
                isBossAttack: true
            });
        }
    }

    onBossDefeated() {
        console.log('[BossState] Boss defeated!');

        // Show victory dialog
        this.changeState('DIALOG', {
            text: `${this.boss.name} has been defeated!`,
            speaker: 'System',
            nextState: 'PLAY'
        });
    }

    onRender(context) {
        // Rendering handled by WorldRenderer
    }

    onExit() {
        console.log('[BossState] Exiting boss battle');
    }
}

export default BossState;
