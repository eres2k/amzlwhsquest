/**
 * Game logic - map generation, spawning, collision, level transitions
 */

import { TILE_SIZE, MAP_W, MAP_H, GAME_STATES } from '../config/constants.js';
import { getCharStats } from '../config/characters.js';
import { HAZARD_POOL, shuffleArray, pickRandomHazards } from '../config/hazards.js';
import { SIMON_YARD_TIPS } from '../config/dialogue.js';
import { GAME, resetGameState, transitionToState } from './state.js';
import { AudioSys, MusicSys, TTSSys } from '../audio/index.js';
import { GFX } from '../gfx/index.js';
import { showDialog, showThinking, closeDialog } from '../ui/dialog.js';
import { updateHud, updateBossHud, updateMusicForState } from '../ui/hud.js';
import { callGemini } from '../ai/index.js';

// Random door placement on map edges
export function randomDoorPlacement() {
  const side = ['top', 'bottom', 'left', 'right'][Math.floor(Math.random() * 4)];
  const buffer = 2;
  let doorX = 0, doorY = 0, hazardX = 0, hazardY = 0;

  if (side === 'top') {
    doorY = 0; doorX = Math.floor(Math.random() * (MAP_W - buffer * 2)) + buffer;
    hazardX = doorX; hazardY = 1;
  } else if (side === 'bottom') {
    doorY = MAP_H - 1; doorX = Math.floor(Math.random() * (MAP_W - buffer * 2)) + buffer;
    hazardX = doorX; hazardY = MAP_H - 2;
  } else if (side === 'left') {
    doorX = 0; doorY = Math.floor(Math.random() * (MAP_H - buffer * 2)) + buffer;
    hazardX = 1; hazardY = doorY;
  } else {
    doorX = MAP_W - 1; doorY = Math.floor(Math.random() * (MAP_H - buffer * 2)) + buffer;
    hazardX = MAP_W - 2; hazardY = doorY;
  }

  return { doorX, doorY, hazardX, hazardY };
}

// Check if tile is walkable
export function isTileFree(tx, ty) {
  if (GAME.map[ty]?.[tx] !== 0) return false;
  return !GAME.activeIssues.some(h =>
    Math.round(h.x / TILE_SIZE) === tx && Math.round(h.y / TILE_SIZE) === ty
  );
}

// Pick a random floor tile
export function pickRandomFloorTile() {
  let attempts = 0;
  while (attempts < 500) {
    const tx = Math.floor(Math.random() * (MAP_W - 2)) + 1;
    const ty = Math.floor(Math.random() * (MAP_H - 2)) + 1;
    if (isTileFree(tx, ty)) return { tx, ty };
    attempts++;
  }
  return { tx: 1, ty: 1 };
}

// Spawn an entity
export function spawnEntity(type) {
  let tx, ty;
  do {
    tx = Math.floor(Math.random() * (MAP_W - 2)) + 1;
    ty = Math.floor(Math.random() * (MAP_H - 2)) + 1;
  } while (GAME.map[ty][tx] !== 0);

  GAME.entities.push({
    type: type,
    x: tx * TILE_SIZE,
    y: ty * TILE_SIZE,
    dir: 0,
    timer: 0
  });
}

