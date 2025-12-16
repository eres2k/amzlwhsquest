// ============================================================================
// AMZL WHS QUEST - HAZARDS DATABASE
// All hazard definitions, PPE items, and regulatory details
// ============================================================================

// === PPE ITEMS FOR QUARTERMASTER'S SAFETY LOCKER ===
const PPE_ITEMS = [
    { id: 'safety_shoes', name: 'S3 Safety Shoes', cost: 500, icon: 'shoe',
      desc: '+15% Move Speed', context: 'Slip resistance EN ISO 20345', buff: { type: 'speed', value: 0.15 } },
    { id: 'hi_vis_vest', name: 'High-Vis Vest', cost: 1000, icon: 'vest',
      desc: '15% Dodge Chance', context: 'Visibility EN ISO 20471', buff: { type: 'dodge', value: 0.15 } },
    { id: 'ear_defenders', name: 'Ear Defenders', cost: 800, icon: 'ear',
      desc: '+1 Max HP', context: 'Noise protection >85dB', buff: { type: 'maxhp', value: 1 } },
    { id: 'cut_gloves', name: 'Cut-Resistant Gloves', cost: 1200, icon: 'glove',
      desc: '+20% Fire Rate', context: 'Hand protection EN 388', buff: { type: 'firerate', value: 0.20 } },
    { id: 'safety_goggles', name: 'Safety Goggles', cost: 750, icon: 'goggle',
      desc: '25% Crit (2x Dmg, Bypass)', context: 'EN 166 - Crits bypass dodge/deflect!', buff: { type: 'crit', value: 0.25 } },
    { id: 'back_belt', name: 'Back Support Belt', cost: 600, icon: 'belt',
      desc: '+30% Score Multiplier', context: 'Ergonomic lifting support - work efficiently', buff: { type: 'score', value: 0.30 } },
    { id: 'bump_cap', name: 'Bump Cap', cost: 900, icon: 'cap',
      desc: '+0.5s Invincibility', context: 'Head impact protection EN 812', buff: { type: 'iframe', value: 30 } },
    { id: 'hydration', name: 'Hydration Pouch', cost: 2000, icon: 'water',
      desc: 'Regen 1 HP / 30s', context: 'Heat stress prevention', buff: { type: 'regen', value: 1800 } },
    { id: 'knee_pads', name: 'Knee Pads', cost: 550, icon: 'knee',
      desc: '+50% Interact Range', context: 'Kneeling work EN 14404', buff: { type: 'interact', value: 0.50 } },
    { id: 'walkie_talkie', name: 'Walkie-Talkie', cost: 1100, icon: 'radio',
      desc: '-30% Ops Aggro', context: 'Clear communication channels', buff: { type: 'stealth', value: 0.30 } },
    // === PREMIUM TIER PPE - Expensive but powerful for long-term playability ===
    { id: 'exoskeleton', name: 'Exoskeleton Suit', cost: 5000, icon: 'exo',
      desc: '+40% Speed, +2 Max HP', context: 'EN ISO 13482 Personal care robot safety', buff: { type: 'multi', effects: [{ type: 'speed', value: 0.40 }, { type: 'maxhp', value: 2 }] } },
    { id: 'ar_helmet', name: 'AR Safety Helmet', cost: 7500, icon: 'arhelm',
      desc: 'Tag Hazards/Runners/OPS, +1s Invuln', context: 'EN 812 with integrated HMI display - highlights threats', buff: { type: 'multi', effects: [{ type: 'hazard_reveal', value: 1 }, { type: 'iframe', value: 60 }] } },
    { id: 'quantum_vest', name: 'Quantum Shield Vest', cost: 10000, icon: 'quantum',
      desc: '25% Dmg Reflect, Regen 1HP/20s', context: 'Experimental OSHA-X prototype tech', buff: { type: 'multi', effects: [{ type: 'reflect', value: 0.25 }, { type: 'regen', value: 1200 }] } },
    { id: 'bezos_armor', name: 'Prime Guardian Armor', cost: 15000, icon: 'primearmor',
      desc: '2x Damage, 50% Block Chance', context: 'Ultimate safety gear - customer obsession incarnate', buff: { type: 'multi', effects: [{ type: 'damage', value: 2.0 }, { type: 'block', value: 0.50 }] } },
    // === SPECIAL ACTIONS ===
    { id: 'return_all', name: '>> RETURN ALL PPE <<', cost: 0, icon: 'return',
      desc: 'Return ALL items for full refund', context: 'Full PPE reset - get your Safety Points back!', buff: null, isAction: true },
    { id: 'exit_shop', name: '>> EXIT SHOP <<', cost: 0, icon: 'exit',
      desc: 'Leave the Safety Locker', context: 'Return to the warehouse floor', buff: null, isAction: true, isExit: true }
];

