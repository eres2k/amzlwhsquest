/**
 * AMZL WHS Quest - Main Entry Point
 * Modular game initialization and game loop
 */

import { TILE_SIZE, MAP_W, MAP_H, GAME_STATES } from './config/constants.js';
import { CHAR_DATA, CHAR_LIST, getCharStats, getAttackData } from './config/characters.js';
import { BANTER_DB, SIMULATED_AI, BEZOS_TAUNTS, CORPORATE_GAME_OVER, CHARACTER_DEFEAT_LINES } from './config/dialogue.js';
import { GAME, resetGameState, isPlayableState, isMenuState, advanceState, transitionToState } from './game/state.js';
import { KEYS, initInput, setActionHandler, getMovementVector } from './game/input.js';
import { AudioSys, MusicSys, TTSSys } from './audio/index.js';
import { GFX, generateAssets } from './gfx/index.js';
import { showDialog, showThinking, closeDialog, updateDialog } from './ui/dialog.js';
import { updateHud, updateBossHud, updateMusicForState } from './ui/hud.js';
import {
  generateMap,
  resetGame,
  initBossEncounter,
  queueVisitorSplash,
  showVisitorSplash,
  startYardLevel,
  beginMechaEncounter,
  startCredits,
  triggerGameOver,
  spawnFloatingText,
  spawnParticle,
  spawnEntity,
  isTileFree
} from './game/logic.js';
import { callGemini } from './ai/index.js';

// Canvas and context
let canvas, ctx;

// Initialize the game
function init() {
  canvas = document.getElementById('gameCanvas');
  ctx = canvas.getContext('2d');

  // Generate sprite assets
  generateAssets();

  // Initialize audio systems
  AudioSys.init();
  MusicSys.init();
  TTSSys.init();

  // Initialize input
  initInput();
  setActionHandler(handleAction);

  // Set initial state
  GAME.state = GAME_STATES.LOGO;
  GAME.stateTimer = 0;

  // Start music
  updateMusicForState();

  // Start game loop
  requestAnimationFrame(loop);
}

// Main game loop
function loop() {
  GAME.ticks++;
  GAME.stateTimer++;

  update();
  draw();

  requestAnimationFrame(loop);
}

// Handle space/action button
function handleAction() {
  AudioSys.init();
  AudioSys.resume();
  MusicSys.init();
  MusicSys.resume();
  updateMusicForState();

  if (GAME.state === GAME_STATES.LOSE_SPLASH || GAME.state === GAME_STATES.WIN_SPLASH) return;

  if (GAME.state === GAME_STATES.LOGO) {
    advanceState();
  } else if ([GAME_STATES.INTRO, GAME_STATES.STORY].includes(GAME.state)) {
    AudioSys.sfx.start();
    advanceState();
  } else if ([GAME_STATES.TITLE, GAME_STATES.HOWTO].includes(GAME.state)) {
    GAME.state = (GAME.state === GAME_STATES.TITLE) ? GAME_STATES.HOWTO : GAME_STATES.SELECT;
    AudioSys.sfx.select();
    updateMusicForState();
  } else if (GAME.state === GAME_STATES.SELECT) {
    AudioSys.sfx.select();
    GAME.selectedChar = GAME.charList[GAME.charIndex];
    resetGame();
  } else if (GAME.state === GAME_STATES.DIALOG) {
    if (GAME.dialogVisible.length < GAME.dialogText.length) {
      GAME.dialogVisible = GAME.dialogText;
      document.getElementById('text-content').innerText = GAME.dialogVisible;
    } else {
      closeDialog();
      // Transition to next state (PLAY, YARD_INTRO, etc.)
      if (GAME.nextState) {
        GAME.state = GAME.nextState;
        GAME.stateTimer = 0;
        if (GAME.nextState === GAME_STATES.YARD_INTRO) {
          startYardLevel();
        }
        updateMusicForState();
      }
    }
  } else if (GAME.state === GAME_STATES.VISITOR_SPLASH) {
    initBossEncounter();
  } else if (GAME.state === GAME_STATES.BOSS_INTRO) {
    GAME.state = GAME_STATES.BOSS;
    GAME.nextState = GAME_STATES.BOSS;
    updateMusicForState();
  } else if (GAME.state === GAME_STATES.BEZOS_INTRO) {
    GAME.state = GAME_STATES.BEZOS_BOSS;
    GAME.nextState = GAME_STATES.BEZOS_BOSS;
    updateMusicForState();
  } else if (GAME.state === GAME_STATES.MECHA_BOSS_INTRO) {
    GAME.state = GAME_STATES.MECHA_BOSS;
    GAME.nextState = GAME_STATES.MECHA_BOSS;
    updateMusicForState();
  } else if (GAME.state === GAME_STATES.MECHA_SIMON_SPLASH) {
    GAME.state = GAME_STATES.BOSS;
    GAME.nextState = GAME_STATES.BOSS;
    updateMusicForState();
  } else if (GAME.state === GAME_STATES.YARD_INTRO) {
    startYardLevel();
  } else if (GAME.state === GAME_STATES.GAMEOVER_SPLASH) {
    if (GAME.stateTimer > 60) {
      GAME.state = GAME_STATES.TITLE;
      updateMusicForState();
    }
  } else if (GAME.state === GAME_STATES.GAMEOVER || GAME.state === GAME_STATES.WIN) {
    document.getElementById('boss-hud').style.display = 'none';
    GAME.state = GAME_STATES.TITLE;
    updateMusicForState();
  } else if (GAME.state === GAME_STATES.BEZOS_WIN) {
    GAME.state = GAME_STATES.TITLE;
    updateMusicForState();
  } else if (GAME.state === GAME_STATES.CREDITS) {
    if (GAME.stateTimer > 600) {
      GAME.state = GAME_STATES.TITLE;
      updateMusicForState();
    }
  } else if ([GAME_STATES.PLAY, GAME_STATES.BOSS, GAME_STATES.BEZOS_BOSS, GAME_STATES.MECHA_BOSS].includes(GAME.state)) {
    if (GAME.state === GAME_STATES.PLAY && tryInteract()) return;
    throwBook();
  }
}

