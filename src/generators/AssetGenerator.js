/**
 * AssetGenerator.js
 * Enhanced procedural sprite and asset generation system
 * Generates all game sprites, animations, and visual assets at runtime
 */

export class AssetGenerator {
    constructor() {
        this.assets = {};
        this.palettes = this.initPalettes();
        this.animationFrames = {};
    }

    /**
     * Initialize color palettes for consistent theming
     */
    initPalettes() {
        return {
            // Character-specific palettes
            carrie: {
                primary: '#7c3aed',
                secondary: '#8b5cf6',
                highlight: '#a78bfa',
                accent: '#c4b5fd',
                attack: '#e879f9'
            },
            nevena: {
                primary: '#991b1b',
                secondary: '#b91c1c',
                highlight: '#dc2626',
                accent: '#0284c7',
                attack: '#0ea5e9'
            },
            joao: {
                primary: '#c2410c',
                secondary: '#ea580c',
                highlight: '#f97316',
                accent: '#fef08a',
                attack: '#fb923c'
            },
            roman: {
                primary: '#0a0f1f',
                secondary: '#1a2744',
                highlight: '#2a3755',
                accent: '#374151',
                attack: '#64748b'
            },
            erwin: {
                primary: '#3f3f46',
                secondary: '#52525b',
                highlight: '#71717a',
                accent: '#0891b2',
                attack: '#22d3ee'
            },
            // Boss palettes
            simon: {
                primary: '#b45309',
                secondary: '#d97706',
                highlight: '#f59e0b',
                beard: '#5c3d2e',
                glasses: '#ef4444'
            },
            mechaBoss: {
                body: '#1a1f2e',
                armor: '#3d4556',
                glow: '#dc2626',
                energy: '#eab308'
            },
            // Common palettes
            skin: {
                base: '#d4a574',
                mid: '#e8c49a',
                highlight: '#f5d0a0',
                shadow: '#c4956a',
                dark: '#b8784a'
            },
            effects: {
                glow: 'rgba(255, 255, 255, 0.4)',
                shadow: 'rgba(0, 0, 0, 0.3)',
                energy: 'rgba(255, 153, 0, 0.15)',
                danger: 'rgba(220, 38, 38, 0.4)'
            }
        };
    }

