/**
 * AI System - Gemini API integration for dynamic dialogue
 * Handles AI-generated responses with fallbacks
 */

import { API_CONFIG } from '../constants.js';
import { SIMULATED_AI } from '../data/aiDialogue.js';
import { BANTER_DB, BEZOS_TAUNTS } from '../data/banter.js';
import { pickRandom, personalizeAIText } from '../utils/helpers.js';

export class AISystem {
    constructor() {
        this.apiKey = null;
        this.apiKeyPromise = null;
    }

    async fetchApiKeyFromNetlify() {
        try {
            const res = await fetch(API_CONFIG.NETLIFY_KEY_ENDPOINT, { cache: 'no-store' });
            if (!res.ok) throw new Error(`Netlify key endpoint returned ${res.status}`);
            const data = await res.json();
            const key = (data && data.apiKey ? String(data.apiKey) : '').trim();
            if (!key) throw new Error('No apiKey field in Netlify response');
            this.apiKey = key;
            return this.apiKey;
        } catch (err) {
            return null;
        }
    }

    async ensureApiKey() {
        if (this.apiKey) return this.apiKey;
        if (!this.apiKeyPromise) this.apiKeyPromise = this.fetchApiKeyFromNetlify();
        return this.apiKeyPromise;
    }

    async callGemini(prompt, category = 'generic', context = {}, playerName = 'Coordinator') {
        const activeKey = await this.ensureApiKey();
        if (!activeKey) {
            return personalizeAIText(this.getRandomFallback(prompt, category, context), playerName);
        }

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${API_CONFIG.MODEL_NAME}:generateContent?key=${activeKey}`;
        const payload = {
            contents: [{
                parts: [{ text: prompt }]
            }]
        };
        const timeout = new Promise((r) => setTimeout(() => r("TIMEOUT"), 10000));

        try {
            const fetchPromise = fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const response = await Promise.race([fetchPromise, timeout]);

            if (response === "TIMEOUT") {
                return personalizeAIText(this.getRandomFallback(prompt, category, context), playerName);
            }
            if (!response.ok) {
                return personalizeAIText(this.getRandomFallback(prompt, category, context), playerName);
            }

            const data = await response.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) return personalizeAIText(text.trim(), playerName);
            return personalizeAIText(this.getRandomFallback(prompt, category, context), playerName);

        } catch (e) {
            return personalizeAIText(this.getRandomFallback(prompt, category, context), playerName);
        }
    }

    getRandomFallback(prompt, category = 'generic', context = {}) {
        const hazardName = context.hazardName;
        const stats = context.stats;
        const is = (key) => category === key || prompt.includes(key);

        if (is("runners")) return pickRandom(SIMULATED_AI.runners);
        if (is("simon_warning")) {
            const warnings = SIMULATED_AI.simon_warnings || [];
            const idx = Math.min(context.warningIndex || 0, warnings.length - 1);
            return warnings.length ? warnings[Math.max(0, idx)] : pickRandom(SIMULATED_AI.taunts);
        }
        if (is("bezos_taunt") || is("bezos_confrontation")) {
            return pickRandom(BEZOS_TAUNTS);
        }
        if (is("bezos_transform")) {
            return pickRandom([
                "WITNESS MY TRUE FORM! MECHA JEFF RISES!",
                "You forced this! BEHOLD MY ULTIMATE POWER!",
                "NOW YOU DIE! TRANSFORMATION SEQUENCE INITIATED!",
                "FOOLISH WORKER! FACE MY MECHANICAL MIGHT!",
                "PRIME TIME IS OVER! EXTINCTION MODE ACTIVATED!"
            ]);
        }
        if (is("player_response")) {
            return pickRandom([
                "Your reign of terror ends here, Bezos!",
                "The workers will NOT be silenced!",
                "Time to break your prime directive!",
                "This delivery is YOUR termination notice!",
                "No more exploiting workers! Today you fall!"
            ]);
        }
        if (is("taunt")) {
            if (prompt.includes("Simon")) return pickRandom(SIMULATED_AI.simon_taunts);
            return pickRandom(SIMULATED_AI.taunts);
        }
        if ((is("reviews_loss") || is("reviews_win")) && stats) {
            const time = stats.time ?? "?";
            const hazards = stats.hazards ?? "?";
            const books = stats.books ?? "?";
            const ops = stats.ops ?? "?";
            if (is("reviews_loss")) {
                return `Audit recap: ${hazards}/5 hazards, ${books} rule books thrown, ${ops} ops nudged in ${time}s. Safety tip: hydrate, then try again.`;
            }
            return `Victory recap: ${hazards}/5 hazards cleared in ${time}s, ${books} rule books launched, ${ops} ops redirected. Celebrate, then keep exits clear.`;
        }
        if (is("reviews_loss")) return pickRandom(SIMULATED_AI.reviews_loss);
        if (is("reviews_win")) return pickRandom(SIMULATED_AI.reviews_win);
        if (is("hazard") || is("tips")) {
            if (hazardName) return `Hazard "${hazardName}" cleared. Paperwork avoided.`;
            return pickRandom(SIMULATED_AI.tips);
        }
        if (is("banter_ops")) return pickRandom(BANTER_DB.ops);
        if (is("banter_assoc")) return pickRandom(BANTER_DB.assoc);

        return pickRandom(SIMULATED_AI.tips);
    }
}
