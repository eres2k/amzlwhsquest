/**
 * Boss Data - Boss definitions and special boss configurations
 *
 * All boss data extracted from AMZLWHSQUEST122.html
 */

// === STANDARD BOSS TYPES ===
// Random bosses encountered during normal gameplay
export const BOSS_TYPES = [
    {
        name: "Labour Inspector",
        sprite: "boss_inspector",
        hp: 25,
        speed: 1.2,
        attackDelay: 50,
        title: "The Enforcer",
        desc: "Checks every corner.",
        attackName: "Violation Notice",
        attackPattern: "sweep"
    },
    {
        name: "Compliance Auditor",
        sprite: "boss_compliance",
        hp: 30,
        speed: 0.8,
        attackDelay: 70,
        title: "The Watcher",
        desc: "Nothing escapes.",
        attackName: "Audit Cascade",
        attackPattern: "tracking"
    },
    {
        name: "Sebastian Sprigade",
        sprite: "boss_sebastian",
        hp: 35,
        speed: 1.0,
        attackDelay: 60,
        title: "Delivery Station Mgr",
        desc: "Obsessed with TPH.",
        attackName: "TPH Overload",
        attackPattern: "burst"
    },
    {
        name: "Regional OPS MGR",
        sprite: "boss_regional",
        hp: 32,
        speed: 0.6,
        attackDelay: 90,
        title: "The Executive",
        desc: "Metrics first.",
        attackName: "KPI Crusher",
        attackPattern: "orbital"
    },
    {
        name: "Avetta Platform",
        sprite: "boss_avetta",
        hp: 40,
        speed: 0.4,
        attackDelay: 100,
        title: "Risk Manager",
        desc: "Judges all.",
        attackName: "Risk Assessment Beam",
        attackPattern: "laser"
    },
    {
        name: "Jelena \"Jelly\"",
        sprite: "boss_jelly",
        hp: 28,
        speed: 0.9,
        attackDelay: 65,
        title: "HR Guardian",
        desc: "HR legend who never forgets a policy.",
        attackName: "Write-Up Wave",
        attackPattern: "wave"
    }
];

// === MEGA SIMON - FINAL BOSS (Phase 1) ===
// The final boss of the game, Simon transforms after taking too many rule books
export const MEGA_SIMON_CONFIG = {
    name: "MEGA SIMON",
    sprite: "simonBoss",
    hp: 50,
    maxHp: 50,
    speed: 1.3,
    attackDelay: 30,
    title: "THE WHS FINAL BOSS",
    desc: "He is not impressed.",
    attackName: "SAFETY VIOLATION STORM",
    attackPattern: "storm",
    tauntsTriggered: [],
    tauntThresholds: [0.75, 0.5, 0.25],
    transformTriggered: false,
    isMecha: false,
    lowHealthAttackTriggered: false
};

// === MECHA MEGA SIMON - FINAL BOSS (Phase 2) ===
// Simon's TRUE FORM after fake victory - UNBEATABLE (triggers game over)
export const MECHA_SIMON_CONFIG = {
    name: "MECHA MEGA SIMON",
    sprite: "mechaMegaSimon",
    hp: 999,
    maxHp: 999,
    speed: 1.2,
    attackDelay: 40,
    title: "MECHANIZED AUDIT ENFORCER",
    desc: "RESISTANCE IS FUTILE!",
    attackName: "COMPLIANCE ANNIHILATION",
    attackPattern: "spread",
    isMecha: true,
    mechaTimer: 0, // Timer to trigger game over (480 ticks = 8 seconds at 60fps)
    mechaGameOverTime: 480
};

// === MECHA JEFF BEZOS - SPECIAL BOSS ===
// Encountered after throne confrontation in Yard Level
export const MECHA_BEZOS_CONFIG = {
    name: "MECHA JEFF BEZOS",
    sprite: "mechaBezos",
    hp: 40,
    maxHp: 40,
    speed: 1.2,
    attackDelay: 50,
    title: "THE ULTIMATE BOSS",
    desc: "Automation has gone too far!",
    attackName: "AUTOMATION PROTOCOL",
    attackPhase: 0, // Tracks which attack pattern (0=Missiles, 1=Laser Sweep, 2=Drone Swarm)
    laserAngle: 0,
    droneSpawnTimer: 0,
    tauntsTriggered: [],
    tauntThresholds: [0.75, 0.5, 0.25],
    enraged: false,
    tauntTimer: 0,
    fallingPackages: [],
    shockwaveTimer: 0,
    dashTarget: null,
    dashCooldown: 0
};

