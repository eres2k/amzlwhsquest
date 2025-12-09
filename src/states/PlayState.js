/**
 * PlayState.js
 * Main gameplay state - warehouse floor exploration
 */

import { State } from '../core/StateMachine.js';

export class PlayState extends State {
    constructor(game) {
        super(game);
        this.player = null;
        this.entities = [];
        this.projectiles = [];
        this.particles = [];
        this.floatingTexts = [];
        this.activeIssues = [];
        this.issuesFixed = 0;
        this.inputState = {};
    }

    onEnter(params) {
        console.log('[PlayState] Entering play state');

        // Initialize player
        this.initializePlayer(params.character || 'Carrie');

        // Generate map
        this.generateMap();

        // Spawn entities
        this.spawnEntities();

        // Setup input
        this.setupInput();

        // Start music
        if (this.game.audio) {
            this.game.audio.getMusic().play('ingame');
        }
    }

    initializePlayer(characterName) {
        const characterData = this.game.characters ? this.game.characters[characterName] : null;

        this.player = {
            x: 480,
            y: 352,
            vx: 0,
            vy: 0,
            speed: characterData?.speed || 1.5,
            character: characterName,
            dir: 0,
            cooldown: 0,
            maxCooldown: characterData?.attackCooldown || 120,
            iframe: 0,
            lives: characterData?.lives || 5,
            invulnerable: false,
            hitbox: { width: 14, height: 14 }
        };
    }

    generateMap() {
        if (this.game.mapGenerator) {
            const mapData = this.game.mapGenerator.generate({
                layout: 'warehouse',
                difficulty: 'normal'
            });

            this.game.map = mapData.tiles;
            this.game.conveyorBelts = mapData.conveyorBelts;
            this.game.packages = mapData.packages;
            this.game.palletStacks = mapData.palletStacks;
            this.game.cartWorkers = mapData.cartWorkers;
            this.game.clutter = mapData.clutter;
            this.activeIssues = mapData.hazardSpawns;
        }
    }

    spawnEntities() {
        // Spawn runner NPCs
        for (let i = 0; i < 2; i++) {
            this.spawnEntity('runner');
        }

        // Spawn ops managers
        for (let i = 0; i < 8; i++) {
            this.spawnEntity('ops');
        }

        // Spawn associates
        for (let i = 0; i < 10; i++) {
            this.spawnEntity('assoc');
        }
    }

    spawnEntity(type) {
        const pos = this.getRandomFloorTile();
        this.entities.push({
            type: type,
            x: pos.x * this.game.tileSize,
            y: pos.y * this.game.tileSize,
            dir: 0,
            timer: 0,
            speed: type === 'runner' ? 1.0 : 0.5
        });
    }

    getRandomFloorTile() {
        if (this.game.mapGenerator) {
            return this.game.mapGenerator.getRandomWalkableTile(this.game.map);
        }

        // Fallback
        let x, y;
        do {
            x = Math.floor(Math.random() * 58) + 1;
            y = Math.floor(Math.random() * 38) + 1;
        } while (this.game.map[y][x] !== 0);

        return { x, y };
    }

    setupInput() {
        this.inputState = {
            up: false,
            down: false,
            left: false,
            right: false,
            attack: false
        };
    }

    onUpdate(deltaTime) {
        super.onUpdate(deltaTime);

        // Update player
        this.updatePlayer(deltaTime);

        // Update entities
        this.updateEntities(deltaTime);

        // Update projectiles
        this.updateProjectiles(deltaTime);

        // Update particles
        this.updateParticles(deltaTime);

        // Update floating texts
        this.updateFloatingTexts(deltaTime);

        // Check win condition
        if (this.issuesFixed >= 5) {
            this.changeState('BOSS_INTRO');
        }
    }

    updatePlayer(deltaTime) {
        const p = this.player;

        // Update cooldown
        if (p.cooldown > 0) p.cooldown--;

        // Update iframe
        if (p.iframe > 0) p.iframe--;

        // Movement
        let dx = 0, dy = 0;
        if (this.inputState.left) dx -= 1;
        if (this.inputState.right) dx += 1;
        if (this.inputState.up) dy -= 1;
        if (this.inputState.down) dy += 1;

        // Normalize diagonal movement
        if (dx !== 0 && dy !== 0) {
            dx *= 0.707;
            dy *= 0.707;
        }

        p.vx = dx * p.speed;
        p.vy = dy * p.speed;

        // Apply movement
        const newX = p.x + p.vx;
        const newY = p.y + p.vy;

        // Collision detection
        if (this.canMoveTo(newX, p.y)) {
            p.x = newX;
        }
        if (this.canMoveTo(p.x, newY)) {
            p.y = newY;
        }

        // Direction
        if (dx !== 0 || dy !== 0) {
            p.dir = Math.atan2(dy, dx);
        }

        // Attack
        if (this.inputState.attack && p.cooldown <= 0) {
            this.throwBook();
            p.cooldown = p.maxCooldown;
        }

        // Collision with hazards
        this.checkHazardCollisions();
    }

