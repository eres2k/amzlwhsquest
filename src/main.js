/**
 * Main Game Entry Point - MVP Version
 * Wires all systems together and runs the game loop
 */

import { Game } from './core/Game.js';
import { ObjectPool } from './core/ObjectPool.js';
import { Player } from './entities/Player.js';
import { Boss } from './entities/Boss.js';
import { Entity } from './entities/Entity.js';
import { Projectile } from './entities/Projectile.js';
import { AssetGenerator } from './rendering/AssetGenerator.js';
import { Renderer } from './rendering/Renderer.js';
import { UIRenderer } from './rendering/UIRenderer.js';
import { AudioSystem, MusicSystem } from './systems/AudioSystem.js';
import { InputSystem } from './systems/InputSystem.js';
import { CollisionSystem } from './systems/CollisionSystem.js';
import { ParticleSystem } from './systems/ParticleSystem.js';
import { CameraSystem } from './systems/CameraSystem.js';
import { MapGenerator } from './utils/mapGenerator.js';
import { getAttackData } from './data/characters.js';
import { BOSS_TYPES, MECHA_SIMON_CONFIG } from './data/bosses.js';
import { GAME_CONSTANTS } from './constants.js';

class GameEngine {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        // Initialize core
        this.game = new Game();
        this.objectPool = new ObjectPool();

        // Initialize systems
        this.audioSystem = new AudioSystem();
        this.musicSystem = new MusicSystem();
        this.inputSystem = new InputSystem();
        this.collisionSystem = new CollisionSystem();
        this.cameraSystem = new CameraSystem();
        this.particleSystem = new ParticleSystem(this.objectPool);

        // Initialize renderers
        this.renderer = new Renderer(this.canvas);
        this.uiRenderer = new UIRenderer();

        // Generate assets
        console.log('Generating assets...');
        const assetGen = new AssetGenerator();
        this.assets = assetGen.generateAll();
        console.log('Assets generated:', Object.keys(this.assets).length, 'assets');