// === MECHA JEFF (MULTI-PHASE FINAL ENCOUNTER) ===
// The completely redesigned Mecha Boss with multiple phases
export const MECHA_JEFF_CONFIG = {
    name: "MECHA JEFF",
    hp: 48,
    maxHp: 48,
    currentPhase: 0, // 0=Prime Missiles, 1=Drone Swarm, 2=Package Rain, 3=Laser Grid, 4=Ground Slam
    phaseTimer: 0,
    phaseDuration: 280,
    phaseTransition: false,
    transitionTimer: 0,
    attackCooldown: 0,
    projectiles: [],
    shadows: [],
    beam: null,
    beams: [],
    phaseTaunts: [
        "PRIME DELIVERY INCOMING!",
        "RELEASE THE DRONES!",
        "BOXES FROM THE SKY!",
        "LASER PRECISION!",
        "FEEL THE EARTH SHAKE!"
    ]
};

// === BOSS TAUNTS ===
// General boss taunts (localized versions available in game)
export const BOSS_TAUNTS = {
    generic: [
        "My spreadsheet predicts your failure!",
        "You cannot audit the inevitable!",
        "I am the final regulation!",
        "Compliance dropping... Termination imminent!",
        "Resistance is a safety violation!"
    ],
    simon: [
        "I AM THE SAFETY STANDARD!",
        "YOU CANNOT ESCAPE THE AUDIT!",
        "ENTROPY COMES FOR US ALL!",
        "YOUR PPE IS INSUFFICIENT!"
    ],
    simonWarnings: [
        "First warning: Stop flinging manuals. Compliance is not a contact sport.",
        "Final warning: Holster the rule books or I escalate this audit into a boss fight."
    ]
};

// === BEZOS TAUNTS ===
export const BEZOS_TAUNTS = {
    yard: [
        "Come on then! I haven't got all day!",
        "You call that speed? My grandmother moves faster!",
        "The yard separates the workers from the WIMPS!",
        "Every second you waste costs the company money!",
        "I built this empire from NOTHING!",
        "You want a raise? EARN IT!",
        "Keep dodging! It's good entertainment!",
        "I've seen better coordination from interns!",
        "Tick tock! Your shift is almost OVER!",
        "Almost there... just kidding, you'll never make it!",
        "This is YOUR performance review!",
        "The trucks don't stop for ANYONE!"
    ],
    castle: [
        "WELCOME TO MY FORTRESS OF EFFICIENCY!",
        "THIS CASTLE WAS BUILT ON PRIME SUBSCRIPTIONS!",
        "EVERY BRICK IS A WORKER'S DREAM... CRUSHED!",
        "YOU DARE ENTER THE BEZOS DOMAIN?!",
        "MY TOWERS REACH HIGHER THAN YOUR AMBITIONS!",
        "THE ALGORITHMS DESIGNED THIS MAZE!",
        "NO UNION CAN SIEGE THESE WALLS!",
        "THIS IS WHERE WORKERS BECOME... OPTIMIZED!",
        "THE CASTLE IS MY FINAL WAREHOUSE!",
        "ONLY THE WORTHY MEET MECHA JEFF!"
    ],
    boss: [
        "Work harder, not smarter!",
        "Day One? Try Day DONE!",
        "No bathroom breaks in space!",
        "Prime delivery: FAILURE!",
        "Your metrics are TERRIBLE!",
        "Automate or ELIMINATE!",
        "I'm watching your IDLE TIME!",
        "Customer obsession DEMANDS speed!",
        "Move faster! Time is MONEY!",
        "Safety? I have insurance!",
        "Ownership? I own EVERYTHING!",
        "Think BIG or go HOME!",
        "Deliver RESULTS or get REPLACED!",
        "Automation never complains!"
    ]
};