// === HAZARD POOL ===
// All possible warehouse hazards that can appear in the game
const HAZARD_POOL = [
    // === ERGONOMIC HAZARDS - REPETITIVE MOTION (Stowing/Picking) ===
    { name: "Repetitive Stow Motion (1000+ scans/shift)", type: "npc" },
    { name: "Continuous Scanning/Twisting Pattern", type: "npc" },
    { name: "Same-Motion Stowing Into Bags", type: "npc" },
    { name: "High-Rate Pick Without Rotation", type: "npc" },
    { name: "Carpal Tunnel Risk Station", type: "facility" },

    // === ERGONOMIC HAZARDS - AWKWARD POSTURES ===
    { name: "Top Shelf Overreach (Stow Bag)", type: "npc" },
    { name: "Bottom Shelf Repeated Bending", type: "npc" },
    { name: "Twisted Spine While Scanning", type: "npc" },
    { name: "Shoulder-Height Stowing Station", type: "facility" },
    { name: "Kneeling Without Knee Pads", type: "npc" },
    { name: "Standing Mat Missing At Station", type: "facility" },

    // === ERGONOMIC HAZARDS - HEAVY LIFTING ===
    { name: "Non-Con Item (Dog Food 20kg+)", type: "box" },
    { name: "Oversized Furniture Solo Lift", type: "box" },
    { name: "Heavy Package Without Team Lift", type: "box" },
    { name: "Water Cases Stacked High", type: "tall_pallet" },
    { name: "Cat Litter Bucket Solo Carry", type: "box" },
    { name: "Exercise Equipment Over 23kg", type: "box" },

    // === ERGONOMIC HAZARDS - PUSHING/PULLING FORCE ===
    { name: "Go-Cart With Bad Wheels (200kg+)", type: "cart" },
    { name: "Heavy Cage High Rolling Resistance", type: "cage" },
    { name: "Stuck Pallet Jack Wheels", type: "forklift" },
    { name: "Overloaded Cart Exceeding Limit", type: "cart" },
    { name: "Cage Door Jamming On Floor", type: "cage" },
    { name: "Manual Pallet Movement No PPE", type: "cart" },

    // === CONVEYOR & MACHINERY HAZARDS ===
    { name: "Nip Point At Drive Roller", type: "conveyor" },
    { name: "Pinch Point Belt Gap Exposed", type: "conveyor" },
    { name: "Jam Breaking While Belt Running", type: "conveyor" },
    { name: "LOTO Violation At Conveyor", type: "conveyor" },
    { name: "Missing Safety Guard On Belt", type: "conveyor" },
    { name: "Package Falling From Overhead Chute", type: "conveyor" },
    { name: "Loose Clothing Near Moving Parts", type: "conveyor" },
    { name: "Hair/Lanyard Entanglement Risk", type: "conveyor" },
    { name: "E-Stop Out Of Reach", type: "conveyor" },
    { name: "Sortation System Package Jam", type: "conveyor" },

    // === SLIPS, TRIPS, AND FALLS ===
    { name: "Loose Shrink Wrap In Walkway", type: "debris" },
    { name: "Pallet Straps On Floor", type: "debris" },
    { name: "Broken Pallet Wood Scattered", type: "debris" },
    { name: "Damaged Concrete Surface", type: "spill" },
    { name: "Floor Tape Peeling Up", type: "spill" },
    { name: "Wet Floor From Winter Tracking", type: "spill" },
    { name: "Ice/Snow Tracked Inside", type: "spill" },
    { name: "Wet Floor No Warning Sign", type: "spill" },
    { name: "Narrow Aisle Blocked By Carts", type: "cart" },
    { name: "Staged Pallets Blocking Path", type: "tall_pallet" },
    { name: "Totes Forcing Squeeze-Through", type: "tote" },
    { name: "Step-Over Obstacle Hazard", type: "debris" },

    // === POWERED INDUSTRIAL TRUCKS (PIT) ===
    { name: "EPJ Running Over Toes", type: "forklift" },
    { name: "Manual Pallet Jack Foot Injury Risk", type: "forklift" },
    { name: "EPJ Collision With Racking", type: "forklift" },
    { name: "Forklift Striking Infrastructure", type: "forklift" },
    { name: "PIT-Cart Collision Zone", type: "forklift" },
    { name: "Battery Handling Without PPE", type: "battery" },
    { name: "Lead-Acid Battery Corrosive Exposure", type: "battery" },
    { name: "Charging Station Acid Spill", type: "battery" },
    { name: "PIT Operator Without Certification", type: "forklift" },
    { name: "Forklift Exceeding Speed Limit", type: "forklift" },

    // === PSYCHOSOCIAL & ENVIRONMENTAL ===
    { name: "Noise >85dB Without Ear Protection", type: "facility" },
    { name: "Constant Conveyor Alarm Noise", type: "conveyor" },
    { name: "High Takt Time Pace Pressure", type: "npc" },
    { name: "Peak Season Burnout Risk", type: "npc" },
    { name: "Rushing Due To Rate Targets", type: "npc" },
    { name: "Cold Stress Near Open Dock Door", type: "dock" },
    { name: "Winter Temperature Extreme Zone", type: "dock" },
    { name: "Summer Heatwave Non-AC Area", type: "facility" },
    { name: "Mental Fatigue Station", type: "npc" },

    // === HAZARDOUS MATERIALS (HazMat) ===
    { name: "Leaking Package (Bleach)", type: "spill" },
    { name: "Damaged Detergent Container", type: "spill" },
    { name: "Lithium Battery Package Damage", type: "battery" },
    { name: "Unknown Substance Spill", type: "spill" },
    { name: "Unmarked Dangerous Goods Package", type: "box" },
    { name: "Household Chemical Leak Trail", type: "spill" },
    { name: "Battery Thermal Event Risk", type: "battery" },

    // === RED FLAG VIOLATIONS ===
    { name: "Daisy-Chained Extension Cords", type: "cord" },
    { name: "Fire Exit Blocked By Carts", type: "door" },
    { name: "Fire Extinguisher Hidden By Pallets", type: "door" },
    { name: "Bent Racking Upright Not Offloaded", type: "tall_pallet" },
    { name: "Damaged Rack Under Load", type: "tall_pallet" },
    { name: "Missing Conveyor Safety Guard", type: "conveyor" },
    { name: "Emergency Exit Blocked By Cage", type: "door" },
    { name: "First Aid Kit Empty/Expired", type: "compliance" },
    { name: "AED Access Obstructed", type: "facility" },
    { name: "LOTO Padlock Missing", type: "compliance" },

    // === STOW & STORAGE SPECIFIC ===
    { name: "Overstuffed Stow Bag Capacity", type: "tote" },
    { name: "Heavy Item Stowed Above Shoulder", type: "tall_pallet" },
    { name: "Bin Weight Limit Exceeded", type: "box" },
    { name: "Unstable Rack Section", type: "tall_pallet" },
    { name: "Top Stock Unstable Stack", type: "tall_pallet" },

    // === INBOUND/DOCK HAZARDS ===
    { name: "Trailer Without Wheel Chocks", type: "dock" },
    { name: "Dock Plate Not Secured", type: "dock" },
    { name: "Dock Gap Foot Hazard", type: "dock" },
    { name: "Trailer Loaded Unevenly", type: "dock" },
    { name: "Vendor Pallet Leaning Dangerously", type: "tall_pallet" },

    // === COMPLIANCE & DOCUMENTATION ===
    { name: "LOTO Procedure Not Followed", type: "compliance" },
    { name: "PPE Checklist Not Completed", type: "compliance" },
    { name: "Near-Miss Incident Unreported", type: "compliance" },
    { name: "Safety Training Expired", type: "compliance" },
    { name: "Risk Assessment Overdue", type: "compliance" },

    // === GERMANY (DE) - DGUV & ArbSchG ===
    { name: "Blocked Fluchtweg (Escape Route)", type: "door", region: "DE" },
    { name: "Missing DGUV V3 Prüfung Sticker", type: "battery", region: "DE" },
    { name: "Ladungssicherung Violation", type: "tall_pallet", region: "DE" },
    { name: "Fehlende Gefährdungsbeurteilung", type: "compliance", region: "DE" },
    { name: "Sicherheitsbeauftragter Absent", type: "npc", region: "DE" },
    { name: "No Betriebsanweisung Posted", type: "compliance", region: "DE" },
    { name: "BetrSichV Machine Safety Violation", type: "compliance", region: "DE" },
    { name: "Missing Erste-Hilfe-Kasten", type: "facility", region: "DE" },
    { name: "Expired Prüfplakette On Equipment", type: "forklift", region: "DE" },
    { name: "Feuerlöscher Blocked Access", type: "door", region: "DE" },

    // === AUSTRIA (AT) - ASchG & BauV ===
    { name: "Unchecked PSA (PPE)", type: "compliance", region: "AT" },
    { name: "Missing Evaluierung (Risk Assessment)", type: "compliance", region: "AT" },
    { name: "SVP Not Informed", type: "npc", region: "AT" },
    { name: "Arbeitsinspektorat Warning Ignored", type: "compliance", region: "AT" },
    { name: "Fehlende Arbeitsplatzevaluierung", type: "compliance", region: "AT" },
    { name: "AUVA Checklist Incomplete", type: "compliance", region: "AT" },
    { name: "Sicherheitsfachkraft Missing", type: "npc", region: "AT" },
    { name: "Missing Brandschutzbeauftragter", type: "npc", region: "AT" },
    { name: "Arbeitsmittelverordnung Violation", type: "facility", region: "AT" },
    { name: "Notausgang Sign Obscured", type: "door", region: "AT" },

    // === NETHERLANDS (NL) - Arbowet & RI&E ===
    { name: "Missing RI&E Assessment", type: "compliance", region: "NL" },
    { name: "Blocked Nooduitgang", type: "door", region: "NL" },
    { name: "Preventiemedewerker Absent", type: "npc", region: "NL" },
    { name: "Preventiemedewerker Not Trained", type: "npc", region: "NL" },
    { name: "Arbocatalogus Not Followed", type: "compliance", region: "NL" },
    { name: "Arbodeskundige Report Overdue", type: "compliance", region: "NL" },
    { name: "BHV Team Understaffed", type: "npc", region: "NL" },
    { name: "Missing Plan van Aanpak", type: "compliance", region: "NL" },
    { name: "Werkplekinspectie Skipped", type: "compliance", region: "NL" },
    { name: "Veiligheidskundige Advice Ignored", type: "compliance", region: "NL" },
];

