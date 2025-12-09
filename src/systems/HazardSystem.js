/**
 * HazardSystem.js
 * Complete warehouse hazard management system
 * Manages 90+ unique workplace safety hazards with procedural sprites
 */

export class HazardSystem {
    constructor(game) {
        this.game = game;
        this.activeHazards = [];
        this.hazardPool = this.initHazardPool();
        this.hazardTypes = this.getUniqueTypes();
    }

    /**
     * Initialize the complete hazard pool (90+ hazards)
     */
    initHazardPool() {
        return [
            // === POWERED INDUSTRIAL TRUCKS (PITs) ===
            { name: "Speeding PIT Operator", type: "forklift" },
            { name: "Forklift With Blocked View", type: "forklift" },
            { name: "Reach Truck Cutting Corner", type: "forklift" },
            { name: "Order Picker Too High", type: "forklift" },
            { name: "Turret Truck Near Pedestrians", type: "forklift" },
            { name: "Clamp Truck Overloaded", type: "forklift" },
            { name: "PIT Operator Without Seatbelt", type: "forklift" },

            // === PACK & SHIP HAZARDS ===
            { name: "Overflowing SLAM Line", type: "conveyor" },
            { name: "Jammed AFE Chute", type: "conveyor" },
            { name: "SIOC Avalanche", type: "box" },
            { name: "Crushed Jiffy Mailer Pile", type: "debris" },
            { name: "Tape Gun Left Running", type: "blade" },
            { name: "Poly Bag Explosion", type: "wrap" },
            { name: "Gift Wrap Station Chaos", type: "debris" },
            { name: "Dunnage Bag Mountain", type: "debris" },

            // === INBOUND & RECEIVE ===
            { name: "Unbroken-Down Gaylord", type: "tall_pallet" },
            { name: "Vendor Pallet Leaning", type: "tall_pallet" },
            { name: "Receive Dock Gap", type: "dock" },
            { name: "Trailer Without Wheel Chocks", type: "dock" },
            { name: "Dock Plate Not Secured", type: "dock" },
            { name: "Mixed SKU Nightmare Pallet", type: "tall_pallet" },
            { name: "Shrink Wrap Tornado", type: "wrap" },

            // === PROBLEM SOLVE CHAOS ===
            { name: "Problem Solve Cart Avalanche", type: "cart" },
            { name: "ASIN Research Black Hole", type: "tote" },
            { name: "Damaged Out Pile Growing", type: "box" },
            { name: "Research Bin Overflow", type: "tote" },
            { name: "Missing Label Saga", type: "compliance" },

            // === FLOOR HAZARDS ===
            { name: "Ice Pack Leak Trail", type: "spill" },
            { name: "Crushed Fragile Item Spill", type: "spill" },
            { name: "Leaking Liquid Hazmat", type: "spill" },
            { name: "Sweeper Missed This Spot", type: "spill" },
            { name: "Energy Drink Explosion", type: "spill" },
            { name: "Smoothie Shrapnel Zone", type: "spill" },
            { name: "Coffee Ring of Standup Past", type: "spill" },
            { name: "Wet Floor No Sign", type: "spill" },

            // === STOW & STORAGE ===
            { name: "Overstuffed Prime Bin", type: "tote" },
            { name: "Top Stock About to Fall", type: "tall_pallet" },
            { name: "Heavy Item Stowed High", type: "tall_pallet" },
            { name: "Bin Capacity Ignored", type: "box" },
            { name: "Unstable Rack Section", type: "tall_pallet" },
            { name: "Random Cage Contents", type: "cage" },

            // === PICK & COUNT ===
            { name: "Scanner Cord Trip Wire", type: "cord" },
            { name: "Pick Cart Wheel Failure", type: "cart" },
            { name: "Tote Stack Too Tall", type: "tote" },
            { name: "Mystery SKU in Wrong Bin", type: "box" },
            { name: "Cycle Count Chaos", type: "compliance" },

            // === EQUIPMENT & TOOLS ===
            { name: "Box Cutter Without Guard", type: "blade" },
            { name: "Frayed Scanner Holster", type: "cord" },
            { name: "Broken Safety Ladder", type: "facility" },
            { name: "Missing Step Stool", type: "facility" },
            { name: "Unsecured Extension Cord", type: "cord" },
            { name: "Charging Station Overload", type: "battery" },
            { name: "Dead Battery Pile", type: "battery" },

            // === FIRE & EMERGENCY ===
            { name: "Blocked Fire Exit", type: "door" },
            { name: "Fire Extinguisher Hidden", type: "door" },
            { name: "Emergency Shower Blocked", type: "facility" },
            { name: "First Aid Kit Empty", type: "compliance" },
            { name: "AED Signage Covered", type: "facility" },

            // === ERGONOMIC HAZARDS ===
            { name: "Overreaching Associate", type: "npc" },
            { name: "Improper Lifting Technique", type: "npc" },
            { name: "Continuous Repetitive Motion", type: "npc" },
            { name: "Standing Mat Missing", type: "facility" },
            { name: "Keyboard at Wrong Height", type: "facility" },

            // === PEOPLE & BEHAVIOR ===
            { name: "Phone Walker on Floor", type: "npc" },
            { name: "Manager Speed Walk Mode", type: "npc" },
            { name: "New Hire Wrong Way Traffic", type: "npc" },
            { name: "Peak Season Burnout Zone", type: "npc" },
            { name: "Ambassador Training Cluster", type: "npc" },
            { name: "VTO Line Blocking Path", type: "npc" },

            // === OUTBOUND & SHIPPING ===
            { name: "Trailer Loaded Unevenly", type: "dock" },
            { name: "Smalls Bag Landslide", type: "debris" },
            { name: "Rollers Not Locked", type: "cage" },
            { name: "Cart Wall Collapse Risk", type: "cart" },
            { name: "CPT Rush Hour Chaos", type: "conveyor" },
            { name: "Sortation System Jam", type: "conveyor" },

            // === COMPLIANCE & DOCUMENTATION ===
            { name: "Safety Audit Due Tomorrow", type: "compliance" },
            { name: "Training Expired Badge", type: "compliance" },
            { name: "PPE Checklist Skipped", type: "compliance" },
            { name: "Incident Near-Miss Unreported", type: "compliance" },
            { name: "OSHA Log Update Pending", type: "compliance" },
            { name: "Lockout Tagout Forgotten", type: "compliance" }
        ];
    }

