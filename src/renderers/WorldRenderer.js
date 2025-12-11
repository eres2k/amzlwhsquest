/**
 * WorldRenderer.js
 * Renders the game world (map, entities, player)
 * Enhanced for Amazon DVI1 logistics warehouse aesthetics
 */

export class WorldRenderer {
    constructor(game) {
        this.game = game;
        this.tileSize = game.tileSize || 16;
        this.warehouseSignsGenerated = false;
        this.warehouseSigns = [];
        this.aisleMarkers = [];
    }

    /**
     * Render the game world
     */
    render(context, state) {
        // Generate warehouse decorations once
        if (!this.warehouseSignsGenerated && this.game.map) {
            this.generateWarehouseDecorations();
            this.warehouseSignsGenerated = true;
        }

        this.renderMap(context, state);
        this.renderConveyors(context, state);
        this.renderWarehouseSigns(context, state);
        this.renderDecorations(context, state);
        this.renderHazards(context, state);
        this.renderEntities(context, state);
        this.renderPlayer(context, state);
        this.renderProjectiles(context, state);
        this.renderParticles(context, state);
        this.renderFloatingTexts(context, state);
    }

    /**
     * Generate warehouse-specific decorations based on map
     */
    generateWarehouseDecorations() {
        const map = this.game.map;
        if (!map) return;

        const mapWidth = map[0]?.length || 60;
        const mapHeight = map.length || 40;

        // Add main Amazon/DVI1 signs at key locations
        this.warehouseSigns = [
            // Main entrance area signs
            { x: 5 * this.tileSize, y: 1 * this.tileSize, type: 'signAmazon' },
            { x: Math.floor(mapWidth / 2) * this.tileSize, y: 1 * this.tileSize, type: 'signDVI1' },
            { x: (mapWidth - 7) * this.tileSize, y: 1 * this.tileSize, type: 'signAustria' },

            // Zone signs
            { x: 8 * this.tileSize, y: 6 * this.tileSize, type: 'signINBOUND' },
            { x: (mapWidth - 12) * this.tileSize, y: 6 * this.tileSize, type: 'signOUTBOUND' },
            { x: Math.floor(mapWidth / 3) * this.tileSize, y: Math.floor(mapHeight / 2) * this.tileSize, type: 'signPICKING' },
            { x: Math.floor(mapWidth * 2 / 3) * this.tileSize, y: Math.floor(mapHeight / 2) * this.tileSize, type: 'signPACKING' },
            { x: Math.floor(mapWidth / 2) * this.tileSize, y: (mapHeight - 4) * this.tileSize, type: 'signSHIPPING' },

            // Safety signs scattered around
            { x: 3 * this.tileSize, y: 10 * this.tileSize, type: 'signSafety' },
            { x: (mapWidth - 4) * this.tileSize, y: 15 * this.tileSize, type: 'signSafety' },
            { x: Math.floor(mapWidth / 2) * this.tileSize, y: 25 * this.tileSize, type: 'signSafety' },
        ];

        // Add aisle markers
        const aisleRows = ['A', 'B', 'C', 'D'];
        for (let i = 0; i < aisleRows.length; i++) {
            for (let j = 1; j <= 4; j++) {
                const x = (8 + i * 12) * this.tileSize;
                const y = (4 + j * 7) * this.tileSize;
                if (x < mapWidth * this.tileSize && y < mapHeight * this.tileSize) {
                    this.aisleMarkers.push({
                        x: x,
                        y: y,
                        type: `aisle${aisleRows[i]}${j}`
                    });
                }
            }
        }
    }