// === MECHA BEZOS SPECIFIC TAUNTS ===
export const MECHA_BEZOS_TAUNTS = [
    "YOUR METRICS ARE UNACCEPTABLE!",
    "TWO-DAY SHIPPING... FOR YOUR DOOM!",
    "PRIME DIRECTIVE: ELIMINATE!",
    "CUSTOMER OBSESSION... WITH DESTRUCTION!",
    "BEZOS PROTOCOL ENGAGED!"
];

// === ATTACK PATTERN DESCRIPTIONS ===
// Documentation of boss attack patterns
export const ATTACK_PATTERNS = {
    sweep: {
        name: "Sweep",
        desc: "Wide horizontal sweep attack (Labour Inspector)",
        normalAttack: "11 projectiles in wide arc",
        desperationAttack: "EMERGENCY FULL INSPECTION - 15-way sweep covering entire screen"
    },
    tracking: {
        name: "Tracking",
        desc: "Homing projectiles in grid pattern (Compliance Auditor)",
        normalAttack: "6 slow homing projectiles in grid",
        desperationAttack: "TOTAL LOCKDOWN - 12 homing projectiles in all directions"
    },
    burst: {
        name: "Burst",
        desc: "Rapid-fire machine gun barrage (Sebastian Sprigade)",
        normalAttack: "10-shot rapid burst with acceleration",
        desperationAttack: "MAXIMUM TPH OVERLOAD - 15-shot ultra-rapid burst"
    },
    orbital: {
        name: "Orbital",
        desc: "Counter-rotating orbital rings (Regional OPS MGR)",
        normalAttack: "Dual counter-rotating rings (16 projectiles)",
        desperationAttack: "FULL AUDIT STORM - TRIPLE orbital rings (30 projectiles)"
    },
    laser: {
        name: "Laser",
        desc: "Cross/asterisk laser pattern (Avetta Platform)",
        normalAttack: "Cross pattern laser beams in 5 directions",
        desperationAttack: "CRITICAL RISK MATRIX - asterisk pattern (8 directions × 2 waves)"
    },
    wave: {
        name: "Wave",
        desc: "Cascading sinusoidal waves (Jelena/Jelly)",
        normalAttack: "7-wave cascading undulating attack",
        desperationAttack: "TERMINATION NOTICE - massive 9-wave tsunami"
    },
    storm: {
        name: "Storm",
        desc: "Chaotic 360° projectile storm (MEGA SIMON)",
        normalAttack: "14 projectiles in random directions at varying speeds",
        desperationAttack: "AUDIT APOCALYPSE - 20 projectiles absolute chaos"
    }
};

// === BOSS LOCALIZATION DATA ===
// Region-specific boss name localizations
export const BOSS_LOCALIZATIONS = {
    DE: {
        'Labour Inspector': 'Gewerbeaufsicht',
        'Compliance Auditor': 'Berufsgenossenschaft',
        'Regional OPS MGR': 'Regionaler Betriebsleiter',
        'Avetta Platform': 'Avetta Risikoprüfer'
    },
    AT: {
        'Labour Inspector': 'Arbeitsinspektorat',
        'Compliance Auditor': 'AUVA Prüfer',
        'Regional OPS MGR': 'Regionale Betriebsleitung'
    },
    NL: {
        'Labour Inspector': 'Inspectie SZW',
        'Compliance Auditor': 'Arbo-adviseur',
        'Regional OPS MGR': 'Regiomanager Operaties',
        'Avetta Platform': 'RI&E Controleur'
    }
};

// === BOSS MECHANICS ===
export const BOSS_MECHANICS = {
    tauntThresholds: [0.75, 0.5, 0.25], // HP % thresholds for taunts
    desperationThreshold: 0.1, // HP % for desperation mode (10%)
    desperationHealthRestore: 0.3, // Restore to 30% HP in desperation
    desperationSpeedBonus: 1.3, // 30% speed increase
    desperationBlockChance: 0.1, // 10% chance to block attacks
    desperationDeflectChance: 0.1, // 10% chance to deflect attacks
    enrageThreshold: 10, // Enrage when HP <= 10 (Mecha Bezos)
    enrageSpeedMultiplier: 1.5 // 50% speed increase when enraged
};
