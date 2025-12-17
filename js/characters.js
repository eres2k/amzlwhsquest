// ============================================================================
// AMZL WHS QUEST - CHARACTER DATA
// Character definitions, attacks, stats, and defeat lines
// ============================================================================

// --- CHARACTER DATA ---
const CHAR_DATA = {
    "Carrie": {
        role: "The 5S Monk",
        backstory: "Precision hawk who spots crooked tape from 50 meters and breathes calm into chaotic clusters.",
        attack: "Label Maker Burst",
        speed: 1.5,
        lives: 2,
        ability: "PRECISION FOCUS",
        abilityDesc: "2x Damage, 2 Lives"
    },
    "Nevena": {
        role: "The Oracle",
        backstory: "Safety oracle who predicts mishaps, carries emergency Palatschinken, and documents everything twice.",
        attack: "Clipboard Shockwave",
        speed: 1.5,
        lives: 4,
        ability: "FORESIGHT",
        abilityDesc: "30% Longer Invincibility, 4 Lives"
    },
    "Joao": {
        role: "The Siren",
        backstory: "Espresso cannon whose warnings ring louder than the fire alarm and kick energy through the floor.",
        attack: "Sonic Shout",
        speed: 1.5,
        lives: 3,
        ability: "CAFFEINE RUSH",
        abilityDesc: "35% Faster Cooldown, 3 Lives"
    },
    "Roman": {
        role: "The Ghost",
        backstory: "Bald audit phantom. Appears, fixes, vanishes. Hazards straighten themselves when he is near.",
        attack: "Stealth Audit",
        speed: 1.5,
        lives: 3,
        ability: "PHANTOM STEP",
        abilityDesc: "40% Smaller Hitbox, 3 Lives"
    },
    "Erwin": {
        role: "The Manager",
        backstory: "Rolls in with a kid-sized Tesla and slides into briefings faster than gossip spreads.",
        attack: "Tesla Energy Pulse",
        speed: 1.95,
        lives: 1,
        ability: "TESLA RUSH",
        abilityDesc: "30% Faster, 1 Life"
    }
};

// --- ATTACK DATA ---
const ATTACKS = {
    "Carrie": { name: "Label Maker Burst", sprite: "attack_carrie", speed: 4.2, cooldown: 110, color: "#a855f7", text: "Aligned!" },
    "Nevena": { name: "Clipboard Shockwave", sprite: "attack_nevena", speed: 4.0, cooldown: 120, color: "#0ea5e9", text: "Documented!" },
    "Joao": { name: "Sonic Shout", sprite: "attack_joao", speed: 4.6, cooldown: 105, color: "#f97316", text: "Heard!" },
    "Roman": { name: "Stealth Audit Pulse", sprite: "attack_roman", speed: 4.0, cooldown: 115, color: "#94a3b8", text: "Noted." },
    "Erwin": { name: "Tesla Drift", sprite: "attack_erwin", speed: 5.0, cooldown: 140, color: "#22d3ee", text: "Zapped!" },
    default: { name: "Rule Book", sprite: "book", speed: 4.0, cooldown: 120, color: "#00ffff", text: "Hit!" }
};

// --- HELPER FUNCTIONS ---
function getAttackData(name) {
    return ATTACKS[name] || ATTACKS.default;
}

function getCharStats(name) {
    const data = CHAR_DATA[name] || {};
    return {
        speed: data.speed ?? 1.5,
        lives: data.lives ?? 3
    };
}

// --- CHARACTER DEFEAT VOICE LINES ---
const CHARACTER_DEFEAT_LINES = {
    "Carrie": [
        "My labels... all crooked now...",
        "The 5S system... failed me... or I failed it...",
        "Even my precision couldn't save me from this mess.",
        "Sort, Set, Shine, Standardize... Surrender."
    ],
    "Nevena": [
        "The Oracle did not foresee this outcome...",
        "My clipboard... it predicted everything except my defeat.",
        "Documentation complete: Status - Terminated.",
        "Even my emergency Palatschinken couldn't save me."
    ],
    "Joao": [
        "My warnings... nobody heard them in time...",
        "The Siren goes silent... forever...",
        "All that espresso... wasted...",
        "I couldn't shout loud enough to stop this."
    ],
    "Roman": [
        "Even ghosts can be eliminated...",
        "I vanished one too many times...",
        "The audit trail... ends here...",
        "Should have stayed invisible longer."
    ],
    "Erwin": [
        "My Tesla... my beautiful Tesla...",
        "One life wasn't enough...",
        "Drifted right into disaster...",
        "The Manager has been managed... out."
    ]
};
