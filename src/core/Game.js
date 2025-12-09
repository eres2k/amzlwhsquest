/**
 * Game.js
 * Main game class - initializes and coordinates all game systems
 */

import { StateMachine, StateTransition } from './StateMachine.js';
import { MainLoop } from './MainLoop.js';
import { AssetGenerator } from '../generators/AssetGenerator.js';
import { MapGenerator } from '../generators/MapGenerator.js';
import { WorldRenderer } from '../renderers/WorldRenderer.js';
import { UIRenderer } from '../renderers/UIRenderer.js';
import { LogoState } from '../states/LogoState.js';
import { IntroState } from '../states/IntroState.js';
import { StoryState } from '../states/StoryState.js';
import { TitleState } from '../states/TitleState.js';
import { HowToState } from '../states/HowToState.js';
import { SelectState } from '../states/SelectState.js';
import { PlayState } from '../states/PlayState.js';
import { DialogState } from '../states/DialogState.js';
import { BossState } from '../states/BossState.js';
import { CreditsState } from '../states/CreditsState.js';
import { GameOverState } from '../states/GameOverState.js';

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        // Game configuration
        this.tileSize = 16;
        this.debug = false;
        this.ttsMode = 'classic'; // 'classic' or 'advanced'

        // Game data
        this.map = null;
        this.assets = null;
        this.characters = this.initCharacters();
        this.camera = { x: 0, y: 0 };

        // Systems
        this.stateMachine = null;
        this.mainLoop = null;
        this.assetGenerator = null;
        this.mapGenerator = null;
        this.renderers = {};
        this.transition = null;
        this.audio = null;
        this.tts = null;

        // Map-related arrays
        this.conveyorBelts = [];
        this.packages = [];
        this.palletJacks = [];
        this.cartWorkers = [];
        this.palletStacks = [];
        this.sortStations = [];
        this.warehouseSigns = [];
        this.clutter = [];

        // Input handling
        this.inputHandlers = [];

        console.log('[Game] Game instance created');
    }

    /**
     * Initialize character data
     */
    initCharacters() {
        return {
            Carrie: {
                name: 'Carrie',
                title: 'The 5S Monk',
                speed: 1.5,
                lives: 5,
                attackCooldown: 110,
                color: '#7c3aed',
                ability: 'Precision Focus',
                description: '2x damage to bosses'
            },
            Nevena: {
                name: 'Nevena',
                title: 'The Oracle',
                speed: 1.5,
                lives: 5,
                attackCooldown: 120,
                color: '#b91c1c',
                ability: 'Foresight',
                description: 'Longer invincibility'
            },
            Joao: {
                name: 'Joao',
                title: 'The Siren',
                speed: 1.5,
                lives: 5,
                attackCooldown: 105,
                color: '#ea580c',
                ability: 'Caffeine Rush',
                description: 'Faster attack cooldown'
            },
            Roman: {
                name: 'Roman',
                title: 'The Ghost',
                speed: 1.5,
                lives: 5,
                attackCooldown: 115,
                color: '#1a2744',
                ability: 'Phantom Step',
                description: 'Smaller collision'
            },
            Erwin: {
                name: 'Erwin',
                title: 'The Manager',
                speed: 1.95,
                lives: 1,
                attackCooldown: 140,
                color: '#0891b2',
                ability: 'Tesla Rush',
                description: '30% faster, only 1 life'
            }
        };
    }

    /**
     * Initialize all game systems
     */
    async init() {
        console.log('[Game] Initializing game systems...');

        try {
            // Initialize generators
            this.assetGenerator = new AssetGenerator();
            this.mapGenerator = new MapGenerator(60, 40, this.tileSize);

            // Generate assets
            console.log('[Game] Generating assets...');
            this.assets = this.assetGenerator.generateAll();

            // Initialize renderers
            this.renderers.world = new WorldRenderer(this);
            this.renderers.ui = new UIRenderer(this);

            // Initialize state machine
            this.stateMachine = new StateMachine(this);

            // Register states
            this.registerStates();

            // Initialize transition system
            this.transition = new StateTransition();

            // Initialize audio systems (if needed)
            this.initAudio();

            // Initialize main loop
            this.mainLoop = new MainLoop(this);

            // Setup input
            this.setupInput();

            // Start with logo state
            this.stateMachine.changeState('LOGO');

            console.log('[Game] Initialization complete');

            return true;
        } catch (error) {
            console.error('[Game] Initialization failed:', error);
            return false;
        }
    }

    /**
     * Register all game states
     */
    registerStates() {
        // Core flow states
        this.stateMachine.register('LOGO', LogoState);
        this.stateMachine.register('INTRO', IntroState);
        this.stateMachine.register('STORY', StoryState);
        this.stateMachine.register('TITLE', TitleState);
        this.stateMachine.register('HOWTO', HowToState);
        this.stateMachine.register('SELECT', SelectState);

        // Gameplay states
        this.stateMachine.register('PLAY', PlayState);
        this.stateMachine.register('DIALOG', DialogState);
        this.stateMachine.register('BOSS', BossState);

        // End states
        this.stateMachine.register('CREDITS', CreditsState);
        this.stateMachine.register('GAMEOVER', GameOverState);
        this.stateMachine.register('GAMEOVER_SPLASH', GameOverState);

        // Additional states (stubs for now)
        this.stateMachine.register('BOSS_INTRO', DialogState);
        this.stateMachine.register('VISITOR_SPLASH', DialogState);
        this.stateMachine.register('PAUSE', TitleState);
        this.stateMachine.register('SETTINGS', TitleState);
    }

    /**
     * Initialize audio systems
     */
    initAudio() {
        // Audio system integration
        // This would connect to the existing TTSSys, GeminiTTS, MusicSys, AudioSys
        // For now, create placeholder
        this.audio = {
            playMusic: (track) => {
                console.log(`[Audio] Playing music: ${track}`);
            },
            stopMusic: () => {
                console.log('[Audio] Stopping music');
            },
            update: (deltaTime) => {
                // Update music/audio state
            }
        };

        this.tts = {
            update: (deltaTime) => {
                // Update TTS loading indicators
            }
        };
    }

    /**
     * Setup input handling
     */
    setupInput() {
        // Keyboard events
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e));

        // Touch events for mobile
        this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.canvas.addEventListener('touchend', (e) => this.handleTouchEnd(e));
        this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e));

        console.log('[Game] Input handlers registered');
    }

    /**
     * Handle keyboard down
     */
    handleKeyDown(event) {
        // Pass to state machine
        if (this.stateMachine) {
            this.stateMachine.handleInput({
                type: 'keydown',
                key: event.key,
                code: event.code,
                repeat: event.repeat
            });
        }

        // Debug toggle
        if (event.key === 'F3') {
            event.preventDefault();
            this.debug = !this.debug;
            console.log(`[Game] Debug mode: ${this.debug ? 'ON' : 'OFF'}`);
        }
    }

    /**
     * Handle keyboard up
     */
    handleKeyUp(event) {
        if (this.stateMachine) {
            this.stateMachine.handleInput({
                type: 'keyup',
                key: event.key,
                code: event.code
            });
        }
    }

    /**
     * Handle touch start
     */
    handleTouchStart(event) {
        event.preventDefault();
        // Implement touch controls
    }

    /**
     * Handle touch end
     */
    handleTouchEnd(event) {
        event.preventDefault();
        // Implement touch controls
    }

    /**
     * Handle touch move
     */
    handleTouchMove(event) {
        event.preventDefault();
        // Implement touch controls
    }

    /**
     * Start the game
     */
    start() {
        console.log('[Game] Starting game...');

        if (this.mainLoop) {
            this.mainLoop.start();
        } else {
            console.error('[Game] Cannot start: MainLoop not initialized');
        }
    }

    /**
     * Stop the game
     */
    stop() {
        console.log('[Game] Stopping game...');

        if (this.mainLoop) {
            this.mainLoop.stop();
        }
    }

    /**
     * Pause the game
     */
    pause() {
        if (this.mainLoop) {
            this.mainLoop.pause();
        }
    }

    /**
     * Resume the game
     */
    resume() {
        if (this.mainLoop) {
            this.mainLoop.resume();
        }
    }

    /**
     * Get game state
     */
    getState() {
        return this.stateMachine ? this.stateMachine.getCurrentStateName() : null;
    }

    /**
     * Change state
     */
    changeState(stateName, params = {}) {
        if (this.stateMachine) {
            this.stateMachine.changeState(stateName, params);
        }
    }
}

export default Game;
