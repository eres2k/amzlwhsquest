/**
 * Game - Central game controller and state container
 * Main game class that coordinates all systems and runs the game loop
 */

import { GAME_CONSTANTS, CANVAS_CONFIG } from '../constants.js';
import { BOSS_TYPES } from '../data/bosses.js';
import { CHARACTER_LIST, getAttackData, getCharStats } from '../data/characters.js';
import { pickRandomHazards } from '../data/hazards.js';
import { ObjectPool } from './ObjectPool.js';
import { StateMachine } from './StateMachine.js';
import { Player } from '../entities/Player.js';
import { Boss } from '../entities/Boss.js';
import { Projectile } from '../entities/Projectile.js';
import { CollisionSystem } from '../systems/CollisionSystem.js';
import { CameraSystem } from '../systems/CameraSystem.js';
import { ParticleSystem } from '../systems/ParticleSystem.js';

export class Game {
    constructor(canvas) {
        // Canvas setup
        this.canvas = canvas;
        this.ctx = canvas ? canvas.getContext('2d') : null;

        // State Management
        this.state = 'LOGO';
        this.stateTimer = 0;
        this.nextState = 'TITLE';
        this.ticks = 0;

        // Region settings
        this.region = 'EN'; // Default to English

        // Player
        this.player = null;
        this.selectedChar = "Carrie";
        this.charList = CHARACTER_LIST;
        this.charIndex = 0;

        // Camera
        this.camera = { x: 0, y: 0 };

        // Level Data
        this.map = [];
        this.clutter = [];
        this.entities = [];
        this.projectiles = [];
        this.particles = [];
        this.floatingTexts = [];
        this.activeIssues = [];

        // Combat & Progress
        this.issuesFixed = 0;
        this.lives = 5;
        this.genId = 0;
        this.boss = null;
        this.simonHits = 0;
        this.pendingBossIntro = false;

        // Visual Effects
        this.shake = 0;
        this.flash = 0;

        // Dialog
        this.dialogText = "";
        this.dialogVisible = "";
        this.dialogTimer = 0;
        this.dialogSpeaker = "";
        this.dialogPortrait = null;
        this.isAIDialog = false;

        // Game Over
        this.gameOverTriggered = false;
        this.gameOverPhase = 0;
        this.corporateMessage = "";
        this.characterDefeatLine = "";
        this.gameOverReason = "";
        this.creditsType = 'normal';

        // Stats
        this.startTime = 0;
        this.booksFired = 0;
        this.opsPushed = 0;
        this.lastAIBanterTime = 0;

        // Special Level Data
        this.fireExitDoor = null;
        this.conveyorBelts = [];
        this.packages = [];
        this.palletJacks = [];
        this.cartWorkers = [];
        this.palletStacks = [];
        this.sortStations = [];
        this.warehouseSigns = [];

        // Yard Level
        this.powerUps = [];
        this.collectibles = [];
        this.forklifts = [];
        this.playerPowerUp = null;
        this.powerUpTimer = 0;
        this.score = 0;
        this.yardPedestrians = [];

        // Boss Types
        this.bossTypes = BOSS_TYPES;

        // Jeff Bezos
        this.jeffTaunt = "";
        this.jeffTauntTimer = 0;

        // AI Status
        this.aiResultText = null;
        this.splashTimer = 0;

        // Systems (initialized in init())
        this.objectPool = null;
        this.collisionSystem = null;
        this.cameraSystem = null;
        this.particleSystem = null;
        this.stateMachine = null;

        // Assets
        this.assets = {};
        this.assetsLoaded = false;

        // Game loop
        this.running = false;
        this.lastFrameTime = 0;

        // Bind methods
        this.handleAction = this.handleAction.bind(this);
        this.loop = this.loop.bind(this);
    }

    /**
     * Initialize the game
     */
    async init() {
        console.log('[Game] Initializing...');

        try {
            // Initialize systems
            this.objectPool = new ObjectPool();
            this.collisionSystem = new CollisionSystem();
            this.cameraSystem = new CameraSystem();
            this.particleSystem = new ParticleSystem(this.objectPool);
            this.stateMachine = new StateMachine(this);

            // Generate assets
            console.log('[Game] Generating assets...');
            this.generateAssets();

            // Generate initial map
            console.log('[Game] Generating map...');
            this.generateMap();

            // Set collision map
            this.collisionSystem.setMap(this.map);
            this.cameraSystem.setMapSize(GAME_CONSTANTS.MAP_W, GAME_CONSTANTS.MAP_H);

            // Create player
            const charStats = getCharStats(this.selectedChar);
            this.player = new Player(100, 100, this.selectedChar);
            this.player.speed = charStats.speed;
            this.lives = charStats.lives;

            console.log('[Game] Player created:', this.selectedChar);

            // Initialize timer
            this.startTime = Date.now();

            console.log('[Game] Initialization complete');
            return true;

        } catch (error) {
            console.error('[Game] Initialization failed:', error);
            return false;
        }
    }

