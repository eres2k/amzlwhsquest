/**
 * Netlify Function for AMZL WHS Quest Highscore System
 *
 * Endpoints:
 * GET  /.netlify/functions/highscores - Get top 10 highscores
 * POST /.netlify/functions/highscores - Submit a new highscore
 *
 * Uses Netlify Blobs for persistent storage
 */

const { getStore } = require("@netlify/blobs");

const HIGHSCORE_STORE_NAME = "amzl-whs-highscores";
const HIGHSCORE_KEY = "leaderboard";
const MAX_HIGHSCORES = 10;

// Default highscores to populate an empty leaderboard
const DEFAULT_HIGHSCORES = [
    { name: "BEZOS", character: "Erwin", bossDefeated: "Mecha Jeff", time: 142, score: 6000, date: 1734100000000, region: "EU" },
    { name: "WHS-1", character: "Roman", bossDefeated: "Mecha Jeff", time: 178, score: 5700, date: 1734000000000, region: "EU" },
    { name: "PRIME", character: "Carrie", bossDefeated: "Mecha Jeff", time: 195, score: 5400, date: 1733900000000, region: "EU" },
    { name: "TPH99", character: "Joao", bossDefeated: "Jelena \"Jelly\"", time: 156, score: 5100, date: 1733800000000, region: "EU" },
    { name: "AUDIT", character: "Nevena", bossDefeated: "Jelena \"Jelly\"", time: 168, score: 4800, date: 1733700000000, region: "EU" },
    { name: "5SGOD", character: "Carrie", bossDefeated: "Regional OPS MGR", time: 145, score: 4500, date: 1733600000000, region: "EU" },
    { name: "SAFE1", character: "Roman", bossDefeated: "Avetta Platform", time: 132, score: 4200, date: 1733500000000, region: "EU" },
    { name: "DVI-1", character: "Erwin", bossDefeated: "Sebastian Sprigade", time: 128, score: 3900, date: 1733400000000, region: "EU" },
    { name: "OSHA", character: "Nevena", bossDefeated: "Compliance Auditor", time: 115, score: 3600, date: 1733300000000, region: "EU" },
    { name: "ANDON", character: "Joao", bossDefeated: "Labour Inspector", time: 105, score: 3000, date: 1733200000000, region: "EU" }
];

// Validate player name (max 5 chars, alphanumeric and some special chars)
function validateName(name) {
    if (!name || typeof name !== 'string') return false;
    const trimmed = name.trim().substring(0, 5);
    // Allow alphanumeric, spaces, hyphens, underscores
    return /^[A-Za-z0-9\s\-_]+$/.test(trimmed) && trimmed.length > 0;
}

// Validate score entry
function validateScore(entry) {
    if (!entry || typeof entry !== 'object') return false;
    if (typeof entry.score !== 'number' || entry.score < 0 || entry.score > 999999) return false;
    if (typeof entry.time !== 'number' || entry.time < 0 || entry.time > 7200) return false; // Max 2 hours
    if (!validateName(entry.name)) return false;

    const validChars = ["Carrie", "Nevena", "Joao", "Roman", "Erwin"];
    if (!validChars.includes(entry.character)) return false;

    const validBosses = ["Labour Inspector", "Compliance Auditor", "Sebastian Sprigade",
                        "Regional OPS MGR", "Avetta Platform", "Jelena \"Jelly\"", "Mecha Jeff"];
    if (!validBosses.includes(entry.bossDefeated)) return false;

    return true;
}

// Calculate score from game stats (server-side validation)
// This should match the client-side calculation
function calculateScore(stats) {
    // Start with 5000 points
    let score = 5000;

    // Time penalty: lose 100 points every 10 seconds
    const timePenalty = Math.floor((stats.time || 0) / 10) * 100;
    score -= timePenalty;

    // Penalty for missed book throws: -200 each
    score -= (stats.booksMissed || 0) * 200;

    // Penalty for hitting Simon: -500 each
    score -= (stats.simonHitsCount || 0) * 500;

    // GAINS:
    // Hazards fixed: +200 points each
    score += (stats.hazardsFixed || 0) * 200;

    // Combat bonus: +50 per book hit, +100 per ops pushed
    score += (stats.booksFired || 0) * 50;
    score += (stats.opsPushed || 0) * 100;

    // Lives remaining: +100 points each
    score += (stats.livesRemaining || 0) * 100;

    // Boss Kill bonus: +1000 points
    score += 1000;

    // Mecha Jeff bonus: +5000 points
    if (stats.bossDefeated === "Mecha Jeff") {
        score += 5000;
    }

    // Minimum score is 0
    return Math.max(0, Math.floor(score));
}