// Generate the warehouse map
export function generateMap() {
  GAME.map = [];
  // Reset warehouse atmosphere arrays
  GAME.conveyorBelts = [];
  GAME.packages = [];
  GAME.palletJacks = [];
  GAME.cartWorkers = [];
  GAME.palletStacks = [];
  GAME.sortStations = [];
  GAME.warehouseSigns = [];

  // Generate base map
  for (let y = 0; y < MAP_H; y++) {
    GAME.map[y] = [];
    for (let x = 0; x < MAP_W; x++) {
      if (x === 0 || x === MAP_W - 1 || y === 0 || y === MAP_H - 1) {
        GAME.map[y][x] = 1; // Wall
      } else if (x > 5 && x < 55 && y % 5 === 0 && x % 3 !== 0) {
        GAME.map[y][x] = 2; // Shelf
      } else {
        GAME.map[y][x] = 0; // Floor
        if (Math.random() < 0.05) {
          const type = ['coffee', 'paper', 'tape'][Math.floor(Math.random() * 3)];
          GAME.clutter.push({ x: x * TILE_SIZE + 4, y: y * TILE_SIZE + 4, type: type });
        }
      }
    }
  }

  // Clear center area
  for (let y = 15; y < 25; y++) {
    for (let x = 25; x < 35; x++) {
      GAME.map[y][x] = 0;
    }
  }

  // Add conveyor belt lanes
  const conveyorLanes = [8, 18, 28];
  conveyorLanes.forEach(laneY => {
    for (let x = 6; x < 54; x++) {
      if (x % 3 !== 0) {
        GAME.conveyorBelts.push({
          x: x * TILE_SIZE,
          y: laneY * TILE_SIZE,
          dir: laneY === 18 ? -1 : 1
        });
      }
    }
  });

  // Spawn moving packages on conveyors
  for (let i = 0; i < 12; i++) {
    const laneY = conveyorLanes[Math.floor(Math.random() * conveyorLanes.length)];
    GAME.packages.push({
      x: Math.random() * (48 * TILE_SIZE) + 6 * TILE_SIZE,
      y: laneY * TILE_SIZE - 4,
      speed: (laneY === 18 ? -0.5 : 0.5) + Math.random() * 0.2,
      type: Math.random() < 0.5 ? 'small' : 'large'
    });
  }

  // Spawn cart workers
  for (let i = 0; i < 4; i++) {
    const startY = 10 + i * 8;
    GAME.cartWorkers.push({
      x: 8 * TILE_SIZE,
      y: startY * TILE_SIZE,
      targetX: 50 * TILE_SIZE,
      dir: 1,
      speed: 0.6 + Math.random() * 0.2,
      pauseTimer: 0
    });
  }

  // Add pallet stacks
  const palletPositions = [
    { x: 4, y: 4 }, { x: 4, y: 12 }, { x: 4, y: 22 }, { x: 4, y: 32 },
    { x: 55, y: 4 }, { x: 55, y: 12 }, { x: 55, y: 22 }, { x: 55, y: 32 },
    { x: 12, y: 35 }, { x: 22, y: 35 }, { x: 38, y: 35 }, { x: 48, y: 35 }
  ];
  palletPositions.forEach(pos => {
    if (pos.x < MAP_W - 1 && pos.y < MAP_H - 1) {
      GAME.palletStacks.push({
        x: pos.x * TILE_SIZE,
        y: pos.y * TILE_SIZE
      });
    }
  });

  // Add sorting stations
  GAME.sortStations.push(
    { x: 15 * TILE_SIZE, y: 3 * TILE_SIZE },
    { x: 35 * TILE_SIZE, y: 3 * TILE_SIZE },
    { x: 25 * TILE_SIZE, y: 36 * TILE_SIZE }
  );

  // Add warehouse zone signs
  GAME.warehouseSigns.push(
    { x: 10 * TILE_SIZE, y: 2 * TILE_SIZE, type: 'pick' },
    { x: 30 * TILE_SIZE, y: 2 * TILE_SIZE, type: 'pack' },
    { x: 50 * TILE_SIZE, y: 2 * TILE_SIZE, type: 'ship' }
  );

  // Place fire exit door
  const door = randomDoorPlacement();
  GAME.map[door.doorY][door.doorX] = 3;
  GAME.map[door.hazardY][door.hazardX] = 0;
  GAME.fireExitDoor = { x: door.doorX * TILE_SIZE, y: door.doorY * TILE_SIZE };
  GAME.activeIssues.push({
    x: door.hazardX * TILE_SIZE,
    y: door.hazardY * TILE_SIZE,
    data: { name: "Blocked Exit", type: "box" },
    fixed: false
  });

  // Spawn NPCs
  spawnEntity('runner');
  spawnEntity('runner');

  // Place random hazards
  const hazardList = pickRandomHazards(5);
  hazardList.forEach(rHazard => {
    const { tx, ty } = pickRandomFloorTile();
    GAME.activeIssues.push({
      x: tx * TILE_SIZE,
      y: ty * TILE_SIZE,
      data: rHazard,
      fixed: false
    });
  });

  // Spawn ops managers and associates
  for (let i = 0; i < 8; i++) spawnEntity('ops');
  for (let i = 0; i < 10; i++) spawnEntity('assoc');
}

