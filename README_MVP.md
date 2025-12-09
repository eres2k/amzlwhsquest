# AMZL WHS Quest - MVP Refactored Version

## 🎮 Quick Start

Open `index-refactored.html` in a modern web browser (Chrome, Firefox, Edge).

**Controls:**
- **WASD / Arrow Keys**: Move
- **SPACE**: Attack / Interact with hazards

## ✅ MVP Features

This MVP demonstrates the modular architecture with:

### Playable Core
- ✅ Player movement with collision detection
- ✅ 5 warehouse hazards to fix
- ✅ Boss encounter after fixing all hazards
- ✅ Projectile combat system
- ✅ Particle effects
- ✅ Camera follow system
- ✅ Lives/health system
- ✅ HUD display
- ✅ Background music

### Technical Features
- ✅ 27 ES6 modules
- ✅ Object pooling for performance
- ✅ Modular systems (Audio, Input, Collision, Particles, Camera)
- ✅ Entity class architecture (Player, Boss, Entity, Projectile)
- ✅ Procedural asset generation (simplified)
- ✅ Map generation system

## 🎨 Visual Style

**Note**: This MVP uses **simplified placeholder graphics** (colored shapes) to test the architecture. The original game has detailed pixel art sprites.

- Characters: Colored rectangles with simple faces
- Bosses: Larger rectangles with angry eyes
- Projectiles: Colored circles
- Hazards: Colored squares with warning icons

## 🎯 Gameplay Flow

1. **Start**: Game loads at spawn point
2. **Objective**: Fix 5 warehouse hazards
   - Move near hazard and press SPACE to fix
   - Green particles = success!
3. **Boss Fight**: After fixing 5 hazards, boss spawns
   - Press SPACE to shoot projectiles
   - Dodge incoming boss attacks (red circles)
   - Defeat boss to win!
4. **Game Over**: Lose all 5 lives = defeat
5. **Victory**: Defeat boss = win!

## 📦 Architecture

```
src/
├── main.js                    # Entry point & game loop
├── constants.js               # Game constants
├── core/
│   ├── Game.js                # Game state container
│   └── ObjectPool.js          # Performance optimization
├── data/
│   ├── characters.js          # 5 characters
│   ├── bosses.js              # 6 boss types
│   ├── hazards.js             # 100+ hazards
│   ├── banter.js              # Dialogue
│   └── aiDialogue.js          # AI fallbacks
├── entities/
│   ├── Player.js              # Player entity
│   ├── Boss.js                # Boss entity
│   ├── Entity.js              # NPCs
│   └── Projectile.js          # Bullets
├── systems/
│   ├── AudioSystem.js         # Sound & music
│   ├── InputSystem.js         # Keyboard
│   ├── CollisionSystem.js     # Collision
│   ├── ParticleSystem.js      # Effects
│   ├── CameraSystem.js        # Camera
│   └── ... (TTS, AI, etc.)
├── rendering/
│   ├── AssetGenerator.js      # Sprite generation
│   ├── Renderer.js            # Game renderer
│   └── UIRenderer.js          # HUD renderer
└── utils/
    ├── helpers.js             # Utilities
    └── mapGenerator.js        # Map generation
```

## 🔧 Known Limitations (MVP)

### Graphics
- Simplified placeholder sprites (not final pixel art)
- No detailed character animations
- Basic environmental tiles

### Features Not Yet Implemented
- Title screen / menus
- Character selection screen
- Multiple game states (only PLAY and BOSS work)
- Full AI dialogue integration
- TTS voice acting
- All 6 bosses (only random selection works)
- Yard/castle level
- Credits sequence
- Save/load system

## 🚀 Next Steps (Phase 3B)

To enhance this MVP:

1. **Extract real sprites** from original (2000+ lines)
2. **Add menu states** (LOGO, TITLE, SELECT)
3. **Implement all boss patterns** (sweep, tracking, burst, orbital, etc.)
4. **Add NPC entities** (runners, ops managers, Simon)
5. **Integrate AI dialogue** (Gemini API)
6. **Add TTS voices** (Browser + Gemini TTS)
7. **Implement full state machine**
8. **Add yard/castle level**
9. **Polish UI and animations**

## 🎮 Character Abilities

- **Carrie**: 2x damage to bosses (PRECISION FOCUS)
- **Nevena**: Longer invincibility frames (FORESIGHT)
- **Joao**: Faster attack cooldown (CAFFEINE RUSH)
- **Roman**: Smaller collision radius (PHANTOM STEP)
- **Erwin**: 30% faster speed, 1 life (TESLA RUSH)

## 🐛 Troubleshooting

**Game doesn't load?**
- Open browser console (F12) and check for errors
- Make sure you're running from a web server (not `file://`)
- Check that all `.js` files are in `src/` folder

**Music doesn't play?**
- Browser may block autoplay
- Click on the page to enable audio

**Performance issues?**
- This is optimized with object pooling
- Should run at 60fps on modern hardware

## 📝 Development Notes

- Original file: `AMZLWHSQUEST122.html` (10,247 lines)
- Refactored: 27 modular files
- Architecture pattern: Entity-Component-System inspired
- No external dependencies (vanilla JavaScript)

## 🔗 Comparison

| Aspect | Original | MVP Refactored |
|--------|----------|----------------|
| Files | 1 monolithic | 27 modular |
| Lines of code | 10,247 | ~6,000 (organized) |
| Graphics | Detailed pixel art | Placeholder shapes |
| Features | 100% complete | ~40% (playable core) |
| Maintainability | Low | High |
| Extensibility | Difficult | Easy |
| Performance | Good | Optimized |

---

**Version**: MVP 1.0 (Plan 3)
**Date**: December 2024
**Status**: Playable core implemented, enhancement ongoing
