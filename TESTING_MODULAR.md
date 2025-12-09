# Testing Guide - Modular Version

## 🧪 Testing the Modular Version (Phase 1 Complete)

**Test URL:** http://localhost:8080/index-modular.html

---

## ✅ What to Test

### 1. **Game Initialization**
- [ ] Page loads without errors
- [ ] Console shows: `[Main] Game initialized successfully`
- [ ] Console shows: `[Audio] Audio system initialized`
- [ ] Console shows: `[ParticleSystem] Initialized with max 200 particles`
- [ ] Canvas displays game graphics (not blank)

### 2. **Audio System**
**Music:**
- [ ] Title/Logo music plays automatically
- [ ] Music transitions when changing states
- [ ] Music loops correctly

**Sound Effects:**
- [ ] Throw sound plays when pressing SPACE (in gameplay)
- [ ] Fix sound plays when fixing a hazard
- [ ] No audio errors in console

**Text-to-Speech:**
- [ ] TTS voice loads (check console for voice name)
- [ ] TTS system is ready (no errors)

### 3. **Particle System**
**Visual Effects:**
- [ ] Green particle burst when fixing a hazard (press SPACE near red hazard)
- [ ] White particle burst when projectile hits a wall
- [ ] Particles have physics (fall with gravity, bounce)
- [ ] Particles fade out over time
- [ ] Maximum 200 particles enforced

**Performance:**
- [ ] No frame drops with many particles
- [ ] Offscreen particles are culled
- [ ] Console shows no particle errors

### 4. **Gameplay**
- [ ] Player character spawns and is visible
- [ ] WASD/Arrow keys move the player
- [ ] SPACE throws projectiles
- [ ] Collision detection works (can't walk through walls)
- [ ] Hazards are visible on the map (red with "!")
- [ ] Can fix hazards by pressing SPACE near them

### 5. **State Transitions**
- [ ] Logo state → Intro state (automatic or on keypress)
- [ ] Can navigate through menu states
- [ ] Particles clear when exiting PlayState

---

## 🎮 Testing Commands

### Browser Console Tests

After loading the page, open browser console (F12) and try:

```javascript
// Check if game is initialized
window.game

// Check audio system
window.game.audio.getMusic().play('ingame')
window.game.audio.getSFX().fix()
window.game.audio.getTTS().speak("Testing voice", "Carrie")

// Check particle system
window.game.particles.getCount()  // Current particles
window.game.particles.getMaxParticles()  // Should be 200
window.game.particles.burst(128, 112, ['#ff0000', '#00ff00', '#0000ff'], 20)
window.game.particles.sparkle(128, 112, '#ffd700', 8)
window.game.particles.clear()  // Clear all particles

// Check current state
window.game.getState()

// Force state change (for testing)
window.game.changeState('PLAY', { character: 'Carrie' })
```

---

## 🐛 Known Issues / Expected Behavior

### Currently Working:
✅ Audio system (Music, SFX, TTS)
✅ Particle system with physics
✅ Basic gameplay loop
✅ Player movement and projectiles
✅ Hazard detection and fixing
✅ Sound effects on actions

### Not Yet Implemented:
❌ Screen shake/flash effects
❌ Most game states (only basic versions)
❌ Complete NPC AI
❌ Boss battles
❌ Dialog system with Gemini AI
❌ Complete hazard sprites (90+ types)
❌ Yard level (Frogger-style)

---

## 📊 Performance Checks

### Console Logging
You should see these in order:
```
[Main] DOM loaded, initializing game...
[Game] Game instance created
[Game] Initializing game systems...
[Game] Generating assets...
[Audio] Audio context initialized
[TTS] Voice loaded: <voice name>
[ParticleSystem] Initialized with max 200 particles
[Game] Audio system initialized
[Game] Particle system initialized
[Game] Input handlers registered
[Game] Initialization complete
[Main] Game initialized successfully
[MainLoop] Started
[Main] Game started
[LogoState] Entering logo state
```

### No Errors Expected
The console should be **ERROR-FREE**. Any red errors indicate a problem.

### Frame Rate
- Game should run at 60 FPS
- Check console for `[MainLoop]` messages
- No stuttering or lag with particles

---

## 🧩 Test Scenarios

### Scenario 1: Particle Burst Test
1. Start the game and get to PlayState
2. Find a red hazard (exclamation mark)
3. Walk up to it and press SPACE
4. **Expected:** Green particle burst, "FIXED!" text, fix sound plays

### Scenario 2: Projectile Test
1. Start gameplay
2. Press SPACE to throw projectiles
3. Aim at a wall
4. **Expected:** White particle burst on impact, throw sound plays

### Scenario 3: Audio Test
1. Load the game
2. Listen for music
3. Get to gameplay
4. Throw projectiles and fix hazards
5. **Expected:** Music plays, SFX plays on actions

### Scenario 4: Particle Limits
1. Open console
2. Spam particles: `for(let i=0; i<300; i++) window.game.particles.spawn(100+i, 100, '#ff0000')`
3. Check count: `window.game.particles.getCount()`
4. **Expected:** Maximum 200 particles (enforced limit)

---

## 🔍 Debug Mode

Press **F3** to toggle debug mode (if implemented)

---

## 📝 Reporting Issues

If you encounter issues, please note:
1. Console error messages (exact text)
2. What you were doing when it happened
3. Browser and version
4. Screenshot if applicable

---

## ✅ Success Criteria

**Phase 1 is successful if:**
- ✅ Game loads without errors
- ✅ Audio plays (music + SFX)
- ✅ Particles spawn and animate correctly
- ✅ No console errors
- ✅ Frame rate is smooth (60 FPS)
- ✅ Player can move and interact

---

## 🚀 Next Testing Phase

After Phase 2 (Screen Effects + Floating Text):
- Test screen shake on damage
- Test flash effects
- Test vignette overlay
- Test floating text with proper fade

