/**
 * Game - Central game state container
 * Master state object that holds all game data
 */

import { GAME_CONSTANTS } from '../constants.js';
import { BOSS_TYPES } from '../data/bosses.js';
import { CHARACTER_LIST } from '../data/characters.js';

export class Game {
    constructor() {
        // State Management
        this.state = 'LOGO';
        this.stateTimer = 0;
        this.nextState = 'PLAY';
        this.ticks = 0;

        // Player
        this.player = null;
        this.selectedChar = "Carrie";
        this.charList = CHARACTER_LIST;
        this.charIndex = 0;

        // Camera
        this.camera = { x: 0, y: 0 };

        // Level Data
        this.map = [];
        this.clutter = [];
        this.entities = [];
        this.projectiles = [];
        this.particles = [];
        this.floatingTexts = [];
        this.activeIssues = [];

        // Combat & Progress
        this.issuesFixed = 0;
        this.lives = 5;
        this.genId = 0;
        this.boss = null;
        this.simonHits = 0;
        this.pendingBossIntro = false;

        // Visual Effects
        this.shake = 0;
        this.flash = 0;

        // Dialog
        this.dialogText = "";
        this.dialogVisible = "";
        this.dialogTimer = 0;
        this.dialogSpeaker = "";
        this.dialogPortrait = null;
        this.isAIDialog = false;

        // Game Over
        this.gameOverTriggered = false;
        this.gameOverPhase = 0;
        this.corporateMessage = "";
        this.characterDefeatLine = "";
        this.gameOverReason = "";
        this.creditsType = 'normal';

        // Stats
        this.startTime = 0;
        this.booksFired = 0;
        this.opsPushed = 0;
        this.lastAIBanterTime = 0;

        // Special Level Data
        this.fireExitDoor = null;
        this.conveyorBelts = [];
        this.packages = [];
        this.palletJacks = [];
        this.cartWorkers = [];
        this.palletStacks = [];
        this.sortStations = [];
        this.warehouseSigns = [];

        // Yard Level
        this.powerUps = [];
        this.collectibles = [];
        this.forklifts = [];
        this.playerPowerUp = null;
        this.powerUpTimer = 0;
        this.score = 0;
        this.yardPedestrians = [];

        // Boss Types
        this.bossTypes = BOSS_TYPES;

        // Jeff Bezos
        this.jeffTaunt = "";
        this.jeffTauntTimer = 0;

        // AI Status
        this.aiResultText = null;
        this.splashTimer = 0;
    }

    reset() {
        this.state = 'PLAY';
        this.stateTimer = 0;
        this.ticks = 0;

        this.player = null;
        this.camera = { x: 0, y: 0 };

        this.map = [];
        this.clutter = [];
        this.entities = [];
        this.projectiles = [];
        this.particles = [];
        this.floatingTexts = [];
        this.activeIssues = [];

        this.issuesFixed = 0;
        this.lives = 5;
        this.genId = 0;
        this.boss = null;
        this.simonHits = 0;
        this.pendingBossIntro = false;

        this.shake = 0;
        this.flash = 0;

        this.dialogText = "";
        this.dialogVisible = "";
        this.dialogTimer = 0;

        this.gameOverTriggered = false;
        this.gameOverPhase = 0;

        this.startTime = Date.now();
        this.booksFired = 0;
        this.opsPushed = 0;
        this.lastAIBanterTime = 0;

        this.fireExitDoor = null;
        this.conveyorBelts = [];
        this.packages = [];
        this.palletJacks = [];
        this.cartWorkers = [];

        this.powerUps = [];
        this.collectibles = [];
        this.forklifts = [];
        this.playerPowerUp = null;
        this.powerUpTimer = 0;

        this.jeffTaunt = "";
        this.jeffTauntTimer = 0;
    }

    nextId() {
        return ++this.genId;
    }
}
