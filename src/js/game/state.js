/**
 * Game state management
 */

import { TILE_SIZE, MAP_W, MAP_H, GAME_STATES } from '../config/constants.js';
import { BOSS_TYPES } from '../config/bosses.js';
import { getCharStats, CHAR_LIST } from '../config/characters.js';

// Main game state object
export const GAME = {
  state: GAME_STATES.LOGO,
  stateTimer: 0,
  nextState: GAME_STATES.PLAY,
  ticks: 0,
  player: null,
  selectedChar: "Carrie",
  charList: CHAR_LIST,
  charIndex: 0,
  camera: { x: 0, y: 0 },
  map: [],
  clutter: [],
  entities: [],
  projectiles: [],
  particles: [],
  floatingTexts: [],
  activeIssues: [],
  issuesFixed: 0,
  lives: 5,
  genId: 0,
  gameOverTriggered: false,
  simonHits: 0,
  boss: null,
  pendingBossIntro: false,
  shake: 0,
  flash: 0,
  dialogText: "",
  dialogVisible: "",
  dialogTimer: 0,
  splashTimer: 0,
  aiResultText: null,

  // Game Over screen state
  gameOverPhase: 0,
  corporateMessage: "",
  characterDefeatLine: "",
  gameOverReason: "",
  creditsType: 'normal',
  startTime: 0,
  booksFired: 0,
  opsPushed: 0,
  lastAIBanterTime: 0,
  fireExitDoor: null,
  froggerVehicles: [],
  jeffTaunt: "",
  jeffTauntTimer: 0,

  // Warehouse atmosphere
  conveyorBelts: [],
  packages: [],
  palletJacks: [],
  cartWorkers: [],
  palletStacks: [],
  sortStations: [],
  warehouseSigns: [],

  // Yard level enhancements
  powerUps: [],
  collectibles: [],
  forklifts: [],
  playerPowerUp: null,
  powerUpTimer: 0,
  score: 0,
  yardPedestrians: [],

  // Boss types reference
  bossTypes: BOSS_TYPES,

  // Yard level state
  yard: null,
  mecha: null,
  hiddenDoor: null,
  mechaSimonDefeat: false,
  simonTransformTextFetched: false,
  simonTransformText: null,
  throneScene: null,
  escapeScene: null
};

// Reset game to initial state
export function resetGameState() {
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
}

// Check if game is in a playable state
export function isPlayableState() {
  return [
    GAME_STATES.PLAY,
    GAME_STATES.BOSS,
    GAME_STATES.BEZOS_BOSS,
    GAME_STATES.MECHA_BOSS,
    GAME_STATES.YARD_LEVEL
  ].includes(GAME.state);
}

// Check if game is in a menu/cutscene state
export function isMenuState() {
  return [
    GAME_STATES.LOGO,
    GAME_STATES.INTRO,
    GAME_STATES.STORY,
    GAME_STATES.TITLE,
    GAME_STATES.HOWTO,
    GAME_STATES.SELECT
  ].includes(GAME.state);
}

// State transition helper
export function transitionToState(newState) {
  GAME.state = newState;
  GAME.stateTimer = 0;
}

// Advance through intro states
export function advanceState() {
  GAME.stateTimer = 0;
  if (GAME.state === GAME_STATES.LOGO) GAME.state = GAME_STATES.INTRO;
  else if (GAME.state === GAME_STATES.INTRO) GAME.state = GAME_STATES.STORY;
  else if (GAME.state === GAME_STATES.STORY) GAME.state = GAME_STATES.TITLE;
  else if (GAME.state === GAME_STATES.TITLE) GAME.state = GAME_STATES.HOWTO;
}

export default GAME;