// === HAZARD REGULATORY DETAILS ===
// Detailed regulatory information for hazard types and specific hazards
const HAZARD_DETAILS = {
    // Type-based details (US/OSHA standards as default)
    byType: {
        forklift: {
            regulation: "OSHA 29 CFR 1910.178",
            title: "Powered Industrial Trucks",
            detail: "Operators must be trained & certified. Speed limits enforced. Pedestrians have right-of-way. Seatbelts required when equipped. Load capacity must not be exceeded.",
            penalty: "Up to $15,625 per serious violation"
        },
        conveyor: {
            regulation: "OSHA 29 CFR 1910.212",
            title: "Machine Guarding",
            detail: "Conveyors must have emergency stops within reach. Pinch points must be guarded. Jams cleared only when system is locked out. Regular maintenance required.",
            penalty: "Up to $15,625 per serious violation"
        },
        box: {
            regulation: "OSHA 29 CFR 1910.176",
            title: "Materials Handling & Storage",
            detail: "Storage areas must be kept free of hazards. Stacking must be stable and secure. Aisles must remain clear. Weight limits posted and followed.",
            penalty: "Up to $15,625 per serious violation"
        },
        debris: {
            regulation: "OSHA 29 CFR 1910.22",
            title: "Walking-Working Surfaces",
            detail: "All work areas must be clean and orderly. Debris creates slip/trip hazards. Immediate cleanup required. Housekeeping is everyone's responsibility.",
            penalty: "Up to $15,625 per serious violation"
        },
        blade: {
            regulation: "OSHA 29 CFR 1910.212",
            title: "Machine Guarding / Hand Tools",
            detail: "Cutting tools must have guards when not in use. Retractable blades required. Proper disposal of used blades. Never leave exposed blades unattended.",
            penalty: "Up to $15,625 per serious violation"
        },
        wrap: {
            regulation: "OSHA 29 CFR 1910.132",
            title: "Personal Protective Equipment",
            detail: "Proper handling of packaging materials required. Avoid entanglement hazards. Keep materials organized. Report damaged equipment immediately.",
            penalty: "Up to $15,625 per serious violation"
        },
        tall_pallet: {
            regulation: "OSHA 29 CFR 1910.176",
            title: "Materials Handling & Storage",
            detail: "Pallets must be stable before stacking. Height limits enforced. Heavy items on bottom. Damaged pallets removed from service. Proper unloading sequence required.",
            penalty: "Up to $15,625 per serious violation"
        },
        dock: {
            regulation: "OSHA 29 CFR 1910.26 & 1910.178",
            title: "Docking Operations",
            detail: "Wheel chocks required before loading/unloading. Dock plates must be secured. Trailer brakes set. Visual communication with driver required. Dock gaps must be bridged.",
            penalty: "Up to $15,625 per serious violation"
        },
        cart: {
            regulation: "OSHA 29 CFR 1910.176",
            title: "Materials Handling",
            detail: "Carts must not block aisles. Load limits followed. Proper pushing technique (not pulling). Wheels maintained. Secure loads before moving.",
            penalty: "Up to $15,625 per serious violation"
        },
        tote: {
            regulation: "OSHA 29 CFR 1910.176",
            title: "Materials Handling",
            detail: "Tote stacking limits enforced. Inspect for damage before use. Proper lifting techniques required. Do not overfill containers. Label hazardous contents.",
            penalty: "Up to $15,625 per serious violation"
        },
        spill: {
            regulation: "OSHA 29 CFR 1910.22 & 1910.141",
            title: "Housekeeping / Sanitation",
            detail: "Spills must be cleaned immediately or marked. Wet floor signs required. Report spills you cannot clean. Know location of spill kits. Document hazmat spills.",
            penalty: "Up to $15,625 per serious violation"
        },
        cord: {
            regulation: "OSHA 29 CFR 1910.305",
            title: "Electrical Wiring Methods",
            detail: "Cords must not create trip hazards. Damaged cords removed from service. Proper cord management required. No cords across walkways without protection.",
            penalty: "Up to $15,625 per serious violation"
        },
        facility: {
            regulation: "OSHA 29 CFR 1910.37",
            title: "Maintenance / Means of Egress",
            detail: "Safety equipment must be accessible and functional. Regular inspections required. Report defects immediately. Emergency equipment clearly marked.",
            penalty: "Up to $15,625 per serious violation"
        },
        battery: {
            regulation: "OSHA 29 CFR 1910.178(g)",
            title: "Battery Charging & Handling",
            detail: "Charging areas must be designated and ventilated. Eye wash stations nearby. No smoking/flames. Proper PPE required. Battery acid is corrosive.",
            penalty: "Up to $15,625 per serious violation"
        },
        door: {
            regulation: "OSHA 29 CFR 1910.37",
            title: "Means of Egress",
            detail: "Exit routes must never be blocked. Exit signs illuminated at all times. Doors must open in direction of travel. Fire equipment accessible 24/7.",
            penalty: "Up to $156,259 for willful violations"
        },
        compliance: {
            regulation: "OSHA 29 CFR 1904",
            title: "Recording & Reporting",
            detail: "All incidents must be documented. Training records maintained. Safety audits completed on schedule. Near-misses reported for prevention. Logs kept for 5 years.",
            penalty: "Up to $15,625 per serious violation"
        },
        npc: {
            regulation: "OSHA 29 CFR 1910.132 & General Duty Clause",
            title: "Employee Safety Conduct",
            detail: "Safe work practices required at all times. No distractions while walking. Follow traffic patterns. Report unsafe behaviors. Ergonomic practices enforced.",
            penalty: "Up to $15,625 per serious violation"
        },
        cage: {
            regulation: "OSHA 29 CFR 1910.176",
            title: "Materials Storage",
            detail: "Roll cages must be secured before moving. Brakes engaged when stationary. Load evenly distributed. Inspect wheels and latches. Never ride on equipment.",
            penalty: "Up to $15,625 per serious violation"
        }
    },
    // Region-specific regulatory details
    byRegion: {
        DE: {
            default: {
                regulation: "ArbSchG / DGUV Vorschriften",
                title: "Arbeitsschutzgesetz",
                detail: "German workplace safety law requires employer risk assessment (Gefährdungsbeurteilung), safety officers, and compliance with DGUV rules.",
                penalty: "Bußgeld bis zu €25.000"
            },
            specific: {
                "Blocked Fluchtweg (Escape Route)": {
                    regulation: "ASR A2.3 / ArbStättV",
                    title: "Fluchtwege und Notausgänge",
                    detail: "Escape routes must be kept clear at all times. Minimum width 1m for up to 20 persons. Emergency lighting required. Signs per ISO 7010.",
                    penalty: "Bußgeld bis zu €5.000 / Betriebsschließung möglich"
                },
                "Missing DGUV V3 Sticker": {
                    regulation: "DGUV Vorschrift 3",
                    title: "Elektrische Anlagen und Betriebsmittel",
                    detail: "All electrical equipment must be inspected and tagged. Portable equipment: every 6 months to 2 years. Failed equipment removed from service immediately.",
                    penalty: "Bußgeld + Haftung bei Unfällen"
                },
                "Unsecured Pallet (Ladungssicherung)": {
                    regulation: "DGUV Regel 108-007 / StVO §22",
                    title: "Ladungssicherung",
                    detail: "Loads must be secured against shifting, falling, rolling. VDI 2700 standards apply. Proper securing equipment required. Driver/loader responsible.",
                    penalty: "Bußgeld bis zu €50.000"
                },
                "Fehlende Gefährdungsbeurteilung": {
                    regulation: "ArbSchG §5",
                    title: "Gefährdungsbeurteilung",
                    detail: "Employers must assess all workplace hazards. Document findings and measures. Update after changes or incidents. Employee participation required.",
                    penalty: "Bußgeld bis zu €25.000"
                },
                "Sicherheitsbeauftragter Absent": {
                    regulation: "DGUV Vorschrift 1 §20",
                    title: "Sicherheitsbeauftragte",
                    detail: "Required: 1 safety officer per 20+ employees. Must be trained. Supports safety culture. Not liable but responsible for awareness.",
                    penalty: "Bußgeld + BG-Auflagen"
                },
                "No Betriebsanweisung Posted": {
                    regulation: "ArbSchG §12 / GefStoffV §14",
                    title: "Betriebsanweisungen",
                    detail: "Written operating instructions required for hazardous activities. Must be in German. Accessible at workplace. Annual training on contents.",
                    penalty: "Bußgeld bis zu €5.000"
                },
                "BetrSichV Violation Notice": {
                    regulation: "BetrSichV",
                    title: "Betriebssicherheitsverordnung",
                    detail: "Equipment must be safe for use. Regular inspections required. Documentation mandatory. Employer responsible for safety state.",
                    penalty: "Bußgeld bis zu €100.000 bei Gefährdung"
                },
                "Missing Erste-Hilfe-Kasten": {
                    regulation: "DGUV Vorschrift 1 / ASR A4.3",
                    title: "Erste Hilfe",
                    detail: "First aid materials mandatory: Small kit (<50 employees) or Large kit (>50). Contents per DIN 13157/13169. Regular inventory checks.",
                    penalty: "Bußgeld + Haftung bei Verletzungen"
                },
                "Expired Prüfplakette on Forklift": {
                    regulation: "BetrSichV / DGUV Vorschrift 68",
                    title: "Flurförderzeuge Prüfung",
                    detail: "Annual inspection by qualified person required. UVV-Prüfung documented. Defects corrected before use. Operator daily check also required.",
                    penalty: "Bußgeld + Betriebsverbot"
                },
                "Feuerlöscher Access Blocked": {
                    regulation: "ASR A2.2",
                    title: "Brandschutzeinrichtungen",
                    detail: "Fire extinguishers must be accessible within 20m walking distance. Marked with signs. Monthly visual check. Professional inspection every 2 years.",
                    penalty: "Bußgeld + Versicherungsausschluss bei Brand"
                }
            }
        },
        AT: {
            default: {
                regulation: "ASchG / AUVA",
                title: "ArbeitnehmerInnenschutzgesetz",
                detail: "Austrian workplace protection law. Employer must evaluate hazards, appoint safety personnel, and follow AUVA guidelines.",
                penalty: "Geldstrafe bis €14.530"
            },
            specific: {
                "Unchecked PSA (PPE)": {
                    regulation: "PSA-V / ASchG §70",
                    title: "Persönliche Schutzausrüstung",
                    detail: "PPE must be provided free, maintained, and inspected. Training on proper use required. Replace damaged equipment immediately.",
                    penalty: "Geldstrafe bis €7.260"
                },
                "Missing Evaluierung (Risk Assessment)": {
                    regulation: "ASchG §4",
                    title: "Arbeitsplatzevaluierung",
                    detail: "Systematic hazard evaluation required. Document all risks and countermeasures. Update after incidents or changes. SVP involvement mandatory.",
                    penalty: "Geldstrafe bis €14.530"
                },
                "SVP Not Informed": {
                    regulation: "ASchG §§76-83",
                    title: "Sicherheitsvertrauensperson",
                    detail: "Safety representative required (>10 employees). Must be informed of all safety matters. Protected from retaliation. Training provided.",
                    penalty: "Geldstrafe bis €7.260"
                },
                "Arbeitsinspektorat Warning Ignored": {
                    regulation: "ArbIG",
                    title: "Arbeitsinspektion",
                    detail: "Labor inspectorate warnings are legally binding. Compliance deadlines must be met. Appeals possible but don't suspend requirements.",
                    penalty: "Geldstrafe bis €72.670 / Betriebssperre"
                },
                "Fehlende Arbeitsplatzevaluierung": {
                    regulation: "ASchG §4",
                    title: "Arbeitsplatzevaluierung",
                    detail: "Every workplace must be evaluated for hazards. Physical, psychological, and ergonomic risks included. Documentation kept 5 years.",
                    penalty: "Geldstrafe bis €14.530"
                },
                "AUVA Checklist Incomplete": {
                    regulation: "AUVA M.plus Standards",
                    title: "AUVA Sicherheitsmanagement",
                    detail: "AUVA provides mandatory safety checklists. Completion required for insurance compliance. Regular audits conducted.",
                    penalty: "Höhere Beiträge / Regressansprüche"
                },
                "Sicherheitsfachkraft Missing": {
                    regulation: "ASchG §§73-75",
                    title: "Sicherheitsfachkraft (SFK)",
                    detail: "Safety specialist required based on employee count and risk. External SFK allowed for small businesses. Minimum hours defined by law.",
                    penalty: "Geldstrafe bis €14.530"
                },
                "Missing Brandschutzbeauftragter": {
                    regulation: "TRVB O 119 / ASchG",
                    title: "Brandschutzbeauftragter",
                    detail: "Fire safety officer required for larger facilities. Training certification needed. Responsible for evacuation plans and drills.",
                    penalty: "Geldstrafe + Auflagen durch Behörde"
                },
                "Arbeitsmittelverordnung Violation": {
                    regulation: "AM-VO",
                    title: "Arbeitsmittelverordnung",
                    detail: "Work equipment must be safe and suitable. Regular inspections documented. Only trained personnel operate machinery.",
                    penalty: "Geldstrafe bis €7.260"
                },
                "Notausgang Sign Obscured": {
                    regulation: "AStV §20 / TRVB E 102",
                    title: "Notausgänge Kennzeichnung",
                    detail: "Emergency exit signs must be visible at all times. Illuminated signs for larger buildings. Regular function tests required.",
                    penalty: "Geldstrafe + behördliche Auflagen"
                }
            }
        },
        NL: {
            default: {
                regulation: "Arbowet / RI&E",
                title: "Arbeidsomstandighedenwet",
                detail: "Dutch Working Conditions Act requires risk inventory (RI&E), prevention officer, and employee participation in safety matters.",
                penalty: "Boete tot €90.000"
            },
            specific: {
                "Missing RI&E Assessment": {
                    regulation: "Arbowet Art. 5",
                    title: "Risico-Inventarisatie en -Evaluatie",
                    detail: "Every employer must have RI&E. Identify all risks, evaluate severity, plan improvements. Review after incidents or changes. Certified validation may be required.",
                    penalty: "Boete tot €45.000"
                },
                "Blocked Nooduitgang": {
                    regulation: "Arbobesluit Art. 3.7 / Bouwbesluit",
                    title: "Nooduitgangen",
                    detail: "Emergency exits must remain clear. Doors open outward. Panic hardware required. Maximum travel distance to exit: 30m. Regular evacuation drills.",
                    penalty: "Boete tot €22.500 / sluiting"
                },
                "Prevention Officer Absent": {
                    regulation: "Arbowet Art. 13",
                    title: "Preventiemedewerker",
                    detail: "Every company needs at least one prevention officer. For <25 employees, owner may fulfill role. Assists with RI&E and safety measures.",
                    penalty: "Boete tot €4.500"
                },
                "Preventiemedewerker Not Trained": {
                    regulation: "Arbowet Art. 13",
                    title: "Preventiemedewerker Opleiding",
                    detail: "Prevention officers must be trained and competent. Training covers RI&E, incident investigation, and legal requirements. Regular refresher recommended.",
                    penalty: "Boete tot €4.500"
                },
                "Arbocatalogus Not Followed": {
                    regulation: "Arbowet Art. 2a",
                    title: "Arbocatalogus",
                    detail: "Sector-specific safety standards agreed between employers and unions. Legal compliance presumed when followed. Must be applied in RI&E.",
                    penalty: "Boete tot €22.500"
                },
                "Arbodeskundige Report Overdue": {
                    regulation: "Arbowet Art. 14",
                    title: "Arbodeskundige/Arbodienst",
                    detail: "Certified occupational health service required for certain tasks. RI&E validation, sick leave guidance, medical exams. Contract mandatory.",
                    penalty: "Boete tot €13.500"
                },
                "BHV Team Understaffed": {
                    regulation: "Arbowet Art. 15",
                    title: "Bedrijfshulpverlening (BHV)",
                    detail: "Emergency response team required. 1 BHV'er per 50 employees minimum. Trained in first aid, fire response, evacuation. Annual refresher.",
                    penalty: "Boete tot €4.500"
                },
                "Missing Plan van Aanpak": {
                    regulation: "Arbowet Art. 5",
                    title: "Plan van Aanpak",
                    detail: "Action plan required as part of RI&E. Concrete measures with deadlines. Responsible persons assigned. Progress tracked annually.",
                    penalty: "Boete tot €45.000"
                },
                "Werkplekinspectie Skipped": {
                    regulation: "Arbowet / Arbobesluit",
                    title: "Werkplekinspecties",
                    detail: "Regular workplace inspections required. Document findings and corrective actions. Employee participation encouraged. Part of continuous improvement.",
                    penalty: "Boete tot €22.500"
                },
                "Veiligheidskundige Advice Ignored": {
                    regulation: "Arbowet Art. 14",
                    title: "Veiligheidskundige",
                    detail: "Safety expert advice must be considered. Document reasons if not followed. Employer remains responsible for worker safety.",
                    penalty: "Boete tot €45.000 / aansprakelijkheid"
                }
            }
        },
        US: {
            default: {
                regulation: "OSHA 29 CFR 1910",
                title: "General Industry Standards",
                detail: "Federal workplace safety standards. Employers must provide a workplace free from recognized hazards. Training, PPE, and documentation required.",
                penalty: "Up to $15,625 per serious violation"
            }
        }
    }
};