    canMoveTo(x, y) {
        if (!this.game.map) return true;

        const tx = Math.floor(x / this.game.tileSize);
        const ty = Math.floor(y / this.game.tileSize);

        if (ty < 0 || ty >= this.game.map.length) return false;
        if (tx < 0 || tx >= this.game.map[0].length) return false;

        const tile = this.game.map[ty][tx];
        return tile === 0 || tile === 2; // Floor or conveyor
    }

    throwBook() {
        const p = this.player;
        const speed = 4.5;

        this.projectiles.push({
            x: p.x,
            y: p.y,
            vx: Math.cos(p.dir) * speed,
            vy: Math.sin(p.dir) * speed,
            character: p.character,
            damage: 1,
            active: true
        });

        // Play throw sound
        if (this.game.audio) {
            this.game.audio.getSFX().throw();
        }
    }

    checkHazardCollisions() {
        if (this.player.iframe > 0) return;

        const p = this.player;
        const hazardRadius = 16;

        for (const issue of this.activeIssues) {
            if (issue.fixed) continue;

            const dx = p.x - issue.x;
            const dy = p.y - issue.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < hazardRadius) {
                // Can fix with space
                if (this.inputState.attack) {
                    issue.fixed = true;
                    this.issuesFixed++;
                    this.spawnParticleBurst(issue.x, issue.y, '#22c55e');
                    this.spawnFloatingText(issue.x, issue.y, 'FIXED!', '#22c55e');

                    // Play fix sound
                    if (this.game.audio) {
                        this.game.audio.getSFX().fix();
                    }
                }
            }
        }
    }

    updateEntities(deltaTime) {
        this.entities.forEach(entity => {
            entity.timer += deltaTime;

            // Simple AI - random movement
            if (entity.timer > 2000) {
                entity.dir = Math.random() * Math.PI * 2;
                entity.timer = 0;
            }

            const dx = Math.cos(entity.dir) * entity.speed * 0.5;
            const dy = Math.sin(entity.dir) * entity.speed * 0.5;

            if (this.canMoveTo(entity.x + dx, entity.y + dy)) {
                entity.x += dx;
                entity.y += dy;
            } else {
                entity.dir = Math.random() * Math.PI * 2;
            }
        });
    }

    updateProjectiles(deltaTime) {
        this.projectiles = this.projectiles.filter(proj => {
            if (!proj.active) return false;

            proj.x += proj.vx;
            proj.y += proj.vy;

            // Check bounds
            if (proj.x < 0 || proj.x > 960 || proj.y < 0 || proj.y > 640) {
                return false;
            }

            // Check wall collision
            if (!this.canMoveTo(proj.x, proj.y)) {
                this.spawnParticleBurst(proj.x, proj.y, '#ffffff');
                return false;
            }

            return true;
        });
    }

    updateParticles(deltaTime) {
        this.particles = this.particles.filter(p => {
            if (!p.active) return false;

            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // Gravity
            p.life--;

            p.alpha = p.life / p.maxLife;

            return p.life > 0;
        });
    }

    updateFloatingTexts(deltaTime) {
        this.floatingTexts = this.floatingTexts.filter(t => {
            if (!t.active) return false;

            t.y -= 0.5;
            t.life--;
            t.alpha = t.life / t.maxLife;

            return t.life > 0;
        });
    }

    spawnParticleBurst(x, y, color) {
        for (let i = 0; i < 10; i++) {
            const angle = (Math.PI * 2 / 10) * i;
            const speed = 2 + Math.random();

            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: color,
                life: 30,
                maxLife: 30,
                alpha: 1,
                active: true
            });
        }
    }

    spawnFloatingText(x, y, text, color) {
        this.floatingTexts.push({
            x: x,
            y: y,
            text: text,
            color: color,
            life: 60,
            maxLife: 60,
            alpha: 1,
            active: true
        });
    }

    onRender(context) {
        // Rendering is handled by renderer classes
        // This is called by the renderer system
    }

    onInput(event) {
        if (event.type === 'keydown') {
            this.handleKeyDown(event.key);
        } else if (event.type === 'keyup') {
            this.handleKeyUp(event.key);
        }
    }

    handleKeyDown(key) {
        switch(key.toLowerCase()) {
            case 'w':
            case 'arrowup':
                this.inputState.up = true;
                break;
            case 's':
            case 'arrowdown':
                this.inputState.down = true;
                break;
            case 'a':
            case 'arrowleft':
                this.inputState.left = true;
                break;
            case 'd':
            case 'arrowright':
                this.inputState.right = true;
                break;
            case ' ':
                this.inputState.attack = true;
                break;
            case 'escape':
                this.pushState('PAUSE');
                break;
        }
    }

    handleKeyUp(key) {
        switch(key.toLowerCase()) {
            case 'w':
            case 'arrowup':
                this.inputState.up = false;
                break;
            case 's':
            case 'arrowdown':
                this.inputState.down = false;
                break;
            case 'a':
            case 'arrowleft':
                this.inputState.left = false;
                break;
            case 'd':
            case 'arrowright':
                this.inputState.right = false;
                break;
            case ' ':
                this.inputState.attack = false;
                break;
        }
    }

    onExit() {
        console.log('[PlayState] Exiting play state');
    }
}

export default PlayState;
