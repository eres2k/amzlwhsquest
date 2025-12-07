/**
 * Dialog system - handles in-game dialogs and text display
 */

import { GAME } from '../game/state.js';
import { GAME_STATES } from '../config/constants.js';
import { AudioSys, TTSSys, MusicSys } from '../audio/index.js';

// Show thinking/loading indicator
export function showThinking(speaker = "System", portrait = null) {
  if (typeof document === 'undefined') return;

  const dialogBox = document.getElementById('dialog-box');
  const textContent = document.getElementById('text-content');
  const portraitCanvas = document.getElementById('portrait');
  const geminiPre = document.getElementById('gemini-badge');
  const spaceHint = document.getElementById('press-space-hint');

  if (!dialogBox) return;

  GAME.state = GAME_STATES.DIALOG;
  GAME.dialogText = "...";
  GAME.dialogVisible = "...";
  GAME.dialogTimer = 0;

  dialogBox.style.display = 'flex';
  textContent.innerText = "...";

  if (geminiPre) {
    geminiPre.innerText = `✨ ${speaker.toUpperCase()} IS THINKING...`;
    geminiPre.classList.add('loading-dots');
    geminiPre.style.display = 'block';
  }

  if (spaceHint) spaceHint.style.display = 'none';

  // Draw portrait
  if (portrait && portraitCanvas) {
    const pCtx = portraitCanvas.getContext('2d');
    pCtx.imageSmoothingEnabled = false;
    pCtx.clearRect(0, 0, 32, 32);
    pCtx.drawImage(portrait, 0, 0, 32, 32);
  }
}

// Show dialog with text
export function showDialog(text, speaker = "System", portrait = null, speak = false) {
  if (typeof document === 'undefined') return;

  const dialogBox = document.getElementById('dialog-box');
  const textContent = document.getElementById('text-content');
  const portraitCanvas = document.getElementById('portrait');
  const geminiPre = document.getElementById('gemini-badge');
  const spaceHint = document.getElementById('press-space-hint');

  if (!dialogBox) return;

  GAME.state = GAME_STATES.DIALOG;
  GAME.dialogText = text;
  GAME.dialogVisible = "";
  GAME.dialogTimer = 0;

  dialogBox.style.display = 'flex';
  textContent.innerText = "";

  if (geminiPre) {
    geminiPre.classList.remove('loading-dots');
    geminiPre.style.display = 'none';
  }

  if (spaceHint) spaceHint.style.display = 'block';

  // Draw portrait
  if (portrait && portraitCanvas) {
    const pCtx = portraitCanvas.getContext('2d');
    pCtx.imageSmoothingEnabled = false;
    pCtx.clearRect(0, 0, 32, 32);
    pCtx.drawImage(portrait, 0, 0, 32, 32);
  }

  // TTS speak if enabled
  if (speak && TTSSys) {
    TTSSys.speak(text, speaker);
  }
}

// Close dialog
export function closeDialog() {
  if (typeof document === 'undefined') return;

  const dialogBox = document.getElementById('dialog-box');
  if (dialogBox) dialogBox.style.display = 'none';

  TTSSys.cancel();

  // Resume music after dialog
  MusicSys.resume();
}

// Update dialog text animation (typewriter effect)
export function updateDialog() {
  if (GAME.state !== GAME_STATES.DIALOG) return;
  if (GAME.dialogVisible.length >= GAME.dialogText.length) return;

  GAME.dialogTimer++;

  if (GAME.dialogTimer % 2 === 0) {
    GAME.dialogVisible = GAME.dialogText.slice(0, GAME.dialogVisible.length + 1);

    if (typeof document !== 'undefined') {
      const textContent = document.getElementById('text-content');
      if (textContent) {
        textContent.innerText = GAME.dialogVisible;
      }
    }

    AudioSys.sfx.text();
  }
}

export default {
  showThinking,
  showDialog,
  closeDialog,
  updateDialog
};