    /**
     * Start the game loop
     */
    start() {
        console.log('[Game] Starting game loop...');
        this.running = true;
        this.state = 'PLAY';
        this.lastFrameTime = performance.now();

        // Start music
        if (window.musicSystem) {
            window.musicSystem.play('ingame');
        }

        // Start the loop
        requestAnimationFrame(this.loop);
    }

    /**
     * Stop the game loop
     */
    stop() {
        this.running = false;
    }

    /**
     * Main game loop
     */
    loop(currentTime) {
        if (!this.running) return;

        const deltaTime = currentTime - this.lastFrameTime;
        this.lastFrameTime = currentTime;

        // Update
        this.update(deltaTime);

        // Draw
        this.draw();

        // Continue loop
        requestAnimationFrame(this.loop);
    }

    /**
     * Update game state
     */
    update(deltaTime) {
        // Update screen effects
        if (this.shake > 0) this.shake--;
        if (this.flash > 0) this.flash--;

        // Update based on state
        if (this.state === 'PLAY' || this.state === 'BOSS') {
            // Update player
            if (this.player && window.inputSystem) {
                this.player.update(window.inputSystem, this.collisionSystem);
            }

            // Update projectiles
            this.updateProjectiles();

            // Update boss
            if (this.state === 'BOSS' && this.boss) {
                this.boss.update(this.player.x, this.player.y);

                // Boss attacks
                if (this.boss.canAttack()) {
                    this.bossAttack();
                    this.boss.resetAttackTimer();
                }
            }

            // Update particles
            if (this.particleSystem) {
                this.particleSystem.update();
            }

            // Update camera
            if (this.player && this.cameraSystem) {
                this.cameraSystem.update(this.player.x, this.player.y);
                this.camera.x = this.cameraSystem.x;
                this.camera.y = this.cameraSystem.y;
            }
        }

        this.ticks++;
    }