exports.handler = async (event, context) => {
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
    };

    // Handle CORS preflight
    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 204, headers, body: "" };
    }

    // GET - Retrieve highscores
    if (event.httpMethod === "GET") {
        try {
            const store = getStore(HIGHSCORE_STORE_NAME);
            const data = await store.get(HIGHSCORE_KEY, { type: "json" });
            let highscores = data || [];

            // Handle legacy double-encoded data (was stored with JSON.stringify)
            if (typeof highscores === 'string') {
                try {
                    highscores = JSON.parse(highscores);
                } catch {
                    highscores = [];
                }
            }

            // Validate data is an array
            if (!Array.isArray(highscores) || highscores.length === 0) {
                highscores = DEFAULT_HIGHSCORES;
            }

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    success: true,
                    highscores: highscores.slice(0, MAX_HIGHSCORES)
                })
            };
        } catch (e) {
            // Store unavailable or error - return defaults (don't fail the request)
            console.log("Highscore GET fallback to defaults:", e.message);
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    success: true,
                    highscores: DEFAULT_HIGHSCORES
                })
            };
        }
    }

    try {
        const store = getStore(HIGHSCORE_STORE_NAME);

        // POST - Submit new highscore
        if (event.httpMethod === "POST") {
            let body;
            try {
                body = JSON.parse(event.body);
            } catch (e) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ success: false, error: "Invalid JSON body" })
                };
            }

            // Validate and sanitize input
            const entry = {
                name: (body.name || "").trim().substring(0, 5).toUpperCase(),
                character: body.character,
                time: parseInt(body.time) || 0,
                hazardsFixed: parseInt(body.hazardsFixed) || 0,
                booksFired: parseInt(body.booksFired) || 0,
                opsPushed: parseInt(body.opsPushed) || 0,
                booksMissed: parseInt(body.booksMissed) || 0,
                simonHitsCount: parseInt(body.simonHitsCount) || 0,
                livesRemaining: parseInt(body.livesRemaining) || 0,
                bossDefeated: body.bossDefeated,
                region: body.region || "EU"
            };

            // Use client's pre-calculated score (validated below)
            // Client tracks misses in real-time which server can't replicate
            entry.score = parseInt(body.score) || calculateScore(entry);

            // Validate the entry
            if (!validateScore(entry)) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ success: false, error: "Invalid score entry" })
                };
            }

            // Add timestamp
            entry.date = Date.now();

            // Get existing highscores (start with defaults if empty)
            let highscores = [];
            try {
                const data = await store.get(HIGHSCORE_KEY, { type: "json" });
                highscores = data || [];

                // Handle legacy double-encoded data
                if (typeof highscores === 'string') {
                    try {
                        highscores = JSON.parse(highscores);
                    } catch {
                        highscores = [];
                    }
                }

                // If store is empty or invalid, start with defaults
                if (!Array.isArray(highscores) || highscores.length === 0) {
                    highscores = [...DEFAULT_HIGHSCORES];
                }
            } catch (e) {
                // No store yet - start with defaults
                highscores = [...DEFAULT_HIGHSCORES];
            }

            // Add new entry and sort
            highscores.push(entry);
            highscores.sort((a, b) => b.score - a.score);

            // Keep only top scores
            highscores = highscores.slice(0, MAX_HIGHSCORES);

            // Save updated highscores (store.setJSON handles serialization)
            await store.setJSON(HIGHSCORE_KEY, highscores);

            // Find rank of the new entry
            const rank = highscores.findIndex(h => h.date === entry.date && h.name === entry.name);

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    success: true,
                    entry: entry,
                    rank: rank >= 0 ? rank + 1 : null,
                    isHighscore: rank >= 0 && rank < MAX_HIGHSCORES,
                    highscores: highscores
                })
            };
        }

        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ success: false, error: "Method not allowed" })
        };

    } catch (error) {
        console.error("Highscore function error:", error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ success: false, error: "Server error" })
        };
    }
};
