# Testing the Modular Version

## ✅ Quick Test Checklist

### 1. **Open the Game**
```
Navigate to: LandingPage.html
Click: "▶ START SHIFT (NEW MODULAR)"
```

### 2. **Check Browser Console** (F12)
Expected console output:
```
[Main] DOM loaded, initializing game...
[Game] Game instance created
[Game] Initializing game systems...
[Game] Generating assets...
[Game] Initialization complete
[Main] Game initialized successfully
[Main] Game started
[StateMachine] State "LOGO" not found  ← This might appear if there's an issue
```

### 3. **What You Should See**

**Immediately:**
- Black screen with game wrapper
- Console logs appearing
- No JavaScript errors

**After 2 seconds:**
- Logo splash screen (AMZL WHS COORDINATOR QUEST)
- Fading animation
- Gold/orange colors

**Controls:**
- Press SPACE or ENTER to skip logo
- Should transition to next screen

### 4. **Common Issues & Fixes**

#### ❌ **Blank Screen**
**Cause:** ES6 module loading issue
**Fix:**
```bash
# Must run from a web server (not file://)
python -m http.server 8000
# Then visit: http://localhost:8000/LandingPage.html
```

#### ❌ **Console Error: "Failed to load module"**
**Check:**
- File paths are correct
- All files exist in src/ directory
- Running from web server (not file://)

#### ❌ **Canvas not showing**
**Check:**
- Browser console for errors
- Canvas element exists (inspect DOM)
- CSS is loaded

#### ❌ **State machine errors**
**Check:**
- All state files exist in src/states/
- Imports in Game.js are correct
- State names match registration

### 5. **Game Flow Test**

If working, you should be able to:
1. ✅ See logo (3 seconds or press SPACE)
2. ✅ See intro animation
3. ✅ See scrolling story text
4. ✅ See title screen with menu
5. ✅ Navigate with arrow keys
6. ✅ Select "START GAME" → How to Play
7. ✅ Press SPACE → Character Select
8. ✅ Choose character with ◄ ►
9. ✅ Press SPACE → Gameplay starts!

### 6. **Debug Mode**

Press **F3** to enable debug mode:
- Shows FPS counter
- Shows current state
- Shows player position
- Shows debug info overlay

### 7. **Browser Compatibility**

**✅ Supported:**
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

**❌ Not Supported:**
- Internet Explorer
- Very old browsers (no ES6 modules)

### 8. **Quick File Check**

Make sure these files exist:
```bash
# Check files
ls index-modular.html          # Main entry point
ls css/game.css               # Styles
ls src/core/Game.js           # Main game class
ls src/core/StateMachine.js   # State machine
ls src/core/MainLoop.js       # Game loop
ls src/states/*.js            # All state files
ls src/generators/*.js        # Generators
ls src/renderers/*.js         # Renderers
```

---

## 🐛 **If Something's Broken**

### Quick Diagnosis:

1. **Open browser console (F12)**
2. **Look for errors**
3. **Check which file is causing the issue**

Common error patterns:

```javascript
// Missing file
"Failed to load module './src/states/LogoState.js'"
→ File doesn't exist or wrong path

// Syntax error
"Unexpected token 'export'"
→ Browser doesn't support ES6 modules or not running from server

// Import error
"The requested module does not provide an export named 'Game'"
→ Export/import mismatch in code

// Canvas error
"Cannot read property 'getContext' of null"
→ Canvas element not found in DOM
```

---

## 📋 **Full Test Sequence**

### Test 1: Logo State
- ✅ Black background
- ✅ Gold "AMZL WHS COORDINATOR QUEST" text
- ✅ Fade in animation
- ✅ Auto-advance after 3 seconds OR
- ✅ Press SPACE to skip

### Test 2: Intro State
- ✅ Company splash screen
- ✅ Animated text
- ✅ Press SPACE to skip

### Test 3: Story State
- ✅ Scrolling text
- ✅ Story lines appear
- ✅ Press SPACE to skip

### Test 4: Title State
- ✅ Main menu appears
- ✅ "START GAME", "HOW TO PLAY", "SETTINGS" options
- ✅ Arrow keys navigate
- ✅ Selected option highlights
- ✅ Press ENTER to select

### Test 5: How To State
- ✅ Instructions display
- ✅ Controls explained
- ✅ Press SPACE to continue

### Test 6: Character Select
- ✅ 5 characters available
- ✅ Character sprite shows (scaled 4x)
- ✅ Stats display (Speed, Lives, Ability)
- ✅ ◄ ► arrows cycle characters
- ✅ Character name in color
- ✅ Press SPACE to select

### Test 7: Gameplay (PlayState)
- ✅ Map generates
- ✅ Player character appears
- ✅ WASD/Arrows move player
- ✅ SPACE throws projectile
- ✅ HUD shows lives and hazards
- ✅ Hazards appear on map
- ✅ Collisions work

### Test 8: Performance
- ✅ Smooth 60 FPS
- ✅ No stuttering
- ✅ Responsive controls
- ✅ No memory leaks

---

## 🎯 **What to Report**

If you encounter issues, please share:

1. **Console output** (copy/paste errors)
2. **Which screen** you got to
3. **What you pressed** before it broke
4. **Browser** and version
5. **Error message** (if any)

Example report:
```
Browser: Chrome 120
Got to: Character select screen
Pressed: SPACE to select Carrie
Error: "Cannot read property 'player' of undefined"
Console: [Full error stack trace]
```

---

## ✅ **Success Indicators**

Game is working if:
- ✅ No console errors
- ✅ States transition smoothly
- ✅ Controls respond
- ✅ Graphics render
- ✅ Sprites appear
- ✅ Gameplay works

---

## 🚀 **Expected Performance**

- **Load Time:** < 1 second
- **Frame Rate:** 60 FPS steady
- **State Transitions:** Instant
- **Input Lag:** None
- **Memory:** ~50MB

---

Let me know what you see! 🎮