// Reset game state and start new game
export function resetGame() {
  GAME.state = GAME_STATES.PLAY;
  GAME.genId++;
  GAME.gameOverTriggered = false;
  GAME.mechaSimonDefeat = false;

  const stats = getCharStats(GAME.selectedChar);
  GAME.player = {
    x: 100,
    y: 100,
    dir: 0,
    speed: stats.speed,
    iframe: 0,
    cooldown: 0,
    cooldownMax: 120
  };

  GAME.entities = [];
  GAME.projectiles = [];
  GAME.particles = [];
  GAME.floatingTexts = [];
  GAME.activeIssues = [];
  GAME.clutter = [];
  GAME.issuesFixed = 0;
  GAME.lives = stats.lives;
  GAME.simonHits = 0;
  GAME.boss = null;
  GAME.pendingBossIntro = false;
  GAME.hiddenDoor = null;
  GAME.yard = null;
  GAME.mecha = null;
  GAME.nextState = GAME_STATES.PLAY;
  GAME.aiResultText = null;
  GAME.startTime = Date.now();
  GAME.booksFired = 0;
  GAME.opsPushed = 0;

  generateMap();
  GAME.entities.push({ type: 'simon', x: 100, y: 80, w: 16, h: 16 });

  if (typeof document !== 'undefined') {
    document.getElementById('hud-layer').style.display = 'block';
    updateHud();
    document.getElementById('boss-hud').style.display = 'none';
  }

  // Show loading dialog and fetch AI greeting
  const currentGen = GAME.genId;
  showThinking("Simon Unglaube", GFX.simonFace);

  callGemini(
    `You are Simon Unglaube, WHS Senior Regional Manager for Amazon MEU. Greet ${GAME.selectedChar} with dry humor and one quick, relevant safety reminder for starting the shift. Keep it witty. Max 18 words.`,
    "intro"
  ).then(text => {
    if (GAME.state === GAME_STATES.DIALOG && GAME.genId === currentGen) {
      let finalText = text.replace(/\[.*?\]/g, GAME.selectedChar);
      showDialog(finalText, "Simon Unglaube", GFX.simonFace, true);
    }
  });

  updateMusicForState();
}

// Initialize Simon boss fight
export function initSimonBoss() {
  GAME.state = GAME_STATES.BOSS_INTRO;
  AudioSys.sfx.bossIntro();
  GAME.boss = {
    name: "MEGA SIMON",
    sprite: "simonBoss",
    hp: 25,
    maxHp: 25,
    speed: 1.3,
    attackDelay: 30,
    title: "THE WHS FINAL BOSS",
    desc: "He is not impressed.",
    attackName: "SAFETY VIOLATION STORM",
    attackPattern: "storm",
    tauntsTriggered: [],
    tauntThresholds: [0.75, 0.5, 0.25],
    x: MAP_W * TILE_SIZE / 2,
    y: MAP_H * TILE_SIZE / 2,
    timer: 0,
    transformTriggered: false,
    isMecha: false
  };
  GAME.entities = [];
  GAME.projectiles = [];
  updateMusicForState();
}

// Initialize random boss encounter
export function initBossEncounter() {
  GAME.state = GAME_STATES.BOSS_INTRO;
  GAME.stateTimer = 0;
  GAME.pendingBossIntro = false;
  GAME.nextState = GAME_STATES.BOSS;
  AudioSys.sfx.bossIntro();

  const bossData = GAME.bossTypes[Math.floor(Math.random() * GAME.bossTypes.length)];
  GAME.boss = {
    ...bossData,
    x: MAP_W * TILE_SIZE / 2,
    y: MAP_H * TILE_SIZE / 2,
    w: 32,
    h: 32,
    maxHp: bossData.hp,
    timer: 0,
    tauntsTriggered: [],
    tauntThresholds: [0.75, 0.5, 0.25]
  };

  GAME.entities = [];
  GAME.projectiles = [];

  if (typeof document !== 'undefined') {
    document.getElementById('boss-name-el').innerText = GAME.boss.name;
    document.getElementById('boss-hud').style.display = 'block';
    updateBossHud();
  }

  updateMusicForState();
}

// Queue visitor splash screen
export function queueVisitorSplash() {
  if (GAME.pendingBossIntro || GAME.boss) return;
  GAME.pendingBossIntro = true;
  GAME.nextState = GAME_STATES.VISITOR_SPLASH;
}

// Show visitor splash
export function showVisitorSplash() {
  GAME.state = GAME_STATES.VISITOR_SPLASH;
  GAME.stateTimer = 0;
  GAME.nextState = GAME_STATES.BOSS_INTRO;
  AudioSys.sfx.bossIntro();
  updateMusicForState();
}

