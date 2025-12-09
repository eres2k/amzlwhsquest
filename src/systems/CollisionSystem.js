/**
 * Collision System - Handles collision detection and response
 */

import { GAME_CONSTANTS } from '../constants.js';

export class CollisionSystem {
    constructor() {
        this.map = [];
    }

    setMap(map) {
        this.map = map;
    }

    checkTileCollision(x, y) {
        const tx = Math.floor(x / GAME_CONSTANTS.TILE_SIZE);
        const ty = Math.floor(y / GAME_CONSTANTS.TILE_SIZE);

        if (ty < 0 || ty >= this.map.length) return true;
        if (tx < 0 || tx >= this.map[0].length) return true;

        return this.map[ty][tx] === 1;
    }

    isTileFree(tx, ty) {
        if (ty < 0 || ty >= this.map.length) return false;
        if (tx < 0 || tx >= this.map[0].length) return false;
        return this.map[ty][tx] === 0;
    }

    checkCircleCollision(x1, y1, r1, x2, y2, r2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist < (r1 + r2);
    }

    checkRectCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
        return x1 < x2 + w2 &&
               x1 + w1 > x2 &&
               y1 < y2 + h2 &&
               y1 + h1 > y2;
    }
}
