// ============================================================================
// AMZL WHS QUEST - UTILITY FUNCTIONS
// Common helper functions used across multiple modules
// ============================================================================

/**
 * Get the current game region, with fallback to default
 * @param {string} [defaultRegion='EN'] - Default region if GAME.region is not set
 * @returns {string} The current region code (e.g., 'EN', 'DE', 'AT', 'NL')
 * @example
 * const region = getGameRegion(); // Returns GAME.region or 'EN'
 * const region = getGameRegion('DE'); // Returns GAME.region or 'DE'
 */
function getGameRegion(defaultRegion = 'EN') {
    return (typeof GAME !== 'undefined' && GAME.region) ? GAME.region : defaultRegion;
}

/**
 * Pick a random element from an array
 * @template T
 * @param {T[]} arr - The array to pick from
 * @returns {T|undefined} A random element from the array, or undefined if empty
 * @example
 * const item = pickRandom(['a', 'b', 'c']); // Returns 'a', 'b', or 'c'
 */
function pickRandom(arr) {
    if (!arr || arr.length === 0) return undefined;
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Clamp a number between minimum and maximum values
 * @param {number} value - The value to clamp
 * @param {number} min - Minimum bound
 * @param {number} max - Maximum bound
 * @returns {number} The clamped value
 * @example
 * clamp(150, 0, 100); // Returns 100
 * clamp(-5, 0, 100);  // Returns 0
 * clamp(50, 0, 100);  // Returns 50
 */
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

/**
 * Linear interpolation between two values
 * @param {number} a - Start value
 * @param {number} b - End value
 * @param {number} t - Interpolation factor (0-1)
 * @returns {number} Interpolated value
 * @example
 * lerp(0, 100, 0.5); // Returns 50
 * lerp(0, 100, 0.25); // Returns 25
 */
function lerp(a, b, t) {
    return a + (b - a) * clamp(t, 0, 1);
}

/**
 * Get buff effects from a PPE item's buff property (normalized to array format)
 * Handles both single-effect buffs and multi-effect buffs uniformly
 * @param {Object|null} buff - The buff object from a PPE item
 * @returns {Array<{type: string, value: number}>} Array of effect objects
 * @example
 * // Single effect: { type: 'speed', value: 0.15 }
 * getBuffEffects(item.buff); // Returns [{ type: 'speed', value: 0.15 }]
 *
 * // Multi effect: { effects: [{ type: 'speed', value: 0.4 }, { type: 'maxhp', value: 2 }] }
 * getBuffEffects(item.buff); // Returns [{ type: 'speed', value: 0.4 }, { type: 'maxhp', value: 2 }]
 */
function getBuffEffects(buff) {
    if (!buff) return [];
    if (buff.effects) return buff.effects;
    if (buff.type && buff.type !== 'multi') return [{ type: buff.type, value: buff.value }];
    return [];
}

/**
 * Get localized content from a data object with fallback support
 * @param {Object} dataObject - Object with region keys (e.g., { EN: [...], DE: [...] })
 * @param {Object} options - Options for retrieval
 * @param {string} options.fallback - Fallback region if current region not found (default: 'EN')
 * @param {number} options.useRegionalChance - Probability (0-1) to use regional content vs fallback
 * @param {string} options.defaultValue - Default value if nothing found
 * @returns {*} The localized content (picks random if array)
 */
function getLocalizedContent(dataObject, options = {}) {
    const region = getGameRegion(options.fallback || 'EN');
    const fallback = options.fallback || 'EN';
    const useRegionalChance = options.useRegionalChance !== undefined ? options.useRegionalChance : 1.0;
    const defaultValue = options.defaultValue || null;

    // Try region-specific content first
    if (dataObject[region] && Math.random() < useRegionalChance) {
        return Array.isArray(dataObject[region])
            ? pickRandom(dataObject[region])
            : dataObject[region];
    }

    // Fall back to default region
    if (dataObject[fallback]) {
        return Array.isArray(dataObject[fallback])
            ? pickRandom(dataObject[fallback])
            : dataObject[fallback];
    }

    return defaultValue;
}

// ============================================================================
// GAME CONFIGURATION CONSTANTS
// Centralized magic numbers and configuration values
// ============================================================================

/**
 * Game configuration constants for probability thresholds and other settings
 * @constant {Object}
 * @property {Object} PROBABILITIES - Probability thresholds for regional content selection
 * @property {number} PROBABILITIES.REGIONAL_BANTER - Chance (0-1) to use regional banter vs fallback (0.7 = 70%)
 * @property {number} PROBABILITIES.REGIONAL_DIALOGUE - Chance (0-1) for regional dialogue (0.8 = 80%)
 * @property {number} PROBABILITIES.REGIONAL_TIP - Chance (0-1) for regional tips (0.6 = 60%)
 */
const GAME_CONFIG = {
    PROBABILITIES: {
        REGIONAL_BANTER: 0.7,
        REGIONAL_DIALOGUE: 0.8,
        REGIONAL_TIP: 0.6
    }
};
