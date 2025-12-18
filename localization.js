// ============================================================================
// AMZL WHS QUEST - COMPREHENSIVE LOCALIZATION FILE
// All UI text, hazard names, and game strings localized for:
// - EN (English/MEU Mid-Europe)
// - DE (Germany - Standard German)
// - AT (Austria - Austrian German dialect)
// - NL (Netherlands - Dutch)
// ============================================================================

const LOCALIZATION = {
    // ========================================================================
    // CORE UI TEXT
    // ========================================================================

    // === SHOP & PPE MESSAGES ===
    'already_owned': {
        'EN': 'Already equipped! This PPE is in your loadout.',
        'DE': 'Bereits ausgerüstet! Diese PSA ist in deiner Ausrüstung.',
        'AT': 'Schon drinn! Die PSA hast scho in deiner Ausrüstung, oida.',
        'NL': 'Al uitgerust! Deze PBM zit in je uitrusting.'
    },
    'insufficient_points': {
        'EN': 'Insufficient Safety Points! Fix more hazards.',
        'DE': 'Nicht genug Sicherheitspunkte! Behebe mehr Gefahren.',
        'AT': 'Ned genug Sicherheitspunkte! Fix mehr Gefahren, herst.',
        'NL': 'Onvoldoende Veiligheidspunten! Los meer gevaren op.'
    },
    'no_items_to_return': {
        'EN': 'No PPE to return! Your locker is empty.',
        'DE': 'Keine PSA zum Zurückgeben! Dein Spind ist leer.',
        'AT': 'Nix zum Zurückgeben! Dein Spind is leer, oida.',
        'NL': 'Geen PBM om terug te geven! Je kluisje is leeg.'
    },
    'select_ppe': {
        'EN': 'Select PPE to view safety regulations...',
        'DE': 'PSA auswählen für Sicherheitsvorschriften...',
        'AT': 'PSA auswählen für Sicherheitsvorschriften...',
        'NL': 'Selecteer PBM voor veiligheidsvoorschriften...'
    },
    'ppe_vending': {
        'EN': 'PPE VENDING',
        'DE': 'PSA-AUTOMAT',
        'AT': 'PSA-AUTOMAT',
        'NL': 'PBM AUTOMAAT'
    },
    'ppe_machine': {
        'EN': 'MACHINE',
        'DE': 'MASCHINE',
        'AT': 'MASCHINE',
        'NL': 'MACHINE'
    },
    'spend_safety_points': {
        'EN': 'Spend Safety Points on',
        'DE': 'Sicherheitspunkte ausgeben für',
        'AT': 'Sicherheitspunkte ausgeben für',
        'NL': 'Besteed Veiligheidspunten aan'
    },
    'protective_equipment': {
        'EN': 'protective equipment.',
        'DE': 'Schutzausrüstung.',
        'AT': 'Schutzausrüstung.',
        'NL': 'beschermingsmiddelen.'
    },
    'each_item_grants': {
        'EN': 'Each item grants a',
        'DE': 'Jedes Teil gibt dir',
        'AT': 'Jedes Teil gibt dir',
        'NL': 'Elk item geeft een'
    },
    'permanent_buff': {
        'EN': 'permanent gameplay buff!',
        'DE': 'einen permanenten Bonus!',
        'AT': 'an permanenten Bonus!',
        'NL': 'permanente gameplay bonus!'
    },
    'select_items': {
        'EN': 'Select Items',
        'DE': 'Auswählen',
        'AT': 'Auswählen',
        'NL': 'Selecteren'
    },
    'leave': {
        'EN': 'Leave',
        'DE': 'Verlassen',
        'AT': 'Verlassen',
        'NL': 'Verlaten'
    },

    // === SAFETY LOCKER ===
    'safety_locker': {
        'EN': 'SAFETY LOCKER',
        'DE': 'SICHERHEITSSPIND',
        'AT': 'SICHERHEITSSPIND',
        'NL': 'VEILIGHEIDSKLUISJE'
    },
    'safety_points': {
        'EN': 'SAFETY POINTS',
        'DE': 'SICHERHEITSPUNKTE',
        'AT': 'SICHERHEITSPUNKTE',
        'NL': 'VEILIGHEIDSPUNTEN'
    },
    'sp_short': {
        'EN': 'SP',
        'DE': 'SP',
        'AT': 'SP',
        'NL': 'VP'
    },
    'owned': {
        'EN': 'OWNED',
        'DE': 'BESITZT',
        'AT': 'BESITZT',
        'NL': 'BEZIT'
    },
    'page': {
        'EN': 'Page',
        'DE': 'Seite',
        'AT': 'Seite',
        'NL': 'Pagina'
    },
    'prev': {
        'EN': 'PREV',
        'DE': 'ZURÜCK',
        'AT': 'ZURÜCK',
        'NL': 'VORIGE'
    },
    'next': {
        'EN': 'NEXT',
        'DE': 'WEITER',
        'AT': 'WEITER',
        'NL': 'VOLG'
    },

    // === CHARACTER SELECTION ===
    'select_coordinator': {
        'EN': 'SELECT COORDINATOR',
        'DE': 'KOORDINATOR WÄHLEN',
        'AT': 'KOORDINATOR WÄHLEN',
        'NL': 'KIES COÖRDINATOR'
    },
    'arrows_browse': {
        'EN': '< ARROWS TO BROWSE > | SPACE TO START',
        'DE': '< PFEILE AUSWÄHLEN > | LEERTASTE START',
        'AT': '< PFEILE AUSWÄHLEN > | LEERTASTE START',
        'NL': '< PIJLEN BLADEREN > | SPATIE STARTEN'
    },
    'role': {
        'EN': 'ROLE',
        'DE': 'ROLLE',
        'AT': 'ROLLE',
        'NL': 'ROL'
    },
    'attack': {
        'EN': 'ATTACK',
        'DE': 'ANGRIFF',
        'AT': 'ANGRIFF',
        'NL': 'AANVAL'
    },
    'ability': {
        'EN': 'ABILITY',
        'DE': 'FÄHIGKEIT',
        'AT': 'FÄHIGKEIT',
        'NL': 'VAARDIGHEID'
    },
    'press_space': {
        'EN': 'PRESS SPACE',
        'DE': 'LEERTASTE',
        'AT': 'LEERTASTE',
        'NL': 'DRUK SPATIE'
    },

    // === PERFORMANCE REVIEW ===
    'performance_review': {
        'EN': 'SIMON - PERFORMANCE REVIEW',
        'DE': 'SIMON - LEISTUNGSBEURTEILUNG',
        'AT': 'SIMON - LEISTUNGSBEURTEILUNG',
        'NL': 'SIMON - PRESTATIEBEOORDELING'
    },
    'exit_interview': {
        'EN': 'SIMON - EXIT INTERVIEW',
        'DE': 'SIMON - AUSTRITTSGESPRÄCH',
        'AT': 'SIMON - AUSTRITTSGESPRÄCH',
        'NL': 'SIMON - EXITGESPREK'
    },

    // === FLOATING TEXT ===
    'safe': {
        'EN': 'Safe!',
        'DE': 'Sicher!',
        'AT': 'Sicher!',
        'NL': 'Veilig!'
    },
    'fixed': {
        'EN': 'Fixed!',
        'DE': 'Behoben!',
        'AT': 'Behoben!',
        'NL': 'Opgelost!'
    },
    'speed_boost': {
        'EN': 'SPEED BOOST!',
        'DE': 'TEMPO-BOOST!',
        'AT': 'TEMPO-BOOST!',
        'NL': 'SNELHEIDSBOOST!'
    },

    // === CONTROLS ===
    'controls_select_confirm_leave': {
        'EN': '▲▼ SELECT | SPACE CONFIRM | ESC LEAVE',
        'DE': '▲▼ WÄHLEN | LEERTASTE OK | ESC VERLASSEN',
        'AT': '▲▼ WÄHLEN | LEERTASTE OK | ESC VERLASSEN',
        'NL': '▲▼ KIEZEN | SPATIE OK | ESC VERLATEN'
    },
    'controls_select_buy_exit': {
        'EN': '▲▼ SELECT | SPACE BUY | ESC EXIT',
        'DE': '▲▼ WÄHLEN | LEERTASTE KAUFEN | ESC ZURÜCK',
        'AT': '▲▼ WÄHLEN | LEERTASTE KAUFEN | ESC ZURÜCK',
        'NL': '▲▼ KIEZEN | SPATIE KOPEN | ESC TERUG'
    },
    'controls_scroll_close': {
        'EN': '▲▼ SCROLL | SPACE/DOWN CLOSE',
        'DE': '▲▼ SCROLLEN | LEERTASTE/UNTEN SCHLIEßEN',
        'AT': '▲▼ SCROLLEN | LEERTASTE/UNTEN SCHLIEßEN',
        'NL': '▲▼ SCROLLEN | SPATIE/OMLAAG SLUITEN'
    },
    'scroll': {
        'EN': 'SCROLL',
        'DE': 'SCROLLEN',
        'AT': 'SCROLLEN',
        'NL': 'SCROLLEN'
    },

    // === COMPLIANCE DETAIL ===
    'regulation': {
        'EN': 'REGULATION',
        'DE': 'VORSCHRIFT',
        'AT': 'VORSCHRIFT',
        'NL': 'VOORSCHRIFT'
    },
    'loading': {
        'EN': 'LOADING...',
        'DE': 'LÄDT...',
        'AT': 'LÄDT...',
        'NL': 'LADEN...'
    },
    'hazard': {
        'EN': 'HAZARD',
        'DE': 'GEFAHR',
        'AT': 'GEFAHR',
        'NL': 'GEVAAR'
    },
    'multi_country': {
        'EN': 'MULTI-COUNTRY',
        'DE': 'LÄNDERVERGLEICH',
        'AT': 'LÄNDERVERGLEICH',
        'NL': 'MEERDERE LANDEN'
    },
    'close_short': {
        'EN': 'CLOSE',
        'DE': 'SCHLIEßEN',
        'AT': 'SCHLIEßEN',
        'NL': 'SLUITEN'
    },
    'comparison_mode': {
        'EN': 'COMPARISON MODE',
        'DE': 'VERGLEICHSMODUS',
        'AT': 'VERGLEICHSMODUS',
        'NL': 'VERGELIJKINGSMODUS'
    },
    'items_short': {
        'EN': 'ITM',
        'DE': 'STK',
        'AT': 'STK',
        'NL': 'STK'
    },
    'empty': {
        'EN': 'EMPTY',
        'DE': 'LEER',
        'AT': 'LEER',
        'NL': 'LEEG'
    },

    // === SPLASH SCREENS ===
    'calculating_score': {
        'EN': 'CALCULATING SAFETY SCORE...',
        'DE': 'BERECHNE SICHERHEITSPUNKTE...',
        'AT': 'BERECHNE SICHERHEITSPUNKTE...',
        'NL': 'VEILIGHEIDSSCORE BEREKENEN...'
    },
    'preparing_exit': {
        'EN': 'PREPARING EXIT INTERVIEW...',
        'DE': 'AUSTRITTSGESPRÄCH VORBEREITEN...',
        'AT': 'AUSTRITTSGESPRÄCH VORBEREITEN...',
        'NL': 'EXITGESPREK VOORBEREIDEN...'
    },
    'compliant': {
        'EN': 'COMPLIANT!',
        'DE': 'KONFORM!',
        'AT': 'KONFORM!',
        'NL': 'CONFORM!'
    },
    'terminated': {
        'EN': 'TERMINATED',
        'DE': 'GEKÜNDIGT',
        'AT': 'GEKÜNDIGT',
        'NL': 'ONTSLAGEN'
    },

    // ========================================================================
    // GAME SCREENS
    // ========================================================================

    // === TITLE SCREEN ===
    'game_title': {
        'EN': 'AMZL WHS QUEST',
        'DE': 'AMZL WHS QUEST',
        'AT': 'AMZL WHS QUEST',
        'NL': 'AMZL WHS QUEST'
    },
    'game_subtitle': {
        'EN': 'SAFETY COORDINATOR EDITION',
        'DE': 'SICHERHEITSKOORDINATOR EDITION',
        'AT': 'SICHERHEITSKOORDINATOR EDITION',
        'NL': 'VEILIGHEIDSCOÖRDINATOR EDITIE'
    },
    'press_spacebar': {
        'EN': 'PRESS SPACEBAR',
        'DE': 'LEERTASTE DRÜCKEN',
        'AT': 'LEERTASTE DRÜCKEN',
        'NL': 'DRUK SPATIEBALK'
    },
    'highscores_hint': {
        'EN': '[H] HIGHSCORES',
        'DE': '[H] BESTENLISTE',
        'AT': '[H] BESTENLISTE',
        'NL': '[H] HIGHSCORES'
    },
    'created_by': {
        'EN': 'CREATED BY ERWIN ESENER',
        'DE': 'ERSTELLT VON ERWIN ESENER',
        'AT': 'ERSTELLT VON ERWIN ESENER',
        'NL': 'GEMAAKT DOOR ERWIN ESENER'
    },
    'copyright': {
        'EN': '© 2024 ERWIN ESENER PRODUCTIONS',
        'DE': '© 2024 ERWIN ESENER PRODUCTIONS',
        'AT': '© 2024 ERWIN ESENER PRODUCTIONS',
        'NL': '© 2024 ERWIN ESENER PRODUCTIONS'
    },

    // === REGION SELECTION ===
    'select_your_region': {
        'EN': 'SELECT YOUR REGION',
        'DE': 'WÄHLE DEINE REGION',
        'AT': 'WÄHL DEINE REGION',
        'NL': 'KIES JE REGIO'
    },
    'region_select_hint': {
        'EN': '↑↓ Select Region | SPACE to Start',
        'DE': '↑↓ Region wählen | LEERTASTE Start',
        'AT': '↑↓ Region wählen | LEERTASTE Start',
        'NL': '↑↓ Selecteer Regio | SPATIE Start'
    },
    'learn_safety_regulations': {
        'EN': 'Learn real safety regulations!',
        'DE': 'Lerne echte Sicherheitsvorschriften!',
        'AT': 'Lern echte Sicherheitsvorschriften!',
        'NL': 'Leer echte veiligheidsvoorschriften!'
    },

    // === INTRO / STORY ===
    'delivery_station': {
        'EN': 'DELIVERY STATION',
        'DE': 'LIEFERSTATION',
        'AT': 'LIEFERSTATION',
        'NL': 'BEZORGSTATION'
    },
    'intro_ops_obsess': {
        'EN': 'Ops Managers obsess over',
        'DE': 'Ops Manager besessen von',
        'AT': 'Ops Manager san besessen von',
        'NL': 'Ops Managers geobsedeerd door'
    },
    'intro_rates': {
        'EN': 'rates.',
        'DE': 'Raten.',
        'AT': 'Raten.',
        'NL': 'rates.'
    },
    'intro_they_throw': {
        'EN': 'They throw',
        'DE': 'Sie werfen',
        'AT': 'Sie werfen',
        'NL': 'Ze gooien'
    },
    'intro_crazy_requests': {
        'EN': 'Crazy Requests.',
        'DE': 'Verrückte Anfragen.',
        'AT': 'Verruckte Anfragen.',
        'NL': 'Gekke Verzoeken.'
    },
    'intro_protect': {
        'EN': 'You must protect',
        'DE': 'Du musst schützen',
        'AT': 'Du musst schützen',
        'NL': 'Je moet beschermen'
    },
    'intro_safety': {
        'EN': 'Safety.',
        'DE': 'Sicherheit.',
        'AT': 'Sicherheit.',
        'NL': 'Veiligheid.'
    },
    'intro_stop_runners': {
        'EN': 'Stop runners.',
        'DE': 'Stopp Renner.',
        'AT': 'Stopp Renner.',
        'NL': 'Stop renners.'
    },
    'intro_fix_hazards': {
        'EN': 'Fix hazards.',
        'DE': 'Behebe Gefahren.',
        'AT': 'Beheb Gefahren.',
        'NL': 'Los gevaren op.'
    },
    'space_to_skip': {
        'EN': '[SPACE TO SKIP]',
        'DE': '[LEERTASTE ÜBERSPRINGEN]',
        'AT': '[LEERTASTE ÜBERSPRINGEN]',
        'NL': '[SPATIE OM OVER TE SLAAN]'
    },

    // === MISSION BRIEFING ===
    'mission_briefing': {
        'EN': 'MISSION BRIEFING',
        'DE': 'EINSATZBESPRECHUNG',
        'AT': 'EINSATZBESPRECHUNG',
        'NL': 'MISSIEBRIEFING'
    },
    'simon_asks': {
        'EN': 'Simon asks you to:',
        'DE': 'Simon bittet dich:',
        'AT': 'Simon bittet di:',
        'NL': 'Simon vraagt je:'
    },
    'objective_audit': {
        'EN': 'Do the safety audit',
        'DE': 'Mach das Sicherheitsaudit',
        'AT': 'Mach des Sicherheitsaudit',
        'NL': 'Doe de veiligheidsaudit'
    },
    'objective_dodge': {
        'EN': 'Dodge Ops requests',
        'DE': 'Weiche Ops-Anfragen aus',
        'AT': 'Weich Ops-Anfragen aus',
        'NL': 'Ontwijkops verzoeken'
    },
    'objective_pushback': {
        'EN': 'Push back with rules',
        'DE': 'Konter mit Vorschriften',
        'AT': 'Konter mit Vorschriften',
        'NL': 'Duw terug met regels'
    },
    'objective_visitors': {
        'EN': 'Deal with "visitors"',
        'DE': 'Umgang mit "Besuchern"',
        'AT': 'Umgang mit "Besucher"',
        'NL': 'Ga om met "bezoekers"'
    },
    'snr_regional_mgr': {
        'EN': 'Snr. Regional Mgr',
        'DE': 'Sr. Regionalleiter',
        'AT': 'Sr. Regionalleiter',
        'NL': 'Sr. Regiomanager'
    },

    // === HOW TO PLAY ===
    'how_to_play': {
        'EN': 'HOW TO PLAY',
        'DE': 'SPIELANLEITUNG',
        'AT': 'SPIELANLEITUNG',
        'NL': 'HOE TE SPELEN'
    },
    'controls': {
        'EN': 'CONTROLS',
        'DE': 'STEUERUNG',
        'AT': 'STEUERUNG',
        'NL': 'BESTURING'
    },
    'objective': {
        'EN': 'OBJECTIVE',
        'DE': 'ZIEL',
        'AT': 'ZIEL',
        'NL': 'DOEL'
    },
    'tips': {
        'EN': 'TIPS',
        'DE': 'TIPPS',
        'AT': 'TIPPS',
        'NL': 'TIPS'
    },
    'watch_out_for': {
        'EN': 'WATCH OUT FOR',
        'DE': 'AUFPASSEN AUF',
        'AT': 'AUFPASSEN AUF',
        'NL': 'LET OP'
    },
    'ops_managers_desc': {
        'EN': 'OPS MANAGERS - Chase & shoot',
        'DE': 'OPS MANAGER - Verfolgen & schießen',
        'AT': 'OPS MANAGER - Verfolgen & schießen',
        'NL': 'OPS MANAGERS - Achtervolgen & schieten'
    },
    'runners_desc': {
        'EN': 'RUNNERS - Stop floor runners',
        'DE': 'RENNER - Stoppe die Renner',
        'AT': 'RENNER - Stopp die Renner',
        'NL': 'RENNERS - Stop vloerrenners'
    },
    'bosses_desc': {
        'EN': 'BOSSES - Surprise visitors!',
        'DE': 'BOSSE - Überraschungsbesucher!',
        'AT': 'BOSSE - Überraschungsbesucher!',
        'NL': 'BAZEN - Verrassingsbezoekers!'
    },
    'ppe_shop': {
        'EN': 'PPE SHOP',
        'DE': 'PSA SHOP',
        'AT': 'PSA SHOP',
        'NL': 'PBM WINKEL'
    },
    'find_safety_cage': {
        'EN': 'Find the Safety Cage',
        'DE': 'Finde den Sicherheitskäfig',
        'AT': 'Find den Sicherheitskäfig',
        'NL': 'Vind de Veiligheidskooi'
    },
    'unlock_ppe_buffs': {
        'EN': 'to unlock PPE buffs!',
        'DE': 'um PSA-Boni freizuschalten!',
        'AT': 'um PSA-Boni freizuschalten!',
        'NL': 'om PBM-bonussen te ontgrendelen!'
    },
    'objective_text_1': {
        'EN': 'Find and fix 5 safety',
        'DE': 'Finde und behebe 5 Sicherheits-',
        'AT': 'Find und beheb 5 Sicherheits-',
        'NL': 'Vind en los 5 veiligheids-'
    },
    'objective_text_2': {
        'EN': 'hazards in the warehouse',
        'DE': 'gefahren im Lager',
        'AT': 'gefahren im Lager',
        'NL': 'gevaren in het magazijn op'
    },
    'objective_text_3': {
        'EN': 'before losing all lives!',
        'DE': 'bevor alle Leben weg sind!',
        'AT': 'bevor alle Leben weg san!',
        'NL': 'voordat je alle levens verliest!'
    },
    'space_to_continue': {
        'EN': '[SPACE TO CONTINUE]',
        'DE': '[LEERTASTE FORTFAHREN]',
        'AT': '[LEERTASTE WEITER]',
        'NL': '[SPATIE OM DOOR TE GAAN]'
    },

    // === SECRET EXIT ===
    'secret_exit_found': {
        'EN': 'You found a hidden exit!\n\nYou step through the fire door into the Amazon yard...',
        'DE': 'Du hast einen geheimen Ausgang gefunden!\n\nDu gehst durch die Brandschutztür auf den Amazon Hof...',
        'AT': 'Du host an geheimen Ausgang gfunden!\n\nDu gehst durch die Brandschutztür auf den Amazon Hof...',
        'NL': 'Je hebt een geheime uitgang gevonden!\n\nJe stapt door de branddeur het Amazon terrein op...'
    },
    'secret_label': {
        'EN': 'SECRET',
        'DE': 'GEHEIM',
        'AT': 'GEHEIM',
        'NL': 'GEHEIM'
    },

    // === HOW TO PLAY TIPS ===
    'tip_walk_hazards': {
        'EN': '> Walk into hazards to fix',
        'DE': '> Lauf in Gefahren um zu beheben',
        'AT': '> Lauf in Gefahren um zu beheben',
        'NL': '> Loop naar gevaren om op te lossen'
    },
    'tip_throw_books': {
        'EN': '> Throw books at ops mgrs',
        'DE': '> Wirf Bücher auf Ops Manager',
        'AT': '> Wirf Bücher auf Ops Manager',
        'NL': '> Gooi boeken naar ops managers'
    },
    'tip_avoid_ops': {
        'EN': '> Avoid ops manager requests',
        'DE': '> Weiche Ops Manager Anfragen aus',
        'AT': '> Weich Ops Manager Anfragen aus',
        'NL': '> Vermijd ops manager verzoeken'
    },
    'tip_secret_exit': {
        'EN': '> Find secret fire exit!',
        'DE': '> Finde den geheimen Notausgang!',
        'AT': '> Find den geheimen Notausgang!',
        'NL': '> Vind de geheime nooduitgang!'
    },

    // === GAME OVER ===
    'game_over': {
        'EN': 'GAME OVER',
        'DE': 'SPIEL VORBEI',
        'AT': 'SPIEL VORBEI',
        'NL': 'GAME OVER'
    },
    'press_space_short': {
        'EN': '[PRESS SPACE]',
        'DE': '[LEERTASTE]',
        'AT': '[LEERTASTE]',
        'NL': '[DRUK SPATIE]'
    },

    // === VICTORY ===
    'victory': {
        'EN': 'VICTORY!',
        'DE': 'SIEG!',
        'AT': 'SIEG!',
        'NL': 'OVERWINNING!'
    },
    'congratulations': {
        'EN': 'CONGRATULATIONS!',
        'DE': 'HERZLICHEN GLÜCKWUNSCH!',
        'AT': 'HERZLICHEN GLÜCKWUNSCH!',
        'NL': 'GEFELICITEERD!'
    },
    'mecha_jeff_defeated': {
        'EN': 'MECHA JEFF DEFEATED!',
        'DE': 'MECHA JEFF BESIEGT!',
        'AT': 'MECHA JEFF BESIEGT!',
        'NL': 'MECHA JEFF VERSLAGEN!'
    },
    'warehouse_safe': {
        'EN': 'The Warehouse is Finally Safe',
        'DE': 'Das Lager ist endlich sicher',
        'AT': 'Des Lager is endlich sicher',
        'NL': 'Het Magazijn is Eindelijk Veilig'
    },
    'surprise_visitor_defeated': {
        'EN': 'SURPRISE VISITOR DEFEATED!',
        'DE': 'ÜBERRASCHUNGSBESUCHER BESIEGT!',
        'AT': 'ÜBERRASCHUNGSBESUCHER BESIEGT!',
        'NL': 'VERRASSINGSBEZOEKER VERSLAGEN!'
    },
    'safety_audit_complete': {
        'EN': 'Safety Audit Complete',
        'DE': 'Sicherheitsaudit abgeschlossen',
        'AT': 'Sicherheitsaudit abgschlossen',
        'NL': 'Veiligheidsaudit Compleet'
    },
    'safety_champion': {
        'EN': 'SAFETY CHAMPION',
        'DE': 'SICHERHEITS-CHAMPION',
        'AT': 'SICHERHEITS-CHAMPION',
        'NL': 'VEILIGHEIDSKAMPIOEN'
    },
    'ultimate': {
        'EN': 'ULTIMATE',
        'DE': 'ULTIMATIVER',
        'AT': 'ULTIMATIVER',
        'NL': 'ULTIEME'
    },
    'thanks_for_playing': {
        'EN': 'THANKS FOR PLAYING!',
        'DE': 'DANKE FÜRS SPIELEN!',
        'AT': 'DANKE FÜRS SPIELEN!',
        'NL': 'BEDANKT VOOR HET SPELEN!'
    },
    'ultimate_safety_champion': {
        'EN': 'You are the Ultimate Safety Champion!',
        'DE': 'Du bist der ultimative Sicherheits-Champion!',
        'AT': 'Du bist der ultimative Sicherheits-Champion!',
        'NL': 'Je bent de Ultieme Veiligheidskampioen!'
    },
    'warehouses_safe': {
        'EN': 'Amazon Warehouses are Finally Safe!',
        'DE': 'Amazon Lager sind endlich sicher!',
        'AT': 'Amazon Lager san endlich sicher!',
        'NL': 'Amazon Magazijnen zijn Eindelijk Veilig!'
    },

    // === HIGHSCORES ===
    'new_high_score': {
        'EN': 'NEW HIGH SCORE!',
        'DE': 'NEUER HIGHSCORE!',
        'AT': 'NEUER HIGHSCORE!',
        'NL': 'NIEUWE HIGHSCORE!'
    },
    'hall_of_compliance': {
        'EN': 'HALL OF COMPLIANCE',
        'DE': 'HALLE DER KONFORMITÄT',
        'AT': 'HALLE DER KONFORMITÄT',
        'NL': 'HAL VAN COMPLIANCE'
    },
    'enter_your_name': {
        'EN': 'ENTER YOUR NAME',
        'DE': 'NAME EINGEBEN',
        'AT': 'NAME EINGEBEN',
        'NL': 'VOER JE NAAM IN'
    },
    'chars_max': {
        'EN': '(5 CHARACTERS MAX)',
        'DE': '(MAX 5 ZEICHEN)',
        'AT': '(MAX 5 ZEICHEN)',
        'NL': '(MAX 5 TEKENS)'
    },
    'name_entry_controls': {
        'EN': '< > SELECT   SPACE ADD   BACK DEL',
        'DE': '< > WÄHLEN   LEER HINZU   ZURÜCK LÖSCH',
        'AT': '< > WÄHLEN   LEER HINZU   ZURÜCK LÖSCH',
        'NL': '< > KIES   SPATIE TOEV   TERUG WISSEN'
    },
    'enter_to_submit': {
        'EN': '[ENTER TO SUBMIT]',
        'DE': '[ENTER ABSENDEN]',
        'AT': '[ENTER ABSENDEN]',
        'NL': '[ENTER OM IN TE DIENEN]'
    },
    'score_saved': {
        'EN': 'SCORE SAVED!',
        'DE': 'PUNKTZAHL GESPEICHERT!',
        'AT': 'PUNKTZAHL GSPEICHERT!',
        'NL': 'SCORE OPGESLAGEN!'
    },
    'online_unavailable': {
        'EN': '(ONLINE SYNC UNAVAILABLE)',
        'DE': '(ONLINE-SYNC NICHT VERFÜGBAR)',
        'AT': '(ONLINE-SYNC NICHT VERFÜGBAR)',
        'NL': '(ONLINE SYNC NIET BESCHIKBAAR)'
    },
    'score_submitted': {
        'EN': 'SCORE SUBMITTED!',
        'DE': 'PUNKTZAHL EINGEREICHT!',
        'AT': 'PUNKTZAHL EINGEREICHT!',
        'NL': 'SCORE INGEDIEND!'
    },
    'space_tap_continue': {
        'EN': '[SPACE / TAP TO CONTINUE]',
        'DE': '[LEERTASTE / TIPPEN FORTFAHREN]',
        'AT': '[LEERTASTE / TIPPEN WEITER]',
        'NL': '[SPATIE / TIK OM DOOR TE GAAN]'
    },
    'rank': {
        'EN': 'RK',
        'DE': 'RG',
        'AT': 'RG',
        'NL': 'RK'
    },
    'name': {
        'EN': 'NAME',
        'DE': 'NAME',
        'AT': 'NAME',
        'NL': 'NAAM'
    },
    'score': {
        'EN': 'SCORE',
        'DE': 'PUNKTE',
        'AT': 'PUNKTE',
        'NL': 'SCORE'
    },
    'char': {
        'EN': 'CHAR',
        'DE': 'CHAR',
        'AT': 'CHAR',
        'NL': 'CHAR'
    },
    'time': {
        'EN': 'TIME',
        'DE': 'ZEIT',
        'AT': 'ZEIT',
        'NL': 'TIJD'
    },
    'boss': {
        'EN': 'BOSS',
        'DE': 'BOSS',
        'AT': 'BOSS',
        'NL': 'BAAS'
    },
    'add': {
        'EN': 'ADD',
        'DE': 'HINZU',
        'AT': 'HINZU',
        'NL': 'TOEV'
    },
    'del': {
        'EN': 'DEL',
        'DE': 'LÖSCH',
        'AT': 'LÖSCH',
        'NL': 'WISSEN'
    },
    'ok': {
        'EN': 'OK',
        'DE': 'OK',
        'AT': 'OK',
        'NL': 'OK'
    },

    // === BOSS ENCOUNTERS ===
    'surprise_visitor': {
        'EN': 'SURPRISE VISITOR!',
        'DE': 'ÜBERRASCHUNGSBESUCHER!',
        'AT': 'ÜBERRASCHUNGSBESUCHER!',
        'NL': 'VERRASSINGSBEZOEKER!'
    },
    'visitor_arriving': {
        'EN': 'An unannounced Visitor is stepping onto the floor...',
        'DE': 'Ein unangekündigter Besucher betritt das Lager...',
        'AT': 'A unangekündigter Besucher betritt des Lager...',
        'NL': 'Een onaangekondigde bezoeker betreedt de vloer...'
    },
    'simon_braces': {
        'EN': 'Simon braces: tighten PPE, breathe, and stand tall.',
        'DE': 'Simon bereitet sich vor: PSA straffen, atmen, aufrecht stehen.',
        'AT': 'Simon bereitet si vor: PSA straffen, atmen, aufrecht stehn.',
        'NL': 'Simon zet zich schrap: PBM strak, adem, sta fier.'
    },
    'press_space_continue': {
        'EN': '[PRESS SPACE TO CONTINUE]',
        'DE': '[LEERTASTE ZUM FORTFAHREN]',
        'AT': '[LEERTASTE ZUM WEITER]',
        'NL': '[DRUK SPATIE OM DOOR TE GAAN]'
    },
    'warning': {
        'EN': 'WARNING',
        'DE': 'WARNUNG',
        'AT': 'WARNUNG',
        'NL': 'WAARSCHUWING'
    },
    'press_space_fight': {
        'EN': '[PRESS SPACE TO FIGHT]',
        'DE': '[LEERTASTE ZUM KÄMPFEN]',
        'AT': '[LEERTASTE ZUM KÄMPFEN]',
        'NL': '[DRUK SPATIE OM TE VECHTEN]'
    },
    'defeated': {
        'EN': 'DEFEATED!',
        'DE': 'BESIEGT!',
        'AT': 'BESIEGT!',
        'NL': 'VERSLAGEN!'
    },
    'safety_prevails': {
        'EN': 'SAFETY PREVAILS!',
        'DE': 'SICHERHEIT SIEGT!',
        'AT': 'SICHERHEIT SIEGT!',
        'NL': 'VEILIGHEID OVERWINT!'
    },
    'vs': {
        'EN': 'VS',
        'DE': 'VS',
        'AT': 'VS',
        'NL': 'VS'
    },
    'press_space_confront': {
        'EN': '▼ PRESS SPACE TO CONFRONT ▼',
        'DE': '▼ LEERTASTE ZUM KONFRONTIEREN ▼',
        'AT': '▼ LEERTASTE ZUM KONFRONTIEREN ▼',
        'NL': '▼ DRUK SPATIE OM TE CONFRONTEREN ▼'
    },

    // === YARD LEVEL ===
    'the_yard': {
        'EN': 'THE YARD',
        'DE': 'DER HOF',
        'AT': 'DER HOF',
        'NL': 'HET TERREIN'
    },
    'danger_zone': {
        'EN': 'DANGER ZONE',
        'DE': 'GEFAHRENZONE',
        'AT': 'GEFAHRENZONE',
        'NL': 'GEVARENZONE'
    },
    'yard_intro_1': {
        'EN': 'You sneak through the fire exit',
        'DE': 'Du schleichst durch den Notausgang',
        'AT': 'Du schleichst durch den Notausgang',
        'NL': 'Je sluipt door de nooduitgang'
    },
    'yard_intro_2': {
        'EN': 'into the Amazon logistics yard.',
        'DE': 'in den Amazon Logistikhof.',
        'AT': 'in den Amazon Logistikhof.',
        'NL': 'naar het Amazon logistiek terrein.'
    },
    'yard_dodge': {
        'EN': 'Dodge DSP vans and semis!',
        'DE': 'Weiche DSP-Transportern und LKWs aus!',
        'AT': 'Weich DSP-Transportern und LKWs aus!',
        'NL': 'Ontwijkdsp busjes en vrachtwagens!'
    },
    'yard_reach_top': {
        'EN': 'Reach the top without getting hit!',
        'DE': 'Erreiche die Spitze ohne getroffen zu werden!',
        'AT': 'Erreich die Spitze ohne troffen zu werden!',
        'NL': 'Bereik de top zonder geraakt te worden!'
    },
    'yard_warning': {
        'EN': 'WARNING: Vehicles WILL reset you!',
        'DE': 'WARNUNG: Fahrzeuge setzen dich zurück!',
        'AT': 'WARNUNG: Fahrzeuge setzen di zurück!',
        'NL': 'WAARSCHUWING: Voertuigen resetten je!'
    },
    'press_space_run': {
        'EN': '[PRESS SPACE TO RUN]',
        'DE': '[LEERTASTE ZUM LAUFEN]',
        'AT': '[LEERTASTE ZUM LAUFEN]',
        'NL': '[DRUK SPATIE OM TE RENNEN]'
    },
    'throne_room': {
        'EN': 'THRONE ROOM',
        'DE': 'THRONSAAL',
        'AT': 'THRONSAAL',
        'NL': 'TROONZAAL'
    },
    'goal': {
        'EN': 'GOAL',
        'DE': 'ZIEL',
        'AT': 'ZIEL',
        'NL': 'DOEL'
    },
    'start': {
        'EN': 'START',
        'DE': 'START',
        'AT': 'START',
        'NL': 'START'
    },

    // === MECHA TRANSFORMATIONS ===
    'warning_exclaim': {
        'EN': '!! WARNING !!',
        'DE': '!! WARNUNG !!',
        'AT': '!! WARNUNG !!',
        'NL': '!! WAARSCHUWING !!'
    },
    'transformation': {
        'EN': 'TRANSFORMATION',
        'DE': 'TRANSFORMATION',
        'AT': 'TRANSFORMATION',
        'NL': 'TRANSFORMATIE'
    },
    'mecha_jeff_bezos': {
        'EN': 'MECHA JEFF BEZOS',
        'DE': 'MECHA JEFF BEZOS',
        'AT': 'MECHA JEFF BEZOS',
        'NL': 'MECHA JEFF BEZOS'
    },
    'automation_protocol': {
        'EN': 'AUTOMATION PROTOCOL ACTIVATED',
        'DE': 'AUTOMATISIERUNGSPROTOKOLL AKTIVIERT',
        'AT': 'AUTOMATISIERUNGSPROTOKOLL AKTIVIERT',
        'NL': 'AUTOMATISERINGSPROTOCOL GEACTIVEERD'
    },
    'danger_exclaim': {
        'EN': '!! DANGER !!',
        'DE': '!! GEFAHR !!',
        'AT': '!! GEFAHR !!',
        'NL': '!! GEVAAR !!'
    },
    'safety_protocol': {
        'EN': 'SAFETY PROTOCOL',
        'DE': 'SICHERHEITSPROTOKOLL',
        'AT': 'SICHERHEITSPROTOKOLL',
        'NL': 'VEILIGHEIDSPROTOCOL'
    },
    'initiating': {
        'EN': 'INITIATING',
        'DE': 'WIRD INITIIERT',
        'AT': 'WIRD INITIIERT',
        'NL': 'INITIËREN'
    },
    'mecha_mega': {
        'EN': 'MECHA MEGA',
        'DE': 'MECHA MEGA',
        'AT': 'MECHA MEGA',
        'NL': 'MECHA MEGA'
    },
    'simon': {
        'EN': 'SIMON',
        'DE': 'SIMON',
        'AT': 'SIMON',
        'NL': 'SIMON'
    },
    'ultimate_whs_authority': {
        'EN': 'ULTIMATE WHS AUTHORITY',
        'DE': 'ULTIMATIVE WHS AUTORITÄT',
        'AT': 'ULTIMATIVE WHS AUTORITÄT',
        'NL': 'ULTIEME WHS AUTORITEIT'
    },
    'syncing_protocol': {
        'EN': 'SYNCING PROTOCOL...',
        'DE': 'SYNCHRONISIERE PROTOKOLL...',
        'AT': 'SYNCHRONISIER PROTOKOLL...',
        'NL': 'SYNCHRONISEER PROTOCOL...'
    },
    'ultimate_threat': {
        'EN': '!! ULTIMATE THREAT !!',
        'DE': '!! ULTIMATIVE BEDROHUNG !!',
        'AT': '!! ULTIMATIVE BEDROHUNG !!',
        'NL': '!! ULTIEME DREIGING !!'
    },
    'the_ultimate_whs': {
        'EN': 'THE ULTIMATE WHS AUTHORITY',
        'DE': 'DIE ULTIMATIVE WHS AUTORITÄT',
        'AT': 'DIE ULTIMATIVE WHS AUTORITÄT',
        'NL': 'DE ULTIEME WHS AUTORITEIT'
    },
    'compliance_annihilation': {
        'EN': 'ATTACK: COMPLIANCE ANNIHILATION',
        'DE': 'ANGRIFF: KONFORMITÄTS-VERNICHTUNG',
        'AT': 'ANGRIFF: KONFORMITÄTS-VERNICHTUNG',
        'NL': 'AANVAL: COMPLIANCE VERNIETIGING'
    },
    'performance_awaits': {
        'EN': 'Your performance review awaits...',
        'DE': 'Deine Leistungsbeurteilung wartet...',
        'AT': 'Deine Leistungsbeurteilung wartet...',
        'NL': 'Je prestatiebeoordeling wacht...'
    },
    'mecha_jeff_rises': {
        'EN': 'MECHA JEFF RISES',
        'DE': 'MECHA JEFF ERHEBT SICH',
        'AT': 'MECHA JEFF ERHEBT SI',
        'NL': 'MECHA JEFF RIJST'
    },
    'prime_drone_swarm': {
        'EN': 'Prime Drone Swarm',
        'DE': 'Prime-Drohnen-Schwarm',
        'AT': 'Prime-Drohnen-Schwarm',
        'NL': 'Prime Drone Zwerm'
    },
    'two_day_storm': {
        'EN': '2-Day Shipping Storm',
        'DE': '2-Tages-Liefersturm',
        'AT': '2-Tages-Liefersturm',
        'NL': '2-Dagen Verzendstorm'
    },
    'orbital_beam': {
        'EN': 'Orbital Beam Audit',
        'DE': 'Orbital-Strahl-Audit',
        'AT': 'Orbital-Strahl-Audit',
        'NL': 'Orbitale Straalbundel Audit'
    },
    'press_space_defy': {
        'EN': '[PRESS SPACE TO DEFY]',
        'DE': '[LEERTASTE ZUM TROTZEN]',
        'AT': '[LEERTASTE ZUM TROTZEN]',
        'NL': '[DRUK SPATIE OM TE TROTSEREN]'
    },
    'final_boss': {
        'EN': 'FINAL BOSS',
        'DE': 'ENDBOSS',
        'AT': 'ENDBOSS',
        'NL': 'EINDBAAS'
    },
    'prime_missiles_ready': {
        'EN': 'PRIME MISSILES READY',
        'DE': 'PRIME-RAKETEN BEREIT',
        'AT': 'PRIME-RAKETEN BEREIT',
        'NL': 'PRIME RAKETTEN GEREED'
    },
    'missiles': {
        'EN': 'MISSILES',
        'DE': 'RAKETEN',
        'AT': 'RAKETEN',
        'NL': 'RAKETTEN'
    },
    'laser_sweep': {
        'EN': 'LASER SWEEP',
        'DE': 'LASER-SWEEP',
        'AT': 'LASER-SWEEP',
        'NL': 'LASER SWEEP'
    },
    'drone_swarm': {
        'EN': 'DRONE SWARM',
        'DE': 'DROHNEN-SCHWARM',
        'AT': 'DROHNEN-SCHWARM',
        'NL': 'DRONE ZWERM'
    },
    'critical_damage': {
        'EN': 'CRITICAL DAMAGE',
        'DE': 'KRITISCHER SCHADEN',
        'AT': 'KRITISCHER SCHADEN',
        'NL': 'KRITIEKE SCHADE'
    },
    'mecha_destroyed': {
        'EN': 'MECHA DESTROYED',
        'DE': 'MECHA ZERSTÖRT',
        'AT': 'MECHA ZERSTÖRT',
        'NL': 'MECHA VERNIETIGD'
    },
    'form_destabilizing': {
        'EN': 'FORM DESTABILIZING...',
        'DE': 'FORM DESTABILISIERT...',
        'AT': 'FORM DESTABILISIERT...',
        'NL': 'VORM DESTABILISEERT...'
    },
    'reverting': {
        'EN': 'REVERTING...',
        'DE': 'ZURÜCKKEHREND...',
        'AT': 'ZURÜCKKEHREND...',
        'NL': 'TERUGKEREND...'
    },
    'bezos_returns': {
        'EN': 'BEZOS RETURNS!',
        'DE': 'BEZOS KEHRT ZURÜCK!',
        'AT': 'BEZOS KEHRT ZURÜCK!',
        'NL': 'BEZOS KEERT TERUG!'
    },
    'bezos_escape_pod': {
        'EN': 'BEZOS ESCAPE POD',
        'DE': 'BEZOS FLUCHTKAPSEL',
        'AT': 'BEZOS FLUCHTKAPSEL',
        'NL': 'BEZOS ONTSNAPPINGSCAPSULE'
    },
    'tactical_retreat': {
        'EN': 'TACTICAL RETREAT!',
        'DE': 'TAKTISCHER RÜCKZUG!',
        'AT': 'TAKTISCHER RÜCKZUG!',
        'NL': 'TACTISCHE TERUGTOCHT!'
    },
    'to_escape_pod': {
        'EN': '"To the secret escape pod!"',
        'DE': '"Zur geheimen Fluchtkapsel!"',
        'AT': '"Zur geheimen Fluchtkapsel!"',
        'NL': '"Naar de geheime ontsnappingscapsule!"'
    },
    'boarding': {
        'EN': 'BOARDING...',
        'DE': 'EINSTEIGEN...',
        'AT': 'EINSTEIGEN...',
        'NL': 'AAN BOORD...'
    },
    't_minus': {
        'EN': 'T-MINUS',
        'DE': 'T-MINUS',
        'AT': 'T-MINUS',
        'NL': 'T-MINUS'
    },
    'bezos_escapes': {
        'EN': 'BEZOS ESCAPES!',
        'DE': 'BEZOS ENTKOMMT!',
        'AT': 'BEZOS ENTKOMMT!',
        'NL': 'BEZOS ONTSNAPT!'
    },
    'to_infinity': {
        'EN': '"To infinity and tax evasion!"',
        'DE': '"Bis zur Unendlichkeit und Steuerhinterziehung!"',
        'AT': '"Bis zur Unendlichkeit und Steuerhinterziehung!"',
        'NL': '"Tot oneindigheid en belastingontduiking!"'
    },
    'true_hero_whs': {
        'EN': 'TRUE HERO OF WHS!',
        'DE': 'WAHRER HELD DES WHS!',
        'AT': 'WAHRER HELD DES WHS!',
        'NL': 'ECHTE HELD VAN WHS!'
    },
    'credits': {
        'EN': 'CREDITS:',
        'DE': 'CREDITS:',
        'AT': 'CREDITS:',
        'NL': 'CREDITS:'
    },
    'you_defeated_text': {
        'EN': 'YOU DEFEATED',
        'DE': 'DU HAST BESIEGT',
        'AT': 'DU HOST BESIEGT',
        'NL': 'JE HEBT VERSLAGEN'
    },
    'worker_victory': {
        'EN': 'WORKER VICTORY!',
        'DE': 'ARBEITER-SIEG!',
        'AT': 'ARBEITER-SIEG!',
        'NL': 'WERKER OVERWINNING!'
    },
    'position_vacant': {
        'EN': 'POSITION VACANT',
        'DE': 'POSITION VAKANT',
        'AT': 'POSITION VAKANT',
        'NL': 'POSITIE VACANT'
    },
    'fulfillment_center': {
        'EN': 'FULFILLMENT CENTER',
        'DE': 'FULFILLMENT CENTER',
        'AT': 'FULFILLMENT CENTER',
        'NL': 'FULFILLMENT CENTER'
    },
    'desperation_mode': {
        'EN': '* DESPERATION MODE! *',
        'DE': '* VERZWEIFLUNGSMODUS! *',
        'AT': '* VERZWEIFLUNGSMODUS! *',
        'NL': '* WANHOPIGE MODUS! *'
    },

    // === HUD ELEMENTS ===
    'life': {
        'EN': 'LIFE',
        'DE': 'LEBEN',
        'AT': 'LEBEN',
        'NL': 'LEVEN'
    },
    'hazards': {
        'EN': 'HAZARDS',
        'DE': 'GEFAHREN',
        'AT': 'GEFAHREN',
        'NL': 'GEVAREN'
    },
    'region': {
        'EN': 'REGION',
        'DE': 'REGION',
        'AT': 'REGION',
        'NL': 'REGIO'
    },
    'ppe': {
        'EN': 'PPE',
        'DE': 'PSA',
        'AT': 'PSA',
        'NL': 'PBM'
    },
    'upgrades': {
        'EN': 'UPGRADES',
        'DE': 'UPGRADES',
        'AT': 'UPGRADES',
        'NL': 'UPGRADES'
    }
};