// Try to interact with nearby hazard
function tryInteract() {
  const p = GAME.player;
  for (let i = 0; i < GAME.activeIssues.length; i++) {
    const h = GAME.activeIssues[i];
    if (h.fixed) continue;
    const dist = Math.hypot(p.x - h.x, p.y - h.y);
    if (dist < 24) {
      h.fixed = true;
      GAME.issuesFixed++;
      updateHud();
      AudioSys.sfx.fix();
      spawnFloatingText(h.x, h.y - 8, "FIXED!", "#22c55e");

      // Spawn particles
      for (let j = 0; j < 5; j++) {
        spawnParticle(h.x + 8, h.y + 8, '#22c55e');
      }

      // Check win condition
      if (GAME.issuesFixed >= 5 && !GAME.pendingBossIntro && !GAME.boss) {
        queueVisitorSplash();
      }

      return true;
    }
  }
  return false;
}

// Throw rule book projectile
function throwBook() {
  const p = GAME.player;
  if (p.cooldown > 0) return;

  const attack = getAttackData(GAME.selectedChar);
  p.cooldown = attack.cooldown;

  // Apply character ability (Joao has faster cooldown)
  if (GAME.selectedChar === "Joao") {
    p.cooldown = Math.floor(p.cooldown * 0.85);
  }

  GAME.booksFired++;

  const angles = [0, Math.PI / 2, Math.PI, -Math.PI / 2];
  const angle = angles[p.dir] || 0;

  GAME.projectiles.push({
    type: 'book',
    x: p.x + 4,
    y: p.y + 4,
    vx: Math.cos(angle) * attack.speed,
    vy: Math.sin(angle) * attack.speed,
    life: 60,
    char: GAME.selectedChar
  });

  AudioSys.sfx.throw();
}

// Update game state
function update() {
  // Update dialog
  updateDialog();

  // Update shake/flash effects
  if (GAME.shake > 0) GAME.shake--;
  if (GAME.flash > 0) GAME.flash--;

  // Auto-advance intro states
  if (GAME.state === GAME_STATES.LOGO && GAME.stateTimer > 240) {
    advanceState();
    updateMusicForState();
  }
  if (GAME.state === GAME_STATES.INTRO && GAME.stateTimer > 300) {
    advanceState();
  }
  if (GAME.state === GAME_STATES.STORY && GAME.stateTimer > 300) {
    advanceState();
    updateMusicForState();
  }

  // State-specific updates
  if (GAME.state === GAME_STATES.SELECT) {
    // Character selection navigation
    if (KEYS.left || KEYS.right) {
      if (!GAME._selectCooldown) {
        GAME.charIndex += KEYS.right ? 1 : -1;
        if (GAME.charIndex < 0) GAME.charIndex = GAME.charList.length - 1;
        if (GAME.charIndex >= GAME.charList.length) GAME.charIndex = 0;
        AudioSys.sfx.select();
        GAME._selectCooldown = 15;
      }
    }
    if (GAME._selectCooldown > 0) GAME._selectCooldown--;
  }

  if (GAME.state === GAME_STATES.PLAY) {
    updatePlayer();
    updateEntities();
    updateProjectiles();
    updateParticles();
    updateFloatingTexts();
    updateWarehouseAtmosphere();
    updateCamera();

    // Check if player reached fire exit with all hazards fixed
    if (GAME.issuesFixed >= 5 && GAME.fireExitDoor && !GAME.pendingBossIntro && !GAME.boss) {
      const dist = Math.hypot(GAME.player.x - GAME.fireExitDoor.x, GAME.player.y - GAME.fireExitDoor.y);
      if (dist < 20) {
        // Transition to yard level
        GAME.nextState = GAME_STATES.YARD_INTRO;
        showDialog("The fire exit... It leads to the yard. Are you ready to face what's out there?", "Simon Unglaube", GFX.simonFace, true);
      }
    }

    // Check boss trigger
    if (GAME.pendingBossIntro && GAME.nextState === GAME_STATES.VISITOR_SPLASH) {
      showVisitorSplash();
    }
  }

  if (GAME.state === GAME_STATES.BOSS) {
    updatePlayer();
    updateBoss();
    updateProjectiles();
    updateParticles();
    updateFloatingTexts();
    updateCamera();
  }

  if (GAME.state === GAME_STATES.YARD_LEVEL) {
    updateYardLevel();
    updateProjectiles();
    updateParticles();
    updateFloatingTexts();
  }

  if (GAME.state === GAME_STATES.MECHA_BOSS) {
    updateMechaBattle();
    updateProjectiles();
    updateParticles();
    updateFloatingTexts();
  }

  // Player cooldown
  if (GAME.player && GAME.player.cooldown > 0) {
    GAME.player.cooldown--;
  }

  // Player invincibility frames
  if (GAME.player && GAME.player.iframe > 0) {
    GAME.player.iframe--;
  }
}

// Update player movement
function updatePlayer() {
  const p = GAME.player;
  if (!p) return;

  const { dx, dy } = getMovementVector(p.speed);

  // Update direction
  if (dx > 0) p.dir = 0;
  else if (dx < 0) p.dir = 2;
  else if (dy > 0) p.dir = 1;
  else if (dy < 0) p.dir = 3;

  // Apply movement with collision
  const newX = p.x + dx;
  const newY = p.y + dy;

  const tx = Math.floor(newX / TILE_SIZE);
  const ty = Math.floor(newY / TILE_SIZE);

  if (tx >= 0 && tx < MAP_W && ty >= 0 && ty < MAP_H) {
    if (GAME.map[ty]?.[Math.floor(p.x / TILE_SIZE)] !== 1 && GAME.map[ty]?.[Math.floor(p.x / TILE_SIZE)] !== 2) {
      p.y = newY;
    }
    if (GAME.map[Math.floor(p.y / TILE_SIZE)]?.[tx] !== 1 && GAME.map[Math.floor(p.y / TILE_SIZE)]?.[tx] !== 2) {
      p.x = newX;
    }
  }

  // Clamp to map bounds
  p.x = Math.max(TILE_SIZE, Math.min(p.x, (MAP_W - 2) * TILE_SIZE));
  p.y = Math.max(TILE_SIZE, Math.min(p.y, (MAP_H - 2) * TILE_SIZE));
}

