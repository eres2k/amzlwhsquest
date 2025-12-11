/**
 * Renderer - MVP Version
 * Basic rendering for game world
 */

import { GAME_CONSTANTS } from '../constants.js';

export class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    draw(game, assets, particleSystem) {
        const ctx = this.ctx;
        const camera = game.camera;

        // Apply screen shake
        if (game.shake > 0) {
            const shakeX = (Math.random() - 0.5) * game.shake;
            const shakeY = (Math.random() - 0.5) * game.shake;
            ctx.save();
            ctx.translate(shakeX, shakeY);
        }

        // Clear screen
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw map
        this.drawMap(ctx, game.map, assets, camera);

        // Draw hazards
        this.drawHazards(ctx, game.activeIssues, assets, camera);

        // Draw door if exists
        if (game.fireExitDoor) {
            this.drawDoor(ctx, game.fireExitDoor, assets, camera);
        }

        // Draw entities
        this.drawEntities(ctx, game.entities, assets, camera);

        // Draw player
        if (game.player) {
            this.drawPlayer(ctx, game.player, assets, camera);
        }

        // Draw boss
        if (game.boss) {
            this.drawBoss(ctx, game.boss, assets, camera);
        }

        // Draw projectiles
        this.drawProjectiles(ctx, game.projectiles, assets, camera);

        // Draw particles and floating text
        if (particleSystem) {
            particleSystem.draw(ctx, camera);
        }

        // Apply screen flash
        if (game.flash > 0) {
            ctx.globalAlpha = game.flash / 10;
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            ctx.globalAlpha = 1;
        }

