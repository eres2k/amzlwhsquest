/**
 * Character Data - Playable character stats, attacks, and abilities
 */

export const CHAR_DATA = {
    "Carrie": {
        role: "The 5S Monk",
        backstory: "Precision hawk who spots crooked tape from 50 meters and breathes calm into chaotic clusters.",
        attack: "Label Maker Burst",
        speed: 1.5,
        lives: 5,
        ability: "PRECISION FOCUS",
        abilityDesc: "Attacks deal 2x damage to bosses"
    },
    "Nevena": {
        role: "The Oracle",
        backstory: "Safety oracle who predicts mishaps, carries emergency Palatschinken, and documents everything twice.",
        attack: "Clipboard Shockwave",
        speed: 1.5,
        lives: 5,
        ability: "FORESIGHT",
        abilityDesc: "Longer invincibility after taking damage"
    },
    "Joao": {
        role: "The Siren",
        backstory: "Espresso cannon whose warnings ring louder than the fire alarm and kick energy through the floor.",
        attack: "Sonic Shout",
        speed: 1.5,
        lives: 5,
        ability: "CAFFEINE RUSH",
        abilityDesc: "Attacks have faster cooldown"
    },
    "Roman": {
        role: "The Ghost",
        backstory: "Bald audit phantom. Appears, fixes, vanishes. Hazards straighten themselves when he is near.",
        attack: "Stealth Audit",
        speed: 1.5,
        lives: 5,
        ability: "PHANTOM STEP",
        abilityDesc: "Hazards have smaller collision radius"
    },
    "Erwin": {
        role: "The Manager",
        backstory: "Rolls in with a kid-sized Tesla and slides into briefings faster than gossip spreads.",
        attack: "Tesla Energy Pulse",
        speed: 1.95,
        lives: 1,
        ability: "TESLA RUSH",
        abilityDesc: "1 life but 30% faster movement"
    }
};

export const ATTACKS = {
    "Carrie": { name: "Label Maker Burst", sprite: "attack_carrie", speed: 4.2, cooldown: 132, color: "#a855f7", text: "Aligned!" },  // 20% slower reload (was 110)
    "Nevena": { name: "Clipboard Shockwave", sprite: "attack_nevena", speed: 4.0, cooldown: 120, color: "#0ea5e9", text: "Documented!" },
    "Joao": { name: "Sonic Shout", sprite: "attack_joao", speed: 4.6, cooldown: 105, color: "#f97316", text: "Heard!" },
    "Roman": { name: "Stealth Audit Pulse", sprite: "attack_roman", speed: 4.0, cooldown: 115, color: "#94a3b8", text: "Noted." },
    "Erwin": { name: "Tesla Drift", sprite: "attack_erwin", speed: 5.0, cooldown: 140, color: "#22d3ee", text: "Zapped!" },
    default: { name: "Rule Book", sprite: "book", speed: 4.0, cooldown: 120, color: "#00ffff", text: "Hit!" }
};

export function getAttackData(name) {
    return ATTACKS[name] || ATTACKS.default;
}

export function getCharStats(name) {
    const data = CHAR_DATA[name] || {};
    return {
        speed: data.speed ?? 1.5,
        lives: data.lives ?? 5
    };
}

export const CHARACTER_LIST = ["Carrie", "Nevena", "Joao", "Roman", "Erwin"];
