/**
 * Banter System - NPC dialogue and AI-generated banter
 */

import { GAME_CONSTANTS } from '../constants.js';
import { BANTER_DB } from '../data/banter.js';
import { pickRandom } from '../utils/helpers.js';

export class BanterSystem {
    constructor(aiSystem, particleSystem) {
        this.aiSystem = aiSystem;
        this.particleSystem = particleSystem;
        this.lastAIBanterTime = 0;
    }

    async triggerBanter(entity, playerName = 'Coordinator') {
        const now = Date.now();

        // Random chance for banter (0.2% per frame, roughly once every few seconds)
        if (Math.random() > 0.002) return;

        // Check if entity is ops or associate
        const isOps = entity.type === 'ops';
        const isRunner = entity.type === 'runner';

        if (!isOps && !isRunner) return;

        // Throttle AI banter to once every 15 seconds
        if (now - this.lastAIBanterTime < GAME_CONSTANTS.AI_BANTER_COOLDOWN) {
            // Use static banter instead
            const text = isOps ? pickRandom(BANTER_DB.ops) : pickRandom(BANTER_DB.assoc);
            this.particleSystem.spawnFloatingText(entity.x, entity.y - 10, text, '#ffffff');
            return;
        }

        // Use AI banter
        this.lastAIBanterTime = now;
        const category = isOps ? 'banter_ops' : 'banter_assoc';
        const prompt = isOps ?
            `Generate a single short (5-10 words) stressed warehouse operations manager line about metrics, rates, or deadlines.` :
            `Generate a single short (5-10 words) tired warehouse associate complaint about work conditions.`;

        try {
            const text = await this.aiSystem.callGemini(prompt, category, {}, playerName);
            this.particleSystem.spawnFloatingText(entity.x, entity.y - 10, text, '#ffff00');
        } catch (e) {
            // Fallback to static banter on error
            const text = isOps ? pickRandom(BANTER_DB.ops) : pickRandom(BANTER_DB.assoc);
            this.particleSystem.spawnFloatingText(entity.x, entity.y - 10, text, '#ffffff');
        }
    }
}
