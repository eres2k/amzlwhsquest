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
        this.generateEnvironmentAssets();
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

        // Door/exit (fire exit green)
        this.assets.door = this.createCanvas(16, 16, ctx => {
            ctx.fillStyle = '#15803d';
            ctx.fillRect(0, 0, 16, 16);
            ctx.fillStyle = '#22c55e';
            ctx.fillRect(2, 2, 12, 12);
            ctx.fillStyle = '#fff';
            ctx.font = '6px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('EXIT', 8, 10);
        });

        // Warehouse concrete floor tile
        this.assets.floor = this.createCanvas(16, 16, ctx => {
            ctx.fillStyle = '#3a3f4a';
            ctx.fillRect(0, 0, 16, 16);
            ctx.fillStyle = '#424750';
            ctx.fillRect(2, 2, 4, 4);
            ctx.fillRect(10, 8, 3, 3);
            ctx.strokeStyle = '#4a5058';
            ctx.lineWidth = 1;
            ctx.strokeRect(0, 0, 16, 16);
        });

        // Industrial shelf/wall tile (orange Amazon racking with packages)
        this.assets.wall = this.createCanvas(16, 16, ctx => {
            // Metal shelf frame (orange Amazon-style)
            ctx.fillStyle = '#c2410c';
            ctx.fillRect(0, 0, 16, 16);
            ctx.fillStyle = '#ea580c';
            ctx.fillRect(1, 0, 2, 16);
            ctx.fillRect(13, 0, 2, 16);
            ctx.fillRect(0, 1, 16, 2);
            ctx.fillRect(0, 7, 16, 2);
            ctx.fillRect(0, 13, 16, 2);
            ctx.fillStyle = '#fb923c';
            ctx.fillRect(1, 0, 1, 16);
            ctx.fillRect(13, 0, 1, 16);
            // Packages
            ctx.fillStyle = '#92400e';
            ctx.fillRect(3, 3, 5, 3);
            ctx.fillStyle = '#a3520f';
            ctx.fillRect(9, 3, 4, 4);
            ctx.fillStyle = '#78350f';
            ctx.fillRect(4, 9, 4, 3);
            ctx.fillStyle = '#92400e';
            ctx.fillRect(9, 10, 3, 2);
        });

        // Clutter items
        this.assets.clutter_coffee = this.createCircle(4, '#92400e');
        this.assets.clutter_paper = this.createRect(8, 8, '#f3f4f6');
        this.assets.clutter_tape = this.createRect(6, 6, '#fbbf24');
    }

    generateEnvironmentAssets() {
        this.assets.environment = {};

        // Warehouse concrete floor tile
        this.assets.environment.floor = this.createCanvas(16, 16, ctx => {
            ctx.fillStyle = '#3a3f4a';
            ctx.fillRect(0, 0, 16, 16);
            ctx.fillStyle = '#424750';
            ctx.fillRect(2, 2, 4, 4);
            ctx.fillRect(10, 8, 3, 3);
            ctx.fillRect(5, 11, 4, 3);
            ctx.strokeStyle = '#4a5058';
            ctx.lineWidth = 1;
            ctx.strokeRect(0, 0, 16, 16);
            ctx.fillStyle = '#32363d';
            ctx.fillRect(8, 3, 2, 1);
            ctx.fillRect(3, 9, 1, 2);
        });

        // Industrial warehouse wall/shelf racking
        this.assets.environment.wall = this.createCanvas(16, 16, ctx => {
            ctx.fillStyle = '#c2410c';
            ctx.fillRect(0, 0, 16, 16);
            ctx.fillStyle = '#ea580c';
            ctx.fillRect(1, 0, 2, 16);
            ctx.fillRect(13, 0, 2, 16);
            ctx.fillRect(0, 1, 16, 2);
            ctx.fillRect(0, 7, 16, 2);
            ctx.fillRect(0, 13, 16, 2);
            ctx.fillStyle = '#fb923c';
            ctx.fillRect(1, 0, 1, 16);
            ctx.fillRect(13, 0, 1, 16);
            ctx.fillStyle = '#92400e';
            ctx.fillRect(3, 3, 5, 3);
            ctx.fillStyle = '#a3520f';
            ctx.fillRect(9, 3, 4, 4);
            ctx.fillStyle = '#78350f';
            ctx.fillRect(4, 9, 4, 3);
            ctx.fillStyle = '#92400e';
            ctx.fillRect(9, 10, 3, 2);
        });

        // Conveyor belt
        this.assets.environment.conveyor = this.createCanvas(16, 16, ctx => {
            ctx.fillStyle = '#1f2937';
            ctx.fillRect(0, 0, 16, 16);
            ctx.fillStyle = '#374151';
            ctx.fillRect(1, 2, 14, 12);
            ctx.fillStyle = '#4b5563';
            for (let i = 0; i < 4; i++) {
                ctx.fillRect(2 + i * 4, 4, 2, 8);
            }
            ctx.fillStyle = '#f59e0b';
            ctx.beginPath();
            ctx.moveTo(4, 8);
            ctx.lineTo(8, 5);
            ctx.lineTo(8, 11);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(9, 8);
            ctx.lineTo(13, 5);
            ctx.lineTo(13, 11);
            ctx.closePath();
            ctx.fill();
        });

        // Floor with safety markings
        this.assets.environment.floorMarked = this.createCanvas(16, 16, ctx => {
            ctx.fillStyle = '#3a3f4a';
            ctx.fillRect(0, 0, 16, 16);
            ctx.fillStyle = '#424750';
            ctx.fillRect(2, 2, 4, 4);
            ctx.fillStyle = '#f59e0b';
            ctx.fillRect(0, 7, 16, 2);
        });

        // Floor with pedestrian crossing
        this.assets.environment.floorCrossing = this.createCanvas(16, 16, ctx => {
            ctx.fillStyle = '#3a3f4a';
            ctx.fillRect(0, 0, 16, 16);
            ctx.fillStyle = '#f59e0b';
            ctx.fillRect(1, 0, 3, 16);
            ctx.fillRect(6, 0, 3, 16);
            ctx.fillRect(11, 0, 3, 16);
        });

        // Shelf with boxes (variant 1)
        this.assets.environment.shelfBoxes1 = this.createCanvas(16, 16, ctx => {
            ctx.fillStyle = '#c2410c';
            ctx.fillRect(0, 0, 16, 16);
            ctx.fillStyle = '#ea580c';
            ctx.fillRect(0, 0, 2, 16);
            ctx.fillRect(14, 0, 2, 16);
            ctx.fillRect(0, 7, 16, 2);
            ctx.fillStyle = '#92400e';
            ctx.fillRect(2, 1, 5, 5);
            ctx.fillStyle = '#a16207';
            ctx.fillRect(8, 2, 5, 4);
            ctx.fillStyle = '#f59e0b';
            ctx.fillRect(3, 4, 3, 1);
            ctx.fillRect(9, 4, 3, 1);
            ctx.fillStyle = '#78350f';
            ctx.fillRect(3, 9, 4, 5);
            ctx.fillStyle = '#92400e';
            ctx.fillRect(8, 10, 5, 4);
        });

        // Shelf with boxes (variant 2 - totes)
        this.assets.environment.shelfBoxes2 = this.createCanvas(16, 16, ctx => {
            ctx.fillStyle = '#c2410c';
            ctx.fillRect(0, 0, 16, 16);
            ctx.fillStyle = '#ea580c';
            ctx.fillRect(0, 0, 2, 16);
            ctx.fillRect(14, 0, 2, 16);
            ctx.fillRect(0, 7, 16, 2);
            ctx.fillStyle = '#ca8a04';
            ctx.fillRect(2, 1, 5, 5);
            ctx.fillStyle = '#eab308';
            ctx.fillRect(3, 2, 3, 3);
            ctx.fillStyle = '#ca8a04';
            ctx.fillRect(8, 2, 5, 4);
            ctx.fillStyle = '#1e40af';
            ctx.fillRect(3, 9, 4, 5);
            ctx.fillStyle = '#2563eb';
            ctx.fillRect(4, 10, 2, 3);
            ctx.fillStyle = '#1e40af';
            ctx.fillRect(8, 10, 5, 4);
        });

        // Empty shelf
        this.assets.environment.shelfEmpty = this.createCanvas(16, 16, ctx => {
            ctx.fillStyle = '#c2410c';
            ctx.fillRect(0, 0, 16, 16);
            ctx.fillStyle = '#ea580c';
            ctx.fillRect(0, 0, 2, 16);
            ctx.fillRect(14, 0, 2, 16);
            ctx.fillRect(0, 3, 16, 1);
            ctx.fillRect(0, 7, 16, 1);
            ctx.fillRect(0, 11, 16, 1);
            ctx.fillStyle = '#fb923c';
            ctx.fillRect(0, 0, 1, 16);
            ctx.fillRect(14, 0, 1, 16);
            ctx.fillStyle = '#1f2937';
            ctx.fillRect(2, 1, 12, 2);
            ctx.fillRect(2, 4, 12, 3);
            ctx.fillRect(2, 8, 12, 3);
            ctx.fillRect(2, 12, 12, 4);
        });

        // Pallet on floor
        this.assets.environment.pallet = this.createCanvas(16, 16, ctx => {
            ctx.fillStyle = '#3a3f4a';
            ctx.fillRect(0, 0, 16, 16);
            ctx.fillStyle = '#92400e';
            ctx.fillRect(1, 10, 14, 5);
            ctx.fillStyle = '#a16207';
            ctx.fillRect(2, 11, 4, 3);
            ctx.fillRect(7, 11, 4, 3);
            ctx.fillStyle = '#78350f';
            ctx.fillRect(1, 14, 14, 1);
            ctx.fillStyle = '#78350f';
            ctx.fillRect(2, 2, 12, 8);
            ctx.fillStyle = '#92400e';
            ctx.fillRect(3, 3, 10, 6);
            ctx.fillStyle = '#f59e0b';
            ctx.fillRect(7, 2, 2, 8);
        });

        // DVI1 Sign
        this.assets.environment.signDVI1 = this.createCanvas(32, 16, ctx => {
            ctx.fillStyle = '#1f2937';
            ctx.fillRect(0, 0, 32, 16);
            ctx.fillStyle = '#374151';
            ctx.fillRect(1, 1, 30, 14);
            ctx.strokeStyle = '#f59e0b';
            ctx.lineWidth = 2;
            ctx.strokeRect(2, 2, 28, 12);
            ctx.fillStyle = '#f59e0b';
            ctx.font = 'bold 10px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('DVI1', 16, 12);
        });

        // Amazon logo sign
        this.assets.environment.signAmazon = this.createCanvas(32, 16, ctx => {
            ctx.fillStyle = '#232f3e';
            ctx.fillRect(0, 0, 32, 16);
            ctx.fillStyle = '#ff9900';
            ctx.font = 'bold 8px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('amazon', 16, 9);
            ctx.strokeStyle = '#ff9900';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(8, 12);
            ctx.quadraticCurveTo(16, 15, 24, 11);
            ctx.stroke();
            ctx.fillStyle = '#ff9900';
            ctx.beginPath();
            ctx.moveTo(24, 11);
            ctx.lineTo(22, 9);
            ctx.lineTo(23, 13);
            ctx.closePath();
            ctx.fill();
        });

        // Austria location sign
        this.assets.environment.signAustria = this.createCanvas(32, 16, ctx => {
            ctx.fillStyle = '#ed1c24';
            ctx.fillRect(0, 0, 32, 5);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 5, 32, 6);
            ctx.fillStyle = '#ed1c24';
            ctx.fillRect(0, 11, 32, 5);
            ctx.fillStyle = '#1f2937';
            ctx.fillRect(4, 4, 24, 8);
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 6px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('AUSTRIA', 16, 10);
        });

        // Zone marker signs
        const zones = ['INBOUND', 'OUTBOUND', 'PICKING', 'PACKING', 'SHIPPING'];
        zones.forEach(zone => {
            this.assets.environment[`sign${zone}`] = this.createCanvas(32, 12, ctx => {
                ctx.fillStyle = '#1e40af';
                ctx.fillRect(0, 0, 32, 12);
                ctx.fillStyle = '#3b82f6';
                ctx.fillRect(1, 1, 30, 10);
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 6px monospace';
                ctx.textAlign = 'center';
                ctx.fillText(zone, 16, 8);
            });
        });

        // Safety sign
        this.assets.environment.signSafety = this.createCanvas(16, 16, ctx => {
            ctx.fillStyle = '#f59e0b';
            ctx.beginPath();
            ctx.moveTo(8, 1);
            ctx.lineTo(15, 14);
            ctx.lineTo(1, 14);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.fillStyle = '#000';
            ctx.fillRect(7, 5, 2, 5);
            ctx.fillRect(7, 11, 2, 2);
        });

        // Aisle markers (A1-D4)
        for (let row of ['A', 'B', 'C', 'D']) {
            for (let num of ['1', '2', '3', '4']) {
                this.assets.environment[`aisle${row}${num}`] = this.createCanvas(16, 16, ctx => {
                    ctx.fillStyle = '#f59e0b';
                    ctx.fillRect(0, 0, 16, 16);
                    ctx.fillStyle = '#fbbf24';
                    ctx.fillRect(1, 1, 14, 14);
                    ctx.fillStyle = '#000';
                    ctx.font = 'bold 10px monospace';
                    ctx.textAlign = 'center';
                    ctx.fillText(`${row}${num}`, 8, 12);
                });
            }
        }
    }
}
