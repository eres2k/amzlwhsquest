/**
 * Hazard Pool - All possible warehouse hazards for procedural generation
 * Extracted from AMZLWHSQUEST122.html
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
    { name: "Lockout Tagout Forgotten", type: "compliance" },

    // === GERMANY (DE) - DGUV & ArbSchG Regulations ===
    { name: "Blocked Fluchtweg (Escape Route)", type: "door", region: "DE" },
    { name: "Missing DGUV V3 Sticker", type: "battery", region: "DE" },
    { name: "Unsecured Pallet (Ladungssicherung)", type: "tall_pallet", region: "DE" },
    { name: "Fehlende Gefährdungsbeurteilung", type: "compliance", region: "DE" },
    { name: "Sicherheitsbeauftragter Absent", type: "npc", region: "DE" },
    { name: "No Betriebsanweisung Posted", type: "compliance", region: "DE" },
    { name: "BetrSichV Violation Notice", type: "compliance", region: "DE" },
    { name: "Missing Erste-Hilfe-Kasten", type: "facility", region: "DE" },
    { name: "Expired Prüfplakette on Forklift", type: "forklift", region: "DE" },
    { name: "Feuerlöscher Access Blocked", type: "door", region: "DE" },

    // === AUSTRIA (AT) - ASchG & BauV Regulations ===
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

    // === NETHERLANDS (NL) - Arbowet & RI&E Regulations ===
    { name: "Missing RI&E Assessment", type: "compliance", region: "NL" },
    { name: "Blocked Nooduitgang", type: "door", region: "NL" },
    { name: "Prevention Officer Absent", type: "npc", region: "NL" },
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
export const HAZARD_DETAILS = {
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

/**
 * Get detailed regulatory information for a hazard
 * @param {Object} hazard - The hazard object with data property
 * @param {string} region - The region code (DE, AT, NL, US, etc.)
 * @returns {Object|null} Regulatory detail object or null
 */
export function getHazardDetail(hazard, region = 'US') {
    if (!hazard || !hazard.data) return null;

    const hazardRegion = hazard.data.region || region;
    const hazardName = hazard.data.name;
    const hazardType = hazard.data.type;

    // First check for specific hazard detail by name (regional)
    if (HAZARD_DETAILS.byRegion[hazardRegion]) {
        const regionData = HAZARD_DETAILS.byRegion[hazardRegion];
        if (regionData.specific && regionData.specific[hazardName]) {
            return regionData.specific[hazardName];
        }
        // Fall back to region default
        if (regionData.default) {
            // Combine region default with type-specific info
            const typeDetail = HAZARD_DETAILS.byType[hazardType];
            if (typeDetail) {
                return {
                    regulation: regionData.default.regulation + " / " + typeDetail.regulation,
                    title: typeDetail.title,
                    detail: typeDetail.detail,
                    penalty: regionData.default.penalty
                };
            }
            return regionData.default;
        }
    }

    // Fall back to type-based detail (US/OSHA)
    if (HAZARD_DETAILS.byType[hazardType]) {
        return HAZARD_DETAILS.byType[hazardType];
    }

    // Ultimate fallback
    return {
        regulation: "General Safety Standards",
        title: "Workplace Safety",
        detail: "This hazard poses risks to worker safety. Follow established safety procedures and report concerns to your supervisor.",
        penalty: "Varies by jurisdiction"
    };
}

/**
 * Shuffle an array in place using Fisher-Yates algorithm
 * @param {Array} arr - Array to shuffle
 * @returns {Array} The shuffled array
 */
export function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Pick random hazards with regional preference
 * @param {number} count - Number of hazards to pick
 * @param {string} region - Region code for regional hazards
 * @returns {Array} Array of randomly selected hazards
 */
export function pickRandomHazards(count, region = null) {
    // Separate generic hazards (no region) from region-specific ones
    const genericHazards = HAZARD_POOL.filter(h => !h.region);
    const regionHazards = region ? HAZARD_POOL.filter(h => h.region === region) : [];

    // Prioritize region-specific hazards: include at least 2 regional hazards if available
    const regionCount = Math.min(2, regionHazards.length, count);
    const genericCount = count - regionCount;

    const shuffledRegional = shuffleArray([...regionHazards]);
    const shuffledGeneric = shuffleArray([...genericHazards]);

    // Combine regional and generic hazards
    const combined = [
        ...shuffledRegional.slice(0, regionCount),
        ...shuffledGeneric.slice(0, genericCount)
    ];

    // Shuffle the final selection so regional hazards aren't always first
    return shuffleArray(combined);
}
