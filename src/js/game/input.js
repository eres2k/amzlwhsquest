/**
 * Input handling system
 */

// Keyboard state
export const KEYS = {
  up: false,
  down: false,
  left: false,
  right: false,
  action: false
};

// Action handler - to be set by main game
let actionHandler = null;

export function setActionHandler(handler) {
  actionHandler = handler;
}

// Initialize input listeners
export function initInput() {
  if (typeof window === 'undefined') return;

  window.addEventListener('keydown', (e) => {
    if (e.key === 'w' || e.key === 'ArrowUp') KEYS.up = true;
    if (e.key === 's' || e.key === 'ArrowDown') KEYS.down = true;
    if (e.key === 'a' || e.key === 'ArrowLeft') KEYS.left = true;
    if (e.key === 'd' || e.key === 'ArrowRight') KEYS.right = true;
    if (e.code === 'Space') {
      if (!KEYS.action && actionHandler) actionHandler();
      KEYS.action = true;
    }
  });

  window.addEventListener('keyup', (e) => {
    if (e.key === 'w' || e.key === 'ArrowUp') KEYS.up = false;
    if (e.key === 's' || e.key === 'ArrowDown') KEYS.down = false;
    if (e.key === 'a' || e.key === 'ArrowLeft') KEYS.left = false;
    if (e.key === 'd' || e.key === 'ArrowRight') KEYS.right = false;
    if (e.code === 'Space') KEYS.action = false;
  });
}

// Get movement direction vector
export function getMovementVector(speed = 1) {
  let dx = 0;
  let dy = 0;

  if (KEYS.up) dy = -speed;
  if (KEYS.down) dy = speed;
  if (KEYS.left) dx = -speed;
  if (KEYS.right) dx = speed;

  // Normalize diagonal movement
  if (dx !== 0 && dy !== 0) {
    dx *= 0.707;
    dy *= 0.707;
  }

  return { dx, dy };
}

export default KEYS;