// Update entities (NPCs)
function updateEntities() {
  for (const e of GAME.entities) {
    e.timer++;

    if (e.type === 'ops' || e.type === 'assoc') {
      // Random movement
      if (e.timer % 60 === 0) {
        e.dir = Math.floor(Math.random() * 4);
      }

      const speed = e.type === 'ops' ? 0.8 : 0.5;
      const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
      const [dx, dy] = dirs[e.dir] || [0, 0];

      const newX = e.x + dx * speed;
      const newY = e.y + dy * speed;
      const tx = Math.floor(newX / TILE_SIZE);
      const ty = Math.floor(newY / TILE_SIZE);

      if (tx > 0 && tx < MAP_W - 1 && ty > 0 && ty < MAP_H - 1) {
        if (GAME.map[ty]?.[tx] === 0) {
          e.x = newX;
          e.y = newY;
        }
      }

      // Collision with player
      if (GAME.player && GAME.player.iframe === 0) {
        const dist = Math.hypot(e.x - GAME.player.x, e.y - GAME.player.y);
        if (dist < 14 && e.type === 'ops') {
          GAME.lives--;
          GAME.player.iframe = 60;
          updateHud();
          AudioSys.sfx.hurt();
          GAME.shake = 5;
          spawnFloatingText(GAME.player.x, GAME.player.y - 16, "OUCH!", "#ef4444");

          if (GAME.lives <= 0) {
            triggerGameOver("RATE CRUSHED!");
          }
        }
      }
    }

    if (e.type === 'runner') {
      // Runner moves faster and in a straight line
      const speed = 2.0;
      const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
      const [dx, dy] = dirs[e.dir] || [0, 0];

      e.x += dx * speed;
      e.y += dy * speed;

      // Bounce off walls
      const tx = Math.floor(e.x / TILE_SIZE);
      const ty = Math.floor(e.y / TILE_SIZE);
      if (tx <= 1 || tx >= MAP_W - 2 || ty <= 1 || ty >= MAP_H - 2) {
        e.dir = (e.dir + 2) % 4;
      }

      // Collision with player
      if (GAME.player && GAME.player.iframe === 0) {
        const dist = Math.hypot(e.x - GAME.player.x, e.y - GAME.player.y);
        if (dist < 14) {
          GAME.lives--;
          GAME.player.iframe = 60;
          updateHud();
          AudioSys.sfx.hurt();
          GAME.shake = 5;
          spawnFloatingText(GAME.player.x, GAME.player.y - 16, "RUNNER!", "#f97316");

          if (GAME.lives <= 0) {
            triggerGameOver("RUN OVER!");
          }
        }
      }
    }

    if (e.type === 'simon') {
      // Simon follows player at a distance
      if (GAME.player) {
        const dist = Math.hypot(e.x - GAME.player.x, e.y - GAME.player.y);
        if (dist > 60) {
          const angle = Math.atan2(GAME.player.y - e.y, GAME.player.x - e.x);
          e.x += Math.cos(angle) * 0.5;
          e.y += Math.sin(angle) * 0.5;
        }
      }
    }
  }
}

// Update boss
function updateBoss() {
  const b = GAME.boss;
  if (!b) return;

  b.timer++;

  // Move toward player
  if (GAME.player) {
    const dx = GAME.player.x - b.x;
    const dy = GAME.player.y - b.y;
    const dist = Math.hypot(dx, dy);
    if (dist > 40) {
      b.x += (dx / dist) * b.speed;
      b.y += (dy / dist) * b.speed;
    }
  }

  // Attack pattern
  if (b.timer % b.attackDelay === 0) {
    fireBossAttack(b);
  }

  // Collision with player
  if (GAME.player && GAME.player.iframe === 0) {
    const dist = Math.hypot(b.x - GAME.player.x, b.y - GAME.player.y);
    if (dist < 24) {
      GAME.lives--;
      GAME.player.iframe = 90;
      updateHud();
      AudioSys.sfx.hurt();
      GAME.shake = 10;

      if (GAME.lives <= 0) {
        triggerGameOver("AUDITED!");
      }
    }
  }

  updateBossHud();
}

// Fire boss attack
function fireBossAttack(b) {
  if (!GAME.player) return;

  const pattern = b.attackPattern || 'sweep';

  if (pattern === 'sweep') {
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI - Math.PI / 2;
      GAME.projectiles.push({
        type: 'boss',
        x: b.x + 16,
        y: b.y + 16,
        vx: Math.cos(angle) * 2.5,
        vy: Math.sin(angle) * 2.5,
        life: 80,
        boss: true
      });
    }
  } else if (pattern === 'tracking') {
    const angle = Math.atan2(GAME.player.y - b.y, GAME.player.x - b.x);
    GAME.projectiles.push({
      type: 'boss',
      x: b.x + 16,
      y: b.y + 16,
      vx: Math.cos(angle) * 3,
      vy: Math.sin(angle) * 3,
      life: 100,
      boss: true
    });
  } else if (pattern === 'burst') {
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      GAME.projectiles.push({
        type: 'boss',
        x: b.x + 16,
        y: b.y + 16,
        vx: Math.cos(angle) * 2,
        vy: Math.sin(angle) * 2,
        life: 60,
        boss: true
      });
    }
  } else if (pattern === 'storm') {
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 + b.timer * 0.1;
      GAME.projectiles.push({
        type: 'boss',
        x: b.x + 16,
        y: b.y + 16,
        vx: Math.cos(angle) * 2.5,
        vy: Math.sin(angle) * 2.5,
        life: 70,
        boss: true
      });
    }
  }

  AudioSys.sfx.throw();
}

