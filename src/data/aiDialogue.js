/**
 * AI Dialogue Fallbacks - Used when Gemini API is unavailable
 * Contains all localized dialogue for Simon, bosses, and game systems
 */

export const SIMULATED_AI = {
    tips: [
        "Blocked exit? That box is your tombstone. Move it.",
        "Chemical spill? Entropy leaking. Contain it before you dissolve.",
        "Debris? Chaos on the floor leads to chaos in the soul. Clean it.",
        "Trip hazard? Gravity does not care about your excuses.",
        "Unstable stack? Newton is rolling in his grave. Fix it.",
        "Fire equipment blocked? Do you plan to fight fire with optimism?",
        // === GERMANY (DE) Educational Tips ===
        "[DE] DGUV V1 §15: Employees must support all OSH measures.",
        "[DE] Fluchtwegbreite: Main escape routes must be min 1.20m wide.",
        "[DE] ArbSchG §5: Employers must assess workplace hazards.",
        "[DE] BetrSichV: All work equipment requires regular inspection.",
        "[DE] DGUV V3: Electrical equipment needs annual safety testing.",
        "[DE] ASR A2.3: Emergency routes must be clearly marked.",
        "[DE] Gefährdungsbeurteilung: Risk assessment is mandatory.",
        "[DE] ArbStättV: Workplaces must meet minimum safety standards.",
        // === AUSTRIA (AT) Educational Tips ===
        "[AT] ASchG §15: Employers are obligated to evaluate all risks.",
        "[AT] BauV: Construction sites require safety coordinators.",
        "[AT] Arbeitsinspektorat enforces workplace safety laws.",
        "[AT] ASchG §4: Every workplace needs a safety representative.",
        "[AT] AUVA provides accident insurance and prevention services.",
        "[AT] PSA-V: Personal protective equipment must be provided.",
        "[AT] Arbeitsplatzevaluierung is required for all workplaces.",
        "[AT] ASchG §12: Workers have the right to refuse unsafe work.",
        // === NETHERLANDS (NL) Educational Tips ===
        "[NL] RI&E: Every company must have a Risk Inventory & Evaluation.",
        "[NL] Arbowet Art 3: Employers must minimize workload pressure.",
        "[NL] Preventiemedewerker: Companies need prevention officers.",
        "[NL] BHV: Emergency response teams are mandatory in NL.",
        "[NL] Arbocatalogus: Sector-specific safety guidelines apply.",
        "[NL] Inspectie SZW enforces Dutch occupational safety laws.",
        "[NL] Plan van Aanpak: Action plans must follow RI&E findings.",
        "[NL] Arbowet Art 8: Workers must receive safety instruction."
    ],
    runners: [
        "Halt! Kinetic energy is not your friend. Slow down.",
        "You are not a photon. You have mass. Walk.",
        "Running? I've seen glaciers move with more purpose.",
        "We fight entropy, not the clock. Walk."
    ],
    taunts: [
        "My spreadsheet predicts your failure!",
        "You cannot audit the inevitable!",
        "I am the final regulation!",
        "Compliance dropping... Termination imminent!",
        "Resistance is a safety violation!"
    ],
    simon_taunts: [
        "I AM THE SAFETY STANDARD!",
        "YOU CANNOT ESCAPE THE AUDIT!",
        "ENTROPY COMES FOR US ALL!",
        "YOUR PPE IS INSUFFICIENT!"
    ],
    simon_warnings: [
        "First warning: Stop flinging manuals. Compliance is not a contact sport.",
        "Final warning: Holster the rule books or I escalate this audit into a boss fight."
    ],
    reviews_win: [
        "Performance: IMPROBABLE. You survived. I am... adequately pleased.",
        "You fought chaos and won. For today.",
        "Adequate. Nothing to write up. Feels strange."
    ],
    reviews_loss: [
        "Performance: CATASTROPHIC. Entropy won.",
        "You failed. Gravity and stupidity destroyed us.",
        "Safety is binary. You are a zero."
    ],
    // Region-specific dialogue for Simon
    regional: {
        AT: {
            runners: [
                "Halt, oida! Kinetische Energie is ned dei Freund. Langsamer!",
                "Du bist ka Photon. Du hast Masse. Geh!",
                "Rennen? I hab Gletscher gsehen die schneller san.",
                "Mir kämpfen gegen Entropie, ned gegen die Uhr. Geh!"
            ],
            taunts: [
                "Mei Tabellenkalkulation sagt dei Scheitern voraus!",
                "Du kannst des Audit ned entkommen!",
                "I bin die finale Vorschrift!",
                "Compliance sinkt... Kündigung steht bevor!",
                "Widerstand is a Sicherheitsverletzung!"
            ],
            simon_taunts: [
                "I BIN DER SICHERHEITSSTANDARD!",
                "DU KANNST DEM AUDIT NED ENTKOMMEN!",
                "ENTROPIE KOMMT FÜR UNS ALLE!",
                "DEINE PSA IS UNZUREICHEND!"
            ],
            simon_warnings: [
                "Erste Verwarnung: Hör auf mit die Handbücher zu werfen. Compliance is ka Kontaktsport.",
                "Letzte Verwarnung: Steck die Regelbücher weg oder i eskalier des Audit zum Bossfight."
            ],
            reviews_win: [
                "Leistung: UNWAHRSCHEINLICH. Du hast überlebt. I bin... angemessen zufrieden.",
                "Du hast gegen das Chaos gewonnen. Für heit.",
                "Ausreichend. Nix zum Aufschreiben. Fühlt si komisch an."
            ],
            reviews_loss: [
                "Leistung: KATASTROPHAL. Entropie hat gwonnen.",
                "Du hast versagt. Schwerkraft und Dummheit haben uns zerstört.",
                "Sicherheit is binär. Du bist a Null."
            ]
        },
        DE: {
            runners: [
                "Halt! Kinetische Energie ist nicht dein Freund. Langsamer!",
                "Du bist kein Photon. Du hast Masse. Geh!",
                "Rennen? Ich habe Gletscher gesehen die zielstrebiger waren.",
                "Wir kämpfen gegen Entropie, nicht gegen die Uhr. Geh!"
            ],
            taunts: [
                "Meine Tabellenkalkulation sagt dein Scheitern voraus!",
                "Du kannst das Audit nicht entkommen!",
                "Ich bin die finale Vorschrift!",
                "Compliance sinkt... Kündigung steht bevor!",
                "Widerstand ist eine Sicherheitsverletzung!"
            ],
            simon_taunts: [
                "ICH BIN DER SICHERHEITSSTANDARD!",
                "DU KANNST DEM AUDIT NICHT ENTKOMMEN!",
                "ENTROPIE KOMMT FÜR UNS ALLE!",
                "DEINE PSA IST UNZUREICHEND!"
            ],
            simon_warnings: [
                "Erste Verwarnung: Hör auf Handbücher zu werfen. Compliance ist kein Kontaktsport.",
                "Letzte Verwarnung: Steck die Regelbücher weg oder ich eskaliere dieses Audit zum Bossfight."
            ],
            reviews_win: [
                "Leistung: UNWAHRSCHEINLICH. Du hast überlebt. Ich bin... angemessen zufrieden.",
                "Du hast gegen das Chaos gewonnen. Für heute.",
                "Ausreichend. Nichts aufzuschreiben. Fühlt sich seltsam an."
            ],
            reviews_loss: [
                "Leistung: KATASTROPHAL. Entropie hat gewonnen.",
                "Du hast versagt. Schwerkraft und Dummheit haben uns zerstört.",
                "Sicherheit ist binär. Du bist eine Null."
            ]
        },
        NL: {
            runners: [
                "Stop! Kinetische energie is niet je vriend. Langzamer!",
                "Je bent geen foton. Je hebt massa. Loop!",
                "Rennen? Ik heb gletsjers gezien die doelgerichter waren.",
                "We vechten tegen entropie, niet tegen de klok. Loop!"
            ],
            taunts: [
                "Mijn spreadsheet voorspelt je falen!",
                "Je kunt de audit niet ontsnappen!",
                "Ik ben de finale regelgeving!",
                "Compliance daalt... Ontslag dreigt!",
                "Weerstand is een veiligheidsovertreding!"
            ],
            simon_taunts: [
                "IK BEN DE VEILIGHEIDSSTANDAARD!",
                "JE KUNT DE AUDIT NIET ONTSNAPPEN!",
                "ENTROPIE KOMT VOOR ONS ALLEMAAL!",
                "JE PBM IS ONVOLDOENDE!"
            ],
            simon_warnings: [
                "Eerste waarschuwing: Stop met handboeken gooien. Compliance is geen contactsport.",
                "Laatste waarschuwing: Berg die regelboeken op of ik escaleer deze audit naar een baasgevecht."
            ],
            reviews_win: [
                "Prestatie: ONWAARSCHIJNLIJK. Je hebt overleefd. Ik ben... voldoende tevreden.",
                "Je hebt tegen de chaos gewonnen. Voor vandaag.",
                "Voldoende. Niets op te schrijven. Voelt vreemd."
            ],
            reviews_loss: [
                "Prestatie: CATASTROFAAL. Entropie heeft gewonnen.",
                "Je hebt gefaald. Zwaartekracht en domheid hebben ons vernietigd.",
                "Veiligheid is binair. Jij bent een nul."
            ]
        }
    }
};