// ============================================================================
// HAZARD NAMES - Country-specific localization
// ============================================================================

const HAZARD_NAMES = {
    // === ERGONOMIC HAZARDS - REPETITIVE MOTION ===
    "Repetitive Stow Motion (1000+ scans/shift)": {
        'EN': "Repetitive Stow Motion (1000+ scans/shift)",
        'DE': "Repetitive Stau-Bewegung (1000+ Scans/Schicht)",
        'AT': "Repetitive Stau-Bewegung (1000+ Scans/Schicht)",
        'NL': "Repetitieve Stouw Beweging (1000+ scans/dienst)"
    },
    "Continuous Scanning/Twisting Pattern": {
        'EN': "Continuous Scanning/Twisting Pattern",
        'DE': "Kontinuierliches Scannen/Verdrehen",
        'AT': "Kontinuierliches Scannen/Verdrehen",
        'NL': "Continu Scannen/Draaien Patroon"
    },
    "Same-Motion Stowing Into Bags": {
        'EN': "Same-Motion Stowing Into Bags",
        'DE': "Gleiche Bewegung beim Verstauen in Taschen",
        'AT': "Gleiche Bewegung beim Verstauen in Taschen",
        'NL': "Zelfde-Beweging Stouwen in Tassen"
    },
    "High-Rate Pick Without Rotation": {
        'EN': "High-Rate Pick Without Rotation",
        'DE': "Hochfrequentes Picken ohne Rotation",
        'AT': "Hochfrequentes Picken ohne Rotation",
        'NL': "Hoog-Tempo Picken Zonder Rotatie"
    },
    "Carpal Tunnel Risk Station": {
        'EN': "Carpal Tunnel Risk Station",
        'DE': "Station mit Karpaltunnelsyndrom-Risiko",
        'AT': "Station mit Karpaltunnelsyndrom-Risiko",
        'NL': "Carpaal Tunnel Risico Station"
    },

    // === ERGONOMIC HAZARDS - AWKWARD POSTURES ===
    "Top Shelf Overreach (Stow Bag)": {
        'EN': "Top Shelf Overreach (Stow Bag)",
        'DE': "Überstrecken zum obersten Regal (Stau-Tasche)",
        'AT': "Überstrecken zum obersten Regal (Stau-Tasche)",
        'NL': "Bovenste Plank Overreiken (Stouw Tas)"
    },
    "Bottom Shelf Repeated Bending": {
        'EN': "Bottom Shelf Repeated Bending",
        'DE': "Wiederholtes Bücken zum unteren Regal",
        'AT': "Wiederholtes Bücken zum unteren Regal",
        'NL': "Onderste Plank Herhaald Bukken"
    },
    "Twisted Spine While Scanning": {
        'EN': "Twisted Spine While Scanning",
        'DE': "Verdrehte Wirbelsäule beim Scannen",
        'AT': "Verdrehte Wirbelsäule beim Scannen",
        'NL': "Gedraaide Ruggengraat Tijdens Scannen"
    },
    "Shoulder-Height Stowing Station": {
        'EN': "Shoulder-Height Stowing Station",
        'DE': "Station auf Schulterhöhe",
        'AT': "Station auf Schulterhöhe",
        'NL': "Schouder-Hoogte Stouw Station"
    },
    "Kneeling Without Knee Pads": {
        'EN': "Kneeling Without Knee Pads",
        'DE': "Knien ohne Knieschoner",
        'AT': "Knien ohne Knieschoner",
        'NL': "Knielen Zonder Kniebeschermers"
    },
    "Standing Mat Missing At Station": {
        'EN': "Standing Mat Missing At Station",
        'DE': "Fehlende Stehmatte an Station",
        'AT': "Fehlende Stehmatte an Station",
        'NL': "Stamat Ontbreekt Bij Station"
    },

    // === ERGONOMIC HAZARDS - HEAVY LIFTING ===
    "Non-Con Item (Dog Food 20kg+)": {
        'EN': "Non-Con Item (Dog Food 20kg+)",
        'DE': "Nicht-Förderbares Teil (Hundefutter 20kg+)",
        'AT': "Nicht-Förderbares Teil (Hundefutter 20kg+)",
        'NL': "Non-Con Item (Hondenvoer 20kg+)"
    },
    "Oversized Furniture Solo Lift": {
        'EN': "Oversized Furniture Solo Lift",
        'DE': "Übergroße Möbel alleine heben",
        'AT': "Übergroße Möbel alleine heben",
        'NL': "Oversized Meubels Solo Tillen"
    },
    "Heavy Package Without Team Lift": {
        'EN': "Heavy Package Without Team Lift",
        'DE': "Schweres Paket ohne Teamheben",
        'AT': "Schweres Paket ohne Teamheben",
        'NL': "Zwaar Pakket Zonder Team Tillen"
    },
    "Water Cases Stacked High": {
        'EN': "Water Cases Stacked High",
        'DE': "Wasserkisten hoch gestapelt",
        'AT': "Wasserkisten hoch gestapelt",
        'NL': "Waterkratten Hoog Gestapeld"
    },
    "Cat Litter Bucket Solo Carry": {
        'EN': "Cat Litter Bucket Solo Carry",
        'DE': "Katzenstreu-Eimer alleine tragen",
        'AT': "Katzenstreu-Eimer alleine tragen",
        'NL': "Kattenbakvulling Emmer Solo Dragen"
    },
    "Exercise Equipment Over 23kg": {
        'EN': "Exercise Equipment Over 23kg",
        'DE': "Fitnessgeräte über 23kg",
        'AT': "Fitnessgeräte über 23kg",
        'NL': "Fitnessapparatuur Boven 23kg"
    },

    // === ERGONOMIC HAZARDS - PUSHING/PULLING ===
    "Go-Cart With Bad Wheels (200kg+)": {
        'EN': "Go-Cart With Bad Wheels (200kg+)",
        'DE': "Gitterwagen mit defekten Rädern (200kg+)",
        'AT': "Gitterwagen mit defekten Rädern (200kg+)",
        'NL': "Rolcontainer met Slechte Wielen (200kg+)"
    },
    "Heavy Cage High Rolling Resistance": {
        'EN': "Heavy Cage High Rolling Resistance",
        'DE': "Schwerer Käfig hoher Rollwiderstand",
        'AT': "Schwerer Käfig hoher Rollwiderstand",
        'NL': "Zware Kooi Hoge Rolweerstand"
    },
    "Stuck Pallet Jack Wheels": {
        'EN': "Stuck Pallet Jack Wheels",
        'DE': "Blockierte Hubwagenräder",
        'AT': "Blockierte Hubwagenräder",
        'NL': "Vastzittende Palletwagen Wielen"
    },
    "Overloaded Cart Exceeding Limit": {
        'EN': "Overloaded Cart Exceeding Limit",
        'DE': "Überladener Wagen überschreitet Limit",
        'AT': "Überladener Wagen überschreitet Limit",
        'NL': "Overbeladen Kar Overschrijdt Limiet"
    },
    "Cage Door Jamming On Floor": {
        'EN': "Cage Door Jamming On Floor",
        'DE': "Käfigtür klemmt am Boden",
        'AT': "Käfigtür klemmt am Boden",
        'NL': "Kooi Deur Klemt Op Vloer"
    },
    "Manual Pallet Movement No PPE": {
        'EN': "Manual Pallet Movement No PPE",
        'DE': "Manuelle Palettenbewegung ohne PSA",
        'AT': "Manuelle Palettenbewegung ohne PSA",
        'NL': "Handmatige Pallet Beweging Zonder PBM"
    },

    // === CONVEYOR & MACHINERY HAZARDS ===
    "Nip Point At Drive Roller": {
        'EN': "Nip Point At Drive Roller",
        'DE': "Quetschstelle an Antriebsrolle",
        'AT': "Quetschstelle an Antriebsrolle",
        'NL': "Knijppunt Bij Aandrijfrol"
    },
    "Pinch Point Belt Gap Exposed": {
        'EN': "Pinch Point Belt Gap Exposed",
        'DE': "Klemmstelle Bandlücke freigelegt",
        'AT': "Klemmstelle Bandlücke freigelegt",
        'NL': "Knijppunt Band Opening Blootgesteld"
    },
    "Jam Breaking While Belt Running": {
        'EN': "Jam Breaking While Belt Running",
        'DE': "Störung beheben während Band läuft",
        'AT': "Störung beheben während Band läuft",
        'NL': "Storing Oplossen Terwijl Band Draait"
    },
    "LOTO Violation At Conveyor": {
        'EN': "LOTO Violation At Conveyor",
        'DE': "LOTO-Verstoß am Förderband",
        'AT': "LOTO-Verstoß am Förderband",
        'NL': "LOTO Overtreding Bij Transportband"
    },
    "Missing Safety Guard On Belt": {
        'EN': "Missing Safety Guard On Belt",
        'DE': "Fehlende Schutzabdeckung am Band",
        'AT': "Fehlende Schutzabdeckung am Band",
        'NL': "Ontbrekende Veiligheidsafscherming Op Band"
    },
    "Package Falling From Overhead Chute": {
        'EN': "Package Falling From Overhead Chute",
        'DE': "Paket fällt von Überkopfrutsche",
        'AT': "Paket fällt von Überkopfrutsche",
        'NL': "Pakket Valt Van Bovenliggende Goot"
    },
    "Loose Clothing Near Moving Parts": {
        'EN': "Loose Clothing Near Moving Parts",
        'DE': "Lose Kleidung nahe beweglichen Teilen",
        'AT': "Lose Kleidung nahe beweglichen Teilen",
        'NL': "Losse Kleding Nabij Bewegende Delen"
    },
    "Hair/Lanyard Entanglement Risk": {
        'EN': "Hair/Lanyard Entanglement Risk",
        'DE': "Risiko Haar/Schlüsselband Verheddern",
        'AT': "Risiko Haar/Schlüsselband Verheddern",
        'NL': "Haar/Lanyard Verstrikking Risico"
    },
    "E-Stop Out Of Reach": {
        'EN': "E-Stop Out Of Reach",
        'DE': "Not-Aus außer Reichweite",
        'AT': "Not-Aus außer Reichweite",
        'NL': "Noodstop Buiten Bereik"
    },
    "Sortation System Package Jam": {
        'EN': "Sortation System Package Jam",
        'DE': "Paketstau im Sortiersystem",
        'AT': "Paketstau im Sortiersystem",
        'NL': "Sorteersysteem Pakket Storing"
    },
    "Missing Conveyor Safety Guard": {
        'EN': "Missing Conveyor Safety Guard",
        'DE': "Fehlende Förderband-Schutzvorrichtung",
        'AT': "Fehlende Förderband-Schutzvorrichtung",
        'NL': "Ontbrekende Transportband Veiligheidsafscherming"
    },
    "Constant Conveyor Alarm Noise": {
        'EN': "Constant Conveyor Alarm Noise",
        'DE': "Dauerhafter Förderband-Alarmton",
        'AT': "Dauerhafter Förderband-Alarmton",
        'NL': "Constante Transportband Alarm Geluid"
    },

    // === SLIPS, TRIPS, AND FALLS ===
    "Loose Shrink Wrap In Walkway": {
        'EN': "Loose Shrink Wrap In Walkway",
        'DE': "Lose Schrumpffolie im Gehweg",
        'AT': "Lose Schrumpffolie im Gehweg",
        'NL': "Losse Krimpfolie In Looppad"
    },
    "Pallet Straps On Floor": {
        'EN': "Pallet Straps On Floor",
        'DE': "Palettengurte auf dem Boden",
        'AT': "Palettengurte auf dem Boden",
        'NL': "Palletbanden Op Vloer"
    },
    "Broken Pallet Wood Scattered": {
        'EN': "Broken Pallet Wood Scattered",
        'DE': "Zerbrochenes Palettenholz verstreut",
        'AT': "Zerbrochenes Palettenholz verstreut",
        'NL': "Gebroken Pallethout Verspreid"
    },
    "Damaged Concrete Surface": {
        'EN': "Damaged Concrete Surface",
        'DE': "Beschädigte Betonoberfläche",
        'AT': "Beschädigte Betonoberfläche",
        'NL': "Beschadigd Betonoppervlak"
    },
    "Floor Tape Peeling Up": {
        'EN': "Floor Tape Peeling Up",
        'DE': "Bodenmarkierung löst sich",
        'AT': "Bodenmarkierung löst sich",
        'NL': "Vloertape Laat Los"
    },
    "Wet Floor From Winter Tracking": {
        'EN': "Wet Floor From Winter Tracking",
        'DE': "Nasser Boden durch Winterspuren",
        'AT': "Nasser Boden durch Winterspuren",
        'NL': "Natte Vloer Door Winter Aanslepen"
    },
    "Ice/Snow Tracked Inside": {
        'EN': "Ice/Snow Tracked Inside",
        'DE': "Eis/Schnee hereingetragen",
        'AT': "Eis/Schnee hereingetragen",
        'NL': "IJs/Sneeuw Naar Binnen Gelopen"
    },
    "Wet Floor No Warning Sign": {
        'EN': "Wet Floor No Warning Sign",
        'DE': "Nasser Boden ohne Warnschild",
        'AT': "Nasser Boden ohne Warnschild",
        'NL': "Natte Vloer Geen Waarschuwingsbord"
    },
    "Narrow Aisle Blocked By Carts": {
        'EN': "Narrow Aisle Blocked By Carts",
        'DE': "Enger Gang durch Wagen blockiert",
        'AT': "Enger Gang durch Wagen blockiert",
        'NL': "Smalle Gang Geblokkeerd Door Karren"
    },
    "Staged Pallets Blocking Path": {
        'EN': "Staged Pallets Blocking Path",
        'DE': "Bereitgestellte Paletten blockieren Weg",
        'AT': "Bereitgestellte Paletten blockieren Weg",
        'NL': "Klaargezette Pallets Blokkeren Pad"
    },
    "Totes Forcing Squeeze-Through": {
        'EN': "Totes Forcing Squeeze-Through",
        'DE': "Behälter erzwingen Durchquetschen",
        'AT': "Behälter erzwingen Durchquetschen",
        'NL': "Bakken Dwingen Tot Doorkruipen"
    },
    "Step-Over Obstacle Hazard": {
        'EN': "Step-Over Obstacle Hazard",
        'DE': "Stolpergefahr durch Hindernis",
        'AT': "Stolpergefahr durch Hindernis",
        'NL': "Overstap Obstakel Gevaar"
    },

    // === POWERED INDUSTRIAL TRUCKS (PIT) ===
    "EPJ Running Over Toes": {
        'EN': "EPJ Running Over Toes",
        'DE': "EPJ überfährt Zehen",
        'AT': "EPJ überfährt Zehen",
        'NL': "EPJ Rijdt Over Tenen"
    },
    "Manual Pallet Jack Foot Injury Risk": {
        'EN': "Manual Pallet Jack Foot Injury Risk",
        'DE': "Manueller Hubwagen Fußverletzungsrisiko",
        'AT': "Manueller Hubwagen Fußverletzungsrisiko",
        'NL': "Handmatige Palletwagen Voetletsel Risico"
    },
    "EPJ Collision With Racking": {
        'EN': "EPJ Collision With Racking",
        'DE': "EPJ Kollision mit Regalen",
        'AT': "EPJ Kollision mit Regalen",
        'NL': "EPJ Botsing Met Stellingen"
    },
    "Forklift Striking Infrastructure": {
        'EN': "Forklift Striking Infrastructure",
        'DE': "Stapler trifft Infrastruktur",
        'AT': "Stapler trifft Infrastruktur",
        'NL': "Vorkheftruck Raakt Infrastructuur"
    },
    "PIT-Cart Collision Zone": {
        'EN': "PIT-Cart Collision Zone",
        'DE': "PIT-Wagen Kollisionszone",
        'AT': "PIT-Wagen Kollisionszone",
        'NL': "PIT-Kar Botsingszone"
    },
    "Battery Handling Without PPE": {
        'EN': "Battery Handling Without PPE",
        'DE': "Batteriehandhabung ohne PSA",
        'AT': "Batteriehandhabung ohne PSA",
        'NL': "Batterij Hantering Zonder PBM"
    },
    "Lead-Acid Battery Corrosive Exposure": {
        'EN': "Lead-Acid Battery Corrosive Exposure",
        'DE': "Blei-Säure-Batterie Korrosive Belastung",
        'AT': "Blei-Säure-Batterie Korrosive Belastung",
        'NL': "Lood-Zuur Batterij Corrosieve Blootstelling"
    },
    "Charging Station Acid Spill": {
        'EN': "Charging Station Acid Spill",
        'DE': "Ladestation Säureaustritt",
        'AT': "Ladestation Säureaustritt",
        'NL': "Laadstation Zuur Morsen"
    },
    "PIT Operator Without Certification": {
        'EN': "PIT Operator Without Certification",
        'DE': "Staplerfahrer ohne Zertifizierung",
        'AT': "Staplerfahrer ohne Zertifizierung",
        'NL': "PIT Operator Zonder Certificering"
    },
    "Forklift Exceeding Speed Limit": {
        'EN': "Forklift Exceeding Speed Limit",
        'DE': "Stapler überschreitet Geschwindigkeitslimit",
        'AT': "Stapler überschreitet Geschwindigkeitslimit",
        'NL': "Vorkheftruck Overschrijdt Snelheidslimiet"
    },

    // === PSYCHOSOCIAL & ENVIRONMENTAL ===
    "Noise >85dB Without Ear Protection": {
        'EN': "Noise >85dB Without Ear Protection",
        'DE': "Lärm >85dB ohne Gehörschutz",
        'AT': "Lärm >85dB ohne Gehörschutz",
        'NL': "Lawaai >85dB Zonder Gehoorbescherming"
    },
    "High Takt Time Pace Pressure": {
        'EN': "High Takt Time Pace Pressure",
        'DE': "Hoher Taktzeitdruck",
        'AT': "Hoher Taktzeitdruck",
        'NL': "Hoge Takttijd Tempo Druk"
    },
    "Peak Season Burnout Risk": {
        'EN': "Peak Season Burnout Risk",
        'DE': "Hochsaison Burnout-Risiko",
        'AT': "Hochsaison Burnout-Risiko",
        'NL': "Piekseizoen Burnout Risico"
    },
    "Rushing Due To Rate Targets": {
        'EN': "Rushing Due To Rate Targets",
        'DE': "Hetzen wegen Ratenvorgaben",
        'AT': "Hetzen wegen Ratenvorgaben",
        'NL': "Haasten Door Rate Doelen"
    },
    "Cold Stress Near Open Dock Door": {
        'EN': "Cold Stress Near Open Dock Door",
        'DE': "Kältestress nahe offener Docktür",
        'AT': "Kältestress nahe offener Docktür",
        'NL': "Koude Stress Nabij Open Dock Deur"
    },
    "Winter Temperature Extreme Zone": {
        'EN': "Winter Temperature Extreme Zone",
        'DE': "Winter Temperatur Extremzone",
        'AT': "Winter Temperatur Extremzone",
        'NL': "Winter Temperatuur Extreme Zone"
    },
    "Summer Heatwave Non-AC Area": {
        'EN': "Summer Heatwave Non-AC Area",
        'DE': "Sommer-Hitzewelle Bereich ohne Klimaanlage",
        'AT': "Sommer-Hitzewelle Bereich ohne Klimaanlage",
        'NL': "Zomer Hittegolf Geen-AC Gebied"
    },
    "Mental Fatigue Station": {
        'EN': "Mental Fatigue Station",
        'DE': "Station mit mentaler Ermüdung",
        'AT': "Station mit mentaler Ermüdung",
        'NL': "Mentale Vermoeidheid Station"
    },

    // === HAZARDOUS MATERIALS (HazMat) ===
    "Leaking Package (Bleach)": {
        'EN': "Leaking Package (Bleach)",
        'DE': "Undichtes Paket (Bleichmittel)",
        'AT': "Undichtes Paket (Bleichmittel)",
        'NL': "Lekkend Pakket (Bleekmiddel)"
    },
    "Damaged Detergent Container": {
        'EN': "Damaged Detergent Container",
        'DE': "Beschädigter Waschmittelbehälter",
        'AT': "Beschädigter Waschmittelbehälter",
        'NL': "Beschadigde Wasmiddel Container"
    },
    "Lithium Battery Package Damage": {
        'EN': "Lithium Battery Package Damage",
        'DE': "Lithium-Batterie Paketschaden",
        'AT': "Lithium-Batterie Paketschaden",
        'NL': "Lithium Batterij Pakket Schade"
    },
    "Unknown Substance Spill": {
        'EN': "Unknown Substance Spill",
        'DE': "Unbekannte Substanz verschüttet",
        'AT': "Unbekannte Substanz verschüttet",
        'NL': "Onbekende Stof Morsen"
    },
    "Unmarked Dangerous Goods Package": {
        'EN': "Unmarked Dangerous Goods Package",
        'DE': "Nicht gekennzeichnetes Gefahrgutpaket",
        'AT': "Nicht gekennzeichnetes Gefahrgutpaket",
        'NL': "Ongemarkeerd Gevaarlijke Stoffen Pakket"
    },
    "Household Chemical Leak Trail": {
        'EN': "Household Chemical Leak Trail",
        'DE': "Haushaltschemikalien-Leckspur",
        'AT': "Haushaltschemikalien-Leckspur",
        'NL': "Huishoudchemicaliën Lek Spoor"
    },
    "Battery Thermal Event Risk": {
        'EN': "Battery Thermal Event Risk",
        'DE': "Batterie Thermisches Ereignis Risiko",
        'AT': "Batterie Thermisches Ereignis Risiko",
        'NL': "Batterij Thermische Gebeurtenis Risico"
    },

    // === RED FLAG VIOLATIONS ===
    "Daisy-Chained Extension Cords": {
        'EN': "Daisy-Chained Extension Cords",
        'DE': "Hintereinander geschaltete Verlängerungskabel",
        'AT': "Hintereinander geschaltete Verlängerungskabel",
        'NL': "Doorgeluste Verlengsnoeren"
    },
    "Fire Exit Blocked By Carts": {
        'EN': "Fire Exit Blocked By Carts",
        'DE': "Notausgang durch Wagen blockiert",
        'AT': "Notausgang durch Wagen blockiert",
        'NL': "Branduitgang Geblokkeerd Door Karren"
    },
    "Fire Extinguisher Hidden By Pallets": {
        'EN': "Fire Extinguisher Hidden By Pallets",
        'DE': "Feuerlöscher durch Paletten verdeckt",
        'AT': "Feuerlöscher durch Paletten verdeckt",
        'NL': "Brandblusser Verborgen Door Pallets"
    },
    "Bent Racking Upright Not Offloaded": {
        'EN': "Bent Racking Upright Not Offloaded",
        'DE': "Verbogenes Regalständer nicht entladen",
        'AT': "Verbogenes Regalständer nicht entladen",
        'NL': "Verbogen Stellingstaander Niet Ontladen"
    },
    "Damaged Rack Under Load": {
        'EN': "Damaged Rack Under Load",
        'DE': "Beschädigtes Regal unter Last",
        'AT': "Beschädigtes Regal unter Last",
        'NL': "Beschadigde Stelling Onder Belasting"
    },
    "Emergency Exit Blocked By Cage": {
        'EN': "Emergency Exit Blocked By Cage",
        'DE': "Notausgang durch Käfig blockiert",
        'AT': "Notausgang durch Käfig blockiert",
        'NL': "Nooduitgang Geblokkeerd Door Kooi"
    },
    "First Aid Kit Empty/Expired": {
        'EN': "First Aid Kit Empty/Expired",
        'DE': "Erste-Hilfe-Kasten leer/abgelaufen",
        'AT': "Erste-Hilfe-Kasten leer/abgelaufen",
        'NL': "EHBO-kit Leeg/Verlopen"
    },
    "AED Access Obstructed": {
        'EN': "AED Access Obstructed",
        'DE': "AED-Zugang versperrt",
        'AT': "AED-Zugang versperrt",
        'NL': "AED Toegang Geblokkeerd"
    },
    "LOTO Padlock Missing": {
        'EN': "LOTO Padlock Missing",
        'DE': "LOTO-Vorhängeschloss fehlt",
        'AT': "LOTO-Vorhängeschloss fehlt",
        'NL': "LOTO Hangslot Ontbreekt"
    },

    // === STOW & STORAGE SPECIFIC ===
    "Overstuffed Stow Bag Capacity": {
        'EN': "Overstuffed Stow Bag Capacity",
        'DE': "Überfüllte Stau-Tasche Kapazität",
        'AT': "Überfüllte Stau-Tasche Kapazität",
        'NL': "Overvol Stouw Tas Capaciteit"
    },
    "Heavy Item Stowed Above Shoulder": {
        'EN': "Heavy Item Stowed Above Shoulder",
        'DE': "Schweres Teil über Schulter verstaut",
        'AT': "Schweres Teil über Schulter verstaut",
        'NL': "Zwaar Item Gestouwd Boven Schouder"
    },
    "Bin Weight Limit Exceeded": {
        'EN': "Bin Weight Limit Exceeded",
        'DE': "Behälter-Gewichtslimit überschritten",
        'AT': "Behälter-Gewichtslimit überschritten",
        'NL': "Bak Gewichtslimiet Overschreden"
    },
    "Unstable Rack Section": {
        'EN': "Unstable Rack Section",
        'DE': "Instabiler Regalabschnitt",
        'AT': "Instabiler Regalabschnitt",
        'NL': "Instabiele Stelling Sectie"
    },
    "Top Stock Unstable Stack": {
        'EN': "Top Stock Unstable Stack",
        'DE': "Instabiler Stapel im Oberlager",
        'AT': "Instabiler Stapel im Oberlager",
        'NL': "Bovenste Voorraad Instabiele Stapel"
    },

    // === INBOUND/DOCK HAZARDS ===
    "Trailer Without Wheel Chocks": {
        'EN': "Trailer Without Wheel Chocks",
        'DE': "Anhänger ohne Radkeile",
        'AT': "Anhänger ohne Radkeile",
        'NL': "Trailer Zonder Wielblokken"
    },
    "Dock Plate Not Secured": {
        'EN': "Dock Plate Not Secured",
        'DE': "Ladebrücke nicht gesichert",
        'AT': "Ladebrücke nicht gesichert",
        'NL': "Dock Plaat Niet Beveiligd"
    },
    "Dock Gap Foot Hazard": {
        'EN': "Dock Gap Foot Hazard",
        'DE': "Dock-Spalt Fußgefahr",
        'AT': "Dock-Spalt Fußgefahr",
        'NL': "Dock Opening Voet Gevaar"
    },
    "Trailer Loaded Unevenly": {
        'EN': "Trailer Loaded Unevenly",
        'DE': "Anhänger ungleichmäßig beladen",
        'AT': "Anhänger ungleichmäßig beladen",
        'NL': "Trailer Ongelijk Beladen"
    },
    "Vendor Pallet Leaning Dangerously": {
        'EN': "Vendor Pallet Leaning Dangerously",
        'DE': "Lieferanten-Palette kippt gefährlich",
        'AT': "Lieferanten-Palette kippt gefährlich",
        'NL': "Leverancier Pallet Leunt Gevaarlijk"
    },

    // === COMPLIANCE & DOCUMENTATION ===
    "LOTO Procedure Not Followed": {
        'EN': "LOTO Procedure Not Followed",
        'DE': "LOTO-Verfahren nicht befolgt",
        'AT': "LOTO-Verfahren nicht befolgt",
        'NL': "LOTO Procedure Niet Gevolgd"
    },
    "PPE Checklist Not Completed": {
        'EN': "PPE Checklist Not Completed",
        'DE': "PSA-Checkliste nicht ausgefüllt",
        'AT': "PSA-Checkliste nicht ausgefüllt",
        'NL': "PBM Checklist Niet Ingevuld"
    },
    "Near-Miss Incident Unreported": {
        'EN': "Near-Miss Incident Unreported",
        'DE': "Beinahe-Unfall nicht gemeldet",
        'AT': "Beinahe-Unfall nicht gemeldet",
        'NL': "Bijna-Ongeluk Niet Gemeld"
    },
    "Safety Training Expired": {
        'EN': "Safety Training Expired",
        'DE': "Sicherheitsschulung abgelaufen",
        'AT': "Sicherheitsschulung abgelaufen",
        'NL': "Veiligheidstraining Verlopen"
    },
    "Risk Assessment Overdue": {
        'EN': "Risk Assessment Overdue",
        'DE': "Risikobewertung überfällig",
        'AT': "Risikobewertung überfällig",
        'NL': "Risicobeoordeling Achterstallig"
    },

    // === GERMANY SPECIFIC ===
    "Blocked Fluchtweg (Escape Route)": {
        'EN': "Blocked Escape Route",
        'DE': "Blockierter Fluchtweg",
        'AT': "Blockierter Fluchtweg",
        'NL': "Geblokkeerde Vluchtroute"
    },
    "Missing DGUV V3 Prüfung Sticker": {
        'EN': "Missing DGUV V3 Inspection Sticker",
        'DE': "Fehlende DGUV V3 Prüfplakette",
        'AT': "Fehlende DGUV V3 Prüfplakette",
        'NL': "Ontbrekende DGUV V3 Keuringssticker"
    },
    "Ladungssicherung Violation": {
        'EN': "Load Securing Violation",
        'DE': "Ladungssicherung Verstoß",
        'AT': "Ladungssicherung Verstoß",
        'NL': "Ladingzekering Overtreding"
    },
    "Fehlende Gefährdungsbeurteilung": {
        'EN': "Missing Risk Assessment",
        'DE': "Fehlende Gefährdungsbeurteilung",
        'AT': "Fehlende Gefährdungsbeurteilung",
        'NL': "Ontbrekende Risicobeoordeling"
    },
    "Sicherheitsbeauftragter Absent": {
        'EN': "Safety Officer Absent",
        'DE': "Sicherheitsbeauftragter abwesend",
        'AT': "Sicherheitsbeauftragter abwesend",
        'NL': "Veiligheidsmedewerker Afwezig"
    },
    "No Betriebsanweisung Posted": {
        'EN': "No Operating Instructions Posted",
        'DE': "Keine Betriebsanweisung ausgehängt",
        'AT': "Keine Betriebsanweisung ausgehängt",
        'NL': "Geen Bedieningsinstructies Geplaatst"
    },
    "BetrSichV Machine Safety Violation": {
        'EN': "Machine Safety Violation",
        'DE': "BetrSichV Maschinensicherheits-Verstoß",
        'AT': "BetrSichV Maschinensicherheits-Verstoß",
        'NL': "BetrSichV Machine Veiligheids Overtreding"
    },
    "Missing Erste-Hilfe-Kasten": {
        'EN': "Missing First Aid Kit",
        'DE': "Fehlender Erste-Hilfe-Kasten",
        'AT': "Fehlender Erste-Hilfe-Kasten",
        'NL': "Ontbrekende EHBO-kit"
    },
    "Expired Prüfplakette On Equipment": {
        'EN': "Expired Inspection Sticker On Equipment",
        'DE': "Abgelaufene Prüfplakette am Gerät",
        'AT': "Abgelaufene Prüfplakette am Gerät",
        'NL': "Verlopen Keuringssticker Op Apparatuur"
    },
    "Feuerlöscher Blocked Access": {
        'EN': "Fire Extinguisher Blocked Access",
        'DE': "Feuerlöscher Zugang blockiert",
        'AT': "Feuerlöscher Zugang blockiert",
        'NL': "Brandblusser Toegang Geblokkeerd"
    },

    // === AUSTRIA SPECIFIC ===
    "Unchecked PSA (PPE)": {
        'EN': "Unchecked PPE",
        'DE': "Nicht geprüfte PSA",
        'AT': "Ned überprüfte PSA",
        'NL': "Ongecontroleerde PBM"
    },
    "Missing Evaluierung (Risk Assessment)": {
        'EN': "Missing Risk Evaluation",
        'DE': "Fehlende Evaluierung",
        'AT': "Fehlende Evaluierung",
        'NL': "Ontbrekende Risico-evaluatie"
    },
    "SVP Not Informed": {
        'EN': "Safety Rep Not Informed",
        'DE': "SVP nicht informiert",
        'AT': "SVP ned informiert",
        'NL': "SVP Niet Geïnformeerd"
    },
    "Arbeitsinspektorat Warning Ignored": {
        'EN': "Labor Inspectorate Warning Ignored",
        'DE': "Arbeitsinspektorat-Warnung ignoriert",
        'AT': "Arbeitsinspektorat-Warnung ignoriert",
        'NL': "Arbeidsinspectie Waarschuwing Genegeerd"
    },
    "Fehlende Arbeitsplatzevaluierung": {
        'EN': "Missing Workplace Evaluation",
        'DE': "Fehlende Arbeitsplatzevaluierung",
        'AT': "Fehlende Arbeitsplatzevaluierung",
        'NL': "Ontbrekende Werkplek Evaluatie"
    },
    "AUVA Checklist Incomplete": {
        'EN': "AUVA Checklist Incomplete",
        'DE': "AUVA-Checkliste unvollständig",
        'AT': "AUVA-Checkliste unvollständig",
        'NL': "AUVA Checklist Onvolledig"
    },
    "Sicherheitsfachkraft Missing": {
        'EN': "Safety Specialist Missing",
        'DE': "Sicherheitsfachkraft fehlt",
        'AT': "Sicherheitsfachkraft fehlt",
        'NL': "Veiligheidsspecialist Ontbreekt"
    },
    "Missing Brandschutzbeauftragter": {
        'EN': "Missing Fire Safety Officer",
        'DE': "Fehlender Brandschutzbeauftragter",
        'AT': "Fehlender Brandschutzbeauftragter",
        'NL': "Ontbrekende Brandveiligheidsmedewerker"
    },
    "Arbeitsmittelverordnung Violation": {
        'EN': "Work Equipment Ordinance Violation",
        'DE': "Arbeitsmittelverordnung Verstoß",
        'AT': "Arbeitsmittelverordnung Verstoß",
        'NL': "Arbeidsmiddelen Verordening Overtreding"
    },
    "Notausgang Sign Obscured": {
        'EN': "Emergency Exit Sign Obscured",
        'DE': "Notausgang-Schild verdeckt",
        'AT': "Notausgang-Schild verdeckt",
        'NL': "Nooduitgang Bord Verduisterd"
    },

    // === NETHERLANDS SPECIFIC ===
    "Missing RI&E Assessment": {
        'EN': "Missing RI&E Assessment",
        'DE': "Fehlende RI&E-Bewertung",
        'AT': "Fehlende RI&E-Bewertung",
        'NL': "Ontbrekende RI&E Beoordeling"
    },
    "Blocked Nooduitgang": {
        'EN': "Blocked Emergency Exit",
        'DE': "Blockierter Notausgang",
        'AT': "Blockierter Notausgang",
        'NL': "Geblokkeerde Nooduitgang"
    },
    "Preventiemedewerker Absent": {
        'EN': "Prevention Officer Absent",
        'DE': "Präventionsbeauftragter abwesend",
        'AT': "Präventionsbeauftragter abwesend",
        'NL': "Preventiemedewerker Afwezig"
    },
    "Preventiemedewerker Not Trained": {
        'EN': "Prevention Officer Not Trained",
        'DE': "Präventionsbeauftragter nicht ausgebildet",
        'AT': "Präventionsbeauftragter nicht ausgebildet",
        'NL': "Preventiemedewerker Niet Getraind"
    },
    "Arbocatalogus Not Followed": {
        'EN': "Arbo Catalog Not Followed",
        'DE': "Arbocatalogus nicht befolgt",
        'AT': "Arbocatalogus nicht befolgt",
        'NL': "Arbocatalogus Niet Gevolgd"
    },
    "Arbodeskundige Report Overdue": {
        'EN': "Arbo Expert Report Overdue",
        'DE': "Arbodeskundige Bericht überfällig",
        'AT': "Arbodeskundige Bericht überfällig",
        'NL': "Arbodeskundige Rapport Achterstallig"
    },
    "BHV Team Understaffed": {
        'EN': "Emergency Response Team Understaffed",
        'DE': "BHV-Team unterbesetzt",
        'AT': "BHV-Team unterbesetzt",
        'NL': "BHV Team Onderbezet"
    },
    "Missing Plan van Aanpak": {
        'EN': "Missing Action Plan",
        'DE': "Fehlender Maßnahmenplan",
        'AT': "Fehlender Maßnahmenplan",
        'NL': "Ontbrekend Plan van Aanpak"
    },
    "Werkplekinspectie Skipped": {
        'EN': "Workplace Inspection Skipped",
        'DE': "Arbeitsplatzinspektion übersprungen",
        'AT': "Arbeitsplatzinspektion übersprungen",
        'NL': "Werkplekinspectie Overgeslagen"
    },
    "Veiligheidskundige Advice Ignored": {
        'EN': "Safety Expert Advice Ignored",
        'DE': "Sicherheitsexperten-Rat ignoriert",
        'AT': "Sicherheitsexperten-Rat ignoriert",
        'NL': "Veiligheidskundige Advies Genegeerd"
    }
};

