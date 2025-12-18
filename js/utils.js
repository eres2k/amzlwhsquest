// ============================================================================
// AMZL WHS QUEST - UTILITY FUNCTIONS
// Common helper functions used across multiple modules
// ============================================================================

/**
 * Get the current game region, with fallback to default
 * @param {string} defaultRegion - Default region if GAME.region is not set (default: 'EN')
 * @returns {string} The current region code
 */
function getGameRegion(defaultRegion = 'EN') {
    return (typeof GAME !== 'undefined' && GAME.region) ? GAME.region : defaultRegion;
}

/**
 * Pick a random element from an array
 * @param {Array} arr - The array to pick from
 * @returns {*} A random element from the array
 */
function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
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

const GAME_CONFIG = {
    // Probability thresholds for regional content
    PROBABILITIES: {
        REGIONAL_BANTER: 0.7,      // 70% chance to use regional banter
        REGIONAL_DIALOGUE: 0.8,   // 80% chance for regional dialogue
        REGIONAL_TIP: 0.6         // 60% chance for regional tips
    }
};
