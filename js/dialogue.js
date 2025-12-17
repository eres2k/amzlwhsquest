// ============================================================================
// AMZL WHS QUEST - DIALOGUE DATA
// Boss dialogues, taunts, tips, and game over messages with localization
// ============================================================================

// === BOSS DEFEAT CUTSCENE DIALOGUES ===
// Localized defeat lines for each boss and player responses
const BOSS_DEFEAT_DIALOGUES = {
    // Boss final words when defeated (by boss name)
    bossLines: {
        "Labour Inspector": {
            MEU: "No... the violations... they were all... documented...",
            DE: "Nein... die Verstöße... sie waren alle... dokumentiert...",
            AT: "Na... die Verstöße... de woan olle... dokumentiert...",
            NL: "Nee... de overtredingen... ze waren allemaal... gedocumenteerd..."
        },
        "Compliance Auditor": {
            MEU: "My audit... incomplete... the paperwork... never ends...",
            DE: "Mein Audit... unvollständig... der Papierkram... endet nie...",
            AT: "Mei Audit... unvollständig... da Papierkram... endet nia...",
            NL: "Mijn audit... onvolledig... de papierwinkel... eindigt nooit..."
        },
        "Sebastian S.": {
            MEU: "TPH... dropping... delivery targets... not met...",
            DE: "TPH... sinkt... Lieferziele... nicht erreicht...",
            AT: "TPH... sinkt... Liefaziele... ned erreicht...",
            NL: "TPH... daalt... leveringsdoelen... niet gehaald..."
        },
        "Regional OPS MGR": {
            MEU: "The KPIs... they meant nothing... safety wins...",
            DE: "Die KPIs... sie bedeuteten nichts... Sicherheit gewinnt...",
            AT: "Die KPIs... de hom nix bedeutet... Sicherheit gewinnt...",
            NL: "De KPI's... ze betekenden niets... veiligheid wint..."
        },
        "Avetta Platform": {
            MEU: "SYSTEM ERROR... risk assessment... failed... rebooting...",
            DE: "SYSTEMFEHLER... Risikobewertung... fehlgeschlagen... Neustart...",
            AT: "SYSTEMFEHLER... Risikobewertung... fehlgschlogn... Neustart...",
            NL: "SYSTEEMFOUT... risicobeoordeling... mislukt... herstarten..."
        },
        "Jelena \"Jelly\"": {
            MEU: "This will go in your file... wait, MY file?!",
            DE: "Das kommt in deine Akte... Moment, MEINE Akte?!",
            AT: "Des kummt in deine Akte... Moment, MEINE Akte?!",
            NL: "Dit komt in je dossier... wacht, MIJN dossier?!"
        }
    },
    // Player character victory responses (by character name)
    playerLines: {
        "Carrie": {
            MEU: "Another hazard eliminated. My 5S system remains... supreme.",
            DE: "Ein weiteres Risiko beseitigt. Mein 5S-System bleibt... überlegen.",
            AT: "Noch a Risiko beseitigt. Mei 5S-System bleibt... überlegen.",
            NL: "Nog een gevaar geëlimineerd. Mijn 5S-systeem blijft... oppermachtig."
        },
        "Nevena": {
            MEU: "I foresaw this outcome. The clipboard never lies.",
            DE: "Ich habe dieses Ergebnis vorhergesehen. Das Klemmbrett lügt nie.",
            AT: "I hob des Ergebnis vorrausgsehn. Des Klemmbrett lügt nia.",
            NL: "Ik voorspelde deze uitkomst. Het klembord liegt nooit."
        },
        "Joao": {
            MEU: "SAFETY FIRST! Did everyone hear that? SAFETY FIRST!",
            DE: "SICHERHEIT ZUERST! Hat das jeder gehört? SICHERHEIT ZUERST!",
            AT: "SICHERHEIT ZUERST! Hot des jeda ghört? SICHERHEIT ZUERST!",
            NL: "VEILIGHEID EERST! Heeft iedereen dat gehoord? VEILIGHEID EERST!"
        },
        "Roman": {
            MEU: "They never saw me coming. The Ghost strikes again.",
            DE: "Sie haben mich nicht kommen sehen. Der Geist schlägt wieder zu.",
            AT: "De hom mi ned kumma gsehn. Da Geist schlägt wieder zua.",
            NL: "Ze zagen me niet aankomen. De Geest slaat weer toe."
        },
        "Erwin": {
            MEU: "Efficiency maximized. Now, back to my Tesla.",
            DE: "Effizienz maximiert. Jetzt zurück zu meinem Tesla.",
            AT: "Effizienz maximiert. Jetzt zruck zu meim Tesla.",
            NL: "Efficiëntie gemaximaliseerd. Nu, terug naar mijn Tesla."
        }
    }
};

