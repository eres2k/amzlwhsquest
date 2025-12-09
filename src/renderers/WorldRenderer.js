/**
 * WorldRenderer.js
 * Renders the game world (map, entities, player)
 */

export class WorldRenderer {
    constructor(game) {
        this.game = game;
        this.tileSize = game.tileSize || 16;
    }

    /**
     * Render the game world
     */
    render(context, state) {
        this.renderMap(context, state);
        this.renderConveyors(context, state);
        this.renderDecorations(context, state);
        this.renderHazards(context, state);
        this.renderEntities(context, state);
        this.renderPlayer(context, state);
        this.renderProjectiles(context, state);
        this.renderParticles(context, state);
        this.renderFloatingTexts(context, state);
    }

    /**
     * Render map tiles
     */
    renderMap(context, state) {
        if (!this.game.map) return;

        const map = this.game.map;
        const camera = this.game.camera || { x: 0, y: 0 };

        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                const tile = map[y][x];
                const px = x * this.tileSize - camera.x;
                const py = y * this.tileSize - camera.y;

                switch(tile) {
                    case 0: // Floor
                        this.renderFloorTile(context, px, py);
                        break;
                    case 1: // Wall
                        this.renderWallTile(context, px, py);
                        break;
                    case 2: // Conveyor
                        this.renderConveyorTile(context, px, py);
                        break;
                    case 3: // Door
                        this.renderDoorTile(context, px, py);
                        break;
                }
            }
        }
    }

    renderFloorTile(context, x, y) {
        context.fillStyle = '#1a1f2e';
        context.fillRect(x, y, this.tileSize, this.tileSize);
        context.fillStyle = '#252b3d';
        context.fillRect(x + 1, y + 1, this.tileSize - 2, this.tileSize - 2);
    }

    renderWallTile(context, x, y) {
        context.fillStyle = '#374151';
        context.fillRect(x, y, this.tileSize, this.tileSize);
        context.fillStyle = '#4b5563';
        context.fillRect(x + 2, y + 2, this.tileSize - 4, this.tileSize - 4);
    }

    renderConveyorTile(context, x, y) {
        context.fillStyle = '#0f172a';
        context.fillRect(x, y, this.tileSize, this.tileSize);
        context.fillStyle = '#1e293b';
        context.fillRect(x + 1, y + 1, this.tileSize - 2, this.tileSize - 2);

        // Arrow
        context.strokeStyle = '#fbbf24';
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(x + 4, y + 8);
        context.lineTo(x + 12, y + 8);
        context.lineTo(x + 10, y + 6);
        context.moveTo(x + 12, y + 8);
        context.lineTo(x + 10, y + 10);
        context.stroke();
    }

    renderDoorTile(context, x, y) {
        context.fillStyle = '#dc2626';
        context.fillRect(x, y, this.tileSize, this.tileSize);
        context.fillStyle = '#ef4444';
        context.fillRect(x + 2, y + 2, this.tileSize - 4, this.tileSize - 4);
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
