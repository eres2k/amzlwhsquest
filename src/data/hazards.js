/**
 * Hazard Pool - All possible warehouse hazards for procedural generation
 */

export const HAZARD_POOL = [
    // === POWERED INDUSTRIAL TRUCKS (PITs) ===
    { name: "Speeding PIT Operator", type: "forklift" },
    { name: "Forklift With Blocked View", type: "forklift" },
    { name: "Reach Truck Cutting Corner", type: "forklift" },
    { name: "Order Picker Too High", type: "forklift" },
    { name: "Turret Truck Near Pedestrians", type: "forklift" },
    { name: "Clamp Truck Overloaded", type: "forklift" },
    { name: "PIT Operator Without Seatbelt", type: "forklift" },

    // === PACK & SHIP HAZARDS ===
    { name: "Overflowing SLAM Line", type: "conveyor" },
    { name: "Jammed AFE Chute", type: "conveyor" },
    { name: "SIOC Avalanche", type: "box" },
    { name: "Crushed Jiffy Mailer Pile", type: "debris" },
    { name: "Tape Gun Left Running", type: "blade" },
    { name: "Poly Bag Explosion", type: "wrap" },
    { name: "Gift Wrap Station Chaos", type: "debris" },
    { name: "Dunnage Bag Mountain", type: "debris" },

    // === INBOUND & RECEIVE ===
    { name: "Unbroken-Down Gaylord", type: "tall_pallet" },
    { name: "Vendor Pallet Leaning", type: "tall_pallet" },
    { name: "Receive Dock Gap", type: "dock" },
    { name: "Trailer Without Wheel Chocks", type: "dock" },
    { name: "Dock Plate Not Secured", type: "dock" },
    { name: "Mixed SKU Nightmare Pallet", type: "tall_pallet" },
    { name: "Shrink Wrap Tornado", type: "wrap" },

    // === PROBLEM SOLVE CHAOS ===
    { name: "Problem Solve Cart Avalanche", type: "cart" },
    { name: "ASIN Research Black Hole", type: "tote" },
    { name: "Damaged Out Pile Growing", type: "box" },
    { name: "Research Bin Overflow", type: "tote" },
    { name: "Missing Label Saga", type: "compliance" },

    // === FLOOR HAZARDS ===
    { name: "Ice Pack Leak Trail", type: "spill" },
    { name: "Crushed Fragile Item Spill", type: "spill" },
    { name: "Leaking Liquid Hazmat", type: "spill" },
    { name: "Sweeper Missed This Spot", type: "spill" },
    { name: "Energy Drink Explosion", type: "spill" },
    { name: "Smoothie Shrapnel Zone", type: "spill" },
    { name: "Coffee Ring of Standup Past", type: "spill" },
    { name: "Wet Floor No Sign", type: "spill" },

    // === STOW & STORAGE ===
    { name: "Overstuffed Prime Bin", type: "tote" },
    { name: "Top Stock About to Fall", type: "tall_pallet" },
    { name: "Heavy Item Stowed High", type: "tall_pallet" },
    { name: "Bin Capacity Ignored", type: "box" },
    { name: "Unstable Rack Section", type: "tall_pallet" },
    { name: "Random Cage Contents", type: "cage" },

    // === PICK & COUNT ===
    { name: "Scanner Cord Trip Wire", type: "cord" },
    { name: "Pick Cart Wheel Failure", type: "cart" },
    { name: "Tote Stack Too Tall", type: "tote" },
    { name: "Mystery SKU in Wrong Bin", type: "box" },
    { name: "Cycle Count Chaos", type: "compliance" },

    // === EQUIPMENT & TOOLS ===
    { name: "Box Cutter Without Guard", type: "blade" },
    { name: "Frayed Scanner Holster", type: "cord" },
    { name: "Broken Safety Ladder", type: "facility" },
    { name: "Missing Step Stool", type: "facility" },
    { name: "Unsecured Extension Cord", type: "cord" },
    { name: "Charging Station Overload", type: "battery" },
    { name: "Dead Battery Pile", type: "battery" },

    // === FIRE & EMERGENCY ===
    { name: "Blocked Fire Exit", type: "door" },
    { name: "Fire Extinguisher Hidden", type: "door" },
    { name: "Emergency Shower Blocked", type: "facility" },
    { name: "First Aid Kit Empty", type: "compliance" },
    { name: "AED Signage Covered", type: "facility" },

    // === ERGONOMIC HAZARDS ===
    { name: "Overreaching Associate", type: "npc" },
    { name: "Improper Lifting Technique", type: "npc" },
    { name: "Continuous Repetitive Motion", type: "npc" },
    { name: "Standing Mat Missing", type: "facility" },
    { name: "Keyboard at Wrong Height", type: "facility" },

    // === PEOPLE & BEHAVIOR ===
    { name: "Phone Walker on Floor", type: "npc" },
    { name: "Manager Speed Walk Mode", type: "npc" },
    { name: "New Hire Wrong Way Traffic", type: "npc" },
    { name: "Peak Season Burnout Zone", type: "npc" },
    { name: "Ambassador Training Cluster", type: "npc" },
    { name: "VTO Line Blocking Path", type: "npc" },

    // === OUTBOUND & SHIPPING ===
    { name: "Trailer Loaded Unevenly", type: "dock" },
    { name: "Smalls Bag Landslide", type: "debris" },
    { name: "Rollers Not Locked", type: "cage" },
    { name: "Cart Wall Collapse Risk", type: "cart" },
    { name: "CPT Rush Hour Chaos", type: "conveyor" },
    { name: "Sortation System Jam", type: "conveyor" },

    // === COMPLIANCE & DOCUMENTATION ===
    { name: "Safety Audit Due Tomorrow", type: "compliance" },
    { name: "Training Expired Badge", type: "compliance" },
    { name: "PPE Checklist Skipped", type: "compliance" },
    { name: "Incident Near-Miss Unreported", type: "compliance" },
    { name: "OSHA Log Update Pending", type: "compliance" },
    { name: "Lockout Tagout Forgotten", type: "compliance" }
];

export function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export function pickRandomHazards(count) {
    const picks = shuffleArray([...HAZARD_POOL]);
    return picks.slice(0, Math.min(count, picks.length));
}