// Get localized boss defeat line
function getBossDefeatLine(bossName) {
    const region = (typeof GAME !== 'undefined' && GAME.region) ? GAME.region : 'MEU';
    const lines = BOSS_DEFEAT_DIALOGUES.bossLines[bossName];
    if (lines && lines[region]) return lines[region];
    if (lines && lines.MEU) return lines.MEU;
    return "Defeated... by safety compliance...";
}

// Get localized player victory response
function getPlayerVictoryLine(charName) {
    const region = (typeof GAME !== 'undefined' && GAME.region) ? GAME.region : 'MEU';
    const lines = BOSS_DEFEAT_DIALOGUES.playerLines[charName];
    if (lines && lines[region]) return lines[region];
    if (lines && lines.MEU) return lines.MEU;
    return "Another victory for workplace safety!";
}

// --- SIMON'S YARD SAFETY TIPS ---
const SIMON_YARD_TIPS = {
    EN: [
        "YARD SAFETY ALERT: Always use designated crosswalks. DSP vans have blind spots bigger than their ambition. I've measured both.",
        "CAUTION: The yard is NOT a shortcut. One associate versus a Prime van equals paperwork I don't want to file. And I file EVERYTHING.",
        "REMINDER: Look both ways. Then look again. Those DSP drivers run on caffeine and impossible deadlines. A dangerous combination I know well.",
        "YARD PROTOCOL: High-vis vests exist for a reason. Be seen or be statistics. I prefer you as a headcount, not a body count.",
        "CRITICAL: Vehicles have right of way. Your skeleton does not outweigh a delivery quota. Trust me, I've done the math.",
        "SAFETY FIRST: If you hear a horn, MOVE. Don't stand there contemplating the meaning of life. Spoiler: it's compliance.",
        "PRO TIP: Headphones off in the yard. Music won't cushion the blow of a reversing semi. Neither will your Spotify premium subscription.",
        "AUDIT NOTE: The yard claims more near-misses than I have patience. Stay alert, stay alive. Or don't. Your choice affects MY metrics."
    ],
    AT: [
        "HOF-SICHERHEIT: Immer die Zebrastreifen benutzen, oida. DSP-Transporter haben größere tote Winkel als Ehrgeiz.",
        "ACHTUNG: Der Hof is ka Abkürzung. Ein Mitarbeiter gegen an Prime-Transporter bedeutet Papierkram, den i ned will.",
        "ERINNERUNG: Schau links und rechts. Dann nochmal. Die DSP-Fahrer laufen auf Koffein und unmöglichen Deadlines.",
        "HOF-PROTOKOLL: Warnwesten gibt's aus gutem Grund. Gsehen werden oder Statistik werden.",
        "KRITISCH: Fahrzeuge haben Vorfahrt. Dei Skelett wiegt ned mehr als a Lieferquote.",
        "SICHERHEIT ZUERST: Wenn du a Hupe hörst, BEWEG DI. Steh ned rum und denk über den Sinn des Lebens nach.",
        "PROFI-TIPP: Kopfhörer runter im Hof. Musik dämpft ned den Aufprall eines rückwärtsfahrenden LKWs.",
        "AUDIT-NOTIZ: Der Hof hat mehr Beinahe-Unfälle als i Geduld hab. Bleib wachsam, bleib am Leben."
    ],
    DE: [
        "HOF-SICHERHEIT: Immer die Zebrastreifen benutzen. DSP-Transporter haben größere tote Winkel als Ehrgeiz.",
        "ACHTUNG: Der Hof ist keine Abkürzung. Ein Mitarbeiter gegen einen Prime-Transporter bedeutet Papierkram.",
        "ERINNERUNG: Schau links und rechts. Dann nochmal. Die DSP-Fahrer laufen auf Koffein und unmöglichen Deadlines.",
        "HOF-PROTOKOLL: Warnwesten gibt es aus gutem Grund. Gesehen werden oder Statistik werden.",
        "KRITISCH: Fahrzeuge haben Vorfahrt. Dein Skelett wiegt nicht mehr als eine Lieferquote.",
        "SICHERHEIT ZUERST: Wenn du eine Hupe hörst, BEWEG DICH. Steh nicht rum und denk über den Sinn des Lebens nach.",
        "PROFI-TIPP: Kopfhörer runter im Hof. Musik dämpft nicht den Aufprall eines rückwärtsfahrenden LKWs.",
        "AUDIT-NOTIZ: Der Hof hat mehr Beinahe-Unfälle als ich Geduld habe. Bleib wachsam, bleib am Leben."
    ],
    NL: [
        "TERREIN-VEILIGHEID: Gebruik altijd de zebrapaden, godver. DSP-busjes hebben grotere dode hoeken dan ambitie. Ik heb beide gemeten.",
        "LET OP: Het terrein is GEEN afkorting, eikel. Eén medewerker tegen een Prime-bus betekent papierwerk dat ik verdomme niet wil doen.",
        "HERINNERING: Kijk links en rechts. Dan nog een keer, klojo. Die DSP-chauffeurs draaien op cafeïne en onmogelijke deadlines.",
        "TERREIN-PROTOCOL: Veiligheidsvesten bestaan met een reden, sukkel. Gezien worden of statistiek worden. Jouw keuze, godver.",
        "KRITIEK: Voertuigen hebben voorrang. Je skelet weegt verdomme niet meer dan een leveringsquota. Geloof me, ik heb gerekend.",
        "VEILIGHEID EERST: Als je een claxon hoort, BEWEEG, idioot. Sta niet stil na te denken over de zin van het leven. Spoiler: het is compliance.",
        "PRO TIP: Koptelefoon af op het terrein, dombo. Muziek dempt de klap van een achteruitrijdende vrachtwagen niet. Je Spotify premium ook niet.",
        "AUDIT NOTITIE: Het terrein heeft meer bijna-ongelukken dan ik geduld heb, godver. Blijf alert, blijf in leven. Of niet. Jouw keuze beïnvloedt MIJN metrics."
    ]
};

