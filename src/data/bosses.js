/**
 * Boss Data - Boss definitions and special boss configurations
 */

export const BOSS_TYPES = [
    { name: "Labour Inspector", sprite: "boss_inspector", hp: 10, speed: 1.2, attackDelay: 50, title: "The Enforcer", desc: "Checks every corner.", attackName: "Violation Notice", attackPattern: "sweep" },
    { name: "Compliance Auditor", sprite: "boss_compliance", hp: 12, speed: 0.8, attackDelay: 70, title: "The Watcher", desc: "Nothing escapes.", attackName: "Audit Cascade", attackPattern: "tracking" },
    { name: "Sebastian Sprigade", sprite: "boss_sebastian", hp: 15, speed: 1.0, attackDelay: 60, title: "Delivery Station Mgr", desc: "Obsessed with TPH.", attackName: "TPH Overload", attackPattern: "burst" },
    { name: "Regional OPS MGR", sprite: "boss_regional", hp: 14, speed: 0.6, attackDelay: 90, title: "The Executive", desc: "Metrics first.", attackName: "KPI Crusher", attackPattern: "orbital" },
    { name: "Avetta Platform", sprite: "boss_avetta", hp: 18, speed: 0.4, attackDelay: 100, title: "Risk Manager", desc: "Judges all.", attackName: "Risk Assessment Beam", attackPattern: "laser" },
    { name: "Jelena \"Jelly\"", sprite: "boss_jelly", hp: 13, speed: 0.9, attackDelay: 65, title: "HR Guardian", desc: "HR legend who never forgets a policy.", attackName: "Write-Up Wave", attackPattern: "wave" }
];

export const MEGA_SIMON_CONFIG = {
    name: "MEGA SIMON",
    sprite: "mega_simon",
    hp: 20,
    speed: 0.75,
    attackDelay: 55,
    title: "MEU WHS Regional Manager",
    desc: "Final audit begins.",
    attackName: "Storm of Compliance",
    attackPattern: "storm"
};

export const MECHA_SIMON_CONFIG = {
    name: "MECHA MEGA SIMON",
    sprite: "mecha_simon",
    hp: 999,
    speed: 1.2,
    attackDelay: 40,
    title: "MECHANIZED AUDIT ENFORCER",
    desc: "RESISTANCE IS FUTILE!",
    attackName: "Spread Annihilation",
    attackPattern: "spread",
    mechaTimer: 480 // 8 seconds at 60fps
};

export const MECHA_BEZOS_CONFIG = {
    name: "Mecha Jeff",
    sprite: "mecha_bezos",
    hp: 30,
    speed: 0.8,
    attackDelay: 50,
    title: "MECHA JEFF BEZOS",
    desc: "Prime directive: ELIMINATE!",
    attackName: "Prime Destruction",
    attackPattern: "mecha_bezos"
};