// --- SIMON'S YARD SAFETY TIPS (Localized) ---
export const SIMON_YARD_TIPS = {
    EN: [
        "YARD SAFETY ALERT: Always use designated crosswalks. DSP vans have blind spots bigger than their ambition.",
        "CAUTION: The yard is NOT a shortcut. One associate versus a Prime van equals paperwork I don't want to file.",
        "REMINDER: Look both ways. Then look again. Those DSP drivers run on caffeine and impossible deadlines.",
        "YARD PROTOCOL: High-vis vests exist for a reason. Be seen or be statistics.",
        "CRITICAL: Vehicles have right of way. Your skeleton does not outweigh a delivery quota.",
        "SAFETY FIRST: If you hear a horn, MOVE. Don't stand there contemplating the meaning of life.",
        "PRO TIP: Headphones off in the yard. Music won't cushion the blow of a reversing semi.",
        "AUDIT NOTE: The yard claims more near-misses than I have patience. Stay alert, stay alive."
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
        "TERREIN-VEILIGHEID: Gebruik altijd de zebrapaden. DSP-busjes hebben grotere dode hoeken dan ambitie.",
        "LET OP: Het terrein is GEEN afkorting. Eén medewerker tegen een Prime-bus betekent papierwerk dat ik niet wil doen.",
        "HERINNERING: Kijk links en rechts. Dan nog een keer. Die DSP-chauffeurs draaien op cafeïne en onmogelijke deadlines.",
        "TERREIN-PROTOCOL: Veiligheidsvesten bestaan met een reden. Gezien worden of statistiek worden.",
        "KRITIEK: Voertuigen hebben voorrang. Je skelet weegt niet meer dan een leveringsquota.",
        "VEILIGHEID EERST: Als je een claxon hoort, BEWEEG. Sta niet stil na te denken over de zin van het leven.",
        "PRO TIP: Koptelefoon af op het terrein. Muziek dempt de klap van een achteruitrijdende vrachtwagen niet.",
        "AUDIT NOTITIE: Het terrein heeft meer bijna-ongelukken dan ik geduld heb. Blijf alert, blijf in leven."
    ]
};