        // Restore context if shake was applied
        if (game.shake > 0) {
            ctx.restore();
        }
    }

    drawMap(ctx, map, assets, camera) {
        const tileSize = GAME_CONSTANTS.TILE_SIZE;
        const startX = Math.floor(camera.x / tileSize);
        const startY = Math.floor(camera.y / tileSize);
        const endX = Math.ceil((camera.x + GAME_CONSTANTS.SCREEN_WIDTH) / tileSize);
        const endY = Math.ceil((camera.y + GAME_CONSTANTS.SCREEN_HEIGHT) / tileSize);
        const env = assets.environment;

        for (let ty = Math.max(0, startY); ty < Math.min(map.length, endY); ty++) {
            for (let tx = Math.max(0, startX); tx < Math.min(map[0].length, endX); tx++) {
                const screenX = tx * tileSize - camera.x;
                const screenY = ty * tileSize - camera.y;
                const tile = map[ty][tx];

                if (tile === 1) {
                    // Wall/Shelf - use environment assets with variety
                    if (env) {
                        const hash = (tx * 37 + ty * 23) % 100;
                        if (hash < 30 && env.shelfBoxes1) {
                            ctx.drawImage(env.shelfBoxes1, screenX, screenY);
                        } else if (hash < 55 && env.shelfBoxes2) {
                            ctx.drawImage(env.shelfBoxes2, screenX, screenY);
                        } else if (hash < 70 && env.shelfEmpty) {
                            ctx.drawImage(env.shelfEmpty, screenX, screenY);
                        } else if (env.wall) {
                            ctx.drawImage(env.wall, screenX, screenY);
                        } else {
                            ctx.drawImage(assets.wall, screenX, screenY);
                        }
                    } else {
                        ctx.drawImage(assets.wall, screenX, screenY);
                    }
                } else if (tile === 2) {
                    // Conveyor
                    if (env?.conveyor) {
                        ctx.drawImage(env.conveyor, screenX, screenY);
                    } else {
                        ctx.drawImage(assets.floor, screenX, screenY);
                    }
                } else if (tile === 3) {
                    // Door/Exit
                    ctx.drawImage(assets.door, screenX, screenY);
                } else {
                    // Floor - use environment assets with variety
                    if (env) {
                        const hash = (tx * 31 + ty * 17) % 100;
                        if (hash < 5 && env.floorMarked) {
                            ctx.drawImage(env.floorMarked, screenX, screenY);
                        } else if (hash < 8 && env.floorCrossing) {
                            ctx.drawImage(env.floorCrossing, screenX, screenY);
                        } else if (hash < 12 && env.pallet) {
                            ctx.drawImage(env.pallet, screenX, screenY);
                        } else if (env.floor) {
                            ctx.drawImage(env.floor, screenX, screenY);
                        } else {
                            ctx.drawImage(assets.floor, screenX, screenY);
                        }
                    } else {
                        ctx.drawImage(assets.floor, screenX, screenY);
                    }
                }
            }
        }

        // Draw warehouse signs
        this.drawWarehouseSigns(ctx, map, assets, camera);
    }

    drawWarehouseSigns(ctx, map, assets, camera) {
        const env = assets.environment;
        if (!env) return;

        const tileSize = GAME_CONSTANTS.TILE_SIZE;
        const mapWidth = map[0]?.length || 60;
        const mapHeight = map.length || 40;

        // Define sign positions
        const signs = [
            { x: 5, y: 1, type: 'signAmazon' },
            { x: Math.floor(mapWidth / 2), y: 1, type: 'signDVI1' },
            { x: mapWidth - 7, y: 1, type: 'signAustria' },
            { x: 8, y: 6, type: 'signINBOUND' },
            { x: mapWidth - 12, y: 6, type: 'signOUTBOUND' },
            { x: Math.floor(mapWidth / 3), y: Math.floor(mapHeight / 2), type: 'signPICKING' },
            { x: Math.floor(mapWidth * 2 / 3), y: Math.floor(mapHeight / 2), type: 'signPACKING' },
            { x: Math.floor(mapWidth / 2), y: mapHeight - 4, type: 'signSHIPPING' },
            { x: 3, y: 10, type: 'signSafety' },
            { x: mapWidth - 4, y: 15, type: 'signSafety' },
        ];

        for (const sign of signs) {
            const screenX = sign.x * tileSize - camera.x;
            const screenY = sign.y * tileSize - camera.y;

            if (screenX < -50 || screenX > GAME_CONSTANTS.SCREEN_WIDTH + 50) continue;
            if (screenY < -20 || screenY > GAME_CONSTANTS.SCREEN_HEIGHT + 20) continue;

            const signAsset = env[sign.type];
            if (signAsset) {
                ctx.drawImage(signAsset, screenX, screenY);
            }
        }

        // Draw aisle markers
        const aisleRows = ['A', 'B', 'C', 'D'];
        for (let i = 0; i < aisleRows.length; i++) {
            for (let j = 1; j <= 4; j++) {
                const x = 8 + i * 12;
                const y = 4 + j * 7;
                if (x < mapWidth && y < mapHeight) {
                    const screenX = x * tileSize - camera.x;
                    const screenY = y * tileSize - camera.y;

                    if (screenX < -20 || screenX > GAME_CONSTANTS.SCREEN_WIDTH + 20) continue;
                    if (screenY < -20 || screenY > GAME_CONSTANTS.SCREEN_HEIGHT + 20) continue;

                    const markerAsset = env[`aisle${aisleRows[i]}${j}`];
                    if (markerAsset) {
                        ctx.drawImage(markerAsset, screenX, screenY);
                    }
                }
            }
        }
    }

    drawHazards(ctx, hazards, assets, camera) {
        for (const hazard of hazards) {
            if (hazard.fixed) continue;

            const screenX = hazard.x - camera.x;
            const screenY = hazard.y - camera.y;

            // Choose asset based on hazard type
            const assetKey = `hazard_${hazard.type}`;
            const sprite = assets[assetKey] || assets.hazard;

            ctx.drawImage(sprite, screenX, screenY);

            // Draw exclamation mark above hazard
            if (assets.exclamation) {
                ctx.drawImage(assets.exclamation, screenX + 4, screenY - 10);
            }
        }
    }

    drawDoor(ctx, door, assets, camera) {
        const screenX = door.x - camera.x;
        const screenY = door.y - camera.y;
        ctx.drawImage(assets.door, screenX, screenY);
    }

    drawEntities(ctx, entities, assets, camera) {
        for (const entity of entities) {
            const screenX = entity.x - camera.x;
            const screenY = entity.y - camera.y;

            // Simple colored circle for entities
            const color = entity.type === 'ops' ? '#f59e0b' :
                         entity.type === 'runner' ? '#22c55e' :
                         '#ef4444'; // simon

            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(screenX, screenY, 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#000';
            ctx.stroke();
        }
    }

    drawPlayer(ctx, player, assets, camera) {
        const screenX = player.x - camera.x;
        const screenY = player.y - camera.y;

        // Draw player sprite
        const sprite = assets.chars[player.characterName];
        if (sprite) {
            ctx.drawImage(sprite, screenX - 8, screenY - 8);
        }

        // Draw iframe flash
        if (player.iframe > 0 && Math.floor(player.iframe / 5) % 2 === 0) {
            ctx.globalAlpha = 0.5;
            ctx.fillStyle = '#fff';
            ctx.fillRect(screenX - 8, screenY - 8, 16, 16);
            ctx.globalAlpha = 1;
        }
    }

    drawBoss(ctx, boss, assets, camera) {
        const screenX = boss.x - camera.x;
        const screenY = boss.y - camera.y;

        // Draw boss sprite
        const sprite = assets[boss.sprite];
        if (sprite) {
            ctx.drawImage(sprite, screenX - 16, screenY - 16);
        }
    }

    drawProjectiles(ctx, projectiles, assets, camera) {
        for (const proj of projectiles) {
            if (!proj.active) continue;

            const screenX = proj.x - camera.x;
            const screenY = proj.y - camera.y;

            const sprite = assets[proj.sprite];
            if (sprite) {
                ctx.drawImage(sprite, screenX - 6, screenY - 6);
            }
        }
    }
}
