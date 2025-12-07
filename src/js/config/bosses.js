/**
 * Boss configurations and data
 */

export const BOSS_TYPES = [
  {
    name: "Labour Inspector",
    sprite: "boss_inspector",
    hp: 10,
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
    hp: 12,
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
    hp: 15,
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
    hp: 14,
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
    hp: 18,
    speed: 0.4,
    attackDelay: 100,
    title: "Risk Mgmt AI",
    desc: "Judges all.",
    attackName: "Risk Assessment Beam",
    attackPattern: "laser"
  },
  {
    name: "Jelena \"Jelly\"",
    sprite: "boss_jelly",
    hp: 13,
    speed: 0.9,
    attackDelay: 65,
    title: "HR Guardian",
    desc: "HR legend who never forgets a policy.",
    attackName: "Write-Up Wave",
    attackPattern: "wave"
  }
];

export function getRandomBoss() {
  return BOSS_TYPES[Math.floor(Math.random() * BOSS_TYPES.length)];
}
