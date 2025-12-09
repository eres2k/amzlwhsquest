/**
 * Game Constants - All magic numbers and configuration values
 * Centralized to avoid scattered values throughout the codebase
 */

export const GAME_CONSTANTS = {
    // Timing
    PARTICLE_LIFE_BASE: 50,
    PARTICLE_LIFE_VARIANCE: 20,
    FLOATING_TEXT_LIFE: 210,
    IFRAME_DURATION: 60,
    CASTLE_IFRAME_DURATION: 120,
    BANTER_COOLDOWN: 5000,
    AI_BANTER_COOLDOWN: 15000,

    // Physics
    PARTICLE_GRAVITY: 0.2,
    PARTICLE_BOUNCE: -0.6,
    DIAGONAL_FACTOR: 0.707,

    // Pool sizes
    MAX_PARTICLES: 200,
    MAX_FLOATING_TEXTS: 30,
    MAX_PROJECTILES: 50,

    // Rendering
    VIEWPORT_PADDING: 16,
    SCREEN_WIDTH: 256,
    SCREEN_HEIGHT: 224,

    // Map
    TILE_SIZE: 16,
    MAP_W: 60,
    MAP_H: 40,

    // TTS
    TTS_TIMEOUT_MS: 10000
};

export const API_CONFIG = {
    MODEL_NAME: "gemini-2.5-flash-lite",
    NETLIFY_KEY_ENDPOINT: '/.netlify/functions/get-gemini-key'
};

export const AUDIO_CONFIG = {
    MUSIC_VOLUME: 0.35,
    SFX_BASE_VOLUME: 0.1
};

export const CANVAS_CONFIG = {
    WIDTH: 256,
    HEIGHT: 224
};
