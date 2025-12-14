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

    try {
        const store = getStore(HIGHSCORE_STORE_NAME);

        // GET - Retrieve highscores
        if (event.httpMethod === "GET") {
            try {
                const data = await store.get(HIGHSCORE_KEY, { type: "json" });
                const highscores = data || [];

                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({
                        success: true,
                        highscores: highscores.slice(0, MAX_HIGHSCORES)
                    })
                };
            } catch (e) {
                // No highscores yet
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({
                        success: true,
                        highscores: []
                    })
                };
            }
        }

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

            // Get existing highscores
            let highscores = [];
            try {
                const data = await store.get(HIGHSCORE_KEY, { type: "json" });
                highscores = data || [];
            } catch (e) {
                highscores = [];
            }

            // Add new entry and sort
            highscores.push(entry);
            highscores.sort((a, b) => b.score - a.score);

            // Keep only top scores
            highscores = highscores.slice(0, MAX_HIGHSCORES);

            // Save updated highscores
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