// ============================================================================
// WAREHOUSE EVENTS - Localized warning text
// ============================================================================

const EVENT_TEXT = {
    'ENERGY_CUTOFF': {
        'warning': {
            'EN': 'ENERGY CUTOFF!',
            'DE': 'STROMAUSFALL!',
            'AT': 'STROMAUSFALL!',
            'NL': 'STROOMUITVAL!'
        },
        'subtitle': {
            'EN': 'Flashlight mode activated',
            'DE': 'Taschenlampenmodus aktiviert',
            'AT': 'Taschenlampenmodus aktiviert',
            'NL': 'Zaklamp modus geactiveerd'
        }
    },
    'FIRE_DRILL': {
        'warning': {
            'EN': 'FIRE DRILL!',
            'DE': 'FEUERALARM!',
            'AT': 'FEUERALARM!',
            'NL': 'BRANDOEFENING!'
        },
        'subtitle': {
            'EN': 'Find the fire exit!',
            'DE': 'Finde den Notausgang!',
            'AT': 'Find den Notausgang!',
            'NL': 'Vind de nooduitgang!'
        }
    },
    'OPS_SURGE': {
        'warning': {
            'EN': 'OPS SURGE!',
            'DE': 'OPS-ANSTURM!',
            'AT': 'OPS-ANSTURM!',
            'NL': 'OPS GOLF!'
        },
        'subtitle': {
            'EN': 'Extra managers incoming!',
            'DE': 'Zusätzliche Manager kommen!',
            'AT': 'Zusätzliche Manager kumman!',
            'NL': 'Extra managers onderweg!'
        }
    }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get localized text for a key
 * @param {string} key - The localization key
 * @returns {string} - Localized text or key if not found
 */
function getLocalizedText(key) {
    const region = (typeof GAME !== 'undefined' && GAME.region) ? GAME.region : 'MEU';
    const langMap = { 'DE': 'DE', 'AT': 'AT', 'NL': 'NL', 'MEU': 'EN' };
    const lang = langMap[region] || 'EN';
    return (LOCALIZATION[key] && LOCALIZATION[key][lang]) ||
           (LOCALIZATION[key] && LOCALIZATION[key]['EN']) || key;
}

/**
 * Get localized hazard name
 * @param {string} hazardName - Original hazard name
 * @returns {string} - Localized hazard name
 */
function getLocalizedHazardName(hazardName) {
    const region = (typeof GAME !== 'undefined' && GAME.region) ? GAME.region : 'MEU';
    const langMap = { 'DE': 'DE', 'AT': 'AT', 'NL': 'NL', 'MEU': 'EN' };
    const lang = langMap[region] || 'EN';
    if (HAZARD_NAMES[hazardName] && HAZARD_NAMES[hazardName][lang]) {
        return HAZARD_NAMES[hazardName][lang];
    }
    return hazardName; // Return original if not found
}

/**
 * Get localized warehouse event text
 * @param {object} eventType - Event type object with id
 * @param {string} textType - 'warning' or 'subtitle'
 * @returns {string} - Localized event text
 */
function getLocalizedEventText(eventType, textType) {
    const region = (typeof GAME !== 'undefined' && GAME.region) ? GAME.region : 'MEU';
    const langMap = { 'DE': 'DE', 'AT': 'AT', 'NL': 'NL', 'MEU': 'EN' };
    const lang = langMap[region] || 'EN';
    const eventId = eventType.id || eventType.name || 'UNKNOWN';
    if (EVENT_TEXT[eventId] && EVENT_TEXT[eventId][textType]) {
        return EVENT_TEXT[eventId][textType][lang] || EVENT_TEXT[eventId][textType]['EN'];
    }
    return textType === 'warning' ? 'EVENT!' : '';
}

// Backward compatibility
function getShopMessage(key) {
    return getLocalizedText(key);
}

// Export for use in main game file
if (typeof window !== 'undefined') {
    window.LOCALIZATION = LOCALIZATION;
    window.HAZARD_NAMES = HAZARD_NAMES;
    window.EVENT_TEXT = EVENT_TEXT;
    window.getLocalizedText = getLocalizedText;
    window.getLocalizedHazardName = getLocalizedHazardName;
    window.getLocalizedEventText = getLocalizedEventText;
    window.getShopMessage = getShopMessage;
}