// --- JEFF YARD TAUNTS (Localized) ---
export const JEFF_YARD_TAUNTS = {
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
export const JEFF_CASTLE_TAUNTS = {
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
export const BEZOS_TAUNTS = {
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

// --- BEZOS TRANSFORMATION LINES (Localized) ---
export const BEZOS_TRANSFORM_LINES = {
    EN: [
        "WITNESS MY TRUE FORM! MECHA JEFF RISES!",
        "You forced this! BEHOLD MY ULTIMATE POWER!",
        "NOW YOU DIE! TRANSFORMATION SEQUENCE INITIATED!",
        "FOOLISH WORKER! FACE MY MECHANICAL MIGHT!",
        "PRIME TIME IS OVER! EXTINCTION MODE ACTIVATED!"
    ],
    AT: [
        "SIEH MEINE WAHRE FORM! MECHA JEFF ERHEBT SI!",
        "Du hast des erzwungen! SIEH MEINE ULTIMATIVE MACHT!",
        "JETZT STIRBST DU! TRANSFORMATIONSSEQUENZ AKTIVIERT!",
        "DUMMER HACKLER! STELL DI MEINER MECHANISCHEN MACHT!",
        "PRIME TIME IS VORBEI! AUSLÖSCHUNGSMODUS AKTIVIERT!"
    ],
    DE: [
        "SEHT MEINE WAHRE FORM! MECHA JEFF ERHEBT SICH!",
        "Du hast das erzwungen! SEHT MEINE ULTIMATIVE MACHT!",
        "JETZT STIRBST DU! TRANSFORMATIONSSEQUENZ INITIIERT!",
        "DUMMER ARBEITER! STELL DICH MEINER MECHANISCHEN MACHT!",
        "PRIME TIME IST VORBEI! AUSLÖSCHUNGSMODUS AKTIVIERT!"
    ],
    NL: [
        "AANSCHOUW MIJN WARE VORM! MECHA JEFF RIJST!",
        "Jij dwong dit af! AANSCHOUW MIJN ULTIEME KRACHT!",
        "NU STERF JE! TRANSFORMATIEREEKS GESTART!",
        "DWAZE WERKER! ONTMOET MIJN MECHANISCHE MACHT!",
        "PRIME TIME IS VOORBIJ! UITROEIINGSMODUS GEACTIVEERD!"
    ]
};

// --- PLAYER RESPONSE LINES (Localized) ---
export const PLAYER_RESPONSE_LINES = {
    EN: [
        "Your reign of terror ends here, Bezos!",
        "The workers will NOT be silenced!",
        "Time to break your prime directive!",
        "This delivery is YOUR termination notice!",
        "No more exploiting workers! Today you fall!"
    ],
    AT: [
        "Deine Schreckensherrschaft endet do, Bezos!",
        "Die Hackler lassen si ned zum Schweigen bringen!",
        "Zeit deine Prime-Direktive zu brechen!",
        "Des is DEINE Kündigung!",
        "Ka Ausbeutung mehr! Heit fällst du!"
    ],
    DE: [
        "Deine Schreckensherrschaft endet hier, Bezos!",
        "Die Arbeiter lassen sich NICHT zum Schweigen bringen!",
        "Zeit deine Prime-Direktive zu brechen!",
        "Diese Lieferung ist DEINE Kündigung!",
        "Keine Ausbeutung mehr! Heute fällst du!"
    ],
    NL: [
        "Je schrikbewind eindigt hier, Bezos!",
        "De werkers zullen NIET zwijgen!",
        "Tijd om je prime-directief te breken!",
        "Deze levering is JOUW ontslagbrief!",
        "Geen uitbuiting meer! Vandaag val je!"
    ]
};

// --- SNARKY CORPORATE GAME OVER MESSAGES ---
export const CORPORATE_GAME_OVER = [
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

// --- CHARACTER DEFEAT VOICE LINES ---
export const CHARACTER_DEFEAT_LINES = {
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

// ========== HELPER FUNCTIONS ==========

/**
 * Get localized Simon dialogue by category
 * @param {string} category - Category of dialogue (runners, taunts, simon_taunts, reviews_win, reviews_loss)
 * @param {string} region - Region code (EN, AT, DE, NL) - optional, uses game region if not specified
 * @returns {string} Random dialogue from the specified category
 */
export function getLocalizedSimonDialogue(category, region = null) {
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const gameRegion = region || (typeof window !== 'undefined' && window.GAME?.region) || 'EN';

    // Try region-specific dialogue first (80% chance if available)
    if (gameRegion !== 'EN' && SIMULATED_AI.regional[gameRegion]?.[category]) {
        if (Math.random() < 0.8) {
            return pick(SIMULATED_AI.regional[gameRegion][category]);
        }
    }

    // Fall back to English
    return pick(SIMULATED_AI[category] || SIMULATED_AI.tips);
}

/**
 * Get localized Simon warning by index
 * @param {number} index - Warning index (0 or 1)
 * @param {string} region - Region code (EN, AT, DE, NL) - optional
 * @returns {string} Localized warning
 */
export function getLocalizedSimonWarning(index, region = null) {
    const gameRegion = region || (typeof window !== 'undefined' && window.GAME?.region) || 'EN';

    // Try region-specific warning first
    if (gameRegion !== 'EN' && SIMULATED_AI.regional[gameRegion]?.simon_warnings) {
        const warnings = SIMULATED_AI.regional[gameRegion].simon_warnings;
        if (warnings[index]) return warnings[index];
    }

    // Fall back to English
    const defaultWarnings = SIMULATED_AI.simon_warnings || [];
    return defaultWarnings[index] || defaultWarnings[0] || "";
}

/**
 * Pick a region-specific tip when offline
 * @param {string} region - Region code (EN, AT, DE, NL) - optional
 * @returns {string} Random tip, preferring region-specific educational tips
 */
export function pickRegionTip(region = null) {
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const gameRegion = region || (typeof window !== 'undefined' && window.GAME?.region) || 'EN';

    // Filter tips for current region (tips start with [DE], [AT], or [NL])
    const regionPrefix = `[${gameRegion}]`;
    const regionTips = SIMULATED_AI.tips.filter(tip => tip.startsWith(regionPrefix));
    const genericTips = SIMULATED_AI.tips.filter(tip => !tip.startsWith('['));

    // 60% chance to show region-specific tip if available
    if (regionTips.length > 0 && Math.random() < 0.6) {
        return pick(regionTips);
    }

    // Otherwise return a generic tip
    return pick(genericTips.length > 0 ? genericTips : SIMULATED_AI.tips);
}

/**
 * Get localized yard tip
 * @param {string} region - Region code (EN, AT, DE, NL) - optional
 * @returns {string} Random yard safety tip
 */
export function getLocalizedYardTip(region = null) {
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const gameRegion = region || (typeof window !== 'undefined' && window.GAME?.region) || 'EN';
    const tips = SIMON_YARD_TIPS[gameRegion] || SIMON_YARD_TIPS.EN;
    return pick(tips);
}

/**
 * Get localized Jeff/Bezos taunt
 * @param {string} type - Type of taunt ('yard', 'castle', or 'boss')
 * @param {string} region - Region code (EN, AT, DE, NL) - optional
 * @returns {string} Random taunt
 */
export function getLocalizedJeffTaunt(type, region = null) {
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const gameRegion = region || (typeof window !== 'undefined' && window.GAME?.region) || 'EN';

    if (type === 'yard') {
        const taunts = JEFF_YARD_TAUNTS[gameRegion] || JEFF_YARD_TAUNTS.EN;
        return pick(taunts);
    } else if (type === 'castle') {
        const taunts = JEFF_CASTLE_TAUNTS[gameRegion] || JEFF_CASTLE_TAUNTS.EN;
        return pick(taunts);
    } else {
        const taunts = BEZOS_TAUNTS[gameRegion] || BEZOS_TAUNTS.EN;
        return pick(taunts);
    }
}

/**
 * Get localized Bezos transformation line
 * @param {string} region - Region code (EN, AT, DE, NL) - optional
 * @returns {string} Random transformation line
 */
export function getBezosTransformLine(region = null) {
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const gameRegion = region || (typeof window !== 'undefined' && window.GAME?.region) || 'EN';
    const lines = BEZOS_TRANSFORM_LINES[gameRegion] || BEZOS_TRANSFORM_LINES.EN;
    return pick(lines);
}

/**
 * Get localized player response line
 * @param {string} region - Region code (EN, AT, DE, NL) - optional
 * @returns {string} Random player response
 */
export function getPlayerResponseLine(region = null) {
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const gameRegion = region || (typeof window !== 'undefined' && window.GAME?.region) || 'EN';
    const lines = PLAYER_RESPONSE_LINES[gameRegion] || PLAYER_RESPONSE_LINES.EN;
    return pick(lines);
}

/**
 * Get random corporate game over message
 * @returns {string} Random game over message
 */
export function getCorporateGameOver() {
    return CORPORATE_GAME_OVER[Math.floor(Math.random() * CORPORATE_GAME_OVER.length)];
}

/**
 * Get character defeat line
 * @param {string} characterName - Name of the character
 * @returns {string} Random defeat line for the character
 */
export function getCharacterDefeatLine(characterName) {
    const lines = CHARACTER_DEFEAT_LINES[characterName] || CHARACTER_DEFEAT_LINES["Carrie"];
    return lines[Math.floor(Math.random() * lines.length)];
}
