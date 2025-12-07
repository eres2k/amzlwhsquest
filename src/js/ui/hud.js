/**
 * HUD system - handles heads-up display updates
 */

import { GAME } from '../game/state.js';
import { GAME_STATES } from '../config/constants.js';
import { MusicSys } from '../audio/index.js';

// Update player HUD (lives and score)
export function updateHud() {
  if (typeof document === 'undefined') return;

  const lifeEl = document.getElementById('life-val');
  const scoreEl = document.getElementById('score-val');

  if (lifeEl) {
    lifeEl.innerText = "❤️".repeat(Math.max(0, GAME.lives));
  }

  if (scoreEl) {
    scoreEl.innerText = GAME.issuesFixed + "/5";
  }
}

// Update boss health bar
export function updateBossHud() {
  if (typeof document === 'undefined') return;
  if (!GAME.boss) return;

  const bossHealthEl = document.getElementById('boss-health-el');
  if (bossHealthEl) {
    const percent = Math.max(0, (GAME.boss.hp / GAME.boss.maxHp) * 100);
    bossHealthEl.style.width = percent + '%';
  }
}

// Update music based on game state
export function updateMusicForState() {
  const state = GAME.state;

  switch (state) {
    case GAME_STATES.LOGO:
    case GAME_STATES.INTRO:
    case GAME_STATES.STORY:
      MusicSys.stop();
      break;

    case GAME_STATES.TITLE:
    case GAME_STATES.HOWTO:
    case GAME_STATES.SELECT:
      MusicSys.play('title');
      break;

    case GAME_STATES.PLAY:
    case GAME_STATES.DIALOG:
      MusicSys.play('ingame');
      break;

    case GAME_STATES.VISITOR_SPLASH:
    case GAME_STATES.BOSS_INTRO:
    case GAME_STATES.BOSS:
      MusicSys.play('boss');
      break;

    case GAME_STATES.YARD_INTRO:
    case GAME_STATES.YARD_LEVEL:
      MusicSys.play('boss', 1.1);
      break;

    case GAME_STATES.THRONE_CONFRONTATION:
    case GAME_STATES.BEZOS_INTRO:
    case GAME_STATES.BEZOS_BOSS:
      MusicSys.play('boss', 1.2);
      break;

    case GAME_STATES.MECHA_TRANSFORM:
    case GAME_STATES.MECHA_BOSS_INTRO:
    case GAME_STATES.MECHA_BOSS:
      MusicSys.play('mechaJeff');
      break;

    case GAME_STATES.SIMON_MECHA_TRANSFORM:
    case GAME_STATES.MECHA_SIMON_SPLASH:
      MusicSys.play('megaSimon');
      break;

    case GAME_STATES.WIN:
    case GAME_STATES.WIN_SPLASH:
    case GAME_STATES.BEZOS_WIN:
    case GAME_STATES.BEZOS_ESCAPE:
      MusicSys.play('victory');
      break;

    case GAME_STATES.GAMEOVER:
    case GAME_STATES.GAMEOVER_SPLASH:
    case GAME_STATES.LOSE_SPLASH:
      MusicSys.play('menu');
      break;

    case GAME_STATES.CREDITS:
      MusicSys.play('credits');
      break;

    default:
      break;
  }
}

export default {
  updateHud,
  updateBossHud,
  updateMusicForState
};
