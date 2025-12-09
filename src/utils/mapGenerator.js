/**
 * Map Generator - MVP Version
 * Creates a simple warehouse floor with walls and open space
 */

import { GAME_CONSTANTS } from '../constants.js';
import { pickRandomHazards } from '../data/hazards.js';

export class MapGenerator {
    constructor() {
        this.width = GAME_CONSTANTS.MAP_W;
        this.height = GAME_CONSTANTS.MAP_H;
    }

    generate() {
        const map = this.createEmptyMap();
        this.addWalls(map);
        this.addSomeColumns(map);
        const hazards = this.placeHazards(map);
        const door = this.placeDoor(map);

        return {
            map,
            clutter: [],
            hazards,
            door,
            conveyorBelts: [],
            packages: [],
            palletJacks: [],
            entities: []
        };
    }

    createEmptyMap() {
        // Create 2D array filled with 0 (empty floor)
        const map = [];
        for (let y = 0; y < this.height; y++) {
            map[y] = [];
            for (let x = 0; x < this.width; x++) {
                map[y][x] = 0;
            }
        }
        return map;
    }

    addWalls(map) {
        // Add border walls
        for (let x = 0; x < this.width; x++) {
            map[0][x] = 1; // Top wall
            map[this.height - 1][x] = 1; // Bottom wall
        }
        for (let y = 0; y < this.height; y++) {
            map[y][0] = 1; // Left wall
            map[y][this.width - 1] = 1; // Right wall
        }
    }

    addSomeColumns(map) {
        // Add a few columns for obstacles
        const columnPositions = [
            [10, 10], [10, 30], [20, 20], [30, 10], [30, 30],
            [40, 15], [40, 25], [50, 10], [50, 30]
        ];

        for (const [x, y] of columnPositions) {
            if (x > 1 && x < this.width - 2 && y > 1 && y < this.height - 2) {
                map[y][x] = 1;
            }
        }
    }

    placeHazards(map) {
        // Place 5 random hazards in open areas
        const hazards = pickRandomHazards(5);
        const placedHazards = [];

        for (let i = 0; i < hazards.length; i++) {
            const hazard = hazards[i];
            let placed = false;
            let attempts = 0;

            while (!placed && attempts < 50) {
                const x = Math.floor(Math.random() * (this.width - 10)) + 5;
                const y = Math.floor(Math.random() * (this.height - 10)) + 5;

                // Check if area is clear
                if (this.isAreaClear(map, x, y, 2)) {
                    placedHazards.push({
                        id: i + 1,
                        name: hazard.name,
                        type: hazard.type,
                        tx: x,
                        ty: y,
                        x: x * GAME_CONSTANTS.TILE_SIZE,
                        y: y * GAME_CONSTANTS.TILE_SIZE,
                        fixed: false
                    });
                    placed = true;
                }
                attempts++;
            }
        }

        return placedHazards;
    }

    placeDoor(map) {
        // Place exit door on right side
        const doorY = Math.floor(this.height / 2);
        const doorX = this.width - 2;

        map[doorY][doorX] = 0; // Make sure it's not a wall

        return {
            tx: doorX,
            ty: doorY,
            x: doorX * GAME_CONSTANTS.TILE_SIZE,
            y: doorY * GAME_CONSTANTS.TILE_SIZE
        };
    }

    isAreaClear(map, tx, ty, radius) {
        for (let dy = -radius; dy <= radius; dy++) {
            for (let dx = -radius; dx <= radius; dx++) {
                const checkX = tx + dx;
                const checkY = ty + dy;

                if (checkY < 0 || checkY >= this.height || checkX < 0 || checkX >= this.width) {
                    return false;
                }

                if (map[checkY][checkX] !== 0) {
                    return false;
                }
            }
        }
        return true;
    }
}
