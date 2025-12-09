/**
 * Camera System - Handles viewport and camera following
 */

import { GAME_CONSTANTS } from '../constants.js';

export class CameraSystem {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.mapWidth = 0;
        this.mapHeight = 0;
    }

    setMapSize(width, height) {
        this.mapWidth = width * GAME_CONSTANTS.TILE_SIZE;
        this.mapHeight = height * GAME_CONSTANTS.TILE_SIZE;
    }

    update(targetX, targetY) {
        // Center camera on target
        this.x = targetX - GAME_CONSTANTS.SCREEN_WIDTH / 2;
        this.y = targetY - GAME_CONSTANTS.SCREEN_HEIGHT / 2;

        // Clamp camera to map bounds
        const minX = GAME_CONSTANTS.VIEWPORT_PADDING;
        const minY = GAME_CONSTANTS.VIEWPORT_PADDING;
        const maxX = this.mapWidth - GAME_CONSTANTS.SCREEN_WIDTH - GAME_CONSTANTS.VIEWPORT_PADDING;
        const maxY = this.mapHeight - GAME_CONSTANTS.SCREEN_HEIGHT - GAME_CONSTANTS.VIEWPORT_PADDING;

        this.x = Math.max(minX, Math.min(maxX, this.x));
        this.y = Math.max(minY, Math.min(maxY, this.y));
    }

    reset() {
        this.x = 0;
        this.y = 0;
    }
}