    /**
     * Helper to create canvas with drawing function
     */
    createCanvas(width, height, drawFunc) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        drawFunc(ctx);
        return canvas;
    }

    /**
     * Generate all game assets
     */
    generateAll() {
        this.generateLogo();
        this.generateCharacterSprites();
        this.generateCharacterAttacks();
        this.generateBossSprites();
        this.generateNPCSprites();
        this.generateEnvironmentAssets();
        this.generateEffects();
        this.generateAnimations();

        return this.assets;
    }

    /**
     * Generate logo sprite
     */
    generateLogo() {
        this.assets.logo = this.createCanvas(48, 48, ctx => {
            // Gradient background
            const grad = ctx.createLinearGradient(0, 0, 48, 48);
            grad.addColorStop(0, '#ffd700');
            grad.addColorStop(0.5, '#f59e0b');
            grad.addColorStop(1, '#d97706');
            ctx.fillStyle = grad;
            ctx.fillRect(2, 2, 44, 44);

            // Border
            ctx.strokeStyle = '#92400e';
            ctx.lineWidth = 2;
            ctx.strokeRect(2, 2, 44, 44);

            // Inner shadow
            ctx.fillStyle = 'rgba(0,0,0,0.2)';
            ctx.fillRect(4, 4, 40, 40);

            // Text with shadow
            ctx.fillStyle = '#000';
            ctx.font = 'bold 28px monospace';
            ctx.fillText("EE", 9, 35);
            ctx.fillStyle = '#fff';
            ctx.fillText("EE", 7, 33);
        });
    }

    /**
     * Generate character sprites (16x16)
     */
    generateCharacterSprites() {
        this.assets.chars = {};

        // Carrie - The 5S Monk
        this.assets.chars.Carrie = this.createCanvas(16, 16, ctx => {
            // Shadow base
            this.drawShadow(ctx, 8, 15);

            // Hair with highlight
            ctx.fillStyle = '#0a0f1f';
            ctx.fillRect(2, 0, 12, 6);
            ctx.fillStyle = '#1a2744';
            ctx.fillRect(3, 1, 10, 3);
            ctx.fillStyle = '#2a3755';
            ctx.fillRect(4, 1, 3, 2); // Shine

            // Face
            this.drawFace(ctx, 4, 5, 'default');

            // Headset
            ctx.fillStyle = '#22c55e';
            ctx.fillRect(4, 10, 8, 1);
            ctx.fillStyle = '#16a34a';
            ctx.fillRect(3, 8, 1, 3);
            ctx.fillRect(12, 8, 1, 3);

            // Purple robe
            ctx.fillStyle = this.palettes.carrie.primary;
            ctx.fillRect(2, 11, 12, 5);
            ctx.fillStyle = this.palettes.carrie.secondary;
            ctx.fillRect(3, 11, 10, 3);
            ctx.fillStyle = this.palettes.carrie.highlight;
            ctx.fillRect(5, 12, 6, 2);

            // Sash
            ctx.fillStyle = this.palettes.carrie.accent;
            ctx.fillRect(7, 11, 2, 4);

            // Boots
            ctx.fillStyle = '#1e3a8a';
            ctx.fillRect(3, 15, 4, 1);
            ctx.fillRect(9, 15, 4, 1);
        });

        // Nevena - The Oracle
        this.assets.chars.Nevena = this.createCanvas(16, 16, ctx => {
            this.drawShadow(ctx, 8, 15);

            // Brown hair with wave
            ctx.fillStyle = '#5c2d12';
            ctx.fillRect(2, 1, 12, 5);
            ctx.fillStyle = '#7c3d1a';
            ctx.fillRect(3, 2, 10, 3);
            ctx.fillStyle = '#9a5a32';
            ctx.fillRect(2, 2, 3, 4);
            ctx.fillStyle = '#b8784a';
            ctx.fillRect(3, 2, 2, 2);

            // Headband
            ctx.fillStyle = '#0284c7';
            ctx.fillRect(3, 2, 10, 2);
            ctx.fillStyle = '#0ea5e9';
            ctx.fillRect(4, 2, 8, 1);

            // Face with glasses
            this.drawFace(ctx, 4, 5, 'glasses');

            // Red jacket
            ctx.fillStyle = this.palettes.nevena.primary;
            ctx.fillRect(2, 11, 12, 5);
            ctx.fillStyle = this.palettes.nevena.secondary;
            ctx.fillRect(3, 11, 10, 3);
            ctx.fillStyle = this.palettes.nevena.highlight;
            ctx.fillRect(4, 12, 8, 2);

            // Clipboard
            ctx.fillStyle = '#fbbf24';
            ctx.fillRect(12, 12, 3, 3);
            ctx.fillStyle = '#fcd34d';
            ctx.fillRect(12, 12, 2, 2);

            // Boots
            ctx.fillStyle = '#1f2937';
            ctx.fillRect(4, 15, 3, 1);
            ctx.fillRect(9, 15, 3, 1);
        });

        // Joao - The Siren
        this.assets.chars.Joao = this.createCanvas(16, 16, ctx => {
            this.drawShadow(ctx, 8, 15);

            // Spiky hair
            ctx.fillStyle = '#0a0f1f';
            ctx.fillRect(4, 0, 8, 4);
            ctx.fillRect(5, -1, 2, 2);
            ctx.fillRect(9, -1, 2, 2);
            ctx.fillStyle = '#1a2744';
            ctx.fillRect(5, 1, 6, 2);

            // Face
            this.drawFace(ctx, 4, 4, 'shouting');

            // Mic headset
            ctx.fillStyle = '#22d3ee';
            ctx.fillRect(3, 8, 1, 3);
            ctx.fillStyle = '#0ea5e9';
            ctx.fillRect(2, 10, 2, 2);

            // Orange hi-vis vest
            ctx.fillStyle = this.palettes.joao.primary;
            ctx.fillRect(2, 10, 12, 6);
            ctx.fillStyle = this.palettes.joao.secondary;
            ctx.fillRect(3, 10, 10, 4);
            ctx.fillStyle = this.palettes.joao.highlight;
            ctx.fillRect(4, 11, 8, 2);

            // Reflective strips
            ctx.fillStyle = this.palettes.joao.accent;
            ctx.fillRect(3, 11, 10, 1);
            ctx.fillRect(3, 13, 10, 1);

            // Shoes
            ctx.fillStyle = '#0369a1';
            ctx.fillRect(4, 15, 3, 1);
            ctx.fillRect(9, 15, 3, 1);
        });

        // Roman - The Ghost
        this.assets.chars.Roman = this.createCanvas(16, 16, ctx => {
            this.drawShadow(ctx, 8, 15);

            // Bald head with shine
            ctx.fillStyle = this.palettes.skin.shadow;
            ctx.fillRect(4, 2, 8, 8);
            ctx.fillStyle = this.palettes.skin.base;
            ctx.fillRect(5, 3, 6, 6);
            ctx.fillStyle = this.palettes.skin.mid;
            ctx.fillRect(6, 3, 4, 4);
            ctx.fillStyle = '#f5deb3';
            ctx.fillRect(6, 2, 3, 2);

            // Eyes (narrow)
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(5, 5, 2, 1);
            ctx.fillRect(9, 5, 2, 1);
            ctx.fillStyle = '#64748b';
            ctx.fillRect(5, 5, 1, 1);
            ctx.fillRect(9, 5, 1, 1);

            // Stern mouth
            ctx.fillStyle = '#8b6b5a';
            ctx.fillRect(6, 7, 4, 1);

            // Dark coat
            ctx.fillStyle = this.palettes.roman.primary;
            ctx.fillRect(2, 10, 12, 6);
            ctx.fillStyle = this.palettes.roman.secondary;
            ctx.fillRect(3, 10, 10, 4);
            ctx.fillStyle = this.palettes.roman.highlight;
            ctx.fillRect(4, 11, 8, 2);

            // Silver cuffs
            ctx.fillStyle = '#6b7280';
            ctx.fillRect(2, 13, 3, 2);
            ctx.fillRect(11, 13, 3, 2);

            // Dark boots
            ctx.fillStyle = '#0b1224';
            ctx.fillRect(3, 15, 4, 1);
            ctx.fillRect(9, 15, 4, 1);
        });

        // Erwin - The Manager (Tesla)
        this.assets.chars.Erwin = this.createCanvas(16, 16, ctx => {
            // Shadow under Tesla
            ctx.fillStyle = 'rgba(0,0,0,0.4)';
            ctx.fillRect(1, 14, 14, 2);

            // Tesla body
            ctx.fillStyle = this.palettes.erwin.primary;
            ctx.fillRect(1, 8, 14, 6);
            ctx.fillStyle = this.palettes.erwin.secondary;
            ctx.fillRect(2, 9, 12, 4);
            ctx.fillStyle = this.palettes.erwin.highlight;
            ctx.fillRect(3, 9, 10, 2);

            // Hood
            ctx.fillStyle = '#4b5563';
            ctx.fillRect(2, 7, 12, 3);
            ctx.fillStyle = '#6b7280';
            ctx.fillRect(4, 7, 8, 2);
            ctx.fillStyle = '#9ca3af';
            ctx.fillRect(5, 7, 3, 1);

            // Windshield glow
            ctx.fillStyle = this.palettes.erwin.accent;
            ctx.fillRect(3, 9, 10, 2);
            ctx.fillStyle = this.palettes.erwin.attack;
            ctx.fillRect(4, 9, 8, 1);
            ctx.fillStyle = '#67e8f9';
            ctx.fillRect(6, 9, 4, 1);

            // Wheels
            ctx.fillStyle = '#000';
            ctx.fillRect(1, 12, 4, 3);
            ctx.fillRect(11, 12, 4, 3);
            ctx.fillStyle = '#27272a';
            ctx.fillRect(2, 12, 2, 2);
            ctx.fillRect(12, 12, 2, 2);

            // Headlights
            ctx.fillStyle = '#fef08a';
            ctx.fillRect(1, 10, 1, 2);
            ctx.fillRect(14, 10, 1, 2);

            // Erwin face above
            this.drawFace(ctx, 5, 3, 'smirk');

            // Hair
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(5, 2, 6, 3);
            ctx.fillStyle = '#2d2d2d';
            ctx.fillRect(6, 2, 4, 2);

            // Beard
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(6, 6, 4, 2);
        });
    }

    /**
     * Generate attack projectile sprites
     */
    generateCharacterAttacks() {
        this.assets.attacks = {};

        // Carrie - Label Maker
        this.assets.attacks.Carrie = this.createCanvas(14, 14, ctx => {
            const grad = ctx.createRadialGradient(7, 7, 1, 7, 7, 7);
            grad.addColorStop(0, '#e879f9');
            grad.addColorStop(0.5, '#a855f7');
            grad.addColorStop(1, '#7c3aed');
            ctx.fillStyle = grad;
            ctx.fillRect(1, 4, 12, 6);
            ctx.fillStyle = '#c4b5fd';
            ctx.fillRect(2, 5, 10, 4);
            ctx.fillStyle = '#10b981';
            ctx.fillRect(6, 2, 2, 10);
            ctx.fillStyle = '#fff';
            ctx.fillRect(4, 6, 6, 2);
        });

        // Nevena - Clipboard Shockwave
        this.assets.attacks.Nevena = this.createCanvas(14, 14, ctx => {
            ctx.fillStyle = '#0369a1';
            ctx.fillRect(2, 2, 10, 10);
            const grad = ctx.createLinearGradient(0, 0, 14, 14);
            grad.addColorStop(0, '#f8fafc');
            grad.addColorStop(1, '#e2e8f0');
            ctx.fillStyle = grad;
            ctx.fillRect(3, 3, 8, 8);
            ctx.fillStyle = '#334155';
            ctx.fillRect(4, 4, 6, 1);
            ctx.fillRect(4, 6, 5, 1);
            ctx.fillRect(4, 8, 4, 1);
            ctx.fillStyle = '#22c55e';
            ctx.fillRect(8, 7, 2, 3);
            ctx.fillRect(6, 9, 2, 1);
        });

        // Joao - Sonic Shout
        this.assets.attacks.Joao = this.createCanvas(14, 14, ctx => {
            const grad = ctx.createLinearGradient(0, 0, 14, 0);
            grad.addColorStop(0, '#ea580c');
            grad.addColorStop(0.5, '#f97316');
            grad.addColorStop(1, '#fb923c');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.moveTo(0, 7);
            ctx.lineTo(6, 2);
            ctx.lineTo(6, 12);
            ctx.fill();
            ctx.fillStyle = '#fbbf24';
            ctx.beginPath();
            ctx.moveTo(4, 7);
            ctx.lineTo(10, 1);
            ctx.lineTo(10, 13);
            ctx.fill();
            ctx.fillStyle = '#22d3ee';
            ctx.beginPath();
            ctx.moveTo(8, 7);
            ctx.lineTo(14, 3);
            ctx.lineTo(14, 11);
            ctx.fill();
        });

        // Roman - Stealth Audit
        this.assets.attacks.Roman = this.createCanvas(14, 14, ctx => {
            ctx.strokeStyle = '#64748b';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(7, 7, 6, 0, Math.PI * 2);
            ctx.stroke();
            ctx.strokeStyle = '#94a3b8';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(7, 7, 4, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fillStyle = '#1e293b';
            ctx.beginPath();
            ctx.arc(7, 7, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#ef4444';
            ctx.fillRect(6, 0, 2, 3);
            ctx.fillRect(6, 11, 2, 3);
            ctx.fillRect(0, 6, 3, 2);
            ctx.fillRect(11, 6, 3, 2);
        });

        // Erwin - Tesla Energy
        this.assets.attacks.Erwin = this.createCanvas(14, 14, ctx => {
            const grad = ctx.createRadialGradient(7, 7, 1, 7, 7, 7);
            grad.addColorStop(0, '#67e8f9');
            grad.addColorStop(0.5, '#22d3ee');
            grad.addColorStop(1, '#0891b2');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(7, 7, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(7, 1);
            ctx.lineTo(5, 4);
            ctx.lineTo(9, 6);
            ctx.lineTo(7, 9);
            ctx.stroke();
            ctx.fillStyle = '#f0f9ff';
            ctx.beginPath();
            ctx.arc(7, 7, 2, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    /**
     * Generate boss sprites
     */
    generateBossSprites() {
        this.assets.bosses = {};

        // Simon Unglaube (16x16)
        this.assets.bosses.simon = this.generateSimonSprite(16);

        // Simon Boss (32x32)
        this.assets.bosses.simonBoss = this.generateSimonSprite(32, true);

        // Simon Face (32x32 scaled)
        this.assets.bosses.simonFace = this.createCanvas(32, 32, ctx => {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(this.assets.bosses.simon, 0, 0, 16, 16, 0, 0, 32, 32);
        });

        // Mecha Mega Simon (48x48)
        this.assets.bosses.mechaMegaSimon = this.generateMechaMegaSimon();

        // Mecha Jeff (64x64)
        this.assets.bosses.mechaJeff = this.generateMechaJeff();

        // Random encounter bosses
        this.generateRandomBosses();
    }

    /**
     * Generate Simon sprite (scalable)
     */
    generateSimonSprite(size, isBoss = false) {
        const scale = size / 16;

        return this.createCanvas(size, size, ctx => {
            ctx.scale(scale, scale);

            if (isBoss) {
                // Boss aura
                const aura = ctx.createRadialGradient(8, 8, 2, 8, 8, 8);
                aura.addColorStop(0, 'rgba(234, 179, 8, 0.3)');
                aura.addColorStop(1, 'rgba(0, 0, 0, 0)');
                ctx.fillStyle = aura;
                ctx.fillRect(0, 0, 16, 16);
            }

            // Shadow
            this.drawShadow(ctx, 8, 15);

            // Short brown hair
            ctx.fillStyle = this.palettes.simon.beard;
            ctx.fillRect(3, 0, 10, 4);
            ctx.fillStyle = '#6b4423';
            ctx.fillRect(4, 1, 8, 2);
            ctx.fillStyle = '#7a5030';
            ctx.fillRect(5, 1, 3, 1);

            // Face
            ctx.fillStyle = this.palettes.skin.base;
            ctx.fillRect(4, 4, 8, 6);
            ctx.fillStyle = this.palettes.skin.mid;
            ctx.fillRect(5, 5, 6, 4);

            // Glasses
            ctx.fillStyle = '#000';
            ctx.fillRect(4, 5, 3, 2);
            ctx.fillRect(9, 5, 3, 2);
            if (isBoss) {
                ctx.fillStyle = this.palettes.simon.glasses;
            } else {
                ctx.fillStyle = '#87ceeb';
            }
            ctx.fillRect(5, 5, 1, 1);
            ctx.fillRect(10, 5, 1, 1);
            ctx.fillStyle = '#475569';
            ctx.fillRect(7, 6, 2, 1);

            // Brown beard
            ctx.fillStyle = this.palettes.simon.beard;
            ctx.fillRect(4, 8, 8, 2);
            ctx.fillStyle = '#6b4423';
            ctx.fillRect(5, 8, 6, 2);

            // Gold WHS jacket
            ctx.fillStyle = this.palettes.simon.primary;
            ctx.fillRect(2, 10, 12, 6);
            ctx.fillStyle = this.palettes.simon.secondary;
            ctx.fillRect(3, 10, 10, 4);
            ctx.fillStyle = this.palettes.simon.highlight;
            ctx.fillRect(4, 11, 8, 2);

            // Badge
            ctx.fillStyle = '#fff';
            ctx.fillRect(5, 12, 6, 2);

            // Boots
            ctx.fillStyle = '#1f2937';
            ctx.fillRect(4, 15, 3, 1);
            ctx.fillRect(9, 15, 3, 1);
        });
    }

    /**
     * Generate Mecha Mega Simon
     */
    generateMechaMegaSimon() {
        return this.createCanvas(48, 48, ctx => {
            // Dark energy aura
            const aura = ctx.createRadialGradient(24, 24, 8, 24, 24, 24);
            aura.addColorStop(0, 'rgba(220, 38, 38, 0.4)');
            aura.addColorStop(0.5, 'rgba(234, 179, 8, 0.2)');
            aura.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = aura;
            ctx.fillRect(0, 0, 48, 48);

            // Mecha body frame
            ctx.fillStyle = this.palettes.mechaBoss.body;
            ctx.fillRect(8, 26, 32, 18);
            ctx.fillStyle = '#252b3d';
            ctx.fillRect(10, 28, 28, 14);

            // Body armor
            ctx.fillStyle = this.palettes.mechaBoss.armor;
            ctx.fillRect(12, 30, 24, 10);
            ctx.fillStyle = '#4a5568';
            ctx.fillRect(14, 32, 20, 6);

            // WHS logo
            ctx.fillStyle = this.palettes.mechaBoss.energy;
            ctx.fillRect(18, 33, 12, 6);
            ctx.fillStyle = '#fbbf24';
            ctx.fillRect(20, 34, 8, 4);

            // Shoulder cannons
            this.drawShoulderCannon(ctx, 2, 22);
            this.drawShoulderCannon(ctx, 36, 22);

            // Head with Simon features
            this.drawMechaSimonHead(ctx, 12, 9);

            // Legs
            ctx.fillStyle = '#374151';
            ctx.fillRect(14, 42, 8, 6);
            ctx.fillRect(26, 42, 8, 6);
            ctx.fillStyle = '#4b5563';
            ctx.fillRect(16, 44, 4, 4);
            ctx.fillRect(28, 44, 4, 4);
        });
    }

    /**
     * Generate Mecha Jeff
     */
    generateMechaJeff() {
        return this.createCanvas(64, 64, ctx => {
            // Mecha body
            ctx.fillStyle = '#1a1f2e';
            ctx.fillRect(8, 32, 48, 28);
            ctx.fillStyle = '#252b3d';
            ctx.fillRect(12, 34, 40, 24);

            // Body armor
            ctx.fillStyle = '#3d4556';
            ctx.fillRect(14, 36, 36, 20);
            ctx.fillStyle = '#4a5568';
            ctx.fillRect(16, 38, 32, 16);

            // Amazon logo
            ctx.fillStyle = '#ff9900';
            ctx.fillRect(24, 42, 16, 8);
            ctx.fillStyle = '#ffb347';
            ctx.fillRect(26, 44, 12, 4);

            // Shoulder cannons
            this.drawShoulderCannon(ctx, 2, 28, 12);
            this.drawShoulderCannon(ctx, 50, 28, 12);

            // Bald head
            ctx.fillStyle = '#f5deb3';
            ctx.fillRect(20, 8, 24, 22);
            ctx.fillStyle = '#faebd7';
            ctx.fillRect(22, 6, 20, 8);
            ctx.fillStyle = '#fff5e6';
            ctx.fillRect(26, 4, 12, 6);

            // Evil eyes
            ctx.fillStyle = '#7f1d1d';
            ctx.fillRect(24, 18, 6, 6);
            ctx.fillRect(34, 18, 6, 6);
            ctx.fillStyle = '#dc2626';
            ctx.fillRect(25, 19, 4, 4);
            ctx.fillRect(35, 19, 4, 4);
            ctx.fillStyle = '#ef4444';
            ctx.fillRect(26, 20, 2, 2);
            ctx.fillRect(36, 20, 2, 2);

            // Evil grin
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(26, 26, 12, 3);
            ctx.fillStyle = '#fff';
            ctx.fillRect(28, 27, 8, 1);
        });
    }

    /**
     * Generate random encounter bosses
     */
    generateRandomBosses() {
        const bosses = [
            'boss_manager', 'boss_inspector', 'boss_compliance',
            'boss_regional', 'boss_sebastian', 'boss_jelly',
            'boss_avetta', 'boss_bot'
        ];

        bosses.forEach(name => {
            this.assets.bosses[name] = this.generateBossVariant(name);
        });
    }

    /**
     * Generate boss variant sprite
     */
    generateBossVariant(type) {
        return this.createCanvas(16, 16, ctx => {
            this.drawShadow(ctx, 8, 15);

            switch(type) {
                case 'boss_inspector':
                    this.drawInspectorBoss(ctx);
                    break;
                case 'boss_compliance':
                    this.drawComplianceBoss(ctx);
                    break;
                case 'boss_sebastian':
                    this.drawSebastianBoss(ctx);
                    break;
                case 'boss_jelly':
                    this.drawJellyBoss(ctx);
                    break;
                case 'boss_avetta':
                    this.drawAvettaBoss(ctx);
                    break;
                default:
                    this.drawGenericBoss(ctx);
            }
        });
    }

    /**
     * Generate NPC sprites
     */
    generateNPCSprites() {
        this.assets.npcs = {};

        // OPS Manager
        this.assets.npcs.ops = this.createCanvas(16, 16, ctx => {
            this.drawShadow(ctx, 8, 15);
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(4, 1, 8, 4);
            ctx.fillStyle = '#2d2d2d';
            ctx.fillRect(5, 2, 6, 2);
            this.drawFace(ctx, 4, 5, 'frown');
            ctx.fillStyle = '#991b1b';
            ctx.fillRect(2, 10, 12, 6);
            ctx.fillStyle = '#b91c1c';
            ctx.fillRect(3, 10, 10, 4);
            ctx.fillStyle = '#1f2937';
            ctx.fillRect(4, 15, 3, 1);
            ctx.fillRect(9, 15, 3, 1);
        });

        // Associate
        this.assets.npcs.assoc = this.createCanvas(16, 16, ctx => {
            this.drawShadow(ctx, 8, 15);
            ctx.fillStyle = '#3f3f46';
            ctx.fillRect(4, 1, 8, 4);
            this.drawFace(ctx, 4, 5, 'default');
            ctx.fillStyle = '#ca8a04';
            ctx.fillRect(2, 10, 12, 6);
            ctx.fillStyle = '#eab308';
            ctx.fillRect(3, 10, 10, 4);
            ctx.fillStyle = '#fef08a';
            ctx.fillRect(3, 11, 10, 1);
            ctx.fillRect(3, 13, 10, 1);
        });
    }

    /**
     * Generate environment assets
     */
    generateEnvironmentAssets() {
        this.assets.environment = {};

        // Tiles
        this.assets.environment.floor = this.createCanvas(16, 16, ctx => {
            ctx.fillStyle = '#1a1f2e';
            ctx.fillRect(0, 0, 16, 16);
            ctx.fillStyle = '#252b3d';
            ctx.fillRect(1, 1, 14, 14);
        });

        this.assets.environment.wall = this.createCanvas(16, 16, ctx => {
            ctx.fillStyle = '#374151';
            ctx.fillRect(0, 0, 16, 16);
            ctx.fillStyle = '#4b5563';
            ctx.fillRect(2, 2, 12, 12);
            ctx.strokeStyle = '#6b7280';
            ctx.lineWidth = 1;
            ctx.strokeRect(1, 1, 14, 14);
        });

        this.assets.environment.conveyor = this.createCanvas(16, 16, ctx => {
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(0, 0, 16, 16);
            ctx.fillStyle = '#1e293b';
            ctx.fillRect(1, 1, 14, 14);
            // Conveyor arrows
            ctx.fillStyle = '#fbbf24';
            ctx.beginPath();
            ctx.moveTo(4, 8);
            ctx.lineTo(12, 8);
            ctx.lineTo(10, 6);
            ctx.moveTo(12, 8);
            ctx.lineTo(10, 10);
            ctx.stroke();
        });
    }

    /**
     * Generate effect sprites
     */
    generateEffects() {
        this.assets.effects = {};

        // Particle
        this.assets.effects.particle = this.createCanvas(4, 4, ctx => {
            ctx.fillStyle = '#fff';
            ctx.fillRect(1, 1, 2, 2);
        });

        // Sparkle
        this.assets.effects.sparkle = this.createCanvas(8, 8, ctx => {
            ctx.fillStyle = '#fbbf24';
            ctx.fillRect(3, 0, 2, 8);
            ctx.fillRect(0, 3, 8, 2);
            ctx.fillRect(1, 1, 6, 6);
        });
    }

    /**
     * Generate animation frames
     */
    generateAnimations() {
        this.animationFrames = {
            walk: this.generateWalkAnimation(),
            idle: this.generateIdleAnimation(),
            attack: this.generateAttackAnimation()
        };
    }

    /**
     * Generate walk animation frames
     */
    generateWalkAnimation() {
        // Placeholder - implement full walk cycle
        return {
            frames: 4,
            frameDelay: 8
        };
    }

    /**
     * Generate idle animation frames
     */
    generateIdleAnimation() {
        return {
            frames: 2,
            frameDelay: 30
        };
    }

    /**
     * Generate attack animation frames
     */
    generateAttackAnimation() {
        return {
            frames: 3,
            frameDelay: 5
        };
    }

    // Helper drawing methods

    drawShadow(ctx, x, y, width = 5, height = 2) {
        ctx.save();
        ctx.fillStyle = this.palettes.effects.shadow;
        ctx.beginPath();
        ctx.ellipse(x, y, width, height, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    drawFace(ctx, x, y, expression = 'default') {
        // Face base
        ctx.fillStyle = this.palettes.skin.base;
        ctx.fillRect(x, y, 8, 6);
        ctx.fillStyle = this.palettes.skin.mid;
        ctx.fillRect(x + 1, y + 1, 6, 4);
        ctx.fillStyle = this.palettes.skin.highlight;
        ctx.fillRect(x + 2, y + 1, 4, 3);

        // Eyes
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(x + 1, y + 2, 2, 2);
        ctx.fillRect(x + 5, y + 2, 2, 2);
        ctx.fillStyle = '#fff';
        ctx.fillRect(x + 1, y + 2, 1, 1);
        ctx.fillRect(x + 5, y + 2, 1, 1);

        // Expression-specific features
        switch(expression) {
            case 'glasses':
                ctx.strokeStyle = '#475569';
                ctx.lineWidth = 0.5;
                ctx.strokeRect(x + 1, y + 2, 2, 2);
                ctx.strokeRect(x + 5, y + 2, 2, 2);
                break;
            case 'shouting':
                ctx.fillStyle = '#8b4513';
                ctx.fillRect(x + 2, y + 3, 4, 2);
                break;
            case 'smirk':
                ctx.fillStyle = '#f59e0b';
                ctx.fillRect(x + 3, y + 4, 2, 1);
                break;
            case 'frown':
                ctx.fillStyle = '#8b6b5a';
                ctx.fillRect(x + 2, y + 4, 4, 1);
                break;
            default:
                ctx.fillStyle = '#c17b5f';
                ctx.fillRect(x + 3, y + 4, 2, 1);
        }
    }

    drawShoulderCannon(ctx, x, y, height = 20) {
        ctx.fillStyle = '#374151';
        ctx.fillRect(x, y, 10, height);
        ctx.fillStyle = '#4b5563';
        ctx.fillRect(x + 2, y + 2, 6, height - 4);
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(x + 3, y + 6, 4, 4);
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(x + 4, y + 7, 2, 2);
    }

    drawMechaSimonHead(ctx, x, y) {
        // Simplified mecha head with Simon features
        ctx.fillStyle = this.palettes.simon.beard;
        ctx.fillRect(x, y, 24, 12);
        ctx.fillStyle = this.palettes.skin.base;
        ctx.fillRect(x + 2, y + 2, 20, 8);

        // Cyber glasses
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(x + 2, y + 4, 8, 5);
        ctx.fillRect(x + 14, y + 4, 8, 5);
        ctx.fillStyle = this.palettes.simon.glasses;
        ctx.fillRect(x + 3, y + 5, 6, 3);
        ctx.fillRect(x + 15, y + 5, 6, 3);
    }

    drawInspectorBoss(ctx) {
        ctx.fillStyle = '#6b7280';
        ctx.fillRect(3, 0, 10, 5);
        this.drawFace(ctx, 4, 5, 'default');
        ctx.fillStyle = '#ca8a04';
        ctx.fillRect(2, 10, 12, 6);
        ctx.fillStyle = '#eab308';
        ctx.fillRect(3, 10, 10, 4);
    }

    drawComplianceBoss(ctx) {
        ctx.fillStyle = '#0a0f1f';
        ctx.fillRect(3, 0, 10, 5);
        this.drawFace(ctx, 5, 4, 'default');
        ctx.fillStyle = '#0891b2';
        ctx.fillRect(3, 10, 10, 6);
        ctx.fillStyle = '#0ea5e9';
        ctx.fillRect(4, 10, 8, 4);
    }

    drawSebastianBoss(ctx) {
        ctx.fillStyle = '#f5d0a0';
        ctx.fillRect(4, 1, 8, 7);
        ctx.fillStyle = '#faebd7';
        ctx.fillRect(5, 1, 5, 2);
        this.drawFace(ctx, 4, 5, 'default');
        ctx.fillStyle = '#1d4ed8';
        ctx.fillRect(2, 8, 12, 8);
        ctx.fillStyle = '#2563eb';
        ctx.fillRect(3, 8, 10, 6);
    }

    drawJellyBoss(ctx) {
        ctx.fillStyle = '#5c3d2e';
        ctx.fillRect(3, 0, 10, 6);
        this.drawFace(ctx, 4, 5, 'default');
        ctx.fillStyle = '#166534';
        ctx.fillRect(3, 10, 10, 6);
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(4, 10, 8, 4);
    }

    drawAvettaBoss(ctx) {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(2, 2, 12, 12);
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(3, 3, 10, 10);
        const grad = ctx.createLinearGradient(4, 4, 12, 12);
        grad.addColorStop(0, '#0ea5e9');
        grad.addColorStop(1, '#22d3ee');
        ctx.fillStyle = grad;
        ctx.fillRect(4, 4, 8, 8);
    }

    drawGenericBoss(ctx) {
        ctx.fillStyle = '#0a0f1f';
        ctx.fillRect(2, 0, 12, 6);
        this.drawFace(ctx, 4, 5, 'default');
        ctx.fillStyle = '#0a0f1f';
        ctx.fillRect(2, 11, 12, 5);
    }

    /**
     * Get asset by path
     */
    getAsset(path) {
        const parts = path.split('.');
        let current = this.assets;
        for (const part of parts) {
            current = current[part];
            if (!current) return null;
        }
        return current;
    }

    /**
     * Get animation frame
     */
    getAnimationFrame(animName, frameIndex) {
        return this.animationFrames[animName]?.[frameIndex] || null;
    }
}

export default AssetGenerator;
