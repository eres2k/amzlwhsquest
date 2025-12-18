// ============================================================================
// AMZL WHS QUEST - BANTER DATA
// NPC banter lines with regional localization
// ============================================================================

// --- BANTER DATA ---
const BANTER_DB = {
    ops: [
        "TPH is down!", "Walk faster!", "No talking!", "VTO?",
        "Scan scan scan!", "Where's your vest?", "Audit panic!",
        "My bonus!", "TOT!", "Bad rate!", "Let's go!",
        "Chase blue line!", "Less chatter!", "Time is rate!", "Trim that idle!",
        "Metrics don't nap!", "Pick it up!", "Stay in lanes!"
    ],
    assoc: [
        "My feet...", "Break time?", "Box heavy...", "Ugh...",
        "Safety shoes hurt", "Where's HR?", "Need coffee...",
        "Too early...", "Night shift...", "Pizza party?",
        "Belt keeps eating me", "Where's my badge?", "Snacks when?",
        "Scanner dying...", "Stuck in pack?", "Shift never ends"
    ],
    // Region-specific banter with local slang
    regional: {
        AT: {
            ops: [
                "Oida, TPH is down!", "Geh schneller, herst!", "Ned tratschen!",
                "Schleich di!", "Wo is dei Weste?", "Audit, oida!",
                "Mei Bonus!", "Schneller scannen!", "Des geht si ned aus!",
                "Gemma, gemma!", "Wos is mit der Rate?", "Zeit is Göd!",
                "Beweg di, herst!", "Weniger reden!", "Hawara, zack zack!"
            ],
            assoc: [
                "Mei Füße...", "Pause, oida?", "Schachtel schwer...", "Uff...",
                "Sicherheitsschuhe zwicken", "Wo is HR?", "Brauch Kaffee...",
                "Vü zu früh...", "Nachtschicht, oida...", "Pizza Party?",
                "Band frisst mi auf", "Wo is mei Badge?", "Jausen wann?",
                "Scanner stirbt...", "Im Pack hängen?", "Schicht endet nie"
            ]
        },
        DE: {
            ops: [
                "TPH ist runter!", "Schneller laufen!", "Nicht quatschen!",
                "VTO?", "Scannen scannen!", "Wo ist deine Weste?", "Audit Panik!",
                "Mein Bonus!", "TOT!", "Schlechte Rate!", "Los geht's!",
                "Blaue Linie!", "Weniger reden!", "Zeit ist Geld!", "Weniger Leerlauf!",
                "Metriken schlafen nicht!", "Aufheben!", "In der Spur bleiben!"
            ],
            assoc: [
                "Meine Füße...", "Pause?", "Karton schwer...", "Ugh...",
                "Sicherheitsschuhe drücken", "Wo ist HR?", "Brauche Kaffee...",
                "Zu früh...", "Nachtschicht...", "Pizza Party?",
                "Band frisst mich", "Wo ist mein Badge?", "Snacks wann?",
                "Scanner stirbt...", "In Pack stecken?", "Schicht endet nie"
            ]
        },
        NL: {
            ops: [
                "TPH is laag!", "Sneller lopen!", "Niet kletsen!", "VTO?",
                "Scannen scannen!", "Waar is je vest?", "Audit paniek!",
                "Mijn bonus!", "TOT!", "Slechte rate!", "Kom op!",
                "Blauwe lijn!", "Minder praten!", "Tijd is geld!", "Minder stilstand!",
                "Metrics slapen niet!", "Oppakken!", "In de baan blijven!"
            ],
            assoc: [
                "Mijn voeten...", "Pauze?", "Doos zwaar...", "Pff...",
                "Veiligheidsschoenen doen pijn", "Waar is HR?", "Koffie nodig...",
                "Te vroeg...", "Nachtdienst...", "Pizza feest?",
                "Band vreet me op", "Waar is mijn badge?", "Snacks wanneer?",
                "Scanner gaat dood...", "Vast in pack?", "Dienst stopt nooit"
            ]
        }
    }
};

// Helper to get region-appropriate banter
function getRegionalBanter(type) {
    const region = getGameRegion(null);
    // Try region-specific banter first
    if (region && BANTER_DB.regional[region] && BANTER_DB.regional[region][type]) {
        // 70% chance to use regional banter, 30% to use generic English
        if (Math.random() < GAME_CONFIG.PROBABILITIES.REGIONAL_BANTER) {
            return pickRandom(BANTER_DB.regional[region][type]);
        }
    }
    // Fall back to generic English banter
    return pickRandom(BANTER_DB[type]);
}
