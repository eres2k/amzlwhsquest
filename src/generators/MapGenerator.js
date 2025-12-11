/**
 * MapGenerator.js
 * Enhanced procedural map generation with room-based layouts
 * Generates warehouse floors with rooms, corridors, and dynamic obstacles
 */

export class MapGenerator {
    constructor(width = 60, height = 40, tileSize = 16) {
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;

        // Tile types
        this.TILE_TYPES = {
            FLOOR: 0,
            WALL: 1,
            CONVEYOR: 2,
            DOOR: 3,
            HAZARD: 4,
            CLUTTER: 5
        };

        // Room templates
        this.roomTemplates = this.initRoomTemplates();
    }

    /**
     * Initialize room templates for different warehouse zones
     */
    initRoomTemplates() {
        return {
            // Loading dock area
            loading: {
                minWidth: 12,
                minHeight: 10,
                features: ['conveyors', 'pallets', 'packages']
            },
            // Storage area
            storage: {
                minWidth: 10,
                minHeight: 10,
                features: ['pallets', 'shelves', 'clutter']
            },
            // Picking area
            picking: {
                minWidth: 14,
                minHeight: 12,
                features: ['conveyors', 'carts', 'signs']
            },
            // Packing station
            packing: {
                minWidth: 10,
                minHeight: 8,
                features: ['tables', 'boxes', 'tape']
            },
            // Shipping area
            shipping: {
                minWidth: 12,
                minHeight: 10,
                features: ['conveyors', 'doors', 'pallets']
            },
            // Office space
            office: {
                minWidth: 8,
                minHeight: 8,
                features: ['desks', 'computers', 'coffee']
            },
            // Break room
            breakRoom: {
                minWidth: 8,
                minHeight: 6,
                features: ['tables', 'coffee', 'microwave']
            },
            // Open warehouse floor
            openFloor: {
                minWidth: 20,
                minHeight: 15,
                features: ['conveyors', 'workers', 'dynamic']
            }
        };
    }

    /**
     * Generate a complete warehouse map
     */
    generate(options = {}) {
        const {
            layout = 'warehouse',
            difficulty = 'normal',
            theme = 'industrial',
            seed = Math.random()
        } = options;

        // Initialize map data structure
        const mapData = {
            tiles: this.createEmptyMap(),
            conveyorBelts: [],
            packages: [],
            palletJacks: [],
            cartWorkers: [],
            palletStacks: [],
            sortStations: [],
            warehouseSigns: [],
            clutter: [],
            hazardSpawns: [],
            rooms: [],
            fireExitDoor: null
        };

        // Generate based on layout type
        switch(layout) {
            case 'warehouse':
                this.generateWarehouseLayout(mapData, difficulty);
                break;
            case 'open':
                this.generateOpenFloor(mapData, difficulty);
                break;
            case 'maze':
                this.generateMazeLayout(mapData, difficulty);
                break;
            case 'boss':
                this.generateBossArena(mapData);
                break;
            default:
                this.generateWarehouseLayout(mapData, difficulty);
        }

        // Add dynamic elements
        this.populateConveyors(mapData);
        this.populateWorkers(mapData);
        this.populateDecorations(mapData);
        this.addFireExit(mapData);

        return mapData;
    }

    /**
     * Create empty map grid
     */
    createEmptyMap() {
        const map = [];
        for (let y = 0; y < this.height; y++) {
            map[y] = [];
            for (let x = 0; x < this.width; x++) {
                map[y][x] = this.TILE_TYPES.FLOOR;
            }
        }
        return map;
    }

    /**
     * Generate warehouse layout with rooms and corridors
     */
    generateWarehouseLayout(mapData, difficulty) {
        const tiles = mapData.tiles;

        // Create outer walls
        this.createBoundaryWalls(tiles);

        // Divide space into zones
        const zones = this.divideIntoZones(4, 3);

        // Generate rooms in zones
        zones.forEach((zone, index) => {
            const roomType = this.selectRoomType(index);
            const room = this.generateRoom(zone, roomType);
            mapData.rooms.push(room);
            this.placeRoomOnMap(tiles, room);
        });

        // Create corridors between rooms
        this.createCorridors(tiles, mapData.rooms);

        // Add conveyor lanes
        this.addConveyorLanes(tiles, mapData);

        // Create center clearing for boss area
        this.createCenterClearing(tiles);
    }