// Helper to get localized yard tip
function getLocalizedYardTip() {
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const region = (typeof GAME !== 'undefined' && GAME.region) ? GAME.region : 'EN';
    const tips = SIMON_YARD_TIPS[region] || SIMON_YARD_TIPS.EN;
    return pick(tips);
}

// --- JEFF YARD TAUNTS (Localized) ---
const JEFF_YARD_TAUNTS = {
    EN: [
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
    AT: [
        "Na los, oida! I hab ned den ganzen Tag Zeit!",
        "Des nennst du schnell? Mei Oma is schneller!",
        "Der Hof trennt die Hackler von die Weicheier!",
        "Jede Sekunde kostet die Firma Göd!",
        "I hab des Imperium aus NIX aufbaut!",
        "Du willst a Gehaltserhöhung? VERDIEN sie da!",
        "Weiter ausweichen! Is a guate Unterhaltung!",
        "I hab bessere Koordination von Praktikanten gsehen!",
        "Tick tack! Dei Schicht is fast vorbei!",
        "Fast da... ha, Scherz, du schaffst es nie!",
        "Des is DEINE Leistungsbeurteilung!",
        "Die LKWs halten für NIEMANDEN!"
    ],
    DE: [
        "Na los! Ich hab nicht den ganzen Tag Zeit!",
        "Das nennst du Geschwindigkeit? Meine Oma ist schneller!",
        "Der Hof trennt die Arbeiter von den WEICHEIERN!",
        "Jede Sekunde kostet die Firma Geld!",
        "Ich habe dieses Imperium aus NICHTS aufgebaut!",
        "Du willst eine Gehaltserhöhung? VERDIEN sie dir!",
        "Weiter ausweichen! Gute Unterhaltung!",
        "Ich habe bessere Koordination von Praktikanten gesehen!",
        "Tick tack! Deine Schicht ist fast vorbei!",
        "Fast da... nur Spaß, du schaffst es nie!",
        "Das ist DEINE Leistungsbeurteilung!",
        "Die LKWs halten für NIEMANDEN!"
    ],
    NL: [
        "Kom op dan! Ik heb niet de hele dag!",
        "Noem je dat snelheid? Mijn oma is sneller!",
        "Het terrein scheidt de werkers van de WATJES!",
        "Elke seconde kost het bedrijf geld!",
        "Ik heb dit imperium uit NIETS opgebouwd!",
        "Wil je opslag? VERDIEN het!",
        "Blijf ontwijken! Leuke entertainment!",
        "Ik heb betere coördinatie van stagiaires gezien!",
        "Tik tak! Je dienst is bijna voorbij!",
        "Bijna... grapje, je haalt het nooit!",
        "Dit is JOUW functioneringsgesprek!",
        "De vrachtwagens stoppen voor NIEMAND!"
    ]
};

// --- JEFF CASTLE TAUNTS (Localized) ---
const JEFF_CASTLE_TAUNTS = {
    EN: [
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
    AT: [
        "WILLKOMMEN IN MEINER FESTUNG DER EFFIZIENZ!",
        "DES SCHLOSS WURDE AUF PRIME-ABOS GEBAUT!",
        "JEDER ZIEGEL IS A ARBEITERTRAUM... ZERMALMT!",
        "DU WAGST ES IN DIE BEZOS-DOMÄNE?!",
        "MEINE TÜRME REICHEN HÖHER ALS DEINE AMBITIONEN!",
        "DIE ALGORITHMEN HABEN DES LABYRINTH DESIGNT!",
        "KA GEWERKSCHAFT KANN DIESE MAUERN BELAGERN!",
        "DO WERDEN ARBEITER... OPTIMIERT!",
        "DES SCHLOSS IS MEI LETZTES LAGER!",
        "NUR DIE WÜRDIGEN TREFFEN MECHA JEFF!"
    ],
    DE: [
        "WILLKOMMEN IN MEINER FESTUNG DER EFFIZIENZ!",
        "DIESES SCHLOSS WURDE AUF PRIME-ABOS GEBAUT!",
        "JEDER ZIEGEL IST EIN ARBEITERTRAUM... ZERMALMT!",
        "DU WAGST ES IN DIE BEZOS-DOMÄNE?!",
        "MEINE TÜRME REICHEN HÖHER ALS DEINE AMBITIONEN!",
        "DIE ALGORITHMEN HABEN DIESES LABYRINTH DESIGNT!",
        "KEINE GEWERKSCHAFT KANN DIESE MAUERN BELAGERN!",
        "HIER WERDEN ARBEITER... OPTIMIERT!",
        "DAS SCHLOSS IST MEIN LETZTES LAGER!",
        "NUR DIE WÜRDIGEN TREFFEN MECHA JEFF!"
    ],
    NL: [
        "WELKOM IN MIJN FORT VAN EFFICIËNTIE!",
        "DIT KASTEEL IS GEBOUWD OP PRIME-ABONNEMENTEN!",
        "ELKE STEEN IS EEN ARBEIDERSDROOM... VERPLETTERD!",
        "DURF JE HET BEZOS-DOMEIN TE BETREDEN?!",
        "MIJN TORENS REIKEN HOGER DAN JE AMBITIES!",
        "DE ALGORITMES ONTWIERPEN DIT DOOLHOF!",
        "GEEN VAKBOND KAN DEZE MUREN BELEGEREN!",
        "HIER WORDEN WERKERS... GEOPTIMALISEERD!",
        "HET KASTEEL IS MIJN LAATSTE MAGAZIJN!",
        "ALLEEN DE WAARDIGEN ONTMOETEN MECHA JEFF!"
    ]
};

// --- BEZOS TAUNTS FOR BOSS FIGHT (Localized) ---
const BEZOS_TAUNTS = {
    EN: [
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
    ],
    AT: [
        "Härter hackeln, ned gscheiter!",
        "Tag Eins? Probier Tag ENDE!",
        "Ka Klopause im Weltall!",
        "Prime-Lieferung: VERSAGT!",
        "Deine Metriken san FURCHTBAR!",
        "Automatisieren oder ELIMINIEREN!",
        "I beobacht deine STILLSTANDSZEIT!",
        "Kundenobsession VERLANGT Tempo!",
        "Schneller! Zeit is GÖD!",
        "Sicherheit? I hab a Versicherung!",
        "Ownership? MIR GHÖRT ALLES!",
        "Denk GROSS oder geh HAM!",
        "Liefer ERGEBNISSE oder wirst ERSETZT!",
        "Automatisierung beschwert si nie!"
    ],
    DE: [
        "Härter arbeiten, nicht schlauer!",
        "Tag Eins? Versuch Tag ENDE!",
        "Keine Toilettenpause im Weltall!",
        "Prime-Lieferung: VERSAGT!",
        "Deine Metriken sind FURCHTBAR!",
        "Automatisieren oder ELIMINIEREN!",
        "Ich beobachte deine STILLSTANDSZEIT!",
        "Kundenobsession VERLANGT Geschwindigkeit!",
        "Schneller! Zeit ist GELD!",
        "Sicherheit? Ich habe Versicherung!",
        "Ownership? MIR GEHÖRT ALLES!",
        "Denk GROSS oder geh NACH HAUSE!",
        "Liefer ERGEBNISSE oder wirst ERSETZT!",
        "Automatisierung beschwert sich nie!"
    ],
    NL: [
        "Harder werken, niet slimmer!",
        "Dag Een? Probeer Dag KLAAR!",
        "Geen toiletpauze in de ruimte!",
        "Prime-levering: MISLUKT!",
        "Je metrics zijn VERSCHRIKKELIJK!",
        "Automatiseren of ELIMINEREN!",
        "Ik bekijk je STILSTANDTIJD!",
        "Klantobsessie EIST snelheid!",
        "Sneller! Tijd is GELD!",
        "Veiligheid? Ik heb verzekering!",
        "Eigenaarschap? IK BEZIT ALLES!",
        "Denk GROOT of ga NAAR HUIS!",
        "Lever RESULTATEN of word VERVANGEN!",
        "Automatisering klaagt nooit!"
    ]
};

// Helper to get localized Jeff taunt
function getLocalizedJeffTaunt(type) {
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const region = (typeof GAME !== 'undefined' && GAME.region) ? GAME.region : 'EN';

    if (type === 'yard') {
        const taunts = JEFF_YARD_TAUNTS[region] || JEFF_YARD_TAUNTS.EN;
        return pick(taunts);
    } else if (type === 'castle') {
        const taunts = JEFF_CASTLE_TAUNTS[region] || JEFF_CASTLE_TAUNTS.EN;
        return pick(taunts);
    } else {
        const taunts = BEZOS_TAUNTS[region] || BEZOS_TAUNTS.EN;
        return pick(taunts);
    }
}

// --- SNARKY CORPORATE GAME OVER MESSAGES ---
const CORPORATE_GAME_OVER = [
    "Your employment has been optimized out of existence.",
    "Thank you for your contribution to our quarterly injury statistics.",
    "Your position has been automated. Have a nice day.",
    "Performance review: Below expectations. Way below.",
    "Security will escort your badge to recycling.",
    "Your final paycheck will be mailed... eventually.",
    "Customer obsession doesn't include your safety, apparently.",
    "Think of this as a permanent growth opportunity elsewhere.",
    "Your metrics suggest a career in literally anything else.",
    "Day One mentality? More like Final Day reality.",
    "HR has prepared your exit interview. It's just a door.",
    "Your TOT just became permanent. Time Off: Total.",
    "Ownership principle achieved: You now own nothing.",
    "Congratulations! You've been promoted to customer.",
    "Your bias for action led to this inaction. Forever.",
    "Frugality win: We saved money on your benefits.",
    "Deliver results? You delivered... disappointment.",
    "Invent and simplify: Inventing a new career, simplified exit."
];