    /**
     * Render map tiles
     */
    renderMap(context, state) {
        if (!this.game.map) return;

        const map = this.game.map;
        const camera = this.game.camera || { x: 0, y: 0 };
        const env = this.game.assets?.environment;

        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                const tile = map[y][x];
                const px = x * this.tileSize - camera.x;
                const py = y * this.tileSize - camera.y;

                // Skip tiles outside viewport
                if (px < -this.tileSize || px > 960 || py < -this.tileSize || py > 540) continue;

                switch(tile) {
                    case 0: // Floor
                        this.renderFloorTile(context, px, py, x, y, env);
                        break;
                    case 1: // Wall/Shelf
                        this.renderWallTile(context, px, py, x, y, env);
                        break;
                    case 2: // Conveyor
                        this.renderConveyorTile(context, px, py, env);
                        break;
                    case 3: // Door
                        this.renderDoorTile(context, px, py, env);
                        break;
                }
            }
        }
    }

    renderFloorTile(context, x, y, tileX, tileY, env) {
        // Use procedural floor asset if available
        if (env?.floor) {
            // Vary floor tiles for visual interest
            const hash = (tileX * 31 + tileY * 17) % 100;

            if (hash < 5 && env.floorMarked) {
                // Safety line floor
                context.drawImage(env.floorMarked, x, y);
            } else if (hash < 8 && env.floorCrossing) {
                // Crossing stripes
                context.drawImage(env.floorCrossing, x, y);
            } else if (hash < 12 && env.pallet) {
                // Pallet on floor
                context.drawImage(env.pallet, x, y);
            } else {
                // Standard concrete floor
                context.drawImage(env.floor, x, y);
            }
        } else {
            // Fallback warehouse concrete floor
            context.fillStyle = '#3a3f4a';
            context.fillRect(x, y, this.tileSize, this.tileSize);
            context.fillStyle = '#424750';
            context.fillRect(x + 2, y + 2, 4, 4);
            context.strokeStyle = '#4a5058';
            context.lineWidth = 1;
            context.strokeRect(x, y, this.tileSize, this.tileSize);
        }
    }

    renderWallTile(context, x, y, tileX, tileY, env) {
        // Use procedural shelf/wall assets
        if (env?.wall) {
            // Vary shelf contents for visual interest
            const hash = (tileX * 37 + tileY * 23) % 100;

            if (hash < 30 && env.shelfBoxes1) {
                // Cardboard boxes shelf
                context.drawImage(env.shelfBoxes1, x, y);
            } else if (hash < 55 && env.shelfBoxes2) {
                // Totes/bins shelf
                context.drawImage(env.shelfBoxes2, x, y);
            } else if (hash < 70 && env.shelfEmpty) {
                // Empty shelf
                context.drawImage(env.shelfEmpty, x, y);
            } else {
                // Standard shelf with packages
                context.drawImage(env.wall, x, y);
            }
        } else {
            // Fallback orange Amazon-style racking
            context.fillStyle = '#c2410c';
            context.fillRect(x, y, this.tileSize, this.tileSize);
            context.fillStyle = '#ea580c';
            context.fillRect(x + 1, y, 2, this.tileSize);
            context.fillRect(x + 13, y, 2, this.tileSize);
            context.fillRect(x, y + 1, this.tileSize, 2);
            context.fillRect(x, y + 7, this.tileSize, 2);
            context.fillRect(x, y + 13, this.tileSize, 2);
            // Packages
            context.fillStyle = '#92400e';
            context.fillRect(x + 3, y + 3, 5, 3);
            context.fillRect(x + 4, y + 9, 4, 3);
        }
    }

    renderConveyorTile(context, x, y, env) {
        if (env?.conveyor) {
            context.drawImage(env.conveyor, x, y);
        } else {
            // Fallback conveyor belt
            context.fillStyle = '#1f2937';
            context.fillRect(x, y, this.tileSize, this.tileSize);
            context.fillStyle = '#374151';
            context.fillRect(x + 1, y + 2, 14, 12);
            // Rollers
            context.fillStyle = '#4b5563';
            for (let i = 0; i < 4; i++) {
                context.fillRect(x + 2 + i * 4, y + 4, 2, 8);
            }
            // Arrows
            context.fillStyle = '#f59e0b';
            context.beginPath();
            context.moveTo(x + 4, y + 8);
            context.lineTo(x + 8, y + 5);
            context.lineTo(x + 8, y + 11);
            context.closePath();
            context.fill();
        }
    }

    renderDoorTile(context, x, y, env) {
        // Fire exit door with green
        context.fillStyle = '#15803d';
        context.fillRect(x, y, this.tileSize, this.tileSize);
        context.fillStyle = '#22c55e';
        context.fillRect(x + 2, y + 2, this.tileSize - 4, this.tileSize - 4);
        // Exit text
        context.fillStyle = '#fff';
        context.font = '6px monospace';
        context.textAlign = 'center';
        context.fillText('EXIT', x + 8, y + 10);
    }

    /**
     * Render warehouse signs (Amazon, DVI1, Austria, zone markers)
     */
    renderWarehouseSigns(context, state) {
        const camera = this.game.camera || { x: 0, y: 0 };
        const env = this.game.assets?.environment;

        if (!env) return;

        // Render main warehouse signs
        for (const sign of this.warehouseSigns) {
            const screenX = sign.x - camera.x;
            const screenY = sign.y - camera.y;

            // Skip if off screen
            if (screenX < -50 || screenX > 960 || screenY < -20 || screenY > 540) continue;

            const signAsset = env[sign.type];
            if (signAsset) {
                context.drawImage(signAsset, screenX, screenY);
            }
        }

        // Render aisle markers
        for (const marker of this.aisleMarkers) {
            const screenX = marker.x - camera.x;
            const screenY = marker.y - camera.y;

            if (screenX < -20 || screenX > 960 || screenY < -20 || screenY > 540) continue;

            const markerAsset = env[marker.type];
            if (markerAsset) {
                context.drawImage(markerAsset, screenX, screenY);
            }
        }
    }

    /**
     * Render conveyor belts
     */
    renderConveyors(context, state) {
        if (!this.game.conveyorBelts) return;

        const camera = this.game.camera || { x: 0, y: 0 };

        this.game.conveyorBelts.forEach(belt => {
            const x = belt.x - camera.x;
            const y = belt.y - camera.y;

            context.strokeStyle = belt.dir > 0 ? '#fbbf24' : '#22d3ee';
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(x + 2, y + 8);
            context.lineTo(x + 14, y + 8);
            context.stroke();
        });
    }

    /**
     * Render decorations
     */
    renderDecorations(context, state) {
        const camera = this.game.camera || { x: 0, y: 0 };

        // Pallet stacks
        if (this.game.palletStacks) {
            this.game.palletStacks.forEach(pallet => {
                const x = pallet.x - camera.x;
                const y = pallet.y - camera.y;

                context.fillStyle = '#92400e';
                context.fillRect(x, y, 16, 16);
                context.fillStyle = '#b45309';
                context.fillRect(x + 2, y + 2, 12, 12);
            });
        }

        // Clutter
        if (this.game.clutter) {
            this.game.clutter.forEach(item => {
                const x = item.x - camera.x;
                const y = item.y - camera.y;

                switch(item.type) {
                    case 'coffee':
                        context.fillStyle = '#78350f';
                        context.fillRect(x, y, 4, 6);
                        break;
                    case 'paper':
                        context.fillStyle = '#f8fafc';
                        context.fillRect(x, y, 6, 4);
                        break;
                    case 'tape':
                        context.fillStyle = '#fbbf24';
                        context.fillRect(x, y, 5, 5);
                        break;
                }
            });
        }
    }

    /**
     * Render hazards
     */
    renderHazards(context, state) {
        // Use centralized hazard system
        if (this.game.hazards) {
            const camera = this.game.camera || { x: 0, y: 0 };
            this.game.hazards.render(context, camera);
        }
    }

    /**
     * Render entities (NPCs)
     */
    renderEntities(context, state) {
        if (!state.entities) return;

        const camera = this.game.camera || { x: 0, y: 0 };

        state.entities.forEach(entity => {
            const x = entity.x - camera.x;
            const y = entity.y - camera.y;

            // Get sprite from assets
            const sprite = this.game.assets?.npcs?.[entity.type];

            if (sprite) {
                context.drawImage(sprite, x - 8, y - 8);
            } else {
                // Fallback rendering
                context.fillStyle = entity.type === 'runner' ? '#ef4444' : '#fbbf24';
                context.fillRect(x - 6, y - 6, 12, 12);
            }
        });
    }

    /**
     * Render player
     */
    renderPlayer(context, state) {
        if (!state.player) return;

        const p = state.player;
        const camera = this.game.camera || { x: 0, y: 0 };
        const x = p.x - camera.x;
        const y = p.y - camera.y;

        // Flashing during iframe
        if (p.iframe > 0 && Math.floor(p.iframe / 5) % 2 === 0) {
            return;
        }

        // Get character sprite
        const sprite = this.game.assets?.chars?.[p.character];

        if (sprite) {
            context.drawImage(sprite, x - 8, y - 8);
        } else {
            // Fallback
            context.fillStyle = '#00ffff';
            context.fillRect(x - 7, y - 7, 14, 14);
        }
    }

    /**
     * Render projectiles
     */
    renderProjectiles(context, state) {
        if (!state.projectiles) return;

        const camera = this.game.camera || { x: 0, y: 0 };

        state.projectiles.forEach(proj => {
            if (!proj.active) return;

            const x = proj.x - camera.x;
            const y = proj.y - camera.y;

            // Get attack sprite
            const sprite = this.game.assets?.attacks?.[proj.character];

            if (sprite) {
                context.drawImage(sprite, x - 7, y - 7);
            } else {
                context.fillStyle = '#a855f7';
                context.beginPath();
                context.arc(x, y, 5, 0, Math.PI * 2);
                context.fill();
            }
        });
    }

    /**
     * Render particles
     */
    renderParticles(context, state) {
        // Use centralized particle system
        if (this.game.particles) {
            const camera = this.game.camera || { x: 0, y: 0 };
            this.game.particles.render(context, camera);
        }
    }

    /**
     * Render floating texts
     */
    renderFloatingTexts(context, state) {
        // Use centralized floating text system
        if (this.game.floatingTexts) {
            const camera = this.game.camera || { x: 0, y: 0 };
            this.game.floatingTexts.render(context, camera);
        }
    }
}

export default WorldRenderer;
