/**
 * Asset Generator - MVP Version with Placeholder Sprites
 * Creates simple colored shapes instead of detailed pixel art
 * This allows testing the game architecture without spending hours on sprite extraction
 */

export class AssetGenerator {
    constructor() {
        this.assets = {};
    }

    generateAll() {
        this.generateLogo();
        this.generateCharacters();
        this.generateBosses();
        this.generateProjectiles();
        this.generateHazards();
        this.generateUI();
        return this.assets;
    }

    // Helper: Create canvas with drawing function
    createCanvas(w, h, drawFn) {
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        drawFn(ctx);
        return canvas;
    }

    // Helper: Create simple colored rectangle
    createRect(w, h, color) {
        return this.createCanvas(w, h, ctx => {
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, w, h);
            // Add border for visibility
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 1;
            ctx.strokeRect(0, 0, w, h);
        });
    }

    // Helper: Create circle
    createCircle(radius, color) {
        const size = radius * 2;
        return this.createCanvas(size, size, ctx => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(radius, radius, radius, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    generateLogo() {
        this.assets.logo = this.createCanvas(48, 48, ctx => {
            // Simple gradient box
            const grad = ctx.createLinearGradient(0, 0, 48, 48);
            grad.addColorStop(0, '#ffd700');
            grad.addColorStop(1, '#ff9900');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 48, 48);
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
            ctx.strokeRect(0, 0, 48, 48);
            // Text
            ctx.fillStyle = '#000';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('WHS', 24, 32);
        });
    }

    generateCharacters() {
        // Each character gets a unique color
        const characterColors = {
            'Carrie': '#a855f7',    // Purple
            'Nevena': '#ef4444',    // Red
            'Joao': '#f97316',      // Orange
            'Roman': '#64748b',     // Gray
            'Erwin': '#22d3ee'      // Cyan
        };

        this.assets.chars = {};
        for (const [name, color] of Object.entries(characterColors)) {
            this.assets.chars[name] = this.createCanvas(16, 16, ctx => {
                // Body
                ctx.fillStyle = color;
                ctx.fillRect(2, 4, 12, 12);
                // Head
                ctx.fillStyle = '#d4a574'; // Skin tone
                ctx.fillRect(4, 2, 8, 6);
                // Eyes
                ctx.fillStyle = '#000';
                ctx.fillRect(5, 4, 2, 2);
                ctx.fillRect(9, 4, 2, 2);
                // Border
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 1;
                ctx.strokeRect(2, 2, 12, 14);
            });
        }
    }

    generateBosses() {
        // Simple boss sprites - larger colored rectangles
        const bossSprites = [
            'boss_inspector', 'boss_compliance', 'boss_sebastian',
            'boss_regional', 'boss_avetta', 'boss_jelly',
            'mega_simon', 'mecha_simon', 'mecha_bezos'
        ];

        bossSprites.forEach((sprite, i) => {
            const color = ['#dc2626', '#f59e0b', '#f97316', '#8b5cf6', '#06b6d4', '#ec4899', '#991b1b', '#450a0a', '#1e3a8a'][i] || '#ff0000';
            this.assets[sprite] = this.createCanvas(32, 32, ctx => {
                // Boss body
                ctx.fillStyle = color;
                ctx.fillRect(4, 4, 24, 24);
                // Eyes (angry)
                ctx.fillStyle = '#fff';
                ctx.fillRect(8, 12, 4, 4);
                ctx.fillRect(20, 12, 4, 4);
                ctx.fillStyle = '#f00';
                ctx.fillRect(9, 13, 2, 2);
                ctx.fillRect(21, 13, 2, 2);
                // Border
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 2;
                ctx.strokeRect(4, 4, 24, 24);
            });
        });

        // Simon face for dialog
        this.assets.simonFace = this.createCanvas(32, 32, ctx => {
            ctx.fillStyle = '#d4a574';
            ctx.fillRect(4, 4, 24, 24);
            ctx.fillStyle = '#000';
            ctx.fillRect(10, 12, 4, 4);
            ctx.fillRect(18, 12, 4, 4);
            ctx.fillRect(12, 20, 8, 2);
        });
    }

    generateProjectiles() {
        // Player projectile attacks
        const attackColors = {
            'attack_carrie': '#a855f7',
            'attack_nevena': '#0ea5e9',
            'attack_joao': '#f97316',
            'attack_roman': '#94a3b8',
            'attack_erwin': '#22d3ee',
            'book': '#00ffff'
        };

        for (const [name, color] of Object.entries(attackColors)) {
            this.assets[name] = this.createCircle(6, color);
        }

        // Boss projectiles
        this.assets.boss_projectile = this.createCircle(5, '#ff0000');
    }

    generateHazards() {
        // Different hazard types get different colors/shapes
        const hazardTypes = {
            'forklift': '#fbbf24',
            'conveyor': '#6b7280',
            'box': '#92400e',
            'spill': '#22c55e',
            'blade': '#ef4444',
            'tote': '#3b82f6',
            'cart': '#f59e0b',
            'door': '#dc2626',
            'npc': '#8b5cf6',
            'compliance': '#ec4899'
        };

        for (const [type, color] of Object.entries(hazardTypes)) {
            this.assets[`hazard_${type}`] = this.createRect(16, 16, color);
        }

        // Generic hazard
        this.assets.hazard = this.createRect(16, 16, '#ff9900');
    }

    generateUI() {
        // Health heart
        this.assets.heart = this.createCanvas(8, 8, ctx => {
            ctx.fillStyle = '#ef4444';
            ctx.fillRect(1, 2, 6, 5);
            ctx.fillRect(2, 1, 2, 1);
            ctx.fillRect(4, 1, 2, 1);
            ctx.fillRect(2, 7, 4, 1);
        });

        // Exclamation mark for hazard
        this.assets.exclamation = this.createCanvas(8, 8, ctx => {
            ctx.fillStyle = '#fbbf24';
            ctx.fillRect(3, 1, 2, 5);
            ctx.fillRect(3, 7, 2, 1);
        });

        // Door/exit
        this.assets.door = this.createCanvas(16, 16, ctx => {
            ctx.fillStyle = '#22c55e';
            ctx.fillRect(2, 0, 12, 16);
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
            ctx.strokeRect(2, 0, 12, 16);
            // Door handle
            ctx.fillStyle = '#fbbf24';
            ctx.fillRect(10, 8, 2, 2);
        });

        // Floor tile
        this.assets.floor = this.createRect(16, 16, '#1f2937');

        // Wall tile
        this.assets.wall = this.createRect(16, 16, '#475569');

        // Clutter items
        this.assets.clutter_coffee = this.createCircle(4, '#92400e');
        this.assets.clutter_paper = this.createRect(8, 8, '#f3f4f6');
        this.assets.clutter_tape = this.createRect(6, 6, '#fbbf24');
    }
}