    /**
     * Get unique hazard types for sprite generation
     */
    getUniqueTypes() {
        const types = new Set();
        this.hazardPool.forEach(hazard => types.add(hazard.type));
        return Array.from(types);
    }

    /**
     * Get random hazards from the pool
     */
    pickRandomHazards(count) {
        const shuffled = [...this.hazardPool].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, Math.min(count, shuffled.length));
    }

    /**
     * Spawn a hazard at a specific position
     */
    spawn(x, y, hazardData) {
        const hazard = {
            x: x,
            y: y,
            data: hazardData,
            fixed: false
        };

        this.activeHazards.push(hazard);
        return hazard;
    }

    /**
     * Spawn multiple random hazards
     */
    spawnMultiple(count, getPositionFunc) {
        const hazards = this.pickRandomHazards(count);

        hazards.forEach(hazardData => {
            const pos = getPositionFunc();
            this.spawn(pos.x, pos.y, hazardData);
        });

        return this.activeHazards;
    }

    /**
     * Check if player is near a hazard
     */
    checkPlayerCollision(player, radius = 16) {
        for (const hazard of this.activeHazards) {
            if (hazard.fixed) continue;

            const dx = player.x - hazard.x;
            const dy = player.y - hazard.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < radius) {
                return hazard;
            }
        }

        return null;
    }

    /**
     * Fix a hazard
     */
    fixHazard(hazard) {
        hazard.fixed = true;
        return hazard;
    }

    /**
     * Count fixed hazards
     */
    countFixed() {
        return this.activeHazards.filter(h => h.fixed).length;
    }

    /**
     * Count active (unfixed) hazards
     */
    countActive() {
        return this.activeHazards.filter(h => !h.fixed).length;
    }

    /**
     * Get all active hazards
     */
    getActiveHazards() {
        return this.activeHazards.filter(h => !h.fixed);
    }

    /**
     * Clear all hazards
     */
    clear() {
        this.activeHazards = [];
    }

    /**
     * Render hazards (uses game assets and camera)
     */
    render(context, camera) {
        const assets = this.game.assets;
        if (!assets || !assets.hazards) return;

        this.activeHazards.forEach(hazard => {
            if (hazard.fixed) return;

            const x = hazard.x - camera.x;
            const y = hazard.y - camera.y;

            // Get sprite from assets
            const sprite = assets.hazards[hazard.data.type] || assets.hazards.box;

            if (sprite) {
                context.drawImage(sprite, x - 8, y - 8);
            } else {
                // Fallback rendering
                this.renderFallbackHazard(context, x, y, hazard.data.type);
            }
        });
    }

    /**
     * Fallback rendering for hazards without sprites
     */
    renderFallbackHazard(context, x, y, type) {
        // Hazard indicator
        context.fillStyle = '#dc2626';
        context.fillRect(x - 8, y - 8, 16, 16);
        context.fillStyle = '#ef4444';
        context.fillRect(x - 6, y - 6, 12, 12);

        // Warning symbol
        context.fillStyle = '#fef08a';
        context.font = 'bold 12px monospace';
        context.textAlign = 'center';
        context.fillText('!', x, y + 4);
    }

    /**
     * Generate hazard sprites for AssetGenerator
     * This should be called by AssetGenerator.generateHazards()
     */
    static generateHazardSprites() {
        const createCanvas = (width, height, drawFunc) => {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            drawFunc(ctx);
            return canvas;
        };

        return {
            // === LIQUIDS / SPILLS ===
            spill: createCanvas(16, 16, ctx => {
                // Shadow
                ctx.fillStyle = 'rgba(0,0,0,0.2)';
                ctx.beginPath(); ctx.ellipse(8,11,7,4,0,0,Math.PI*2); ctx.fill();
                // Dark base
                ctx.fillStyle = '#b91c1c';
                ctx.beginPath(); ctx.ellipse(8,10,6,4,0,0,Math.PI*2); ctx.fill();
                // Main puddle (red hazmat)
                ctx.fillStyle = '#dc2626';
                ctx.beginPath(); ctx.ellipse(8,9,5,3,0,0,Math.PI*2); ctx.fill();
                // Highlight
                ctx.fillStyle = '#ef4444';
                ctx.beginPath(); ctx.ellipse(6,8,2,1.5,0,0,Math.PI*2); ctx.fill();
                // Warning reflection
                ctx.fillStyle = '#fecaca';
                ctx.fillRect(9,9,2,1);
            }),

            // === AMAZON BOX ===
            box: createCanvas(16, 16, ctx => {
                // Shadow
                ctx.fillStyle = 'rgba(0,0,0,0.3)';
                ctx.fillRect(2,6,13,10);
                // Main box (Amazon brown)
                ctx.fillStyle = '#92400e';
                ctx.fillRect(1,4,13,10);
                // Front face
                ctx.fillStyle = '#a16207';
                ctx.fillRect(2,5,11,8);
                // Top flaps
                ctx.fillStyle = '#ca8a04';
                ctx.fillRect(2,3,11,2);
                // Amazon tape (Prime blue)
                ctx.fillStyle = '#0284c7';
                ctx.fillRect(4,7,6,2);
                // Smile arrow
                ctx.fillStyle = '#f97316';
                ctx.fillRect(5,10,4,1);
                ctx.fillRect(8,9,1,1);
                // Barcode label
                ctx.fillStyle = '#fff';
                ctx.fillRect(9,5,3,3);
                ctx.fillStyle = '#111';
                ctx.fillRect(10,6,1,1);
            }),

            // === TALL PALLET STACKS ===
            tall_pallet: createCanvas(16, 16, ctx => {
                // Shadow
                ctx.fillStyle = 'rgba(0,0,0,0.3)';
                ctx.fillRect(4,14,10,2);
                // Main stack (Amazon orange)
                ctx.fillStyle = '#c2410c';
                ctx.fillRect(3,1,10,13);
                // Box layers
                ctx.fillStyle = '#ea580c';
                ctx.fillRect(4,2,8,3);
                ctx.fillRect(4,6,8,3);
                ctx.fillRect(4,10,8,3);
                // Tape highlights
                ctx.fillStyle = '#0284c7';
                ctx.fillRect(5,3,2,1); ctx.fillRect(9,3,2,1);
                ctx.fillRect(5,7,2,1); ctx.fillRect(9,7,2,1);
                // Pallet base (wood)
                ctx.fillStyle = '#92400e';
                ctx.fillRect(2,13,12,2);
                ctx.fillStyle = '#a16207';
                ctx.fillRect(3,13,2,2); ctx.fillRect(7,13,2,2); ctx.fillRect(11,13,2,2);
            }),

            // === DEBRIS / BROKEN PALLETS ===
            debris: createCanvas(16, 16, ctx => {
                // Scattered packing material
                ctx.fillStyle = '#d6d3d1';
                ctx.fillRect(2,8,4,2); ctx.fillRect(10,10,3,2);
                // Main broken plank
                ctx.save();
                ctx.translate(8,8);
                ctx.rotate(0.35);
                ctx.fillStyle = '#78350f';
                ctx.fillRect(-6,-2,12,4);
                ctx.fillStyle = '#92400e';
                ctx.fillRect(-5,-1,10,2);
                ctx.restore();
                // Scattered nails/screws
                ctx.fillStyle = '#71717a';
                ctx.fillRect(4,12,1,2); ctx.fillRect(11,11,2,1);
                // Cardboard chunk
                ctx.fillStyle = '#a16207';
                ctx.fillRect(1,4,3,3);
            }),

            // === CONVEYOR / CHUTE ===
            conveyor: createCanvas(16, 16, ctx => {
                // Shadow
                ctx.fillStyle = 'rgba(0,0,0,0.3)';
                ctx.fillRect(2,12,13,3);
                // Frame (industrial gray)
                ctx.fillStyle = '#1f2937';
                ctx.fillRect(1,5,14,8);
                // Belt surface
                ctx.fillStyle = '#374151';
                ctx.fillRect(2,6,12,6);
                // Belt segments
                ctx.fillStyle = '#4b5563';
                ctx.fillRect(3,7,2,4); ctx.fillRect(7,7,2,4); ctx.fillRect(11,7,2,4);
                // Rollers
                ctx.fillStyle = '#9ca3af';
                ctx.fillRect(2,5,3,1); ctx.fillRect(11,5,3,1);
                // Jammed package (Amazon brown)
                ctx.fillStyle = '#92400e';
                ctx.fillRect(5,3,6,4);
                ctx.fillStyle = '#a16207';
                ctx.fillRect(6,4,4,2);
                // Warning light
                ctx.fillStyle = '#ef4444';
                ctx.fillRect(1,4,2,2);
            }),

            // === SCANNER BATTERY / CHARGING STATION ===
            battery: createCanvas(16, 16, ctx => {
                // Shadow
                ctx.fillStyle = 'rgba(0,0,0,0.3)';
                ctx.fillRect(4,13,9,3);
                // Battery body
                ctx.fillStyle = '#1f2937';
                ctx.fillRect(3,5,10,8);
                ctx.fillStyle = '#374151';
                ctx.fillRect(4,6,8,6);
                // Terminals (yellow)
                ctx.fillStyle = '#eab308';
                ctx.fillRect(5,3,2,3); ctx.fillRect(9,3,2,3);
                // Lightning symbol
                ctx.fillStyle = '#facc15';
                ctx.fillRect(7,6,2,1); ctx.fillRect(6,7,1,2); ctx.fillRect(7,8,2,1); ctx.fillRect(9,9,1,2);
                // Warning label
                ctx.fillStyle = '#dc2626';
                ctx.fillRect(5,10,6,2);
                ctx.fillStyle = '#fff';
                ctx.fillRect(7,11,2,1);
            }),

            // === EXTENSION CORD / SCANNER CORD ===
            cord: createCanvas(16, 16, ctx => {
                // Shadow
                ctx.fillStyle = 'rgba(0,0,0,0.2)';
                ctx.beginPath(); ctx.ellipse(8,13,6,2,0,0,Math.PI*2); ctx.fill();
                // Coiled yellow cable
                ctx.strokeStyle = '#eab308';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(2,4);
                ctx.bezierCurveTo(5,10,8,2,11,8);
                ctx.bezierCurveTo(13,12,15,6,14,10);
                ctx.stroke();
                // Cable highlight
                ctx.strokeStyle = '#fbbf24';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(3,3); ctx.bezierCurveTo(6,8,9,2,12,6);
                ctx.stroke();
                // Plug
                ctx.fillStyle = '#1f2937';
                ctx.fillRect(12,8,3,4);
                ctx.fillStyle = '#9ca3af';
                ctx.fillRect(13,12,1,2);
            }),

            // === AMAZON TOTE / BIN ===
            tote: createCanvas(16, 16, ctx => {
                // Shadow
                ctx.fillStyle = 'rgba(0,0,0,0.3)';
                ctx.fillRect(3,13,11,3);
                // Main body (Amazon yellow)
                ctx.fillStyle = '#ca8a04';
                ctx.fillRect(2,5,12,9);
                // Front face
                ctx.fillStyle = '#eab308';
                ctx.fillRect(3,6,10,7);
                // Rim
                ctx.fillStyle = '#fbbf24';
                ctx.fillRect(2,4,12,2);
                // Handle cutouts
                ctx.fillStyle = '#92400e';
                ctx.fillRect(4,5,3,1); ctx.fillRect(9,5,3,1);
                // Label area
                ctx.fillStyle = '#fff';
                ctx.fillRect(5,8,6,3);
                // Barcode
                ctx.fillStyle = '#111';
                ctx.fillRect(6,9,4,1);
            }),

            // === STRETCH WRAP / SHRINK WRAP ===
            wrap: createCanvas(16, 16, ctx => {
                // Shadow
                ctx.fillStyle = 'rgba(0,0,0,0.2)';
                ctx.fillRect(3,12,10,3);
                // Crumpled wrap
                ctx.fillStyle = '#e2e8f0';
                ctx.beginPath();
                ctx.moveTo(2,5); ctx.lineTo(14,4); ctx.lineTo(13,12); ctx.lineTo(3,13);
                ctx.closePath(); ctx.fill();
                // Texture lines
                ctx.fillStyle = '#cbd5e1';
                ctx.fillRect(4,6,8,1); ctx.fillRect(5,9,6,1);
                // Stretched tension
                ctx.fillStyle = '#f1f5f9';
                ctx.fillRect(6,7,4,2);
                // Torn edge
                ctx.fillStyle = '#94a3b8';
                ctx.fillRect(10,10,3,2);
            }),

            // === ROLLER CAGE / GAYLORD CAGE ===
            cage: createCanvas(16, 16, ctx => {
                // Shadow
                ctx.fillStyle = 'rgba(0,0,0,0.3)';
                ctx.fillRect(4,14,9,2);
                // Frame (blue warehouse cage)
                ctx.fillStyle = '#1e40af';
                ctx.fillRect(2,2,12,12);
                // Wire mesh pattern
                ctx.fillStyle = '#3b82f6';
                for (let x = 3; x <= 12; x += 2) { ctx.fillRect(x,3,1,10); }
                for (let y = 4; y <= 11; y += 2) { ctx.fillRect(3,y,10,1); }
                // Contents visible
                ctx.fillStyle = '#92400e';
                ctx.fillRect(5,6,3,4); ctx.fillRect(9,7,3,3);
                // Caster wheels
                ctx.fillStyle = '#111';
                ctx.fillRect(3,13,2,2); ctx.fillRect(11,13,2,2);
            }),

            // === FLAT CART / AMAZON BLUE CART ===
            cart: createCanvas(16, 16, ctx => {
                // Shadow
                ctx.fillStyle = 'rgba(0,0,0,0.3)';
                ctx.fillRect(3,13,11,3);
                // Platform (Amazon blue)
                ctx.fillStyle = '#1e40af';
                ctx.fillRect(2,9,12,4);
                ctx.fillStyle = '#3b82f6';
                ctx.fillRect(2,8,12,2);
                // Handle frame
                ctx.fillStyle = '#1f2937';
                ctx.fillRect(3,3,2,6);
                ctx.fillRect(3,3,9,2);
                ctx.fillRect(11,3,2,3);
                // Grip
                ctx.fillStyle = '#f97316';
                ctx.fillRect(4,3,7,1);
                // Wheels
                ctx.fillStyle = '#111';
                ctx.fillRect(3,12,3,3); ctx.fillRect(10,12,3,3);
                ctx.fillStyle = '#374151';
                ctx.fillRect(4,13,1,1); ctx.fillRect(11,13,1,1);
            }),

            // === FIRE DOOR / EMERGENCY EXIT ===
            door: createCanvas(16, 16, ctx => {
                // Frame
                ctx.fillStyle = '#991b1b';
                ctx.fillRect(3,1,10,14);
                // Door panel (safety green)
                ctx.fillStyle = '#15803d';
                ctx.fillRect(4,2,8,12);
                ctx.fillStyle = '#16a34a';
                ctx.fillRect(5,3,6,10);
                // Window
                ctx.fillStyle = '#0c4a6e';
                ctx.fillRect(6,3,4,3);
                ctx.fillStyle = '#0ea5e9';
                ctx.fillRect(7,4,2,1);
                // Push bar
                ctx.fillStyle = '#dc2626';
                ctx.fillRect(5,8,6,2);
                // EXIT sign
                ctx.fillStyle = '#22c55e';
                ctx.fillRect(6,11,4,2);
                // Wedge blocking (hazard!)
                ctx.fillStyle = '#fbbf24';
                ctx.beginPath();
                ctx.moveTo(4,14); ctx.lineTo(8,14); ctx.lineTo(8,12); ctx.closePath();
                ctx.fill();
            }),

            // === LOADING DOCK ===
            dock: createCanvas(16, 16, ctx => {
                // Shadow/pit
                ctx.fillStyle = '#020617';
                ctx.fillRect(1,8,14,7);
                // Dock plate
                ctx.fillStyle = '#374151';
                ctx.fillRect(2,9,12,5);
                // Diamond plate texture
                ctx.fillStyle = '#4b5563';
                ctx.fillRect(3,10,2,1); ctx.fillRect(6,10,2,1); ctx.fillRect(9,10,2,1); ctx.fillRect(12,10,2,1);
                ctx.fillRect(4,12,2,1); ctx.fillRect(7,12,2,1); ctx.fillRect(10,12,2,1);
                // Yellow safety edge
                ctx.fillStyle = '#eab308';
                ctx.fillRect(2,8,12,2);
                // Warning stripes
                ctx.fillStyle = '#111';
                ctx.fillRect(4,8,2,2); ctx.fillRect(8,8,2,2); ctx.fillRect(12,8,2,2);
                // Edge bumper
                ctx.fillStyle = '#f97316';
                ctx.fillRect(1,6,3,2); ctx.fillRect(12,6,3,2);
            }),

            // === FACILITY HAZARD / BOLLARD ===
            facility: createCanvas(16, 16, ctx => {
                // Shadow
                ctx.fillStyle = 'rgba(0,0,0,0.3)';
                ctx.beginPath(); ctx.ellipse(8,15,4,2,0,0,Math.PI*2); ctx.fill();
                // Column base
                ctx.fillStyle = '#374151';
                ctx.fillRect(5,12,6,3);
                // Main column (safety yellow)
                ctx.fillStyle = '#eab308';
                ctx.fillRect(5,2,6,11);
                // Warning stripes
                ctx.fillStyle = '#111';
                ctx.fillRect(5,4,6,2); ctx.fillRect(5,8,6,2); ctx.fillRect(5,12,6,1);
                // Top cap
                ctx.fillStyle = '#fbbf24';
                ctx.fillRect(5,1,6,2);
                // Reflector
                ctx.fillStyle = '#ef4444';
                ctx.fillRect(6,5,4,1);
            }),

            // === UNSAFE WORKER BEHAVIOR ===
            npc: createCanvas(16, 16, ctx => {
                // Shadow
                ctx.fillStyle = 'rgba(0,0,0,0.25)';
                ctx.beginPath(); ctx.ellipse(8,15,5,2,0,0,Math.PI*2); ctx.fill();
                // Head
                ctx.fillStyle = '#facc15';
                ctx.beginPath();
                ctx.arc(8,4,3,0,Math.PI*2);
                ctx.fill();
                // Body (Amazon hi-vis vest)
                ctx.fillStyle = '#ca8a04';
                ctx.fillRect(5,7,6,7);
                ctx.fillStyle = '#eab308';
                ctx.fillRect(6,8,4,5);
                // Hi-vis reflective stripes
                ctx.fillStyle = '#fef08a';
                ctx.fillRect(5,8,6,1); ctx.fillRect(5,11,6,1);
                // Phone in hand (distracted!)
                ctx.fillStyle = '#1f2937';
                ctx.fillRect(11,6,3,5);
                ctx.fillStyle = '#60a5fa';
                ctx.fillRect(12,7,1,3);
                // Legs
                ctx.fillStyle = '#1e3a8a';
                ctx.fillRect(6,13,2,2); ctx.fillRect(8,13,2,2);
            }),

            // === PIT FORKLIFT ===
            forklift: createCanvas(16, 16, ctx => {
                // Shadow
                ctx.fillStyle = 'rgba(0,0,0,0.3)';
                ctx.fillRect(5,13,10,3);
                // Main body (Amazon orange)
                ctx.fillStyle = '#c2410c';
                ctx.fillRect(3,7,8,6);
                ctx.fillStyle = '#ea580c';
                ctx.fillRect(4,8,6,4);
                // Cabin/cage
                ctx.fillStyle = '#1f2937';
                ctx.fillRect(3,4,7,4);
                ctx.fillStyle = '#374151';
                ctx.fillRect(4,5,5,2);
                // Windshield
                ctx.fillStyle = '#0c4a6e';
                ctx.fillRect(5,5,3,2);
                // Mast
                ctx.fillStyle = '#374151';
                ctx.fillRect(10,2,2,11);
                ctx.fillStyle = '#4b5563';
                ctx.fillRect(11,3,1,9);
                // Forks
                ctx.fillStyle = '#eab308';
                ctx.fillRect(11,11,4,1); ctx.fillRect(11,13,4,1);
                // Wheels
                ctx.fillStyle = '#111';
                ctx.fillRect(3,12,3,3); ctx.fillRect(7,12,3,3);
                // Warning light
                ctx.fillStyle = '#f97316';
                ctx.fillRect(5,4,2,1);
            }),

            // === COMPLIANCE / AUDIT CLIPBOARD ===
            compliance: createCanvas(16, 16, ctx => {
                // Shadow
                ctx.fillStyle = 'rgba(0,0,0,0.2)';
                ctx.fillRect(4,13,9,3);
                // Clipboard board
                ctx.fillStyle = '#92400e';
                ctx.fillRect(3,2,10,13);
                ctx.fillStyle = '#a16207';
                ctx.fillRect(4,3,8,11);
                // Metal clip
                ctx.fillStyle = '#9ca3af';
                ctx.fillRect(6,1,4,3);
                ctx.fillStyle = '#d4d4d8';
                ctx.fillRect(7,2,2,1);
                // Paper
                ctx.fillStyle = '#f5f5f4';
                ctx.fillRect(5,4,6,9);
                // Checklist lines
                ctx.fillStyle = '#71717a';
                ctx.fillRect(6,5,4,1); ctx.fillRect(6,7,4,1); ctx.fillRect(6,9,3,1);
                // Red X marks (violations!)
                ctx.fillStyle = '#dc2626';
                ctx.fillRect(10,5,1,1); ctx.fillRect(10,7,1,1);
                // Warning stamp
                ctx.fillStyle = '#ef4444';
                ctx.fillRect(6,10,4,2);
            }),

            // === BOX CUTTER / SAFETY BLADE ===
            blade: createCanvas(16, 16, ctx => {
                // Shadow
                ctx.fillStyle = 'rgba(0,0,0,0.2)';
                ctx.fillRect(4,12,10,3);
                // Handle (safety orange)
                ctx.fillStyle = '#ea580c';
                ctx.fillRect(2,7,9,4);
                ctx.fillStyle = '#f97316';
                ctx.fillRect(3,8,7,2);
                // Grip ridges
                ctx.fillStyle = '#c2410c';
                ctx.fillRect(4,8,1,2); ctx.fillRect(6,8,1,2); ctx.fillRect(8,8,1,2);
                // Blade (exposed!)
                ctx.fillStyle = '#d4d4d8';
                ctx.fillRect(10,8,4,2);
                ctx.fillStyle = '#a1a1aa';
                ctx.fillRect(11,8,3,1);
                // Blade edge (sharp!)
                ctx.fillStyle = '#e4e4e7';
                ctx.fillRect(13,8,1,2);
                // Guard tab
                ctx.fillStyle = '#dc2626';
                ctx.fillRect(10,6,2,2);
            })
        };
    }
}

export default HazardSystem;