// Update projectiles
function updateProjectiles() {
  for (let i = GAME.projectiles.length - 1; i >= 0; i--) {
    const proj = GAME.projectiles[i];
    proj.x += proj.vx;
    proj.y += proj.vy;
    proj.life--;

    if (proj.life <= 0) {
      GAME.projectiles.splice(i, 1);
      continue;
    }

    // Player projectile hitting boss
    if (!proj.boss && GAME.boss) {
      const dist = Math.hypot(proj.x - GAME.boss.x - 16, proj.y - GAME.boss.y - 16);
      if (dist < 20) {
        let damage = 1;

        // Carrie deals double damage
        if (proj.char === "Carrie") {
          damage = 2;
        }

        GAME.boss.hp -= damage;
        GAME.projectiles.splice(i, 1);
        AudioSys.sfx.bossHit();
        updateBossHud();
        spawnFloatingText(GAME.boss.x + 16, GAME.boss.y, `-${damage}`, "#ef4444");

        // Spawn particles
        for (let j = 0; j < 3; j++) {
          spawnParticle(proj.x, proj.y, '#ef4444');
        }

        // Check boss defeat
        if (GAME.boss.hp <= 0) {
          GAME.state = GAME_STATES.WIN;
          GAME.boss = null;
          document.getElementById('boss-hud').style.display = 'none';
          updateMusicForState();
        }

        continue;
      }
    }

    // Boss projectile hitting player
    if (proj.boss && GAME.player && GAME.player.iframe === 0) {
      const dist = Math.hypot(proj.x - GAME.player.x - 8, proj.y - GAME.player.y - 8);

      // Roman has smaller collision radius
      const collisionRadius = GAME.selectedChar === "Roman" ? 8 : 12;

      if (dist < collisionRadius) {
        GAME.lives--;
        GAME.player.iframe = GAME.selectedChar === "Nevena" ? 90 : 60; // Nevena has longer iframes
        updateHud();
        AudioSys.sfx.hurt();
        GAME.shake = 5;
        GAME.projectiles.splice(i, 1);

        if (GAME.lives <= 0) {
          triggerGameOver("COMPLIANCE FAILURE!");
        }

        continue;
      }
    }

    // Player projectile hitting entities
    if (!proj.boss) {
      for (let j = GAME.entities.length - 1; j >= 0; j--) {
        const e = GAME.entities[j];
        if (e.type === 'simon') continue; // Don't hit Simon (yet)

        const dist = Math.hypot(proj.x - e.x - 8, proj.y - e.y - 8);
        if (dist < 12) {
          // Push entity away
          const angle = Math.atan2(e.y - proj.y, e.x - proj.x);
          e.x += Math.cos(angle) * 10;
          e.y += Math.sin(angle) * 10;

          if (e.type === 'ops') {
            GAME.opsPushed++;
            spawnFloatingText(e.x, e.y - 8, "PUSHED!", "#f97316");
          }

          GAME.projectiles.splice(i, 1);
          AudioSys.sfx.hit();

          // Spawn particles
          for (let k = 0; k < 3; k++) {
            spawnParticle(proj.x, proj.y, '#fbbf24');
          }

          break;
        }
      }
    }
  }
}

// Update particles
function updateParticles() {
  for (let i = GAME.particles.length - 1; i >= 0; i--) {
    const p = GAME.particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life--;

    if (p.life <= 0) {
      GAME.particles.splice(i, 1);
    }
  }
}

// Update floating texts
function updateFloatingTexts() {
  for (let i = GAME.floatingTexts.length - 1; i >= 0; i--) {
    const t = GAME.floatingTexts[i];
    t.y += t.vy;
    t.life--;

    if (t.life <= 0) {
      GAME.floatingTexts.splice(i, 1);
    }
  }
}

// Update warehouse atmosphere (conveyors, packages, workers)
function updateWarehouseAtmosphere() {
  // Update packages on conveyors
  for (const pkg of GAME.packages) {
    pkg.x += pkg.speed;
    if (pkg.x < 6 * TILE_SIZE) pkg.x = 54 * TILE_SIZE;
    if (pkg.x > 54 * TILE_SIZE) pkg.x = 6 * TILE_SIZE;
  }

  // Update cart workers
  for (const worker of GAME.cartWorkers) {
    if (worker.pauseTimer > 0) {
      worker.pauseTimer--;
      continue;
    }

    worker.x += worker.dir * worker.speed;

    if (worker.x >= worker.targetX) {
      worker.dir = -1;
      worker.pauseTimer = 60;
    } else if (worker.x <= 8 * TILE_SIZE) {
      worker.dir = 1;
      worker.pauseTimer = 60;
    }
  }
}

// Update yard level
function updateYardLevel() {
  const y = GAME.yard;
  if (!y) return;

  // Player movement in yard
  const speed = y.speed;
  if (KEYS.up) y.playerY -= speed;
  if (KEYS.down) y.playerY += speed;
  if (KEYS.left) y.playerX -= speed;
  if (KEYS.right) y.playerX += speed;

  // Clamp player position
  y.playerX = Math.max(8, Math.min(y.playerX, canvas.width - 24));
  y.playerY = Math.max(16, Math.min(y.playerY, y.height - 16));

  // Update camera
  y.cameraY = Math.max(0, y.playerY - canvas.height / 2);
  y.cameraY = Math.min(y.cameraY, y.height - canvas.height);

  // Spawn vehicles
  for (const lane of y.lanes) {
    lane.timer--;
    if (lane.timer <= 0) {
      const type = lane.type === 'mixed' ? (Math.random() < 0.5 ? 'van' : 'truck') : lane.type;
      const w = type === 'truck' ? 52 : 34;
      const startX = lane.dir > 0 ? -w : canvas.width;

      y.vehicles.push({
        x: startX,
        y: lane.y,
        w: w,
        h: type === 'truck' ? 20 : 18,
        type: type,
        speed: lane.speed * lane.dir
      });

      lane.timer = 60 + Math.random() * 60;
    }
  }

  // Update vehicles
  for (let i = y.vehicles.length - 1; i >= 0; i--) {
    const v = y.vehicles[i];
    v.x += v.speed;

    // Remove off-screen vehicles
    if (v.x < -60 || v.x > canvas.width + 60) {
      y.vehicles.splice(i, 1);
      continue;
    }

    // Collision with player
    if (GAME.player && GAME.player.iframe === 0) {
      const screenY = v.y - y.cameraY;
      const playerScreenY = y.playerY - y.cameraY;

      if (y.playerX < v.x + v.w && y.playerX + 16 > v.x &&
          playerScreenY < screenY + v.h && playerScreenY + 16 > screenY) {
        // Reset player to start
        y.playerY = y.startY;
        GAME.lives--;
        GAME.player.iframe = 90;
        updateHud();
        AudioSys.sfx.hurt();
        GAME.shake = 15;
        GAME.flash = 10;
        spawnFloatingText(y.playerX, y.playerY - y.cameraY, "SPLAT!", "#ef4444");

        if (GAME.lives <= 0) {
          triggerGameOver("ROAD PIZZA!");
        }
      }
    }
  }

  // Check if player reached the top (throne room)
  if (y.playerY <= y.throneRoomHeight && !y.throneRoomGreeted) {
    y.throneRoomGreeted = true;
    // Transition to throne confrontation
    GAME.state = GAME_STATES.THRONE_CONFRONTATION;
    GAME.stateTimer = 0;
    showDialog("You've made it to the throne room. Jeff Bezos awaits...", "System", null, true);
  }
}

