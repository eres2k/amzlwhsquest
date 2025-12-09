/**
 * Utility Helper Functions
 */

export function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export function personalizeAIText(text, playerName = 'Coordinator') {
    if (!text) return text;
    const patterns = [
        /\[\s*player\s*name\s*\]/gi,
        /\{\s*player\s*name\s*\}/gi,
        /<\s*player\s*name\s*>/gi,
        /player name/gi,
        /\[\s*player\s*\]/gi,
        /\{\s*player\s*\}/gi,
        /<\s*player\s*>/gi
    ];
    let cleaned = text;
    patterns.forEach(p => { cleaned = cleaned.replace(p, playerName); });
    return cleaned;
}

export function distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