    /**
     * Draw game
     */
    draw() {
        if (!this.ctx) return;

        const ctx = this.ctx;
        const canvas = this.canvas;

        // Clear
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Apply camera offset and shake
        ctx.save();
        const shakeX = this.shake > 0 ? (Math.random() - 0.5) * this.shake : 0;
        const shakeY = this.shake > 0 ? (Math.random() - 0.5) * this.shake : 0;
        ctx.translate(-this.camera.x + shakeX, -this.camera.y + shakeY);

        // Draw map
        this.drawMap(ctx);

        // Draw hazards
        this.drawHazards(ctx);

        // Draw projectiles
        this.drawProjectiles(ctx);

        // Draw player
        if (this.player) {
            this.player.draw(ctx, this.assets);
        }

        // Draw boss
        if (this.boss && this.state === 'BOSS') {
            this.boss.draw(ctx, this.assets);
        }

        // Draw particles (pass {x:0, y:0} since ctx is already translated)
        if (this.particleSystem) {
            this.particleSystem.draw(ctx, { x: 0, y: 0 });
        }

        ctx.restore();

        // Draw flash effect
        if (this.flash > 0) {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.flash / 20})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Update UI
        this.updateUI();
    }

    /**
     * Draw the map tiles
     */
    drawMap(ctx) {
        const tileSize = GAME_CONSTANTS.TILE_SIZE;
        const startX = Math.floor(this.camera.x / tileSize);
        const startY = Math.floor(this.camera.y / tileSize);
        const endX = startX + Math.ceil(this.canvas.width / tileSize) + 1;
        const endY = startY + Math.ceil(this.canvas.height / tileSize) + 1;

        for (let y = startY; y < endY && y < this.map.length; y++) {
            if (y < 0) continue;
            for (let x = startX; x < endX && this.map[y] && x < this.map[y].length; x++) {
                if (x < 0) continue;

                const tile = this.map[y][x];
                const px = x * tileSize;
                const py = y * tileSize;

                // Floor
                if (tile === 0) {
                    ctx.fillStyle = ((x + y) % 2 === 0) ? '#2a2a3e' : '#252538';
                    ctx.fillRect(px, py, tileSize, tileSize);
                }
                // Wall
                else if (tile === 1) {
                    ctx.fillStyle = '#4a4a5e';
                    ctx.fillRect(px, py, tileSize, tileSize);
                    ctx.strokeStyle = '#3a3a4e';
                    ctx.strokeRect(px, py, tileSize, tileSize);
                }
                // Shelving
                else if (tile === 2) {
                    ctx.fillStyle = '#6b4423';
                    ctx.fillRect(px, py, tileSize, tileSize);
                }
            }
        }
    }

    /**
     * Draw hazards
     */
    drawHazards(ctx) {
        for (const hazard of this.activeIssues) {
            if (hazard.fixed) continue;

            // Draw hazard marker
            ctx.fillStyle = '#ff4444';
            ctx.beginPath();
            ctx.arc(hazard.x, hazard.y, 10, 0, Math.PI * 2);
            ctx.fill();

            // Draw warning indicator
            ctx.fillStyle = '#ffffff';
            ctx.font = '10px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('!', hazard.x, hazard.y + 4);
        }
    }

    /**
     * Draw projectiles
     */
    drawProjectiles(ctx) {
        for (const proj of this.projectiles) {
            if (!proj.active) continue;

            ctx.fillStyle = proj.color;
            ctx.beginPath();
            ctx.arc(proj.x, proj.y, 5, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    /**
     * Update projectiles
     */
    updateProjectiles() {
        const writeIdx = [];

        for (const proj of this.projectiles) {
            proj.update();

            // Check if offscreen
            if (proj.isOffscreen(this.canvas.width * 2, this.canvas.height * 2, this.camera.x - 100, this.camera.y - 100)) {
                proj.deactivate();
                continue;
            }

            // Check player projectile hits boss
            if (proj.owner === 'player' && this.boss && this.state === 'BOSS') {
                const dx = proj.x - this.boss.x;
                const dy = proj.y - this.boss.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 20) {
                    const damage = proj.damage * (this.player ? this.player.getDamageMultiplier() : 1);
                    this.boss.takeDamage(damage);

                    if (window.audioSystem) window.audioSystem.sfx.bossHit();
                    if (this.particleSystem) {
                        this.particleSystem.spawnParticleBurst(proj.x, proj.y, ['#ff0000', '#ff4444'], 8);
                    }

                    this.shake = 5;

                    if (this.boss.hp <= 0) {
                        this.winGame();
                    }

                    proj.deactivate();
                    continue;
                }
            }

            // Check boss projectile hits player
            if (proj.owner === 'boss' && this.player) {
                const dx = proj.x - this.player.x;
                const dy = proj.y - this.player.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < this.player.getCollisionRadius()) {
                    if (this.player.takeDamage()) {
                        if (window.audioSystem) window.audioSystem.sfx.hurt();
                        this.shake = 8;
                        this.lives = this.player.lives;

                        if (!this.player.isAlive()) {
                            this.triggerGameOver();
                        }
                    }

                    proj.deactivate();
                    continue;
                }
            }

            if (proj.active) {
                writeIdx.push(proj);
            }
        }

        this.projectiles = writeIdx;
    }

    /**
     * Handle action input (space bar, touch)
     */
    handleAction() {
        if (this.state === 'PLAY') {
            // Try to attack
            if (this.player && this.player.canAttack()) {
                this.throwBook();
            }

            // Try to interact with hazards
            this.tryInteract();
        } else if (this.state === 'BOSS') {
            // Attack boss
            if (this.player && this.player.canAttack()) {
                this.throwBookAtBoss();
            }
        }
    }

    /**
     * Throw a book projectile
     */
    throwBook() {
        const player = this.player;
        const attackData = getAttackData(player.characterName);

        // Direction based on last movement
        let dx = player.lastDX || 1;
        let dy = player.lastDY || 0;

        if (dx === 0 && dy === 0) dx = 1;

        const dist = Math.sqrt(dx * dx + dy * dy);
        const speed = attackData.speed;
        const vx = (dx / dist) * speed;
        const vy = (dy / dist) * speed;

        const projectile = new Projectile(
            player.x,
            player.y,
            vx,
            vy,
            'player',
            attackData.sprite,
            attackData.color,
            1
        );

        this.projectiles.push(projectile);
        this.booksFired++;
        player.attack();

        if (window.audioSystem) window.audioSystem.sfx.throw();
    }

    /**
     * Throw book at boss (auto-target)
     */
    throwBookAtBoss() {
        const player = this.player;
        const attackData = getAttackData(player.characterName);

        // Target boss
        let dx = 1, dy = 0;
        if (this.boss) {
            dx = this.boss.x - player.x;
            dy = this.boss.y - player.y;
        }

        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const speed = attackData.speed;
        const vx = (dx / dist) * speed;
        const vy = (dy / dist) * speed;

        const projectile = new Projectile(
            player.x,
            player.y,
            vx,
            vy,
            'player',
            attackData.sprite,
            attackData.color,
            1
        );

        this.projectiles.push(projectile);
        this.booksFired++;
        player.attack();

        if (window.audioSystem) window.audioSystem.sfx.throw();
    }

    /**
     * Try to interact with nearby hazards
     */
    tryInteract() {
        const player = this.player;
        const interactRadius = 25;

        for (const hazard of this.activeIssues) {
            if (hazard.fixed) continue;

            const dx = hazard.x - player.x;
            const dy = hazard.y - player.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < interactRadius) {
                hazard.fixed = true;
                this.issuesFixed++;

                // Spawn particles
                if (this.particleSystem) {
                    this.particleSystem.spawnParticleBurst(hazard.x, hazard.y, ['#22c55e', '#10b981'], 12);
                }

                if (window.audioSystem) window.audioSystem.sfx.fix();

                console.log('[Game] Hazard fixed:', hazard.name, `(${this.issuesFixed}/5)`);

                // Check if all hazards fixed
                if (this.issuesFixed >= 5) {
                    console.log('[Game] All hazards fixed! Boss encounter!');
                    setTimeout(() => this.initBossEncounter(), 1000);
                }

                break;
            }
        }
    }

    /**
     * Initialize boss encounter
     */
    initBossEncounter() {
        console.log('[Game] Initializing boss encounter...');

        // Pick random boss
        const bossData = BOSS_TYPES[Math.floor(Math.random() * BOSS_TYPES.length)];

        // Create boss near player
        const bossX = this.player.x + 100;
        const bossY = this.player.y;

        this.boss = new Boss(bossData, bossX, bossY);
        this.state = 'BOSS';

        console.log('[Game] Boss created:', this.boss.name);

        if (window.musicSystem) window.musicSystem.play('boss');
        if (window.audioSystem) window.audioSystem.sfx.bossIntro();
    }

    /**
     * Boss attack
     */
    bossAttack() {
        const boss = this.boss;
        const player = this.player;

        // Shoot 3 projectiles in a spread
        for (let i = -1; i <= 1; i++) {
            const angle = Math.atan2(player.y - boss.y, player.x - boss.x) + (i * 0.3);
            const speed = 3;

            const projectile = new Projectile(
                boss.x,
                boss.y,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed,
                'boss',
                'boss_projectile',
                '#ff0000',
                1
            );

            this.projectiles.push(projectile);
        }

        if (window.audioSystem) window.audioSystem.sfx.alert();
    }

    /**
     * Win the game
     */
    winGame() {
        console.log('[Game] Victory!');
        this.state = 'WIN';
        this.flash = 20;

        if (window.musicSystem) window.musicSystem.play('victory');

        // Show victory UI
        this.updateUI();
    }

    /**
     * Trigger game over
     */
    triggerGameOver() {
        console.log('[Game] Game Over triggered');
        this.state = 'GAMEOVER';
        this.gameOverTriggered = true;

        if (window.musicSystem) window.musicSystem.stop();
    }

    /**
     * Generate game assets
     */
    generateAssets() {
        const c = (w, h, f) => {
            const canvas = document.createElement('canvas');
            canvas.width = w;
            canvas.height = h;
            f(canvas.getContext('2d'));
            return canvas;
        };

        // Logo
        this.assets.logo = c(48, 48, ctx => {
            const grad = ctx.createLinearGradient(0, 0, 48, 48);
            grad.addColorStop(0, '#ffd700');
            grad.addColorStop(1, '#d97706');
            ctx.fillStyle = grad;
            ctx.fillRect(2, 2, 44, 44);
            ctx.strokeStyle = '#92400e';
            ctx.lineWidth = 2;
            ctx.strokeRect(2, 2, 44, 44);
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 28px monospace';
            ctx.fillText("EE", 7, 33);
        });

        // Player placeholder
        this.assets.player = c(16, 16, ctx => {
            ctx.fillStyle = '#22c55e';
            ctx.fillRect(4, 4, 8, 8);
            ctx.fillStyle = '#c4956a';
            ctx.fillRect(5, 2, 6, 4);
        });

        // Boss placeholder
        this.assets.boss = c(32, 32, ctx => {
            ctx.fillStyle = '#ff4444';
            ctx.fillRect(4, 4, 24, 24);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(10, 12, 4, 4);
            ctx.fillRect(18, 12, 4, 4);
        });

        this.assetsLoaded = true;
        console.log('[Game] Assets generated');
    }

    /**
     * Generate map
     */
    generateMap() {
        const width = GAME_CONSTANTS.MAP_W;
        const height = GAME_CONSTANTS.MAP_H;

        // Create empty map
        this.map = [];
        for (let y = 0; y < height; y++) {
            const row = [];
            for (let x = 0; x < width; x++) {
                // Walls around edge
                if (x === 0 || x === width - 1 || y === 0 || y === height - 1) {
                    row.push(1); // Wall
                }
                // Random shelving
                else if (Math.random() < 0.05 && x > 5 && y > 5) {
                    row.push(2); // Shelf
                }
                else {
                    row.push(0); // Floor
                }
            }
            this.map.push(row);
        }

        // Generate hazards
        this.activeIssues = pickRandomHazards(5, this.region);

        // Position hazards
        for (const hazard of this.activeIssues) {
            hazard.x = 50 + Math.random() * (width * GAME_CONSTANTS.TILE_SIZE - 100);
            hazard.y = 50 + Math.random() * (height * GAME_CONSTANTS.TILE_SIZE - 100);
            hazard.fixed = false;
        }

        console.log('[Game] Map generated:', width, 'x', height);
        console.log('[Game] Hazards placed:', this.activeIssues.length);
    }

    /**
     * Update UI elements
     */
    updateUI() {
        // Update HUD
        const hudLayer = document.getElementById('hud-layer');
        const lifeVal = document.getElementById('life-val');
        const scoreVal = document.getElementById('score-val');
        const regionVal = document.getElementById('region-val');

        if (hudLayer) {
            hudLayer.style.display = (this.state === 'PLAY' || this.state === 'BOSS') ? 'block' : 'none';
        }

        if (lifeVal) {
            lifeVal.textContent = '❤️'.repeat(Math.max(0, this.lives));
        }

        if (scoreVal) {
            scoreVal.textContent = `${this.issuesFixed}/5`;
        }

        if (regionVal) {
            regionVal.textContent = this.region;
        }

        // Update boss HUD
        const bossHud = document.getElementById('boss-hud');
        const bossNameEl = document.getElementById('boss-name-el');
        const bossHealthEl = document.getElementById('boss-health-el');

        if (bossHud) {
            bossHud.style.display = (this.state === 'BOSS' && this.boss) ? 'block' : 'none';
        }

        if (this.boss && bossNameEl && bossHealthEl) {
            bossNameEl.textContent = this.boss.name;
            const healthPercent = (this.boss.hp / this.boss.maxHp) * 100;
            bossHealthEl.style.width = `${healthPercent}%`;
        }
    }

    /**
     * Reset game state
     */
    reset() {
        this.state = 'PLAY';
        this.stateTimer = 0;
        this.ticks = 0;

        this.camera = { x: 0, y: 0 };

        this.projectiles = [];
        this.particles = [];
        this.floatingTexts = [];

        this.issuesFixed = 0;
        this.genId = 0;
        this.boss = null;
        this.simonHits = 0;

        this.shake = 0;
        this.flash = 0;

        this.dialogText = "";
        this.dialogVisible = "";
        this.dialogTimer = 0;

        this.gameOverTriggered = false;
        this.gameOverPhase = 0;

        this.startTime = Date.now();
        this.booksFired = 0;
        this.opsPushed = 0;
        this.lastAIBanterTime = 0;

        this.jeffTaunt = "";
        this.jeffTauntTimer = 0;

        // Regenerate map
        this.generateMap();

        // Reset player position
        if (this.player) {
            this.player.x = 100;
            this.player.y = 100;
            const charStats = getCharStats(this.selectedChar);
            this.lives = charStats.lives;
            this.player.lives = this.lives;
        }

        if (this.collisionSystem) {
            this.collisionSystem.setMap(this.map);
        }
    }

    /**
     * Generate unique ID
     */
    nextId() {
        return ++this.genId;
    }
}