// Update mecha battle
function updateMechaBattle() {
  const m = GAME.mecha;
  if (!m) return;

  m.timer++;
  m.phaseTimer++;

  // Player movement
  const p = GAME.player;
  const speed = p.speed;
  if (KEYS.up) p.y -= speed;
  if (KEYS.down) p.y += speed;
  if (KEYS.left) p.x -= speed;
  if (KEYS.right) p.x += speed;

  // Clamp player
  p.x = Math.max(8, Math.min(p.x, canvas.width - 24));
  p.y = Math.max(70, Math.min(p.y, canvas.height - 24));

  // Boss movement
  m.moveTimer++;
  if (m.moveTimer > 60) {
    m.moveDir *= -1;
    m.moveTimer = 0;
  }
  m.x += m.moveDir * 0.5;
  m.x = Math.max(8, Math.min(m.x, canvas.width - 72));

  // Boss bob
  m.bobOffset = Math.sin(m.timer * 0.1) * 3;
  m.y = m.baseY + m.bobOffset;

  // Phase-based attacks
  if (m.attackCooldown > 0) {
    m.attackCooldown--;
  } else {
    const phase = m.currentPhase;
    if (phase === 0) {
      // Prime missiles
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        GAME.projectiles.push({
          type: 'mecha',
          x: m.x + 32,
          y: m.y + 32,
          vx: Math.cos(angle) * 2,
          vy: Math.sin(angle) * 2,
          life: 80,
          boss: true
        });
      }
      m.attackCooldown = 60;
    } else if (phase === 1) {
      // Tracking shot
      const angle = Math.atan2(p.y - m.y, p.x - m.x);
      GAME.projectiles.push({
        type: 'mecha',
        x: m.x + 32,
        y: m.y + 32,
        vx: Math.cos(angle) * 3,
        vy: Math.sin(angle) * 3,
        life: 100,
        boss: true
      });
      m.attackCooldown = 30;
    }

    AudioSys.sfx.throw();
  }

  // Phase transition
  if (m.phaseTimer > m.phaseDuration) {
    m.currentPhase = (m.currentPhase + 1) % 5;
    m.phaseTimer = 0;
    spawnFloatingText(m.x + 32, m.y - 10, m.phaseNames[m.currentPhase], "#ff9900");
  }

  // Update GAME.boss for HUD
  if (GAME.boss) {
    GAME.boss.hp = m.hp;
  }
  updateBossHud();
}

// Update camera position
function updateCamera() {
  if (!GAME.player) return;

  const targetX = GAME.player.x - canvas.width / 2;
  const targetY = GAME.player.y - canvas.height / 2;

  GAME.camera.x += (targetX - GAME.camera.x) * 0.1;
  GAME.camera.y += (targetY - GAME.camera.y) * 0.1;

  // Clamp camera
  GAME.camera.x = Math.max(0, Math.min(GAME.camera.x, MAP_W * TILE_SIZE - canvas.width));
  GAME.camera.y = Math.max(0, Math.min(GAME.camera.y, MAP_H * TILE_SIZE - canvas.height));
}