// Start yard level
export function startYardLevel() {
  GAME.state = GAME_STATES.YARD_LEVEL;
  GAME.stateTimer = 0;

  const canvas = typeof document !== 'undefined' ? document.getElementById('gameCanvas') : { width: 256, height: 224 };
  const yardHeight = 650;
  const hallwayHeight = 450;
  const throneRoomHeight = 250;
  const h = yardHeight + hallwayHeight + throneRoomHeight;
  const castleStart = yardHeight;
  const hallwayStart = throneRoomHeight;

  GAME.yard = {
    height: h,
    yardHeight: yardHeight,
    castleStart: castleStart,
    hallwayStart: hallwayStart,
    throneRoomHeight: throneRoomHeight,
    cameraY: 0,
    playerX: canvas.width / 2 - 8,
    playerY: h - 32,
    startY: h - 32,
    speed: getCharStats(GAME.selectedChar).speed * 0.95,
    vehicles: [],
    forklifts: [],
    hazardZones: [],
    transformationTriggered: false,
    inCastle: false,
    castleEntered: false,
    inHallway: false,
    hallwayEntered: false,
    throneRoomGreeted: false,
    jeffAnimFrame: 0,
    lanes: [
      { y: h - 70, dir: 1, speed: 0.85, timer: 75, type: 'truck' },
      { y: h - 120, dir: -1, speed: 1.0, timer: 65, type: 'van' },
      { y: h - 170, dir: 1, speed: 1.1, timer: 55, type: 'mixed' },
      { y: h - 230, dir: -1, speed: 0.9, timer: 80, type: 'truck' },
      { y: h - 290, dir: 1, speed: 1.2, timer: 50, type: 'van' },
      { y: h - 350, dir: -1, speed: 1.0, timer: 60, type: 'mixed' },
      { y: h - 410, dir: 1, speed: 1.15, timer: 55, type: 'van' },
      { y: h - 470, dir: -1, speed: 0.95, timer: 70, type: 'truck' },
      { y: h - 530, dir: 1, speed: 1.25, timer: 45, type: 'van' },
      { y: h - 590, dir: -1, speed: 1.1, timer: 50, type: 'mixed' }
    ],
    forkliftZones: [
      { y: h - 200, timer: 180, active: false },
      { y: h - 380, timer: 240, active: false },
      { y: h - 520, timer: 200, active: false }
    ],
    staticHazards: [
      { x: 30, y: h - 150, type: 'puddle' },
      { x: 180, y: h - 260, type: 'debris' },
      { x: 80, y: h - 440, type: 'puddle' },
      { x: 150, y: h - 550, type: 'debris' }
    ],
    castleDrones: [],
    castleLasers: [],
    castleGuards: [],
    castlePlatforms: [
      { x: 20, y: hallwayStart + 50, w: 40, dir: 1, speed: 0.8 },
      { x: 150, y: hallwayStart + 120, w: 50, dir: -1, speed: 1.0 },
      { x: 80, y: hallwayStart + 200, w: 45, dir: 1, speed: 0.9 },
      { x: 30, y: hallwayStart + 280, w: 55, dir: -1, speed: 1.1 },
      { x: 120, y: hallwayStart + 360, w: 40, dir: 1, speed: 1.2 }
    ],
    castleLaserBarriers: [
      { y: hallwayStart + 80, onTime: 60, offTime: 90, timer: 0, active: true },
      { y: hallwayStart + 160, onTime: 50, offTime: 80, timer: 30, active: false },
      { y: hallwayStart + 260, onTime: 70, offTime: 70, timer: 50, active: true },
      { y: hallwayStart + 350, onTime: 40, offTime: 100, timer: 20, active: false },
      { y: hallwayStart + 420, onTime: 55, offTime: 75, timer: 40, active: true }
    ],
    droneSpawnTimer: 0
  };

  // Initialize hallway guard turrets
  const y = GAME.yard;
  y.castleGuards = [
    { x: 10, y: hallwayStart + 60, fireTimer: 60, fireRate: 80 },
    { x: canvas.width - 26, y: hallwayStart + 130, fireTimer: 40, fireRate: 90 },
    { x: 10, y: hallwayStart + 200, fireTimer: 20, fireRate: 70 },
    { x: canvas.width - 26, y: hallwayStart + 290, fireTimer: 0, fireRate: 85 },
    { x: 10, y: hallwayStart + 380, fireTimer: 50, fireRate: 75 },
    { x: canvas.width - 26, y: hallwayStart + 440, fireTimer: 30, fireRate: 80 }
  ];

  GAME.player.speed = GAME.yard.speed;
  GAME.projectiles = [];
  GAME.particles = [];
  GAME.floatingTexts = [];
  updateMusicForState();

  // Show Simon's yard safety tip
  const safetyTip = SIMON_YARD_TIPS[Math.floor(Math.random() * SIMON_YARD_TIPS.length)];
  showDialog(safetyTip, "Simon Unglaube", GFX.simonFace, true);
  GAME.nextState = GAME_STATES.YARD_LEVEL;
}

