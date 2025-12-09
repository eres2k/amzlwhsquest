# Phase 2: Completing the Refactoring

## ✅ Phase 1 Complete!

Successfully refactored **22 ES6 modules** from the original 10,247-line monolithic file:
- **2,388 lines of code** organized into modular architecture
- Committed and pushed to branch: `claude/refactor-game-architecture-01QBd2PbnE1S6kL7u7PNbdSu`
- Original file preserved as `AMZLWHSQUEST122.html`

---

## 🚧 Remaining Work for Phase 2

### 1. Asset Generator (CRITICAL - Large Task)
**File**: `src/rendering/AssetGenerator.js`
**Size**: ~2000+ lines
**Complexity**: High

The asset generator creates all procedural sprites for the game using Canvas 2D API.

**Sections to extract (from AMZLWHSQUEST122.html lines 1386-3567)**:
- Logo sprite
- Character sprites (Carrie, Nevena, Joao, Roman, Erwin) - 16x16 with detail
- Boss sprites (6 bosses + special bosses)
- Attack projectile sprites
- Hazard sprites (forklift, conveyor, spill, etc.)
- Environmental sprites (pallets, boxes, signs)
- UI elements

**Structure**:
```javascript
export class AssetGenerator {
    constructor() {
        this.assets = {};
    }

    generateAll() {
        this.generateLogo();
        this.generateCharacters();
        this.generateBosses();
        this.generateAttacks();
        this.generateHazards();
        this.generateEnvironment();
        this.generateUI();
        return this.assets;
    }

    // Helper for creating canvases
    createCanvas(w, h, drawFn) {
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        drawFn(ctx);
        return canvas;
    }

    generateLogo() { /* ... */ }
    generateCharacters() { /* ... */ }
    // ... etc
}
```

---

### 2. Map Generator
**File**: `src/utils/mapGenerator.js`
**Size**: ~500 lines
**Complexity**: Medium

Extract map generation logic (lines 3940-4052 approx).

**Structure**:
```javascript
import { GAME_CONSTANTS } from '../constants.js';
import { pickRandomHazards } from '../data/hazards.js';

export class MapGenerator {
    constructor(collisionSystem) {
        this.collisionSystem = collisionSystem;
    }

    generate() {
        const map = this.createEmptyMap();
        this.addWalls(map);
        this.addColumns(map);
        this.addClutter(map);
        this.addConveyors(map);
        const hazards = this.placeHazards(map);
        const door = this.placeDoor(map);

        return {
            map,
            clutter: [],
            hazards,
            door,
            conveyorBelts: [],
            packages: []
        };
    }

    createEmptyMap() { /* ... */ }
    addWalls(map) { /* ... */ }
    // ... etc
}
```

---

### 3. State Machine
**File**: `src/core/GameStateManager.js`
**Size**: ~300 lines
**Complexity**: Medium

Manages state transitions and delegates update/draw to state classes.

**Structure**:
```javascript
export class GameStateManager {
    constructor(game, states) {
        this.game = game;
        this.states = states; // Map of state name -> state instance
        this.currentState = null;
    }

    changeState(stateName) {
        if (this.currentState && this.currentState.exit) {
            this.currentState.exit();
        }

        this.game.state = stateName;
        this.currentState = this.states[stateName];

        if (this.currentState && this.currentState.enter) {
            this.currentState.enter();
        }
    }

    update(deltaTime) {
        if (this.currentState && this.currentState.update) {
            this.currentState.update(deltaTime);
        }
    }

    draw(ctx) {
        if (this.currentState && this.currentState.draw) {
            this.currentState.draw(ctx);
        }
    }
}
```

---

### 4. Game State Classes
**Files**: `src/states/*.js` (7 files)
**Size**: ~1500 lines total
**Complexity**: Medium-High

Create individual state classes:

- **LogoState.js**: Logo fade-in (lines ~4883-4900)
- **TitleState.js**: Title screen with TTS mode toggle (lines ~4901-4940)
- **SelectState.js**: Character selection (lines ~4941-4970)
- **PlayState.js**: Main gameplay loop (lines ~4971-5700)
- **BossState.js**: Boss battles (lines ~5701-5900)
- **YardState.js**: Yard/castle level (lines ~6000-6400)
- **CreditsState.js**: End credits (lines ~9131-9300)

**Base Structure**:
```javascript
export class PlayState {
    constructor(game, systems) {
        this.game = game;
        this.systems = systems;
    }

    enter() {
        // Initialize state
    }

    update(deltaTime) {
        // Update logic
    }

    draw(ctx) {
        // Render logic
    }

    exit() {
        // Cleanup
    }
}
```

---

### 5. Rendering Systems
**Files**: `src/rendering/Renderer.js`, `src/rendering/UIRenderer.js`
**Size**: ~1000 lines total
**Complexity**: Medium

**Renderer.js** - Main game rendering:
- Draw map tiles
- Draw entities
- Draw player
- Draw boss
- Draw projectiles
- Draw particles
- Apply camera offset
- Apply screen shake

**UIRenderer.js** - UI/HUD rendering:
- Dialog box
- Boss health bar
- Player HUD (lives, score)
- Floating text
- TTS loading indicator

---

### 6. Main Game Loop
**File**: `src/main.js`
**Size**: ~200 lines
**Complexity**: Medium

Wire everything together:

```javascript
import { Game } from './core/Game.js';
import { GameStateManager } from './core/GameStateManager.js';
import { AssetGenerator } from './rendering/AssetGenerator.js';
import { AudioSystem, MusicSystem } from './systems/AudioSystem.js';
// ... all imports

class GameEngine {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        // Initialize all systems
        this.game = new Game();
        this.audioSystem = new AudioSystem();
        this.musicSystem = new MusicSystem();
        // ... etc

        // Generate assets
        const assetGen = new AssetGenerator();
        this.assets = assetGen.generateAll();

        // Initialize state machine
        this.stateManager = new GameStateManager(this.game, {
            'LOGO': new LogoState(this.game, this.systems),
            'TITLE': new TitleState(this.game, this.systems),
            // ... etc
        });
    }

    init() {
        this.audioSystem.init();
        this.musicSystem.init();
        this.inputSystem.init(this.handleAction.bind(this));
        this.stateManager.changeState('LOGO');
        this.loop();
    }

    loop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.loop());
    }

    update() {
        this.stateManager.update(1/60);
    }

    draw() {
        this.stateManager.draw(this.ctx);
    }
}

// Start game
const engine = new GameEngine();
engine.init();
```

---

### 7. HTML/CSS Extraction
**Files**: `index-refactored.html`, `styles/game.css`
**Size**: ~500 lines total
**Complexity**: Low

**index-refactored.html**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AMZL WHS Coordinator Quest</title>
    <link rel="stylesheet" href="styles/game.css">
</head>
<body>
    <div id="game-wrapper">
        <canvas id="gameCanvas" width="256" height="224"></canvas>
        <div id="crt-overlay"></div>
        <div id="vignette"></div>
        <div id="ui-overlay">
            <!-- HUD elements -->
        </div>
    </div>
    <script type="module" src="src/main.js"></script>
</body>
</html>
```

**styles/game.css**: Extract all CSS from lines 7-221 of original file.

---

## 📋 Development Workflow

### Step-by-Step Completion

1. **Extract Asset Generator** (Largest task)
   - Copy sprite generation code from original file
   - Organize into methods by category
   - Test each sprite renders correctly

2. **Create Map Generator**
   - Extract map generation logic
   - Test map collision and layout

3. **Build State Machine**
   - Create GameStateManager
   - Create placeholder state classes

4. **Implement State Classes**
   - Start with LogoState (simplest)
   - Then TitleState, SelectState
   - PlayState (most complex)
   - BossState, YardState, CreditsState

5. **Create Renderers**
   - Renderer.js for game world
   - UIRenderer.js for HUD/dialogs

6. **Wire in Main Loop**
   - Initialize all systems
   - Connect state machine
   - Start game loop

7. **Extract HTML/CSS**
   - Create new HTML with module imports
   - Extract CSS to separate file

8. **Test Everything**
   - Compare against original side-by-side
   - Check all 5 characters work
   - Test all boss encounters
   - Verify audio/music/TTS
   - Validate AI integration

---

## 🔍 Testing Checklist

- [ ] Game loads without console errors
- [ ] Logo animates correctly
- [ ] Title screen displays with music
- [ ] TTS mode toggle works (classic/Gemini)
- [ ] All 5 characters selectable
- [ ] Character sprites render correctly
- [ ] Movement and collision work
- [ ] Projectile firing and hit detection
- [ ] Hazards spawn and are clearable
- [ ] Boss encounters trigger
- [ ] Boss health bar displays
- [ ] Boss attacks fire correctly
- [ ] Particle effects display
- [ ] Floating text appears
- [ ] Sound effects play
- [ ] Background music plays and loops
- [ ] TTS dialogue plays
- [ ] AI dialogue generates
- [ ] Game over sequence works
- [ ] Victory sequence works
- [ ] Credits roll
- [ ] Visual fidelity matches original
- [ ] Performance is 60fps

---

## 🎯 Priority Order

1. **Asset Generator** (blocks everything)
2. **Map Generator** (needed for gameplay)
3. **Renderers** (needed to see anything)
4. **State Machine + PlayState** (core gameplay)
5. **Main Loop** (wire it all together)
6. **Other States** (menus, etc.)
7. **HTML/CSS** (presentation)
8. **Testing** (validation)

---

## 📦 Estimated Effort

- **Asset Generator**: 4-6 hours (large, tedious but straightforward)
- **Map Generator**: 1-2 hours
- **State Machine**: 1 hour
- **State Classes**: 3-4 hours
- **Renderers**: 2-3 hours
- **Main Loop**: 2-3 hours
- **HTML/CSS**: 1 hour
- **Testing/Debugging**: 4-6 hours

**Total**: ~18-25 hours for a complete, working refactored game

---

## 💡 Tips

1. **Copy, don't retype**: Extract code directly from original file
2. **Test incrementally**: Get each module working before moving on
3. **Use original as reference**: Run both versions side-by-side
4. **Focus on MVP first**: Get basic gameplay working, then add features
5. **Commit frequently**: Save progress after each major component

---

## 🔗 Useful Line Numbers from Original

- **Asset generation**: 1386-3567 (~2200 lines)
- **Game state object**: 3568-3620
- **Map generation**: 3940-4052
- **Update loop**: 4883-9300
- **Draw functions**: 9301-10242
- **Input handling**: 3784-3887

---

## 🎮 Final Result

When complete, you'll have:
- **40+ modular files** instead of 1 monolithic file
- **Professional architecture** with separation of concerns
- **Maintainable codebase** easy to extend
- **Testable components** for quality assurance
- **Same gameplay experience** with 1:1 fidelity
- **Better performance** through optimizations
- **Scalable foundation** for future features

Good luck with Phase 2! 🚀