    /**
     * Generate open warehouse floor
     */
    generateOpenFloor(mapData, difficulty) {
        const tiles = mapData.tiles;

        // Boundary walls
        this.createBoundaryWalls(tiles);

        // Scattered obstacles
        this.addScatteredObstacles(tiles, 0.08);

        // Conveyor lanes
        this.addConveyorLanes(tiles, mapData);

        // Storage areas around edges
        this.addEdgeStorage(tiles, mapData);
    }

    /**
     * Generate maze-like layout
     */
    generateMazeLayout(mapData, difficulty) {
        const tiles = mapData.tiles;

        // Boundary walls
        this.createBoundaryWalls(tiles);

        // Create maze structure
        this.generateMaze(tiles);

        // Widen some paths
        this.widenPaths(tiles);
    }

    /**
     * Generate boss arena
     */
    generateBossArena(mapData) {
        const tiles = mapData.tiles;

        // Boundary walls
        this.createBoundaryWalls(tiles);

        // Large open center
        const centerX = Math.floor(this.width / 2);
        const centerY = Math.floor(this.height / 2);
        const radius = Math.min(this.width, this.height) / 3;

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const dist = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
                if (dist < radius) {
                    tiles[y][x] = this.TILE_TYPES.FLOOR;
                }
            }
        }

        // Pillars for cover
        this.addPillars(tiles, centerX, centerY, radius);
    }

    /**
     * Create boundary walls
     */
    createBoundaryWalls(tiles) {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (x === 0 || x === this.width - 1 || y === 0 || y === this.height - 1) {
                    tiles[y][x] = this.TILE_TYPES.WALL;
                }
            }
        }
    }

    /**
     * Divide map into zones
     */
    divideIntoZones(cols, rows) {
        const zones = [];
        const zoneWidth = Math.floor(this.width / cols);
        const zoneHeight = Math.floor(this.height / rows);

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                zones.push({
                    x: col * zoneWidth + 2,
                    y: row * zoneHeight + 2,
                    width: zoneWidth - 4,
                    height: zoneHeight - 4
                });
            }
        }

        return zones;
    }

    /**
     * Select room type based on index
     */
    selectRoomType(index) {
        const types = ['loading', 'storage', 'picking', 'packing', 'shipping', 'openFloor'];
        return types[index % types.length];
    }

    /**
     * Generate a room structure
     */
    generateRoom(zone, type) {
        const template = this.roomTemplates[type] || this.roomTemplates.openFloor;

        const width = Math.max(template.minWidth, Math.floor(zone.width * 0.7));
        const height = Math.max(template.minHeight, Math.floor(zone.height * 0.7));

        const x = zone.x + Math.floor((zone.width - width) / 2);
        const y = zone.y + Math.floor((zone.height - height) / 2);

        return {
            x,
            y,
            width,
            height,
            type,
            features: template.features,
            centerX: x + Math.floor(width / 2),
            centerY: y + Math.floor(height / 2)
        };
    }

    /**
     * Place room on map
     */
    placeRoomOnMap(tiles, room) {
        // Clear interior
        for (let y = room.y; y < room.y + room.height; y++) {
            for (let x = room.x; x < room.x + room.width; x++) {
                if (y >= 0 && y < this.height && x >= 0 && x < this.width) {
                    tiles[y][x] = this.TILE_TYPES.FLOOR;
                }
            }
        }

        // Optional walls (some rooms are open)
        if (room.type !== 'openFloor') {
            this.addRoomWalls(tiles, room);
        }
    }

    /**
     * Add walls to room
     */
    addRoomWalls(tiles, room) {
        // Top and bottom walls
        for (let x = room.x; x < room.x + room.width; x++) {
            if (room.y > 0) tiles[room.y][x] = this.TILE_TYPES.WALL;
            if (room.y + room.height < this.height) {
                tiles[room.y + room.height - 1][x] = this.TILE_TYPES.WALL;
            }
        }

        // Left and right walls
        for (let y = room.y; y < room.y + room.height; y++) {
            if (room.x > 0) tiles[y][room.x] = this.TILE_TYPES.WALL;
            if (room.x + room.width < this.width) {
                tiles[y][room.x + room.width - 1] = this.TILE_TYPES.WALL;
            }
        }

        // Add doorways (2 per room)
        const doorCount = 2;
        for (let i = 0; i < doorCount; i++) {
            const side = Math.floor(Math.random() * 4); // 0=top, 1=right, 2=bottom, 3=left
            this.addDoorway(tiles, room, side);
        }
    }

    /**
     * Add doorway to room
     */
    addDoorway(tiles, room, side) {
        let x, y;

        switch(side) {
            case 0: // Top
                x = room.x + Math.floor(room.width / 2);
                y = room.y;
                break;
            case 1: // Right
                x = room.x + room.width - 1;
                y = room.y + Math.floor(room.height / 2);
                break;
            case 2: // Bottom
                x = room.x + Math.floor(room.width / 2);
                y = room.y + room.height - 1;
                break;
            case 3: // Left
                x = room.x;
                y = room.y + Math.floor(room.height / 2);
                break;
        }

        if (x >= 1 && x < this.width - 1 && y >= 1 && y < this.height - 1) {
            tiles[y][x] = this.TILE_TYPES.FLOOR;
            // Widen doorway
            if (side === 0 || side === 2) {
                if (x - 1 >= 0) tiles[y][x - 1] = this.TILE_TYPES.FLOOR;
                if (x + 1 < this.width) tiles[y][x + 1] = this.TILE_TYPES.FLOOR;
            } else {
                if (y - 1 >= 0) tiles[y - 1][x] = this.TILE_TYPES.FLOOR;
                if (y + 1 < this.height) tiles[y + 1][x] = this.TILE_TYPES.FLOOR;
            }
        }
    }

    /**
     * Create corridors between rooms
     */
    createCorridors(tiles, rooms) {
        for (let i = 0; i < rooms.length - 1; i++) {
            const roomA = rooms[i];
            const roomB = rooms[i + 1];

            this.createCorridor(tiles, roomA.centerX, roomA.centerY, roomB.centerX, roomB.centerY);
        }

        // Connect first and last room
        if (rooms.length > 2) {
            const first = rooms[0];
            const last = rooms[rooms.length - 1];
            this.createCorridor(tiles, first.centerX, first.centerY, last.centerX, last.centerY);
        }
    }

    /**
     * Create L-shaped corridor between two points
     */
    createCorridor(tiles, x1, y1, x2, y2) {
        const width = 3; // Corridor width

        // Horizontal segment
        const minX = Math.min(x1, x2);
        const maxX = Math.max(x1, x2);
        for (let x = minX; x <= maxX; x++) {
            for (let dy = -Math.floor(width / 2); dy <= Math.floor(width / 2); dy++) {
                const y = y1 + dy;
                if (y >= 1 && y < this.height - 1 && x >= 1 && x < this.width - 1) {
                    tiles[y][x] = this.TILE_TYPES.FLOOR;
                }
            }
        }

        // Vertical segment
        const minY = Math.min(y1, y2);
        const maxY = Math.max(y1, y2);
        for (let y = minY; y <= maxY; y++) {
            for (let dx = -Math.floor(width / 2); dx <= Math.floor(width / 2); dx++) {
                const x = x2 + dx;
                if (x >= 1 && x < this.width - 1 && y >= 1 && y < this.height - 1) {
                    tiles[y][x] = this.TILE_TYPES.FLOOR;
                }
            }
        }
    }

    /**
     * Add conveyor belt lanes
     */
    addConveyorLanes(tiles, mapData) {
        const lanes = [8, 18, 28];

        lanes.forEach((laneY, index) => {
            if (laneY >= this.height) return;

            for (let x = 6; x < this.width - 6; x++) {
                if (x % 3 !== 0 && tiles[laneY] && tiles[laneY][x] === this.TILE_TYPES.FLOOR) {
                    tiles[laneY][x] = this.TILE_TYPES.CONVEYOR;
                    mapData.conveyorBelts.push({
                        x: x * this.tileSize,
                        y: laneY * this.tileSize,
                        dir: index % 2 === 0 ? 1 : -1
                    });
                }
            }
        });
    }

    /**
     * Create center clearing for boss fights
     */
    createCenterClearing(tiles) {
        const centerX = Math.floor(this.width / 2);
        const centerY = Math.floor(this.height / 2);
        const clearWidth = 10;
        const clearHeight = 10;

        for (let y = centerY - Math.floor(clearHeight / 2); y < centerY + Math.floor(clearHeight / 2); y++) {
            for (let x = centerX - Math.floor(clearWidth / 2); x < centerX + Math.floor(clearWidth / 2); x++) {
                if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
                    tiles[y][x] = this.TILE_TYPES.FLOOR;
                }
            }
        }
    }

    /**
     * Add scattered obstacles
     */
    addScatteredObstacles(tiles, density) {
        for (let y = 2; y < this.height - 2; y++) {
            for (let x = 2; x < this.width - 2; x++) {
                if (tiles[y][x] === this.TILE_TYPES.FLOOR && Math.random() < density) {
                    tiles[y][x] = this.TILE_TYPES.WALL;
                }
            }
        }
    }

    /**
     * Add storage areas around edges
     */
    addEdgeStorage(tiles, mapData) {
        const palletPositions = [
            {x: 4, y: 4}, {x: 4, y: 12}, {x: 4, y: 22}, {x: 4, y: 32},
            {x: this.width - 5, y: 4}, {x: this.width - 5, y: 12},
            {x: this.width - 5, y: 22}, {x: this.width - 5, y: 32},
            {x: 12, y: this.height - 5}, {x: 22, y: this.height - 5},
            {x: 38, y: this.height - 5}, {x: 48, y: this.height - 5}
        ];

        palletPositions.forEach(pos => {
            if (pos.x < this.width - 1 && pos.y < this.height - 1) {
                mapData.palletStacks.push({
                    x: pos.x * this.tileSize,
                    y: pos.y * this.tileSize
                });
            }
        });
    }

    /**
     * Generate maze structure
     */
    generateMaze(tiles) {
        // Fill with walls
        for (let y = 1; y < this.height - 1; y++) {
            for (let x = 1; x < this.width - 1; x++) {
                tiles[y][x] = this.TILE_TYPES.WALL;
            }
        }

        // Recursive backtracker maze generation
        const stack = [];
        const visited = new Set();

        const startX = 2;
        const startY = 2;
        stack.push({x: startX, y: startY});
        visited.add(`${startX},${startY}`);
        tiles[startY][startX] = this.TILE_TYPES.FLOOR;

        while (stack.length > 0) {
            const current = stack[stack.length - 1];
            const neighbors = this.getUnvisitedMazeNeighbors(current, visited);

            if (neighbors.length > 0) {
                const next = neighbors[Math.floor(Math.random() * neighbors.length)];

                // Remove wall between current and next
                const wallX = current.x + (next.x - current.x) / 2;
                const wallY = current.y + (next.y - current.y) / 2;
                tiles[wallY][wallX] = this.TILE_TYPES.FLOOR;
                tiles[next.y][next.x] = this.TILE_TYPES.FLOOR;

                visited.add(`${next.x},${next.y}`);
                stack.push(next);
            } else {
                stack.pop();
            }
        }
    }

    /**
     * Get unvisited maze neighbors (2 cells away)
     */
    getUnvisitedMazeNeighbors(cell, visited) {
        const neighbors = [];
        const dirs = [{x: 2, y: 0}, {x: -2, y: 0}, {x: 0, y: 2}, {x: 0, y: -2}];

        for (const dir of dirs) {
            const nx = cell.x + dir.x;
            const ny = cell.y + dir.y;

            if (nx >= 2 && nx < this.width - 2 && ny >= 2 && ny < this.height - 2) {
                if (!visited.has(`${nx},${ny}`)) {
                    neighbors.push({x: nx, y: ny});
                }
            }
        }

        return neighbors;
    }

    /**
     * Widen maze paths
     */
    widenPaths(tiles) {
        const newTiles = tiles.map(row => [...row]);

        for (let y = 2; y < this.height - 2; y++) {
            for (let x = 2; x < this.width - 2; x++) {
                if (tiles[y][x] === this.TILE_TYPES.FLOOR) {
                    // Randomly widen
                    if (Math.random() < 0.3) {
                        newTiles[y][x + 1] = this.TILE_TYPES.FLOOR;
                    }
                    if (Math.random() < 0.3) {
                        newTiles[y + 1][x] = this.TILE_TYPES.FLOOR;
                    }
                }
            }
        }

        // Copy back
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                tiles[y][x] = newTiles[y][x];
            }
        }
    }

    /**
     * Add pillars for boss arenas
     */
    addPillars(tiles, centerX, centerY, radius) {
        const pillarCount = 8;
        const pillarRadius = radius * 0.7;

        for (let i = 0; i < pillarCount; i++) {
            const angle = (Math.PI * 2 / pillarCount) * i;
            const px = Math.floor(centerX + Math.cos(angle) * pillarRadius);
            const py = Math.floor(centerY + Math.sin(angle) * pillarRadius);

            // 2x2 pillar
            for (let dy = 0; dy < 2; dy++) {
                for (let dx = 0; dx < 2; dx++) {
                    if (py + dy < this.height && px + dx < this.width) {
                        tiles[py + dy][px + dx] = this.TILE_TYPES.WALL;
                    }
                }
            }
        }
    }

    /**
     * Populate conveyor belts with packages
     */
    populateConveyors(mapData) {
        const conveyorLanes = [8, 18, 28].filter(y => y < this.height);

        for (let i = 0; i < 12; i++) {
            const laneY = conveyorLanes[Math.floor(Math.random() * conveyorLanes.length)];
            const lane = mapData.conveyorBelts.find(b => Math.floor(b.y / this.tileSize) === laneY);

            if (lane) {
                mapData.packages.push({
                    x: Math.random() * (48 * this.tileSize) + 6 * this.tileSize,
                    y: laneY * this.tileSize - 4,
                    speed: lane.dir * (0.5 + Math.random() * 0.2),
                    type: Math.random() < 0.5 ? 'small' : 'large'
                });
            }
        }
    }

    /**
     * Populate with workers
     */
    populateWorkers(mapData) {
        // Cart workers
        for (let i = 0; i < 4; i++) {
            const startY = 10 + i * 8;
            if (startY < this.height - 5) {
                mapData.cartWorkers.push({
                    x: 8 * this.tileSize,
                    y: startY * this.tileSize,
                    targetX: (this.width - 10) * this.tileSize,
                    dir: 1,
                    speed: 0.6 + Math.random() * 0.2,
                    pauseTimer: 0
                });
            }
        }
    }

    /**
     * Populate decorations
     */
    populateDecorations(mapData) {
        // Sort stations
        mapData.sortStations.push(
            { x: 15 * this.tileSize, y: 3 * this.tileSize },
            { x: 35 * this.tileSize, y: 3 * this.tileSize },
            { x: 25 * this.tileSize, y: (this.height - 4) * this.tileSize }
        );

        // Amazon DVI1 Austria warehouse signs
        mapData.warehouseSigns.push(
            // Main branding signs at top
            { x: 5 * this.tileSize, y: 1 * this.tileSize, type: 'amazon' },
            { x: Math.floor(this.width / 2) * this.tileSize, y: 1 * this.tileSize, type: 'dvi1' },
            { x: (this.width - 7) * this.tileSize, y: 1 * this.tileSize, type: 'austria' },
            // Zone signs
            { x: 8 * this.tileSize, y: 6 * this.tileSize, type: 'inbound' },
            { x: (this.width - 12) * this.tileSize, y: 6 * this.tileSize, type: 'outbound' },
            { x: Math.floor(this.width / 3) * this.tileSize, y: Math.floor(this.height / 2) * this.tileSize, type: 'picking' },
            { x: Math.floor(this.width * 2 / 3) * this.tileSize, y: Math.floor(this.height / 2) * this.tileSize, type: 'packing' },
            { x: Math.floor(this.width / 2) * this.tileSize, y: (this.height - 4) * this.tileSize, type: 'shipping' },
            // Safety signs
            { x: 3 * this.tileSize, y: 10 * this.tileSize, type: 'safety' },
            { x: (this.width - 4) * this.tileSize, y: 15 * this.tileSize, type: 'safety' },
            { x: Math.floor(this.width / 2) * this.tileSize, y: 25 * this.tileSize, type: 'safety' }
        );

        // Aisle markers (A1-D4)
        const aisleRows = ['A', 'B', 'C', 'D'];
        for (let i = 0; i < aisleRows.length; i++) {
            for (let j = 1; j <= 4; j++) {
                const x = 8 + i * 12;
                const y = 4 + j * 7;
                if (x < this.width && y < this.height) {
                    mapData.warehouseSigns.push({
                        x: x * this.tileSize,
                        y: y * this.tileSize,
                        type: `aisle_${aisleRows[i]}${j}`
                    });
                }
            }
        }

        // Clutter (reduced - warehouse should be mostly tidy)
        for (let y = 1; y < this.height - 1; y++) {
            for (let x = 1; x < this.width - 1; x++) {
                if (mapData.tiles[y][x] === this.TILE_TYPES.FLOOR && Math.random() < 0.03) {
                    const type = ['coffee', 'paper', 'tape', 'label'][Math.floor(Math.random() * 4)];
                    mapData.clutter.push({
                        x: x * this.tileSize + 4,
                        y: y * this.tileSize + 4,
                        type: type
                    });
                }
            }
        }
    }

    /**
     * Add fire exit door
     */
    addFireExit(mapData) {
        const tiles = mapData.tiles;
        const edges = ['top', 'right', 'bottom', 'left'];
        const edge = edges[Math.floor(Math.random() * edges.length)];

        let doorX, doorY, hazardX, hazardY;

        switch(edge) {
            case 'top':
                doorX = Math.floor(Math.random() * (this.width - 10)) + 5;
                doorY = 1;
                hazardX = doorX;
                hazardY = doorY + 1;
                break;
            case 'right':
                doorX = this.width - 2;
                doorY = Math.floor(Math.random() * (this.height - 10)) + 5;
                hazardX = doorX - 1;
                hazardY = doorY;
                break;
            case 'bottom':
                doorX = Math.floor(Math.random() * (this.width - 10)) + 5;
                doorY = this.height - 2;
                hazardX = doorX;
                hazardY = doorY - 1;
                break;
            case 'left':
                doorX = 1;
                doorY = Math.floor(Math.random() * (this.height - 10)) + 5;
                hazardX = doorX + 1;
                hazardY = doorY;
                break;
        }

        tiles[doorY][doorX] = this.TILE_TYPES.DOOR;
        tiles[hazardY][hazardX] = this.TILE_TYPES.FLOOR;

        mapData.fireExitDoor = {
            x: doorX * this.tileSize,
            y: doorY * this.tileSize
        };

        mapData.hazardSpawns.push({
            x: hazardX,
            y: hazardY,
            type: 'blocked_exit'
        });
    }

    /**
     * Check if tile is walkable
     */
    isTileWalkable(tiles, x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return false;
        }
        const tileType = tiles[y][x];
        return tileType === this.TILE_TYPES.FLOOR || tileType === this.TILE_TYPES.DOOR;
    }

    /**
     * Get random walkable tile
     */
    getRandomWalkableTile(tiles) {
        let x, y;
        let attempts = 0;
        do {
            x = Math.floor(Math.random() * (this.width - 2)) + 1;
            y = Math.floor(Math.random() * (this.height - 2)) + 1;
            attempts++;
        } while (!this.isTileWalkable(tiles, x, y) && attempts < 100);

        return { x, y };
    }
}

export default MapGenerator;