// Begin Mecha Jeff encounter
export function beginMechaEncounter() {
  const canvas = typeof document !== 'undefined' ? document.getElementById('gameCanvas') : { width: 256, height: 224 };

  GAME.state = GAME_STATES.MECHA_BOSS_INTRO;
  GAME.stateTimer = 0;

  GAME.mecha = {
    hp: 48,
    maxHp: 48,
    x: canvas.width / 2 - 32,
    y: 18,
    baseY: 18,
    timer: 0,
    currentPhase: 0,
    phaseTimer: 0,
    phaseDuration: 280,
    phaseTransition: false,
    transitionTimer: 0,
    attackCooldown: 0,
    projectiles: [],
    shadows: [],
    beam: null,
    beams: [],
    moveDir: 1,
    moveTimer: 0,
    bobOffset: 0,
    enraged: false,
    enrageFlash: 0,
    dashing: false,
    dashTarget: null,
    dashSpeed: 0,
    slamming: false,
    slamTimer: 0,
    slamY: 18,
    phaseNames: ['PRIME STRIKE', 'DRONE SWARM', 'PACKAGE STORM', 'LASER GRID', 'GROUND SLAM'],
    phaseTaunts: [
      "PRIME DELIVERY INCOMING!",
      "RELEASE THE DRONES!",
      "BOXES FROM THE SKY!",
      "LASER PRECISION!",
      "FEEL THE EARTH SHAKE!"
    ]
  };

  GAME.player.x = canvas.width / 2 - 8;
  GAME.player.y = canvas.height - 28;
  GAME.boss = { name: 'MECHA JEFF', hp: 48, maxHp: 48 };

  if (typeof document !== 'undefined') {
    document.getElementById('boss-name-el').innerText = 'MECHA JEFF';
    document.getElementById('boss-hud').style.display = 'block';
    updateBossHud();
  }

  updateMusicForState();
}

// Start credits sequence
export function startCredits() {
  GAME.state = GAME_STATES.CREDITS;
  GAME.stateTimer = 0;
  GAME.boss = null;

  if (typeof document !== 'undefined') {
    document.getElementById('boss-hud').style.display = 'none';
    document.getElementById('hud-layer').style.display = 'none';
    document.getElementById('dialog-box').style.display = 'none';
  }

  GAME.projectiles = [];
  GAME.particles = [];
  GAME.floatingTexts = [];
  updateMusicForState();
}

// Trigger game over
export function triggerGameOver(reason = "TERMINATED") {
  if (GAME.gameOverTriggered) return;
  GAME.gameOverTriggered = true;
  GAME.gameOverReason = reason;
  GAME.state = GAME_STATES.GAMEOVER_SPLASH;
  GAME.stateTimer = 0;
  MusicSys.stop();
}

// Spawn floating text
export function spawnFloatingText(x, y, text, color = '#fff') {
  GAME.floatingTexts.push({
    x: x,
    y: y,
    text: text,
    color: color,
    life: 60,
    vy: -1
  });
}

// Spawn particle effect
export function spawnParticle(x, y, color) {
  GAME.particles.push({
    x: x,
    y: y,
    vx: (Math.random() - 0.5) * 3,
    vy: (Math.random() - 0.5) * 3,
    color: color,
    life: 30
  });
}

export default {
  randomDoorPlacement,
  isTileFree,
  pickRandomFloorTile,
  spawnEntity,
  generateMap,
  resetGame,
  initSimonBoss,
  initBossEncounter,
  queueVisitorSplash,
  showVisitorSplash,
  startYardLevel,
  beginMechaEncounter,
  startCredits,
  triggerGameOver,
  spawnFloatingText,
  spawnParticle
};
