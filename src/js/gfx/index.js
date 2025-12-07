/**
 * GFX Asset Generation System
 * This module generates all game sprites procedurally using canvas
 */

// Canvas creation helper
export const createCanvas = (w, h, drawFn) => {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  drawFn(ctx);
  return canvas;
};

// Short alias
const c = createCanvas;

// Main GFX container - populated by generateAssets()
export const GFX = {};

// Generate all game assets
export function generateAssets() {
  // Logo
  GFX.logo = c(48, 48, ctx => {
    const grad = ctx.createLinearGradient(0, 0, 48, 48);
    grad.addColorStop(0, '#ffd700');
    grad.addColorStop(0.5, '#f59e0b');
    grad.addColorStop(1, '#d97706');
    ctx.fillStyle = grad;
    ctx.fillRect(2, 2, 44, 44);
    ctx.strokeStyle = '#92400e';
    ctx.lineWidth = 2;
    ctx.strokeRect(2, 2, 44, 44);
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(4, 4, 40, 40);
    ctx.fillStyle = '#000';
    ctx.font = 'bold 28px monospace';
    ctx.fillText("EE", 9, 35);
    ctx.fillStyle = '#fff';
    ctx.fillText("EE", 7, 33);
  });

  // Character sprites
  generateCharacterSprites();

  // Attack projectiles
  generateAttackSprites();

  // Boss and NPC sprites
  generateBossSprites();
  generateNPCSprites();

  // Environment sprites
  generateEnvironmentSprites();

  // Hazard sprites
  generateHazardSprites();

  // Vehicle sprites
  generateVehicleSprites();

  // UI and effect sprites
  generateUISprites();
}