        // Bind methods
        this.handleAction = this.handleAction.bind(this);
        this.loop = this.loop.bind(this);
    }

    init() {
        console.log('Initializing game...');

        // Initialize audio
        this.audioSystem.init();
        this.musicSystem.init();

        // Initialize input
        this.inputSystem.init(this.handleAction);

        // Generate map
        console.log('Generating map...');
        const mapGen = new MapGenerator();
        const mapData = mapGen.generate();

        this.game.map = mapData.map;
        this.game.activeIssues = mapData.hazards;
        this.game.fireExitDoor = mapData.door;

        console.log('Map generated:', this.game.map.length, 'x', this.game.map[0].length);
        console.log('Hazards placed:', this.game.activeIssues.length);

        // Set collision map
        this.collisionSystem.setMap(this.game.map);
        this.cameraSystem.setMapSize(GAME_CONSTANTS.MAP_W, GAME_CONSTANTS.MAP_H);

        // Create player
        this.game.player = new Player(100, 100, this.game.selectedChar);
        console.log('Player created:', this.game.selectedChar);

        // Start game
        this.game.state = 'PLAY';
        this.game.startTime = Date.now();

        // Play music
        this.musicSystem.play('ingame');

        // Start game loop
        console.log('Starting game loop...');
        this.loop();
    }

    handleAction() {
        const game = this.game;

        if (game.state === 'PLAY') {
            // Try to attack
            if (game.player && game.player.canAttack()) {
                this.throwBook();
            }

            // Try to interact with hazards
            this.tryInteract();
        }
    }

    throwBook() {
        const player = this.game.player;
        const attackData = getAttackData(player.characterName);

        // Find nearest hazard or entity as target
        let targetX = player.x + 50;
        let targetY = player.y;

        // Create projectile
        const dx = targetX - player.x;
        const dy = targetY - player.y;
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

        this.game.projectiles.push(projectile);
        this.game.booksFired++;

        player.attack();
        this.audioSystem.sfx.throw();
    }

    tryInteract() {
        const player = this.game.player;
        const interactRadius = 20;

        // Check hazards
        for (const hazard of this.game.activeIssues) {
            if (hazard.fixed) continue;

            const dx = hazard.x - player.x;
            const dy = hazard.y - player.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < interactRadius) {
                hazard.fixed = true;
                this.game.issuesFixed++;

                // Spawn particles
                const colors = ['#22c55e', '#10b981', '#059669'];
                this.particleSystem.spawnParticleBurst(hazard.x, hazard.y, colors, 12);

                // Spawn floating text
                this.particleSystem.spawnFloatingText(hazard.x, hazard.y - 10, 'FIXED!', '#22c55e');

                this.audioSystem.sfx.fix();

                console.log('Hazard fixed:', hazard.name, `(${this.game.issuesFixed}/5)`);

                // Check if all hazards fixed
                if (this.game.issuesFixed >= 5) {
                    console.log('All hazards fixed! Boss encounter!');
                    setTimeout(() => this.initBossEncounter(), 1000);
                }

                break;
            }
        }
    }

    initBossEncounter() {
        console.log('Initializing boss encounter...');

        // Pick random boss
        const bossData = BOSS_TYPES[Math.floor(Math.random() * BOSS_TYPES.length)];

        // Create boss at center of map
        const bossX = (GAME_CONSTANTS.MAP_W / 2) * GAME_CONSTANTS.TILE_SIZE;
        const bossY = (GAME_CONSTANTS.MAP_H / 2) * GAME_CONSTANTS.TILE_SIZE;

        this.game.boss = new Boss(bossData, bossX, bossY);
        this.game.state = 'BOSS';

        console.log('Boss created:', this.game.boss.name);

        this.musicSystem.play('boss');
        this.audioSystem.sfx.bossIntro();
    }

    update() {
        const game = this.game;

        // Update screen effects
        if (game.shake > 0) game.shake--;
        if (game.flash > 0) game.flash--;

        // Update based on state
        if (game.state === 'PLAY' || game.state === 'BOSS') {
            // Update player
            if (game.player) {
                game.player.update(this.inputSystem, this.collisionSystem);
            }

            // Update projectiles
            this.updateProjectiles();

            // Update boss
            if (game.state === 'BOSS' && game.boss) {
                game.boss.update(game.player.x, game.player.y);

                // Boss attacks
                if (game.boss.canAttack()) {
                    this.bossAttack();
                    game.boss.resetAttackTimer();
                }
            }

            // Update particles
            this.particleSystem.update();

            // Update camera
            if (game.player) {
                this.cameraSystem.update(game.player.x, game.player.y);
                game.camera.x = this.cameraSystem.x;
                game.camera.y = this.cameraSystem.y;
            }
        } else if (game.state === 'BOSS_TRANSFORM') {
            // Update boss transformation sequence
            this.updateBossTransformation();

            // Still update boss animation
            if (game.boss) {
                game.boss.update(game.player.x, game.player.y);
            }

            // Update particles for visual effects
            this.particleSystem.update();
        }

        game.ticks++;
    }

    updateProjectiles() {
        const game = this.game;
        const writeIdx = [];

        for (const proj of game.projectiles) {
            proj.update();

            // Check if offscreen
            if (proj.isOffscreen(GAME_CONSTANTS.SCREEN_WIDTH, GAME_CONSTANTS.SCREEN_HEIGHT, game.camera.x, game.camera.y)) {
                proj.deactivate();
                continue;
            }

            // Check player projectile hits boss
            if (proj.owner === 'player' && game.boss && game.state === 'BOSS') {
                const dx = proj.x - game.boss.x;
                const dy = proj.y - game.boss.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 20) {
                    const damage = proj.damage * game.player.getDamageMultiplier();
                    game.boss.takeDamage(damage);

                    this.audioSystem.sfx.bossHit();
                    this.particleSystem.spawnParticleBurst(proj.x, proj.y, ['#ff0000', '#ff4444'], 8);
                    this.particleSystem.spawnFloatingText(proj.x, proj.y - 10, '-' + damage, '#ff0000');

                    game.shake = 5;

                    console.log('Boss hit! HP:', game.boss.hp, '/', game.boss.maxHp);

                    if (game.boss.hp <= 0 && !game.boss.transformTriggered) {
                        console.log('Boss defeated - triggering transformation!');
                        this.triggerBossTransformation();
                    } else if (game.boss.hp <= 0 && game.boss.transformTriggered) {
                        console.log('Mecha Boss defeated!');
                        this.winGame();
                    }

                    proj.deactivate();
                    continue;
                }
            }

            // Check boss projectile hits player
            if (proj.owner === 'boss' && game.player) {
                const dx = proj.x - game.player.x;
                const dy = proj.y - game.player.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < game.player.getCollisionRadius()) {
                    if (game.player.takeDamage()) {
                        this.audioSystem.sfx.hurt();
                        this.particleSystem.spawnParticleBurst(game.player.x, game.player.y, ['#ff0000'], 12);
                        game.shake = 8;

                        console.log('Player hit! Lives:', game.player.lives);

                        if (!game.player.isAlive()) {
                            console.log('Game Over!');
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

        game.projectiles = writeIdx;
    }

    bossAttack() {
        const boss = this.game.boss;
        const player = this.game.player;

        // Simple attack: shoot 3 projectiles in a spread
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

            this.game.projectiles.push(projectile);
        }

        this.audioSystem.sfx.alert();
    }

    triggerBossTransformation() {
        console.log('Starting boss transformation sequence...');

        // Prevent boss from taking more damage during transformation
        this.game.boss.hp = 1; // Keep boss "alive" during transformation

        // Start transformation sequence
        this.game.bossTransformationState = 'surprise';
        this.game.transformationTimer = 0;
        this.game.state = 'BOSS_TRANSFORM';
    }

    updateBossTransformation() {
        const game = this.game;
        const boss = game.boss;

        game.transformationTimer++;

        // Typewriter effect for dialogue
        if (game.dialogText && game.dialogVisible.length < game.dialogText.length) {
            if (game.transformationTimer % 2 === 0) { // Add one character every 2 frames
                game.dialogVisible = game.dialogText.substring(0, game.dialogVisible.length + 1);
            }
        }

        if (game.bossTransformationState === 'surprise') {
            // Phase 1: Player surprised how easy the fight was
            if (game.transformationTimer === 1) {
                console.log('[Transform] Phase 1: Player surprised');
                game.dialogText = "That was... surprisingly easy?";
                game.dialogSpeaker = game.player.character || "Player";
                game.dialogVisible = "";
                game.dialogTimer = 0;
            }

            // Wait for dialogue (about 2 seconds at 60fps = 120 frames)
            if (game.transformationTimer > 120) {
                game.bossTransformationState = 'reveal';
                game.transformationTimer = 0;
                game.dialogText = "";
                game.dialogVisible = "";
            }
        } else if (game.bossTransformationState === 'reveal') {
            // Phase 2: Simon mentions his true form
            if (game.transformationTimer === 1) {
                console.log('[Transform] Phase 2: Simon reveals true form');
                game.dialogText = "You fool... That wasn't even my final form! BEHOLD MY TRUE POWER!";
                game.dialogSpeaker = "Simon Unglaube";
                game.dialogVisible = "";
                game.dialogTimer = 0;

                // Start health bar animation from 0 to max HP
                boss.animateHealthBarTo(boss.maxHp);

                // Visual effects
                game.shake = 15;
                game.flash = 10;
                this.particleSystem.spawnParticleBurst(boss.x, boss.y, ['#ff0000', '#ff4444', '#ff8800'], 30);
            }

            // Wait for dialogue and health bar animation (about 3 seconds = 180 frames)
            if (game.transformationTimer > 180) {
                game.bossTransformationState = 'animating';
                game.transformationTimer = 0;
                game.dialogText = "";
                game.dialogVisible = "";
            }
        } else if (game.bossTransformationState === 'animating') {
            // Phase 3: Health bar animating to 100%
            if (game.transformationTimer === 1) {
                console.log('[Transform] Phase 3: Animating health bar to 100%');
                boss.animateHealthBarTo(MECHA_SIMON_CONFIG.hp);
            }

            // Continuous visual effects during transformation
            if (game.transformationTimer % 10 === 0) {
                this.particleSystem.spawnParticleBurst(boss.x, boss.y, ['#ff0000', '#ffaa00', '#ff00ff'], 20);
                game.shake = 3;
            }

            // Wait for health bar animation to complete (about 2 seconds = 120 frames)
            if (game.transformationTimer > 120 && !boss.healthBarAnimating) {
                game.bossTransformationState = 'transformed';
                game.transformationTimer = 0;
            }
        } else if (game.bossTransformationState === 'transformed') {
            // Phase 4: Transform boss to Mecha Mega Simon
            if (game.transformationTimer === 1) {
                console.log('[Transform] Phase 4: Transforming to Mecha Mega Simon');

                // Transform the boss
                boss.transformToMecha(MECHA_SIMON_CONFIG);

                // Massive visual effect
                game.shake = 20;
                game.flash = 15;
                this.particleSystem.spawnParticleBurst(boss.x, boss.y, ['#ff0000', '#ffaa00', '#ff00ff', '#0088ff'], 50);

                // Play boss intro sound again
                this.audioSystem.sfx.bossIntro();
            }

            // Wait a moment then return to boss fight
            if (game.transformationTimer > 60) {
                console.log('[Transform] Transformation complete - returning to boss fight!');
                game.bossTransformationState = null;
                game.transformationTimer = 0;
                game.state = 'BOSS';
                game.dialogText = "";
            }
        }
    }

    winGame() {
        console.log('Victory!');
        this.game.state = 'WIN';
        this.musicSystem.play('victory');
        this.game.flash = 20;

        // Show victory message
        setTimeout(() => {
            alert('Victory! You defeated the boss!');
            this.resetGame();
        }, 2000);
    }

    triggerGameOver() {
        console.log('Game Over triggered');
        this.game.state = 'GAMEOVER';
        this.musicSystem.stop();

        setTimeout(() => {
            alert('Game Over! You were eliminated.');
            this.resetGame();
        }, 2000);
    }

    resetGame() {
        console.log('Resetting game...');
        this.game.reset();
        this.objectPool.reset();
        this.particleSystem.reset();
        this.init();
    }

    draw() {
        // Render game world
        this.renderer.draw(this.game, this.assets, this.particleSystem);

        // Update UI
        this.uiRenderer.update(this.game);
    }

    loop() {
        this.update();
        this.draw();
        requestAnimationFrame(this.loop);
    }
}

// Start game when page loads
console.log('Game script loaded');
window.addEventListener('load', () => {
    console.log('Page loaded, starting game...');
    const engine = new GameEngine();
    engine.init();
});