// Draw function
function draw() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Screen shake
  let dxShake = 0, dyShake = 0;
  if (GAME.shake > 0) {
    dxShake = (Math.random() - 0.5) * GAME.shake;
    dyShake = (Math.random() - 0.5) * GAME.shake;
  }
  ctx.save();
  ctx.translate(dxShake, dyShake);

  // Draw based on state
  if (GAME.state === GAME_STATES.LOGO) {
    drawLogo();
  } else if (GAME.state === GAME_STATES.INTRO) {
    drawIntro();
  } else if (GAME.state === GAME_STATES.STORY) {
    drawStory();
  } else if (GAME.state === GAME_STATES.TITLE) {
    drawTitle();
  } else if (GAME.state === GAME_STATES.HOWTO) {
    drawHowTo();
  } else if (GAME.state === GAME_STATES.SELECT) {
    drawSelect();
  } else if (GAME.state === GAME_STATES.PLAY || GAME.state === GAME_STATES.DIALOG) {
    drawGame();
  } else if (GAME.state === GAME_STATES.BOSS || GAME.state === GAME_STATES.BOSS_INTRO) {
    drawBoss();
  } else if (GAME.state === GAME_STATES.VISITOR_SPLASH) {
    drawVisitorSplash();
  } else if (GAME.state === GAME_STATES.YARD_LEVEL || GAME.state === GAME_STATES.YARD_INTRO) {
    drawYardLevel();
  } else if (GAME.state === GAME_STATES.MECHA_BOSS || GAME.state === GAME_STATES.MECHA_BOSS_INTRO) {
    drawMechaBattle();
  } else if (GAME.state === GAME_STATES.GAMEOVER || GAME.state === GAME_STATES.GAMEOVER_SPLASH) {
    drawGameOver();
  } else if (GAME.state === GAME_STATES.WIN || GAME.state === GAME_STATES.WIN_SPLASH) {
    drawWin();
  } else if (GAME.state === GAME_STATES.CREDITS) {
    drawCredits();
  }

  // Flash effect
  if (GAME.flash > 0) {
    ctx.fillStyle = `rgba(255,255,255,${GAME.flash / 20})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.restore();
}

// Drawing functions
function drawLogo() {
  const t = GAME.stateTimer;
  let alpha = 1.0;
  if (t < 30) alpha = t / 30;
  if (t > 200) alpha = (240 - t) / 40;

  ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
  const offset = Math.max(0, 100 - t * 2);

  ctx.drawImage(GFX.logo, 28 - offset, 90);

  if (t > 80) {
    ctx.fillStyle = '#fff';
    ctx.font = '10px monospace';
    ctx.fillText("ERWIN ESENER", 80, 105);
    ctx.fillStyle = '#eab308';
    ctx.font = '14px monospace';
    ctx.fillText("PRODUCTIONS", 80, 125);
  }

  ctx.globalAlpha = 1;
}

function drawIntro() {
  ctx.fillStyle = '#eab308';
  ctx.fillText("THE WAREHOUSE...", 20, 60);
  ctx.fillStyle = '#fff';
  ctx.fillText("Ops Managers obsess over rates.", 20, 90);
  ctx.fillText("They throw Crazy Requests.", 20, 110);
  ctx.fillText("You must protect Safety.", 20, 130);
  ctx.fillText("Stop runners. Fix hazards.", 20, 150);
  ctx.fillStyle = '#888';
  ctx.fillText("[SPACE TO SKIP]", 80, 200);
}

function drawStory() {
  ctx.fillStyle = '#eab308';
  ctx.font = '10px monospace';
  ctx.fillText("MISSION BRIEFING", 20, 40);
  ctx.fillStyle = '#fff';
  ctx.fillText("Simon Unglaube asks you to:", 20, 70);
  ctx.fillText("- Do the safety audit", 20, 90);
  ctx.fillText("- Dodge crazy Ops requests", 20, 110);
  ctx.fillText("- Push back with rules", 20, 130);
  ctx.fillText("- Deal with 'visitors'", 20, 150);
  ctx.fillStyle = '#888';
  ctx.fillText("[PRESS SPACE]", 80, 200);
}

function drawTitle() {
  const t = GAME.stateTimer;

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, '#050510');
  grad.addColorStop(0.5, '#0a1525');
  grad.addColorStop(1, '#0a0a18');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Stars
  for (let i = 0; i < 30; i++) {
    const x = (i * 37 + t * 0.3) % canvas.width;
    const y = (i * 61) % canvas.height;
    const twinkle = Math.sin(t * 0.1 + i) * 0.5 + 0.5;
    ctx.fillStyle = `rgba(255,255,255,${twinkle * 0.6})`;
    ctx.fillRect(x, y, 1, 1);
  }

  ctx.textAlign = 'center';
  ctx.font = '16px "Press Start 2P"';
  ctx.fillStyle = '#fbbf24';
  ctx.fillText('AMZL WHS QUEST', canvas.width / 2, 42);

  ctx.fillStyle = '#22d3ee';
  ctx.font = '7px "Press Start 2P"';
  ctx.fillText('SAFETY COORDINATOR EDITION', canvas.width / 2, 60);

  // Character showcase
  const charIdx = Math.floor(t / 90) % 5;
  const chars = ['Carrie', 'Nevena', 'Joao', 'Roman', 'Erwin'];
  const charName = chars[charIdx];
  const charBounce = Math.sin(t * 0.15) * 3;
  ctx.save();
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(GFX.chars[charName], canvas.width / 2 - 16, 85 + charBounce, 32, 32);
  ctx.restore();

  // Prompt
  const blink = Math.sin(t * 0.12) > 0;
  if (blink) {
    ctx.fillStyle = '#fff';
    ctx.font = '9px "Press Start 2P"';
    ctx.fillText('PRESS SPACE', canvas.width / 2, 140);
  }

  ctx.fillStyle = '#64748b';
  ctx.font = '7px monospace';
  ctx.fillText('CREATED BY ERWIN ESENER', canvas.width / 2, 175);

  ctx.textAlign = 'left';
}

function drawHowTo() {
  const t = GAME.stateTimer;
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, '#0a1525');
  grad.addColorStop(1, '#0f172a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#fbbf24';
  ctx.font = '14px "Press Start 2P"';
  ctx.fillText('HOW TO PLAY', canvas.width / 2, 35);

  ctx.textAlign = 'left';
  ctx.font = '9px "Press Start 2P"';
  ctx.fillStyle = '#22d3ee';
  ctx.fillText('WASD / ARROWS', 25, 65);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '8px monospace';
  ctx.fillText('Navigate the warehouse floor', 25, 80);

  ctx.fillStyle = '#22d3ee';
  ctx.font = '9px "Press Start 2P"';
  ctx.fillText('SPACE', 25, 105);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '8px monospace';
  ctx.fillText('Interact with hazards / Attack', 25, 120);

  ctx.fillStyle = '#ef4444';
  ctx.font = '9px "Press Start 2P"';
  ctx.fillText('YOUR MISSION:', 25, 150);
  ctx.fillStyle = '#fbbf24';
  ctx.font = '8px monospace';
  ctx.fillText('1. Find and fix 5 safety hazards', 25, 165);
  ctx.fillText('2. Dodge crazy Ops requests!', 25, 180);
  ctx.fillText('3. Defeat the surprise visitor', 25, 195);

  const blink = Math.sin(t * 0.12) > 0;
  if (blink) {
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.font = '8px "Press Start 2P"';
    ctx.fillText('[PRESS SPACE TO CONTINUE]', canvas.width / 2, 215);
  }
  ctx.textAlign = 'left';
}

function drawSelect() {
  const t = GAME.stateTimer;
  const frameX = 14, frameY = 22, frameW = 228, frameH = 180;

  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, '#050510');
  grad.addColorStop(0.5, '#0a1525');
  grad.addColorStop(1, '#0f172a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#0a0a14';
  ctx.fillRect(frameX, frameY, frameW, frameH);
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 2;
  ctx.strokeRect(frameX, frameY, frameW, frameH);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#fbbf24';
  ctx.font = '11px "Press Start 2P"';
  ctx.fillText("SELECT COORDINATOR", frameX + frameW / 2, frameY + 18);

  const name = GAME.charList[GAME.charIndex];
  const data = CHAR_DATA[name];
  const portraitX = frameX + 18, portraitY = frameY + 46;

  ctx.fillStyle = '#000';
  ctx.fillRect(portraitX - 2, portraitY - 2, 56, 56);
  ctx.save();
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(GFX.chars[name], portraitX, portraitY, 52, 52);
  ctx.restore();

  ctx.fillStyle = '#eab308';
  ctx.font = '12px monospace';
  ctx.fillText("< " + name + " >", frameX + frameW / 2, frameY + 54);

  ctx.textAlign = 'left';
  ctx.font = '8px monospace';
  ctx.fillStyle = '#00ffff';
  ctx.fillText("ROLE: " + data.role, portraitX + 70, frameY + 70);

  ctx.fillStyle = '#fff';
  ctx.fillText(data.backstory.substring(0, 40) + "...", portraitX + 70, frameY + 84);

  ctx.fillStyle = '#ff00ff';
  ctx.fillText("ATTACK: " + data.attack, frameX + 18, frameY + frameH - 45);

  ctx.fillStyle = '#22d3ee';
  ctx.fillText("ABILITY: " + data.ability, frameX + 18, frameY + frameH - 32);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '7px monospace';
  ctx.fillText(data.abilityDesc, frameX + 18, frameY + frameH - 20);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#888';
  ctx.font = '10px monospace';
  ctx.fillText("PRESS SPACE", frameX + frameW / 2, frameY + frameH - 12);
  ctx.textAlign = 'left';
}

function drawGame() {
  // Draw map
  ctx.save();
  ctx.translate(-GAME.camera.x, -GAME.camera.y);

  for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
      const tile = GAME.map[y]?.[x];
      const px = x * TILE_SIZE;
      const py = y * TILE_SIZE;

      if (tile === 0) {
        ctx.drawImage(GFX.floor, px, py);
      } else if (tile === 1) {
        ctx.drawImage(GFX.wall, px, py);
      } else if (tile === 2) {
        ctx.drawImage(GFX.shelf, px, py);
      } else if (tile === 3) {
        ctx.drawImage(GFX.door, px, py);
      }
    }
  }

  // Draw clutter
  for (const c of GAME.clutter) {
    if (GFX.clutter[c.type]) {
      ctx.drawImage(GFX.clutter[c.type], c.x, c.y);
    }
  }

  // Draw conveyor belts
  for (const belt of GAME.conveyorBelts) {
    ctx.drawImage(GFX.conveyorBelt, belt.x, belt.y);
  }

  // Draw packages
  for (const pkg of GAME.packages) {
    const sprite = pkg.type === 'large' ? GFX.packageLarge : GFX.packageSmall;
    ctx.drawImage(sprite, pkg.x, pkg.y);
  }

  // Draw pallet stacks
  for (const stack of GAME.palletStacks) {
    ctx.drawImage(GFX.palletStack, stack.x, stack.y);
  }

  // Draw hazards
  for (const h of GAME.activeIssues) {
    if (!h.fixed) {
      const hazardType = h.data.type || 'box';
      const sprite = GFX.hazards[hazardType] || GFX.hazards.box;
      ctx.drawImage(sprite, h.x, h.y);

      // Highlight nearby hazards
      if (GAME.player) {
        const dist = Math.hypot(h.x - GAME.player.x, h.y - GAME.player.y);
        if (dist < 30) {
          ctx.strokeStyle = '#22c55e';
          ctx.lineWidth = 1;
          ctx.strokeRect(h.x - 2, h.y - 2, 20, 20);
        }
      }
    }
  }

  // Draw entities
  for (const e of GAME.entities) {
    const sprite = e.type === 'simon' ? GFX.simon :
                   e.type === 'ops' ? GFX.ops :
                   e.type === 'runner' ? GFX.runner :
                   GFX.assoc;
    ctx.drawImage(sprite, e.x, e.y);
  }

  // Draw player
  if (GAME.player) {
    if (GAME.player.iframe === 0 || GAME.ticks % 4 < 2) {
      ctx.drawImage(GFX.chars[GAME.selectedChar], GAME.player.x, GAME.player.y);
    }
  }

  // Draw projectiles
  for (const proj of GAME.projectiles) {
    const sprite = proj.boss ? GFX.bezosProj :
                   (proj.char && GFX.attacks[proj.char]) ? GFX.attacks[proj.char] :
                   GFX.book;
    ctx.drawImage(sprite, proj.x - 6, proj.y - 6);
  }

  // Draw particles
  for (const p of GAME.particles) {
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, 3, 3);
  }

  // Draw floating texts
  for (const t of GAME.floatingTexts) {
    ctx.fillStyle = t.color;
    ctx.font = '8px monospace';
    ctx.fillText(t.text, t.x, t.y);
  }

  ctx.restore();
}

function drawBoss() {
  // Draw arena
  ctx.save();
  ctx.translate(-GAME.camera.x, -GAME.camera.y);

  // Draw floor
  for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
      ctx.drawImage(GFX.floor, x * TILE_SIZE, y * TILE_SIZE);
    }
  }

  // Draw boss
  if (GAME.boss) {
    const sprite = GFX[GAME.boss.sprite] || GFX.simonBoss;
    ctx.drawImage(sprite, GAME.boss.x, GAME.boss.y);
  }

  // Draw player
  if (GAME.player) {
    if (GAME.player.iframe === 0 || GAME.ticks % 4 < 2) {
      ctx.drawImage(GFX.chars[GAME.selectedChar], GAME.player.x, GAME.player.y);
    }
  }

  // Draw projectiles
  for (const proj of GAME.projectiles) {
    const sprite = proj.boss ? GFX.bezosProj :
                   (proj.char && GFX.attacks[proj.char]) ? GFX.attacks[proj.char] :
                   GFX.book;
    ctx.drawImage(sprite, proj.x - 6, proj.y - 6);
  }

  // Draw particles
  for (const p of GAME.particles) {
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, 3, 3);
  }

  // Draw floating texts
  for (const t of GAME.floatingTexts) {
    ctx.fillStyle = t.color;
    ctx.font = '8px monospace';
    ctx.fillText(t.text, t.x, t.y);
  }

  ctx.restore();

  // Draw boss intro text
  if (GAME.state === GAME_STATES.BOSS_INTRO && GAME.boss) {
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0, 80, canvas.width, 60);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ef4444';
    ctx.font = '12px "Press Start 2P"';
    ctx.fillText(GAME.boss.name, canvas.width / 2, 105);
    ctx.fillStyle = '#fbbf24';
    ctx.font = '8px monospace';
    ctx.fillText(GAME.boss.title, canvas.width / 2, 125);
    ctx.textAlign = 'left';
  }
}

function drawVisitorSplash() {
  const t = GAME.stateTimer;
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, '#1a0f2e');
  grad.addColorStop(1, '#2a1b44');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#eab308';
  ctx.font = '16px "Press Start 2P"';
  ctx.fillText("SURPRISE VISITOR!", canvas.width / 2, 90);

  ctx.fillStyle = '#ffd166';
  ctx.font = '8px monospace';
  ctx.fillText("An unannounced Visitor is stepping onto the floor...", canvas.width / 2, 148);

  ctx.fillStyle = '#ff00ff';
  ctx.font = '10px monospace';
  ctx.fillText("[PRESS SPACE TO CONTINUE]", canvas.width / 2, 204);
  ctx.textAlign = 'left';
}

function drawYardLevel() {
  const y = GAME.yard;
  if (!y) return;

  // Background
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(0, -y.cameraY);

  // Draw road
  ctx.fillStyle = '#374151';
  ctx.fillRect(0, 0, canvas.width, y.height);

  // Draw lane markings
  for (let i = 0; i < y.height; i += 40) {
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(canvas.width / 2 - 2, i, 4, 20);
  }

  // Draw vehicles
  for (const v of y.vehicles) {
    const sprite = v.type === 'truck' ? GFX.truck : GFX.van;
    ctx.drawImage(sprite, v.x, v.y);
  }

  // Draw player
  if (GAME.player && (GAME.player.iframe === 0 || GAME.ticks % 4 < 2)) {
    ctx.drawImage(GFX.chars[GAME.selectedChar], y.playerX, y.playerY);
  }

  ctx.restore();
}

function drawMechaBattle() {
  const m = GAME.mecha;
  if (!m) return;

  // Background
  ctx.fillStyle = '#0a0a14';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw boss
  ctx.drawImage(GFX.mechaJeff, m.x, m.y);

  // Draw player
  if (GAME.player && (GAME.player.iframe === 0 || GAME.ticks % 4 < 2)) {
    ctx.drawImage(GFX.chars[GAME.selectedChar], GAME.player.x, GAME.player.y);
  }

  // Draw projectiles
  for (const proj of GAME.projectiles) {
    const sprite = proj.boss ? GFX.bezosProj : GFX.book;
    ctx.drawImage(sprite, proj.x - 6, proj.y - 6);
  }

  // Draw phase indicator
  ctx.fillStyle = '#ff9900';
  ctx.font = '8px "Press Start 2P"';
  ctx.textAlign = 'center';
  ctx.fillText(m.phaseNames[m.currentPhase], canvas.width / 2, 12);
  ctx.textAlign = 'left';
}

function drawGameOver() {
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, '#1a0505');
  grad.addColorStop(1, '#0a0505');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ef4444';
  ctx.font = '16px "Press Start 2P"';
  ctx.fillText('GAME OVER', canvas.width / 2, 80);

  ctx.fillStyle = '#fbbf24';
  ctx.font = '8px monospace';
  ctx.fillText(GAME.gameOverReason || 'TERMINATED', canvas.width / 2, 110);

  const msg = CORPORATE_GAME_OVER[Math.floor(GAME.stateTimer / 60) % CORPORATE_GAME_OVER.length];
  ctx.fillStyle = '#94a3b8';
  ctx.fillText(msg, canvas.width / 2, 140);

  if (GAME.stateTimer > 60) {
    ctx.fillStyle = '#fff';
    ctx.font = '8px "Press Start 2P"';
    ctx.fillText('[PRESS SPACE]', canvas.width / 2, 200);
  }
  ctx.textAlign = 'left';
}

function drawWin() {
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, '#0a1a0a');
  grad.addColorStop(1, '#051005');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#22c55e';
  ctx.font = '16px "Press Start 2P"';
  ctx.fillText('VICTORY!', canvas.width / 2, 80);

  ctx.fillStyle = '#fbbf24';
  ctx.font = '10px monospace';
  ctx.fillText('Safety audit complete!', canvas.width / 2, 120);

  ctx.fillStyle = '#fff';
  ctx.font = '8px "Press Start 2P"';
  ctx.fillText('[PRESS SPACE]', canvas.width / 2, 200);
  ctx.textAlign = 'left';
}

function drawCredits() {
  const t = GAME.stateTimer;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const scrollY = -t * 0.5;

  ctx.textAlign = 'center';
  ctx.fillStyle = '#fbbf24';
  ctx.font = '12px "Press Start 2P"';
  ctx.fillText('AMZL WHS QUEST', canvas.width / 2, 100 + scrollY);

  ctx.fillStyle = '#fff';
  ctx.font = '8px monospace';
  ctx.fillText('Created by Erwin Esener', canvas.width / 2, 130 + scrollY);
  ctx.fillText('Game Design & Programming', canvas.width / 2, 150 + scrollY);
  ctx.fillText('Art & Audio', canvas.width / 2, 170 + scrollY);

  ctx.fillStyle = '#22d3ee';
  ctx.fillText('Special Thanks:', canvas.width / 2, 210 + scrollY);
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('Amazon WHS Team', canvas.width / 2, 230 + scrollY);
  ctx.fillText('All Safety Coordinators', canvas.width / 2, 250 + scrollY);

  if (t > 600) {
    ctx.fillStyle = '#fff';
    ctx.font = '8px "Press Start 2P"';
    ctx.fillText('[PRESS SPACE]', canvas.width / 2, canvas.height - 20);
  }
  ctx.textAlign = 'left';
}

// Start the game when DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}

export { init, loop, handleAction };