function generateCharacterSprites() {
  GFX.chars = {
    "Carrie": c(16, 16, ctx => {
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath(); ctx.ellipse(8, 15, 5, 2, 0, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = '#0a0f1f'; ctx.fillRect(2,0,12,6);
      ctx.fillStyle = '#1a2744'; ctx.fillRect(3,1,10,3);
      ctx.fillStyle = '#2a3755'; ctx.fillRect(4,1,3,2);
      ctx.fillStyle = '#d4a574'; ctx.fillRect(4,5,8,6);
      ctx.fillStyle = '#e8c49a'; ctx.fillRect(5,6,6,4);
      ctx.fillStyle = '#f5d0a0'; ctx.fillRect(6,6,4,3);
      ctx.fillStyle = '#1a1a1a'; ctx.fillRect(5,7,2,2); ctx.fillRect(9,7,2,2);
      ctx.fillStyle = '#fff'; ctx.fillRect(5,7,1,1); ctx.fillRect(9,7,1,1);
      ctx.fillStyle = '#0a0f1f'; ctx.fillRect(5,6,2,1); ctx.fillRect(9,6,2,1);
      ctx.fillStyle = '#c17b5f'; ctx.fillRect(7,9,2,1);
      ctx.fillStyle = '#22c55e'; ctx.fillRect(4,10,8,1);
      ctx.fillStyle = '#16a34a'; ctx.fillRect(3,8,1,3); ctx.fillRect(12,8,1,3);
      ctx.fillStyle = '#7c3aed'; ctx.fillRect(2,11,12,5);
      ctx.fillStyle = '#8b5cf6'; ctx.fillRect(3,11,10,3);
      ctx.fillStyle = '#a78bfa'; ctx.fillRect(5,12,6,2);
      ctx.fillStyle = '#c4b5fd'; ctx.fillRect(7,11,2,4);
      ctx.fillStyle = '#1e3a8a'; ctx.fillRect(3,15,4,1); ctx.fillRect(9,15,4,1);
      ctx.fillStyle = '#3b82f6'; ctx.fillRect(4,15,2,1); ctx.fillRect(10,15,2,1);
    }),
    "Nevena": c(16, 16, ctx => {
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath(); ctx.ellipse(8, 15, 5, 2, 0, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = '#5c2d12'; ctx.fillRect(2,1,12,5);
      ctx.fillStyle = '#7c3d1a'; ctx.fillRect(3,2,10,3);
      ctx.fillStyle = '#9a5a32'; ctx.fillRect(2,2,3,4);
      ctx.fillStyle = '#b8784a'; ctx.fillRect(3,2,2,2);
      ctx.fillStyle = '#0284c7'; ctx.fillRect(3,2,10,2);
      ctx.fillStyle = '#0ea5e9'; ctx.fillRect(4,2,8,1);
      ctx.fillStyle = '#d4a574'; ctx.fillRect(4,5,8,6);
      ctx.fillStyle = '#e8c49a'; ctx.fillRect(5,6,6,4);
      ctx.fillStyle = '#f5c89a'; ctx.fillRect(6,6,4,3);
      ctx.fillStyle = '#1a1a1a'; ctx.fillRect(5,7,2,2); ctx.fillRect(9,7,2,2);
      ctx.fillStyle = '#fff'; ctx.fillRect(5,7,1,1); ctx.fillRect(9,7,1,1);
      ctx.fillStyle = '#c17b5f'; ctx.fillRect(7,9,2,1);
      ctx.fillStyle = '#991b1b'; ctx.fillRect(2,11,12,5);
      ctx.fillStyle = '#b91c1c'; ctx.fillRect(3,11,10,3);
      ctx.fillStyle = '#dc2626'; ctx.fillRect(4,12,8,2);
      ctx.fillStyle = '#fbbf24'; ctx.fillRect(12,12,3,3);
      ctx.fillStyle = '#fcd34d'; ctx.fillRect(12,12,2,2);
      ctx.fillStyle = '#92400e'; ctx.fillRect(13,13,1,1);
      ctx.fillStyle = '#1f2937'; ctx.fillRect(4,15,3,1); ctx.fillRect(9,15,3,1);
    }),
    "Joao": c(16, 16, ctx => {
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath(); ctx.ellipse(8, 15, 5, 2, 0, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = '#0a0f1f'; ctx.fillRect(4,0,8,4);
      ctx.fillStyle = '#1a2744'; ctx.fillRect(5,1,6,2);
      ctx.fillRect(5,-1,2,2); ctx.fillRect(9,-1,2,2);
      ctx.fillStyle = '#c4956a'; ctx.fillRect(4,4,8,6);
      ctx.fillStyle = '#d4a574'; ctx.fillRect(5,5,6,4);
      ctx.fillStyle = '#e8b888'; ctx.fillRect(6,5,4,3);
      ctx.fillStyle = '#1a1a1a'; ctx.fillRect(5,6,2,2); ctx.fillRect(9,6,2,2);
      ctx.fillStyle = '#fff'; ctx.fillRect(5,6,1,1); ctx.fillRect(9,6,1,1);
      ctx.fillStyle = '#0a0f1f'; ctx.fillRect(5,5,2,1); ctx.fillRect(9,5,2,1);
      ctx.fillStyle = '#8b4513'; ctx.fillRect(6,8,4,2);
      ctx.fillStyle = '#fff'; ctx.fillRect(7,8,2,1);
      ctx.fillStyle = '#22d3ee'; ctx.fillRect(3,8,1,3);
      ctx.fillStyle = '#0ea5e9'; ctx.fillRect(2,10,2,2);
      ctx.fillStyle = '#c2410c'; ctx.fillRect(2,10,12,6);
      ctx.fillStyle = '#ea580c'; ctx.fillRect(3,10,10,4);
      ctx.fillStyle = '#f97316'; ctx.fillRect(4,11,8,2);
      ctx.fillStyle = '#fef08a'; ctx.fillRect(3,11,10,1);
      ctx.fillStyle = '#fef08a'; ctx.fillRect(3,13,10,1);
      ctx.fillStyle = '#0369a1'; ctx.fillRect(4,15,3,1); ctx.fillRect(9,15,3,1);
    }),
    "Roman": c(16, 16, ctx => {
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath(); ctx.ellipse(8, 15, 5, 2, 0, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = '#c4956a'; ctx.fillRect(4,2,8,8);
      ctx.fillStyle = '#d4a574'; ctx.fillRect(5,3,6,6);
      ctx.fillStyle = '#e8c49a'; ctx.fillRect(6,3,4,4);
      ctx.fillStyle = '#f5deb3'; ctx.fillRect(6,2,3,2);
      ctx.fillStyle = '#1a1a1a'; ctx.fillRect(5,5,2,1); ctx.fillRect(9,5,2,1);
      ctx.fillStyle = '#64748b'; ctx.fillRect(5,5,1,1); ctx.fillRect(9,5,1,1);
      ctx.fillStyle = '#8b6b5a'; ctx.fillRect(6,7,4,1);
      ctx.fillStyle = '#0a0f1f'; ctx.fillRect(2,10,12,6);
      ctx.fillStyle = '#1a2744'; ctx.fillRect(3,10,10,4);
      ctx.fillStyle = '#2a3755'; ctx.fillRect(4,11,8,2);
      ctx.fillStyle = '#374151'; ctx.fillRect(5,10,6,1);
      ctx.fillStyle = '#6b7280'; ctx.fillRect(2,13,3,2); ctx.fillRect(11,13,3,2);
      ctx.fillStyle = '#9ca3af'; ctx.fillRect(3,13,1,1); ctx.fillRect(12,13,1,1);
      ctx.fillStyle = '#0b1224'; ctx.fillRect(3,15,4,1); ctx.fillRect(9,15,4,1);
    }),
    "Erwin": c(16, 16, ctx => {
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.fillRect(1,14,14,2);
      ctx.fillStyle = '#3f3f46'; ctx.fillRect(1,8,14,6);
      ctx.fillStyle = '#52525b'; ctx.fillRect(2,9,12,4);
      ctx.fillStyle = '#71717a'; ctx.fillRect(3,9,10,2);
      ctx.fillStyle = '#4b5563'; ctx.fillRect(2,7,12,3);
      ctx.fillStyle = '#6b7280'; ctx.fillRect(4,7,8,2);
      ctx.fillStyle = '#9ca3af'; ctx.fillRect(5,7,3,1);
      ctx.fillStyle = '#0891b2'; ctx.fillRect(3,9,10,2);
      ctx.fillStyle = '#22d3ee'; ctx.fillRect(4,9,8,1);
      ctx.fillStyle = '#67e8f9'; ctx.fillRect(6,9,4,1);
      ctx.fillStyle = '#000'; ctx.fillRect(1,12,4,3); ctx.fillRect(11,12,4,3);
      ctx.fillStyle = '#27272a'; ctx.fillRect(2,12,2,2); ctx.fillRect(12,12,2,2);
      ctx.fillStyle = '#71717a'; ctx.fillRect(2,13,1,1); ctx.fillRect(13,13,1,1);
      ctx.fillStyle = '#fef08a'; ctx.fillRect(1,10,1,2); ctx.fillRect(14,10,1,2);
      ctx.fillStyle = '#d4a574'; ctx.fillRect(5,3,6,5);
      ctx.fillStyle = '#e8c49a'; ctx.fillRect(6,4,4,3);
      ctx.fillStyle = '#1a1a1a'; ctx.fillRect(5,2,6,3);
      ctx.fillStyle = '#2d2d2d'; ctx.fillRect(6,2,4,2);
      ctx.fillStyle = '#1a1a1a'; ctx.fillRect(6,6,4,2);
      ctx.fillStyle = '#000'; ctx.fillRect(6,4,1,1); ctx.fillRect(9,4,1,1);
      ctx.fillStyle = '#fff'; ctx.fillRect(6,4,1,1);
      ctx.fillStyle = '#f59e0b'; ctx.fillRect(7,5,2,1);
    })
  };
}

function generateAttackSprites() {
  GFX.attacks = {
    "Carrie": c(14, 14, ctx => {
      const grad = ctx.createRadialGradient(7, 7, 1, 7, 7, 7);
      grad.addColorStop(0, '#e879f9');
      grad.addColorStop(0.5, '#a855f7');
      grad.addColorStop(1, '#7c3aed');
      ctx.fillStyle = grad;
      ctx.fillRect(1,4,12,6);
      ctx.fillStyle = '#c4b5fd';
      ctx.fillRect(2,5,10,4);
      ctx.fillStyle = '#10b981';
      ctx.fillRect(6,2,2,10);
      ctx.fillStyle = '#fff';
      ctx.fillRect(4,6,6,2);
    }),
    "Nevena": c(14, 14, ctx => {
      ctx.fillStyle = '#0369a1';
      ctx.fillRect(2,2,10,10);
      const grad = ctx.createLinearGradient(0, 0, 14, 14);
      grad.addColorStop(0, '#f8fafc');
      grad.addColorStop(1, '#e2e8f0');
      ctx.fillStyle = grad;
      ctx.fillRect(3,3,8,8);
      ctx.fillStyle = '#334155';
      ctx.fillRect(4,4,6,1);
      ctx.fillRect(4,6,5,1);
      ctx.fillRect(4,8,4,1);
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(8,7,2,3);
      ctx.fillRect(6,9,2,1);
    }),
    "Joao": c(14, 14, ctx => {
      const grad = ctx.createLinearGradient(0, 0, 14, 0);
      grad.addColorStop(0, '#ea580c');
      grad.addColorStop(0.5, '#f97316');
      grad.addColorStop(1, '#fb923c');
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.moveTo(0,7); ctx.lineTo(6,2); ctx.lineTo(6,12); ctx.fill();
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath(); ctx.moveTo(4,7); ctx.lineTo(10,1); ctx.lineTo(10,13); ctx.fill();
      ctx.fillStyle = '#22d3ee';
      ctx.beginPath(); ctx.moveTo(8,7); ctx.lineTo(14,3); ctx.lineTo(14,11); ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(7,7,2,0,Math.PI*2); ctx.stroke();
    }),
    "Roman": c(14, 14, ctx => {
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(7,7,6,0,Math.PI*2); ctx.stroke();
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(7,7,4,0,Math.PI*2); ctx.stroke();
      ctx.fillStyle = '#1e293b';
      ctx.beginPath(); ctx.arc(7,7,2,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(6,0,2,3); ctx.fillRect(6,11,2,3);
      ctx.fillRect(0,6,3,2); ctx.fillRect(11,6,3,2);
    }),
    "Erwin": c(14, 14, ctx => {
      const grad = ctx.createRadialGradient(7, 7, 1, 7, 7, 7);
      grad.addColorStop(0, '#67e8f9');
      grad.addColorStop(0.5, '#22d3ee');
      grad.addColorStop(1, '#0891b2');
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(7, 7, 6, 0, Math.PI*2); ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(7, 1); ctx.lineTo(5, 4); ctx.lineTo(9, 6); ctx.lineTo(7, 9);
      ctx.stroke();
      ctx.fillStyle = '#f0f9ff';
      ctx.beginPath(); ctx.arc(7, 7, 2, 0, Math.PI*2); ctx.fill();
    })
  };

  // Rule book projectile
  GFX.book = c(10, 10, ctx => {
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(2,2,8,8);
    ctx.fillStyle = '#16a34a';
    ctx.fillRect(0,0,8,8);
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(1,1,6,6);
    ctx.fillStyle = '#15803d';
    ctx.fillRect(0,0,2,8);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(2,1,5,6);
    ctx.fillStyle = '#64748b';
    ctx.fillRect(3,2,3,1);
    ctx.fillRect(3,4,2,1);
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(3,5,2,2);
  });
}

function generateBossSprites() {
  // Simon sprite
  GFX.simon = c(16, 16, ctx => {
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath(); ctx.ellipse(8, 15, 5, 2, 0, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#5c3d2e'; ctx.fillRect(3,0,10,4);
    ctx.fillStyle = '#6b4423'; ctx.fillRect(4,1,8,2);
    ctx.fillStyle = '#7a5030'; ctx.fillRect(5,1,3,1);
    ctx.fillStyle = '#d4a574'; ctx.fillRect(4,4,8,6);
    ctx.fillStyle = '#e8c49a'; ctx.fillRect(5,5,6,4);
    ctx.fillStyle = '#000'; ctx.fillRect(4,5,3,2); ctx.fillRect(9,5,3,2);
    ctx.fillStyle = '#87ceeb'; ctx.fillRect(5,5,1,1); ctx.fillRect(10,5,1,1);
    ctx.fillStyle = '#475569'; ctx.fillRect(7,6,2,1);
    ctx.fillStyle = '#5c3d2e'; ctx.fillRect(4,8,8,2);
    ctx.fillStyle = '#6b4423'; ctx.fillRect(5,8,6,2);
    ctx.fillStyle = '#5c3d2e'; ctx.fillRect(6,9,4,1);
    ctx.fillStyle = '#b45309'; ctx.fillRect(2,10,12,6);
    ctx.fillStyle = '#d97706'; ctx.fillRect(3,10,10,4);
    ctx.fillStyle = '#f59e0b'; ctx.fillRect(4,11,8,2);
    ctx.fillStyle = '#fff'; ctx.fillRect(5,12,6,2);
    ctx.fillStyle = '#1f2937'; ctx.fillRect(4,15,3,1); ctx.fillRect(9,15,3,1);
  });

  GFX.simonFace = c(32, 32, ctx => {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(GFX.simon, 0, 0, 16, 16, 0, 0, 32, 32);
  });

  // Boss projectile
  GFX.bossProj = c(14, 14, ctx => {
    const grad = ctx.createRadialGradient(7, 7, 1, 7, 7, 7);
    grad.addColorStop(0, '#f5d0fe');
    grad.addColorStop(0.3, '#e879f9');
    grad.addColorStop(0.6, '#c026d3');
    grad.addColorStop(1, '#86198f');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(7, 7, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fdf4ff';
    ctx.beginPath();
    ctx.arc(7, 7, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.fillRect(6, 1, 2, 2);
    ctx.fillRect(6, 11, 2, 2);
    ctx.fillRect(1, 6, 2, 2);
    ctx.fillRect(11, 6, 2, 2);
  });

  // Bezos projectile
  GFX.bezosProj = c(12, 12, ctx => {
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(6, 6, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ff9900';
    ctx.beginPath();
    ctx.arc(6, 6, 3, 0, Math.PI * 2);
    ctx.fill();
  });

  // Simon Boss (larger for boss fight)
  GFX.simonBoss = c(32, 32, ctx => {
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.beginPath(); ctx.ellipse(16, 30, 10, 4, 0, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#5c3d2e'; ctx.fillRect(6,0,20,8);
    ctx.fillStyle = '#6b4423'; ctx.fillRect(8,2,16,4);
    ctx.fillStyle = '#d4a574'; ctx.fillRect(8,8,16,12);
    ctx.fillStyle = '#e8c49a'; ctx.fillRect(10,10,12,8);
    ctx.fillStyle = '#000'; ctx.fillRect(8,10,6,4); ctx.fillRect(18,10,6,4);
    ctx.fillStyle = '#87ceeb'; ctx.fillRect(10,10,2,2); ctx.fillRect(20,10,2,2);
    ctx.fillStyle = '#b45309'; ctx.fillRect(4,20,24,12);
    ctx.fillStyle = '#d97706'; ctx.fillRect(6,20,20,8);
    ctx.fillStyle = '#f59e0b'; ctx.fillRect(8,22,16,4);
    ctx.fillStyle = '#fff'; ctx.fillRect(10,24,12,4);
    ctx.fillStyle = '#1f2937'; ctx.fillRect(8,30,6,2); ctx.fillRect(18,30,6,2);
  });

  // Mecha Jeff
  GFX.mechaJeff = c(64, 64, ctx => {
    ctx.fillStyle = '#0a0f18'; ctx.fillRect(0,0,64,64);
    ctx.fillStyle = '#2d3748'; ctx.fillRect(12,30,40,28);
    ctx.fillStyle = '#3d4a5c'; ctx.fillRect(14,32,36,24);
    ctx.fillStyle = '#ff9900'; ctx.fillRect(24,38,16,12);
    ctx.fillStyle = '#ffb347'; ctx.fillRect(28,42,8,4);
    ctx.fillStyle = '#374151'; ctx.fillRect(0,30,14,24);
    ctx.fillStyle = '#374151'; ctx.fillRect(50,30,14,24);
    ctx.fillStyle = '#dc2626'; ctx.fillRect(4,40,6,6);
    ctx.fillStyle = '#dc2626'; ctx.fillRect(54,40,6,6);
    ctx.fillStyle = '#f5deb3'; ctx.fillRect(18,4,28,26);
    ctx.fillStyle = '#faebd7'; ctx.fillRect(22,2,20,12);
    ctx.fillStyle = '#7f1d1d'; ctx.fillRect(22,16,8,8); ctx.fillRect(34,16,8,8);
    ctx.fillStyle = '#dc2626'; ctx.fillRect(24,18,4,4); ctx.fillRect(36,18,4,4);
    ctx.fillStyle = '#1a1a1a'; ctx.fillRect(26,26,12,3);
    ctx.fillStyle = '#374151'; ctx.fillRect(18,56,12,8); ctx.fillRect(34,56,12,8);
  });

  // Mecha Mega Simon
  GFX.mechaMegaSimon = c(48, 48, ctx => {
    ctx.fillStyle = '#0a0f18'; ctx.fillRect(0,0,48,48);
    ctx.fillStyle = '#b45309'; ctx.fillRect(8,22,32,20);
    ctx.fillStyle = '#d97706'; ctx.fillRect(10,24,28,16);
    ctx.fillStyle = '#f59e0b'; ctx.fillRect(18,28,12,8);
    ctx.fillStyle = '#374151'; ctx.fillRect(0,22,10,18);
    ctx.fillStyle = '#374151'; ctx.fillRect(38,22,10,18);
    ctx.fillStyle = '#dc2626'; ctx.fillRect(2,28,6,6);
    ctx.fillStyle = '#dc2626'; ctx.fillRect(40,28,6,6);
    ctx.fillStyle = '#d4a574'; ctx.fillRect(14,2,20,18);
    ctx.fillStyle = '#e8c49a'; ctx.fillRect(16,4,16,14);
    ctx.fillStyle = '#6b4423'; ctx.fillRect(14,0,20,6);
    ctx.fillStyle = '#7f1d1d'; ctx.fillRect(16,10,6,6); ctx.fillRect(26,10,6,6);
    ctx.fillStyle = '#dc2626'; ctx.fillRect(18,12,2,2); ctx.fillRect(28,12,2,2);
    ctx.fillStyle = '#1a1a1a'; ctx.fillRect(20,16,8,2);
    ctx.fillStyle = '#374151'; ctx.fillRect(14,42,8,6); ctx.fillRect(26,42,8,6);
  });
}

function generateNPCSprites() {
  // Ops manager
  GFX.ops = c(16, 16, ctx => {
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath(); ctx.ellipse(8, 15, 5, 2, 0, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#1a1a1a'; ctx.fillRect(4,1,8,4);
    ctx.fillStyle = '#2d2d2d'; ctx.fillRect(5,2,6,2);
    ctx.fillStyle = '#d4a574'; ctx.fillRect(4,5,8,5);
    ctx.fillStyle = '#e8c49a'; ctx.fillRect(5,6,6,3);
    ctx.fillStyle = '#000'; ctx.fillRect(5,6,2,2); ctx.fillRect(9,6,2,2);
    ctx.fillStyle = '#fff'; ctx.fillRect(5,6,1,1); ctx.fillRect(9,6,1,1);
    ctx.fillStyle = '#8b6b5a'; ctx.fillRect(6,8,4,1);
    ctx.fillStyle = '#991b1b'; ctx.fillRect(2,10,12,6);
    ctx.fillStyle = '#b91c1c'; ctx.fillRect(3,10,10,4);
    ctx.fillStyle = '#dc2626'; ctx.fillRect(4,11,8,2);
    ctx.fillStyle = '#fff'; ctx.fillRect(6,10,4,1);
    ctx.fillStyle = '#1f2937'; ctx.fillRect(4,15,3,1); ctx.fillRect(9,15,3,1);
  });

  // Associate
  GFX.assoc = c(16, 16, ctx => {
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath(); ctx.ellipse(8, 15, 5, 2, 0, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#3f3f46'; ctx.fillRect(4,1,8,4);
    ctx.fillStyle = '#52525b'; ctx.fillRect(5,2,6,2);
    ctx.fillStyle = '#d4a574'; ctx.fillRect(4,5,8,5);
    ctx.fillStyle = '#e8c49a'; ctx.fillRect(5,6,6,3);
    ctx.fillStyle = '#1a1a1a'; ctx.fillRect(5,6,2,2); ctx.fillRect(9,6,2,2);
    ctx.fillStyle = '#fff'; ctx.fillRect(5,6,1,1); ctx.fillRect(9,6,1,1);
    ctx.fillStyle = '#ca8a04'; ctx.fillRect(2,10,12,6);
    ctx.fillStyle = '#eab308'; ctx.fillRect(3,10,10,4);
    ctx.fillStyle = '#fbbf24'; ctx.fillRect(4,11,8,2);
    ctx.fillStyle = '#fef08a'; ctx.fillRect(3,11,10,1); ctx.fillRect(3,13,10,1);
    ctx.fillStyle = '#1f2937'; ctx.fillRect(4,15,3,1); ctx.fillRect(9,15,3,1);
  });

  // Runner
  GFX.runner = c(16, 16, ctx => {
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(0, 14, 16, 2);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillRect(0, 8, 3, 1);
    ctx.fillRect(0, 11, 2, 1);
    ctx.fillRect(13, 6, 3, 1);
    ctx.fillRect(14, 9, 2, 1);
    ctx.fillStyle = '#3f3f46'; ctx.fillRect(3,1,10,4);
    ctx.fillStyle = '#52525b'; ctx.fillRect(4,2,8,2);
    ctx.fillStyle = '#d4a574'; ctx.fillRect(5,5,8,5);
    ctx.fillStyle = '#e8c49a'; ctx.fillRect(6,6,6,3);
    ctx.fillStyle = '#1a1a1a'; ctx.fillRect(6,6,2,2); ctx.fillRect(10,6,2,2);
    ctx.fillStyle = '#fff'; ctx.fillRect(7,6,1,1); ctx.fillRect(11,6,1,1);
    ctx.fillStyle = '#ca8a04'; ctx.fillRect(3,10,11,6);
    ctx.fillStyle = '#eab308'; ctx.fillRect(4,10,9,4);
    ctx.fillStyle = '#fef08a'; ctx.fillRect(4,11,9,1); ctx.fillRect(4,13,9,1);
    ctx.fillStyle = '#1f2937'; ctx.fillRect(3,14,3,2); ctx.fillRect(11,14,3,2);
  });

  // Drone
  GFX.drone = c(16, 16, ctx => {
    ctx.fillStyle = '#2a2a2a'; ctx.fillRect(4,6,8,4);
    ctx.fillStyle = '#444'; ctx.fillRect(2,4,3,8); ctx.fillRect(11,4,3,8);
    ctx.fillStyle = '#ff0000'; ctx.fillRect(7,7,2,2);
    ctx.fillStyle = '#ff9900'; ctx.fillRect(5,7,2,2); ctx.fillRect(9,7,2,2);
  });
}

function generateEnvironmentSprites() {
  // Floor tile
  GFX.floor = c(16, 16, ctx => {
    const floorGrad = ctx.createLinearGradient(0, 0, 16, 16);
    floorGrad.addColorStop(0, '#44444f');
    floorGrad.addColorStop(0.5, '#3c3c47');
    floorGrad.addColorStop(1, '#38383f');
    ctx.fillStyle = floorGrad;
    ctx.fillRect(0,0,16,16);
    ctx.fillStyle = '#3a3a42';
    ctx.fillRect(0,0,8,8);
    ctx.fillRect(8,8,8,8);
    ctx.fillStyle = '#4a4a55';
    ctx.fillRect(2,2,4,4);
    ctx.fillRect(10,10,4,4);
    ctx.fillStyle = '#2d2d35';
    ctx.fillRect(7,0,2,16);
    ctx.fillRect(0,7,16,2);
    ctx.fillStyle = '#35353d';
    ctx.fillRect(4,4,2,2);
    ctx.fillRect(11,3,1,1);
    ctx.fillRect(3,12,2,1);
    ctx.fillStyle = '#28282e';
    ctx.fillRect(0,15,16,1);
    ctx.fillRect(15,0,1,16);
  });

  // Wall tile
  GFX.wall = c(16, 16, ctx => {
    const wallGrad = ctx.createLinearGradient(0, 0, 0, 16);
    wallGrad.addColorStop(0, '#3d3530');
    wallGrad.addColorStop(0.5, '#4a4138');
    wallGrad.addColorStop(1, '#3a322c');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(0,0,16,16);
    ctx.fillStyle = '#4e443c';
    ctx.fillRect(1,1,6,6);
    ctx.fillRect(9,1,6,6);
    ctx.fillRect(1,9,6,6);
    ctx.fillRect(9,9,6,6);
    ctx.fillStyle = '#5d5248';
    ctx.fillRect(2,2,4,4);
    ctx.fillRect(10,2,4,4);
    ctx.fillRect(2,10,4,4);
    ctx.fillRect(10,10,4,4);
    ctx.fillStyle = '#6d6258';
    ctx.fillRect(3,3,2,2);
    ctx.fillRect(11,3,2,2);
    ctx.fillRect(3,11,2,2);
    ctx.fillRect(11,11,2,2);
    ctx.fillStyle = '#2a241f';
    ctx.fillRect(0,0,16,1);
    ctx.fillRect(0,8,16,1);
    ctx.fillRect(7,0,2,16);
    ctx.fillStyle = '#1a1612';
    ctx.fillRect(0,7,16,1);
    ctx.fillRect(0,15,16,1);
  });

  // Shelf
  GFX.shelf = c(16, 16, ctx => {
    ctx.fillStyle = '#92400e'; ctx.fillRect(0,0,4,16); ctx.fillRect(12,0,4,16);
    ctx.fillStyle = '#b45309'; ctx.fillRect(1,0,3,16); ctx.fillRect(13,0,3,16);
    ctx.fillStyle = '#d97706'; ctx.fillRect(2,0,1,16); ctx.fillRect(13,0,1,16);
    ctx.fillStyle = '#a16207'; ctx.fillRect(0,4,16,4); ctx.fillRect(0,11,16,4);
    ctx.fillStyle = '#ca8a04'; ctx.fillRect(1,5,14,2); ctx.fillRect(1,12,14,2);
    ctx.fillStyle = '#eab308'; ctx.fillRect(2,5,12,1); ctx.fillRect(2,12,12,1);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(4,2,3,2);
    ctx.fillRect(9,2,3,2);
    ctx.fillRect(5,9,4,2);
    ctx.fillStyle = '#dc2626'; ctx.fillRect(6,6,4,1);
    ctx.fillStyle = '#fbbf24'; ctx.fillRect(2,5,12,1); ctx.fillRect(2,11,12,1);
  });

  // Door
  GFX.door = c(16, 16, ctx => {
    ctx.fillStyle = '#064e3b'; ctx.fillRect(1,0,14,16);
    ctx.fillStyle = '#065f46'; ctx.fillRect(2,1,12,14);
    const doorGrad = ctx.createLinearGradient(3, 0, 13, 0);
    doorGrad.addColorStop(0, '#10b981');
    doorGrad.addColorStop(0.5, '#34d399');
    doorGrad.addColorStop(1, '#10b981');
    ctx.fillStyle = doorGrad;
    ctx.fillRect(3,2,10,12);
    ctx.fillStyle = '#0d9488'; ctx.fillRect(4,3,8,4);
    ctx.fillStyle = '#5eead4'; ctx.fillRect(5,4,6,2);
    ctx.fillStyle = '#fff'; ctx.fillRect(5,4,3,1);
    ctx.fillStyle = '#ca8a04'; ctx.fillRect(10,8,3,2);
    ctx.fillStyle = '#fbbf24'; ctx.fillRect(11,8,1,2);
    ctx.fillStyle = '#ecfdf5'; ctx.fillRect(5,10,6,2);
  });

  // Conveyor Belt
  GFX.conveyorBelt = c(16, 16, ctx => {
    ctx.fillStyle = '#374151'; ctx.fillRect(0,4,16,8);
    ctx.fillStyle = '#4b5563'; ctx.fillRect(1,5,14,6);
    ctx.fillStyle = '#1f2937';
    for (let i = 0; i < 8; i++) {
      ctx.fillRect(i * 2, 6, 1, 4);
    }
    ctx.fillStyle = '#6b7280'; ctx.fillRect(0,4,2,8); ctx.fillRect(14,4,2,8);
    ctx.fillStyle = '#9ca3af'; ctx.fillRect(0,6,2,4); ctx.fillRect(14,6,2,4);
    ctx.fillStyle = '#fbbf24'; ctx.fillRect(0,3,16,1); ctx.fillRect(0,12,16,1);
  });

  // Small package
  GFX.packageSmall = c(12, 12, ctx => {
    ctx.fillStyle = '#78350f'; ctx.fillRect(1,2,10,9);
    ctx.fillStyle = '#a16207'; ctx.fillRect(2,3,8,7);
    ctx.fillStyle = '#0ea5e9'; ctx.fillRect(4,5,4,2);
    ctx.fillStyle = '#fbbf24'; ctx.fillRect(3,3,6,1);
  });

  // Large package
  GFX.packageLarge = c(16, 14, ctx => {
    ctx.fillStyle = '#78350f'; ctx.fillRect(1,2,14,11);
    ctx.fillStyle = '#a16207'; ctx.fillRect(2,3,12,9);
    ctx.fillStyle = '#fbbf24'; ctx.fillRect(2,2,12,2);
    ctx.fillStyle = '#0ea5e9'; ctx.fillRect(5,6,6,2);
    ctx.fillStyle = '#111'; ctx.fillRect(7,8,2,2);
  });

  // Pallet stack
  GFX.palletStack = c(16, 16, ctx => {
    ctx.fillStyle = '#92400e'; ctx.fillRect(1,13,14,3);
    ctx.fillStyle = '#a16207'; ctx.fillRect(2,14,12,1);
    ctx.fillStyle = '#78350f'; ctx.fillRect(2,9,5,4); ctx.fillRect(8,9,6,4);
    ctx.fillStyle = '#a16207'; ctx.fillRect(3,10,3,2); ctx.fillRect(9,10,4,2);
    ctx.fillStyle = '#b45309'; ctx.fillRect(3,5,4,4); ctx.fillRect(8,6,5,3);
    ctx.fillStyle = '#d97706'; ctx.fillRect(4,6,2,2); ctx.fillRect(9,7,3,1);
    ctx.fillStyle = '#0ea5e9'; ctx.fillRect(4,7,2,1); ctx.fillRect(10,7,2,1);
  });
}

function generateHazardSprites() {
  GFX.hazards = {
    spill: c(16, 16, ctx => {
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.beginPath(); ctx.ellipse(8,11,7,4,0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = '#b91c1c';
      ctx.beginPath(); ctx.ellipse(8,10,6,4,0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = '#dc2626';
      ctx.beginPath(); ctx.ellipse(8,9,5,3,0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = '#ef4444';
      ctx.beginPath(); ctx.ellipse(6,8,2,1.5,0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = '#fecaca';
      ctx.fillRect(9,9,2,1);
    }),
    box: c(16, 16, ctx => {
      ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.fillRect(2,6,13,10);
      ctx.fillStyle = '#92400e'; ctx.fillRect(1,4,13,10);
      ctx.fillStyle = '#a16207'; ctx.fillRect(2,5,11,8);
      ctx.fillStyle = '#ca8a04'; ctx.fillRect(2,3,11,2);
      ctx.fillStyle = '#0284c7'; ctx.fillRect(4,7,6,2);
      ctx.fillStyle = '#f97316'; ctx.fillRect(5,10,4,1); ctx.fillRect(8,9,1,1);
      ctx.fillStyle = '#fff'; ctx.fillRect(9,5,3,3);
      ctx.fillStyle = '#111'; ctx.fillRect(10,6,1,1);
    }),
    tote: c(16, 16, ctx => {
      ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.fillRect(3,13,11,3);
      ctx.fillStyle = '#ca8a04'; ctx.fillRect(2,5,12,9);
      ctx.fillStyle = '#eab308'; ctx.fillRect(3,6,10,7);
      ctx.fillStyle = '#fbbf24'; ctx.fillRect(2,4,12,2);
      ctx.fillStyle = '#92400e'; ctx.fillRect(4,5,3,1); ctx.fillRect(9,5,3,1);
      ctx.fillStyle = '#fff'; ctx.fillRect(5,8,6,3);
      ctx.fillStyle = '#111'; ctx.fillRect(6,9,4,1);
    })
  };
}

function generateVehicleSprites() {
  // Van
  GFX.van = c(34, 18, ctx => {
    ctx.fillStyle = '#020617'; ctx.fillRect(0,12,34,6);
    ctx.fillStyle = '#0b1224'; ctx.fillRect(1,10,32,8);
    ctx.fillStyle = '#1d4ed8'; ctx.fillRect(2,4,30,10);
    ctx.fillStyle = '#1e3a8a'; ctx.fillRect(2,10,30,2);
    ctx.fillStyle = '#2563eb'; ctx.fillRect(4,6,26,8);
    ctx.fillStyle = '#60a5fa'; ctx.fillRect(6,7,14,5);
    ctx.fillStyle = '#c7d2fe'; ctx.fillRect(20,6,8,6);
    ctx.fillStyle = '#0ea5e9'; ctx.fillRect(22,9,6,2);
    ctx.fillStyle = '#0f172a'; ctx.fillRect(6,14,8,4); ctx.fillRect(22,14,8,4);
    ctx.fillStyle = '#eab308'; ctx.fillRect(4,12,2,2); ctx.fillRect(28,12,2,2);
    ctx.fillStyle = '#f8fafc'; ctx.fillRect(14,5,2,2);
    ctx.fillStyle = '#0f172a'; ctx.font = '6px monospace'; ctx.fillText('DSP', 6, 11);
    ctx.fillStyle = '#94a3b8'; ctx.fillRect(0,15,4,3); ctx.fillRect(30,15,4,3);
  });

  // Truck
  GFX.truck = c(52, 20, ctx => {
    ctx.fillStyle = '#020617'; ctx.fillRect(0,14,52,6);
    ctx.fillStyle = '#0b1224'; ctx.fillRect(1,12,50,8);
    ctx.fillStyle = '#cbd5e1'; ctx.fillRect(4,4,44,12);
    ctx.fillStyle = '#e5e7eb'; ctx.fillRect(6,6,40,10);
    ctx.fillStyle = '#94a3b8'; ctx.fillRect(6,8,18,8);
    ctx.fillStyle = '#f8fafc'; ctx.fillRect(24,8,24,8);
    ctx.fillStyle = '#dbeafe'; ctx.fillRect(6,6,14,3);
    ctx.fillStyle = '#1d4ed8'; ctx.fillRect(8,6,20,2);
    ctx.fillStyle = '#0ea5e9'; ctx.fillRect(8,12,34,2);
    ctx.fillStyle = '#0f172a'; ctx.fillRect(10,15,10,4); ctx.fillRect(34,15,10,4);
    ctx.fillStyle = '#facc15'; ctx.fillRect(4,4,4,10);
    ctx.fillStyle = '#0f172a'; ctx.font = '7px monospace'; ctx.fillText('PRIME', 22, 13);
    ctx.fillStyle = '#64748b'; ctx.fillRect(2,10,6,6);
    ctx.fillStyle = '#fbbf24'; ctx.fillRect(40,6,6,2);
    ctx.fillStyle = '#c2410c'; ctx.fillRect(0,16,52,1);
  });

  // Flying box
  GFX.flyingBox = c(14, 14, ctx => {
    ctx.fillStyle = '#78350f'; ctx.fillRect(1,3,12,10);
    ctx.fillStyle = '#a16207'; ctx.fillRect(2,2,10,10);
    ctx.fillStyle = '#f59e0b'; ctx.fillRect(2,6,10,2);
    ctx.fillStyle = '#111827'; ctx.fillRect(4,4,2,2); ctx.fillRect(8,4,2,2);
    ctx.fillStyle = '#fbbf24'; ctx.fillRect(6,1,2,2);
  });
}

function generateUISprites() {
  // Request projectile
  GFX.req = c(12, 12, ctx => {
    ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
    ctx.beginPath();
    ctx.arc(6, 6, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fef2f2';
    ctx.beginPath();
    ctx.moveTo(6,0);
    ctx.lineTo(12,6);
    ctx.lineTo(6,12);
    ctx.lineTo(0,6);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#fecaca';
    ctx.beginPath();
    ctx.moveTo(6,2);
    ctx.lineTo(10,6);
    ctx.lineTo(6,10);
    ctx.lineTo(2,6);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(5,3,2,4);
    ctx.fillRect(5,8,2,2);
  });

  // Clutter items
  GFX.clutter = {
    cart: c(16, 16, ctx => {
      ctx.fillStyle = '#444'; ctx.fillRect(2,6,12,8);
      ctx.fillStyle = '#8b4513'; ctx.fillRect(4,4,8,6);
    }),
    coffee: c(8, 8, ctx => {
      ctx.fillStyle = '#fff'; ctx.fillRect(2,2,4,5);
    }),
    paper: c(8, 8, ctx => {
      ctx.fillStyle = '#eee'; ctx.fillRect(1,3,6,4);
    }),
    tape: c(8, 8, ctx => {
      ctx.fillStyle = '#d97706';
      ctx.beginPath(); ctx.arc(4,4,3,0,Math.PI*2); ctx.fill();
    })
  };
}

export default GFX;
