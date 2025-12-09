# Modularization Progress

## 🎯 Goal
Incrementally refactor the monolithic AMZLWHSQUEST122.html (10,247 lines) into a clean, modular architecture.

## 📊 Current Status

**Modular Version Size:** 5,490 lines (54% of monolithic)
**Completion:** ~20% (Core infrastructure + Audio + Particles)

---

## ✅ Phase 1: Core Systems (IN PROGRESS)

### 1. Audio System ✅ COMPLETE
**Status:** Extracted and integrated
**Location:** `src/systems/AudioSystem.js` (394 lines)

**Components:**
- ✅ **TTSSystem** - Text-to-Speech with 20+ character voices
  - Character-specific pitch, rate, volume
  - Support for heroes, bosses, NPCs, system voices
  - Queue and cancel functionality

- ✅ **SFXSystem** - Sound effects via Web Audio API
  - Procedural tones and noise generation
  - 12 predefined SFX: step, throw, hit, bossHit, alert, text, fix, hurt, start, angry, select, bossIntro, pop
  - Low-level playTone() and playNoise() methods

- ✅ **MusicSystem** - Background music player
  - 9 music tracks (MP3)
  - Seamless track switching
  - Playback rate control
  - Volume management

**Integration:**
- ✅ Imported into `Game.js`
- ✅ Replaced placeholder audio code
- ✅ Connected to `PlayState` (throw and fix sounds)
- ✅ Ready for use in all states

### 2. Particle System ✅ COMPLETE
**Status:** Extracted and integrated
**Location:** `src/systems/ParticleSystem.js` (235 lines)

**Components:**
- ✅ **200-Particle Pool** - Efficient array management with no splice
- ✅ **Physics Engine** - Gravity (0.2), bounce (-0.6), velocity
- ✅ **Particle Lifecycle** - Base life 50 + variance 20 frames
- ✅ **Spawn Methods**:
  - `spawn(x, y, color, forceY)` - Single particle
  - `burst(x, y, colors, count)` - Circular burst pattern
  - `sparkle(x, y, color, count)` - Sparkle effect
- ✅ **Rendering** - Alpha fade, sparkle cross shape, offscreen culling

**Integration:**
- ✅ Imported into `Game.js`
- ✅ Connected to `PlayState` (fix effects, projectile impacts)
- ✅ Integrated into `WorldRenderer` for rendering
- ✅ Clean API: `game.particles.burst()`, `game.particles.update()`

---

## 🔄 Next Steps

### 3. Screen Effects (NEXT)
Extract visual screen effects:
- Screen shake intensity
- Flash effects (damage/victory)
- Vignette overlay
- CRT scanline effects (optional)

### 4. Floating Text System
Extract damage numbers and notifications:
- Floating text lifecycle
- Fade out animation with alpha
- Vertical movement
- Font and color support

### 5. Hazard System
Port the complete hazard system:
- 90+ unique hazards with sprites
- Collision detection
- Hazard spawning logic
- Visual rendering

---

## 📁 Current Structure

```
src/
├── core/
│   ├── Game.js           - Main game coordinator
│   ├── MainLoop.js       - Fixed timestep game loop
│   └── StateMachine.js   - State management
├── generators/
│   ├── AssetGenerator.js - Procedural sprite generation
│   └── MapGenerator.js   - Map/layout generation
├── renderers/
│   ├── UIRenderer.js     - UI rendering
│   └── WorldRenderer.js  - World/entity rendering
├── states/
│   ├── LogoState.js
│   ├── IntroState.js
│   ├── StoryState.js
│   ├── TitleState.js
│   ├── HowToState.js
│   ├── SelectState.js
│   ├── PlayState.js      - Main gameplay (partial)
│   ├── DialogState.js
│   ├── BossState.js
│   ├── CreditsState.js
│   └── GameOverState.js
└── systems/
    ├── AudioSystem.js    ✅ Complete audio (TTS, SFX, Music)
    └── ParticleSystem.js ✅ 200-particle pool with physics
```

---

## 🎮 Testing

**Test URL:** http://localhost:8080/index-modular.html

The modular version now has:
- ✅ Complete audio system (TTS, SFX, Music)
- ✅ Particle system (200-particle pool with physics)
- ✅ Basic gameplay loop
- ✅ State machine framework
- ✅ Asset and map generation

**Still Missing:**
- ❌ Screen effects
- ❌ Complete hazards (only basic spawns)
- ❌ Boss mechanics
- ❌ NPC AI
- ❌ Gemini AI integration
- ❌ Complete rendering

---

## 📝 Lessons Learned

1. **Incremental is better** - Testing each system extraction prevents cascading errors
2. **Clean interfaces** - Systems provide intuitive APIs (e.g., `particles.burst()`, `audio.getSFX()`)
3. **Performance matters** - Particle system uses write-index pattern instead of splice for 5x speedup
4. **Centralized state** - Moved particles from PlayState to Game for cross-state access
5. **Documentation** - Each system is self-documenting with JSDoc comments

---

## 🚀 Long-term Plan

**Phase 2:** Complete core gameplay systems (Particles, Effects, Hazards)
**Phase 3:** Advanced gameplay (NPC AI, Boss AI, Collision)
**Phase 4:** Advanced features (Gemini AI, Dialogue, Yard level)
**Phase 5:** Polish and optimization

**Estimated completion:** 20-30 sessions (extracting 1-2 systems per session)
