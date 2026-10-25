/* ==========================================================================
   NEURAL BREACH - GAME ENGINE & HIGH-TECH MOTHERBOARD CANVAS
   ========================================================================== */
const TILE_SIZE = 56;
const COLS = 16;
const ROWS = 10;
const CANVAS_WIDTH = COLS * TILE_SIZE; // 896
const CANVAS_HEIGHT = ROWS * TILE_SIZE; // 560

/* ==========================================================================
   STAGE DEFINITIONS WITH CYBERNETIC PALETTES
   ========================================================================== */
const STAGES = [
  {
    name: 'STAGE 1: SUBNET GATEWAY',
    path: [[0, 2], [5, 2], [5, 7], [10, 7], [10, 3], [15, 3]],
    theme: {
      pcbBase: '#050a17',
      pcbGrid: '#0c172d',
      traceColor: '#00d0ea',
      viaGold: '#1ac2df',
      chipBody: '#0b1324',
      chipBorder: '#1c345b',
      heatsink: '#152542',
      roadOuter: '#0c1c38',
      roadInner: '#060f21',
      roadGlow: 'rgba(0, 240, 255, 0.25)',
      accentColor: '#00f0ff'
    }
  },
  {
    name: 'STAGE 2: DUAL CONVERGENCE',
    path: [[0, 1], [4, 1], [4, 5], [11, 5], [11, 8], [15, 8]],
    theme: {
      pcbBase: '#0c0a06',
      pcbGrid: '#211a0c',
      traceColor: '#cfa235',
      viaGold: '#ffbe26',
      chipBody: '#191309',
      chipBorder: '#4a3819',
      heatsink: '#30240d',
      roadOuter: '#2b1f0a',
      roadInner: '#120d04',
      roadGlow: 'rgba(255, 184, 0, 0.25)',
      accentColor: '#ffb800'
    }
  },
  {
    name: 'STAGE 3: SERPENTINE MATRIX',
    path: [[0, 4], [3, 4], [3, 1], [8, 1], [8, 8], [12, 8], [12, 4], [15, 4]],
    theme: {
      pcbBase: '#040d08',
      pcbGrid: '#092114',
      traceColor: '#10b981',
      viaGold: '#34d399',
      chipBody: '#091c11',
      chipBorder: '#134e2a',
      heatsink: '#0e381e',
      roadOuter: '#0c2e1a',
      roadInner: '#04140b',
      roadGlow: 'rgba(0, 255, 136, 0.22)',
      accentColor: '#00ff88'
    }
  },
  {
    name: 'STAGE 4: QUANTUM NEXUS',
    path: [[0, 7], [3, 7], [3, 2], [7, 2], [7, 7], [11, 7], [11, 2], [15, 2]],
    theme: {
      pcbBase: '#0a0515',
      pcbGrid: '#1b0e35',
      traceColor: '#a855f7',
      viaGold: '#c084fc',
      chipBody: '#160b2b',
      chipBorder: '#3b1d6e',
      heatsink: '#2b1452',
      roadOuter: '#2b124a',
      roadInner: '#0e051c',
      roadGlow: 'rgba(181, 55, 242, 0.26)',
      accentColor: '#b537f2'
    }
  }
];

/* ==========================================================================
   OFFSCREEN BACKGROUND CACHE (ZERO-LAG ARCHITECTURE)
   ========================================================================== */
const bgCanvas = document.createElement('canvas');
bgCanvas.width = CANVAS_WIDTH;
bgCanvas.height = CANVAS_HEIGHT;
const bgCtx = bgCanvas.getContext('2d');

/* ==========================================================================
   AUDIO SYNTHESIZER (Pure Web Audio API)
   ========================================================================== */
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }
  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }
  playPulse() {
    if (this.muted || !this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(140, t + 0.08);
    g.gain.setValueAtTime(0.08, t);
    g.gain.linearRampToValueAtTime(0, t + 0.08);
    osc.connect(g);
    g.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.08);
  }
  playRail() {
    if (this.muted || !this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1600, t);
    osc.frequency.exponentialRampToValueAtTime(60, t + 0.35);
    g.gain.setValueAtTime(0.2, t);
    g.gain.linearRampToValueAtTime(0, t + 0.35);
    osc.connect(g);
    g.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.35);
  }
  playEmp() {
    if (this.muted || !this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, t);
    osc.frequency.linearRampToValueAtTime(40, t + 0.4);
    g.gain.setValueAtTime(0.18, t);
    g.gain.linearRampToValueAtTime(0, t + 0.4);
    osc.connect(g);
    g.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.4);
  }
  playBlast() {
    if (this.muted || !this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.exponentialRampToValueAtTime(30, t + 0.25);
    g.gain.setValueAtTime(0.12, t);
    g.gain.linearRampToValueAtTime(0, t + 0.25);
    osc.connect(g);
    g.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.25);
  }
  playUpgrade() {
    if (this.muted || !this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, t);
    osc.frequency.linearRampToValueAtTime(880, t + 0.15);
    g.gain.setValueAtTime(0.15, t);
    g.gain.linearRampToValueAtTime(0, t + 0.15);
    osc.connect(g);
    g.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.15);
  }
}
const audio = new SoundEngine();

/* ==========================================================================
   GAME DEFINITIONS (10 TOWERS & 10 ENEMIES)
   ========================================================================== */
const TOWER_TYPES = [
  { id: 'blaster', name: 'Pulse Blaster', cost: 100, range: 130, dmg: 22, rate: 3.5, color: '#00f0ff', desc: 'Rapid twin pulse laser.', height: 32 },
  { id: 'railgun', name: 'Rail Sniper', cost: 175, range: 220, dmg: 95, rate: 0.9, color: '#ffb800', desc: 'Hyper-velocity armor-piercing slug.', height: 44 },
  { id: 'emp', name: 'EMP Nova', cost: 150, range: 110, dmg: 12, rate: 1.2, color: '#38bdf8', desc: 'Radial electromagnetic shield stripper.', height: 28, isAoe: true },
  { id: 'cryo', name: 'Cryo Cooler', cost: 130, range: 120, dmg: 6, rate: 2.0, color: '#67e8f9', desc: 'Slows rogue AI processes by 50%.', height: 30, slow: 0.5, slowDur: 2.5 },
  { id: 'tesla', name: 'Tesla Arc', cost: 210, range: 140, dmg: 35, rate: 1.6, color: '#c084fc', desc: 'High voltage arc chaining 4 enemies.', height: 38, chains: 4 },
  { id: 'decompiler', name: 'Virus Acid', cost: 160, range: 125, dmg: 8, rate: 2.2, color: '#4ade80', desc: 'Corrosive algorithmic memory leak.', height: 32, dot: 18, dotDur: 3.0 },
  { id: 'mortar', name: 'Plasma Mortar', cost: 240, range: 200, dmg: 110, rate: 0.6, color: '#f97316', desc: 'Long-range explosive plasma cluster.', height: 40, splashRadius: 55 },
  { id: 'siphon', name: 'Data Siphon', cost: 180, range: 90, dmg: 0, rate: 0.4, color: '#eab308', desc: 'Harvests rogue data for Bandwidth.', height: 36, income: 25 },
  { id: 'vortex', name: 'Null Vortex', cost: 260, range: 135, dmg: 28, rate: 1.4, color: '#ec4899', desc: 'Gravitational vortex dragging units back.', height: 42, pull: 35 },
  { id: 'deathray', name: 'Mainframe Ray', cost: 350, range: 160, dmg: 60, rate: 4.5, color: '#ff0055', desc: 'Continuous orbital particle beam.', height: 48 }
];

const ENEMY_TYPES = [
  { id: 'runner', name: 'Bit Runner', hp: 70, speed: 1.8, bounty: 12, size: 9, color: '#00f0ff' },
  { id: 'crawler', name: 'Crawler Bot', hp: 130, speed: 1.3, bounty: 16, size: 11, color: '#38bdf8' },
  { id: 'worm', name: 'Splitter Worm', hp: 200, speed: 1.1, bounty: 22, size: 12, color: '#4ade80', splits: true },
  { id: 'microworm', name: 'Micro-Worm', hp: 60, speed: 2.1, bounty: 8, size: 7, color: '#22c55e' },
  { id: 'brute', name: 'Neural Brute', hp: 450, speed: 0.75, bounty: 38, size: 16, color: '#94a3b8', armor: 0.35 },
  { id: 'drone', name: 'Shield Drone', hp: 180, shield: 120, speed: 1.25, bounty: 30, size: 11, color: '#818cf8' },
  { id: 'trojan', name: 'Trojan Carrier', hp: 380, speed: 0.9, bounty: 45, size: 14, color: '#c084fc', stealth: true },
  { id: 'phantom', name: 'Quantum Phantom', hp: 260, speed: 1.4, bounty: 35, size: 11, color: '#f43f5e', phase: true },
  { id: 'berserker', name: 'Overclocked Bot', hp: 320, speed: 1.2, bounty: 40, size: 13, color: '#fb923c', enrage: true },
  { id: 'overseer', name: 'Apex Overseer (Boss)', hp: 2400, shield: 800, speed: 0.55, bounty: 250, size: 22, color: '#e11d48', boss: true }
];

/* ==========================================================================
   ENGINE STATE
   ========================================================================== */
let currentStageIndex = 0;
let waypoints = [];
let pathLength = 0;
let roadTiles = new Set();

let bits = 650;
let coreHealth = 100;
let currentWave = 0;
let maxWaves = 20;
let score = 0;
let gameSpeed = 1;
let waveActive = false;

let towers = [];
let enemies = [];
let projectiles = [];
let particles = [];
let floatingTexts = [];

let selectedTowerType = null;
let selectedPlacedTower = null;
let mouseGrid = { col: -1, row: -1 };
let mouseWorld = { x: 0, y: 0, inside: false };

let spawnQueue = [];
let spawnTimer = 0;
let roadFlowOffset = 0;
let portalPulse = 0;

/* ==========================================================================
   INITIALIZATION & SETUP
   ========================================================================== */
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

/* ==========================================================================
   PROCEDURAL HIGH-TECH MOTHERBOARD GENERATOR (PRE-RENDERED TO bgCanvas)
   ========================================================================== */
function renderStaticMotherboard(theme) {
  bgCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // 1. PCB Substrate Base
  bgCtx.fillStyle = theme.pcbBase;
  bgCtx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // 2. Micro-Dot Matrix & PCB Grid Traces
  bgCtx.strokeStyle = theme.pcbGrid;
  bgCtx.lineWidth = 1;
  bgCtx.beginPath();
  for (let x = 0; x <= CANVAS_WIDTH; x += TILE_SIZE) {
    bgCtx.moveTo(x, 0); bgCtx.lineTo(x, CANVAS_HEIGHT);
  }
  for (let y = 0; y <= CANVAS_HEIGHT; y += TILE_SIZE) {
    bgCtx.moveTo(0, y); bgCtx.lineTo(CANVAS_WIDTH, y);
  }
  bgCtx.stroke();

  // Fine solder matrix dots
  bgCtx.fillStyle = 'rgba(255, 255, 255, 0.04)';
  for (let x = 8; x < CANVAS_WIDTH; x += 14) {
    for (let y = 8; y < CANVAS_HEIGHT; y += 14) {
      bgCtx.fillRect(x, y, 1.5, 1.5);
    }
  }

  // 3. Motherboard Silkscreen Labels & Test Points
  bgCtx.font = '8px monospace';
  bgCtx.fillStyle = 'rgba(255, 255, 255, 0.18)';
  bgCtx.fillText('REV 4.2 // NEURAL BUS ARCHITECTURE', 16, 18);
  bgCtx.fillText('VOLTAGE: 1.25V // BUS SPEED: 12.8 GT/s', CANVAS_WIDTH - 240, 18);

  // Corner mounting screws with brass washers
  const corners = [[16, 16], [CANVAS_WIDTH - 16, 16], [16, CANVAS_HEIGHT - 16], [CANVAS_WIDTH - 16, CANVAS_HEIGHT - 16]];
  corners.forEach(([cx, cy]) => {
    bgCtx.fillStyle = '#223046';
    bgCtx.beginPath();
    bgCtx.arc(cx, cy, 9, 0, Math.PI * 2);
    bgCtx.fill();
    bgCtx.strokeStyle = theme.viaGold;
    bgCtx.lineWidth = 1.5;
    bgCtx.stroke();
    // Screw cross
    bgCtx.strokeStyle = '#000';
    bgCtx.lineWidth = 2;
    bgCtx.beginPath();
    bgCtx.moveTo(cx - 4, cy); bgCtx.lineTo(cx + 4, cy);
    bgCtx.moveTo(cx, cy - 4); bgCtx.lineTo(cx, cy + 4);
    bgCtx.stroke();
  });

  // 4. Procedural IC Microchips & Components on Non-Road Tiles
  for (let c = 0; c < COLS; c++) {
    for (let r = 0; r < ROWS; r++) {
      if (roadTiles.has(`${c},${r}`)) continue;

      const tx = c * TILE_SIZE;
      const ty = r * TILE_SIZE;
      const randSeed = (c * 17 + r * 37) % 100;

      // Large Microprocessor Unit (CPU / ASIC)
      if (randSeed < 14) {
        const chipW = 38, chipH = 38;
        const cx = tx + (TILE_SIZE - chipW) / 2;
        const cy = ty + (TILE_SIZE - chipH) / 2;

        // Metallic pins on 4 sides
        bgCtx.fillStyle = theme.viaGold;
        for (let p = 4; p < chipW - 4; p += 6) {
          bgCtx.fillRect(cx + p, cy - 3, 2, 3); // top
          bgCtx.fillRect(cx + p, cy + chipH, 2, 3); // btm
          bgCtx.fillRect(cx - 3, cy + p, 3, 2); // left
          bgCtx.fillRect(cx + chipW, cy + p, 3, 2); // right
        }

        // Chip Body
        bgCtx.fillStyle = theme.chipBody;
        bgCtx.fillRect(cx, cy, chipW, chipH);
        bgCtx.strokeStyle = theme.chipBorder;
        bgCtx.lineWidth = 1.5;
        bgCtx.strokeRect(cx, cy, chipW, chipH);

        // Center Aluminum Heat Spreader
        bgCtx.fillStyle = theme.heatsink;
        bgCtx.fillRect(cx + 6, cy + 6, chipW - 12, chipH - 12);

        // Pin 1 gold dot
        bgCtx.fillStyle = theme.viaGold;
        bgCtx.beginPath();
        bgCtx.arc(cx + 4, cy + 4, 1.8, 0, Math.PI * 2);
        bgCtx.fill();

        // Stencil Label
        bgCtx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        bgCtx.font = '7px monospace';
        bgCtx.fillText('AI-ASIC', cx + 7, cy + 22);
      }
      // Rectangular SOIC IC Memory Module
      else if (randSeed >= 14 && randSeed < 28) {
        const chipW = 42, chipH = 22;
        const cx = tx + (TILE_SIZE - chipW) / 2;
        const cy = ty + (TILE_SIZE - chipH) / 2;

        // Gull-wing pins
        bgCtx.fillStyle = '#94a3b8';
        for (let p = 4; p < chipW - 4; p += 6) {
          bgCtx.fillRect(cx + p, cy - 3, 2, 3);
          bgCtx.fillRect(cx + p, cy + chipH, 2, 3);
        }

        bgCtx.fillStyle = theme.chipBody;
        bgCtx.fillRect(cx, cy, chipW, chipH);
        bgCtx.strokeStyle = theme.chipBorder;
        bgCtx.strokeRect(cx, cy, chipW, chipH);

        bgCtx.fillStyle = 'rgba(255, 255, 255, 0.35)';
        bgCtx.font = '6px monospace';
        bgCtx.fillText('SRAM-64', cx + 6, cy + 14);
      }
      // SMD Ceramic Capacitors & Gold Annular Vias
      else if (randSeed >= 28 && randSeed < 50) {
        // Gold Vias
        bgCtx.fillStyle = theme.viaGold;
        bgCtx.beginPath();
        bgCtx.arc(tx + 16, ty + 16, 3, 0, Math.PI * 2);
        bgCtx.arc(tx + TILE_SIZE - 16, ty + TILE_SIZE - 16, 3, 0, Math.PI * 2);
        bgCtx.fill();
        bgCtx.fillStyle = '#000';
        bgCtx.beginPath();
        bgCtx.arc(tx + 16, ty + 16, 1.2, 0, Math.PI * 2);
        bgCtx.arc(tx + TILE_SIZE - 16, ty + TILE_SIZE - 16, 1.2, 0, Math.PI * 2);
        bgCtx.fill();

        // 45-degree Angled Bus Trace
        bgCtx.strokeStyle = theme.traceColor;
        bgCtx.lineWidth = 1.2;
        bgCtx.beginPath();
        bgCtx.moveTo(tx + 16, ty + 16);
        bgCtx.lineTo(tx + 26, ty + 26);
        bgCtx.lineTo(tx + TILE_SIZE - 16, ty + TILE_SIZE - 16);
        bgCtx.stroke();
      }
    }
  }

  // 5. High-Tech 2D Road Conduit Trenches
  bgCtx.lineCap = 'round';
  bgCtx.lineJoin = 'round';

  // Ambient outer light glow from recessed trench
  bgCtx.strokeStyle = theme.roadGlow;
  bgCtx.lineWidth = TILE_SIZE * 0.95;
  bgCtx.beginPath();
  bgCtx.moveTo(waypoints[0].x, waypoints[0].y);
  for (let i = 1; i < waypoints.length; i++) bgCtx.lineTo(waypoints[i].x, waypoints[i].y);
  bgCtx.stroke();

  // Metallic Raised Conduit Edge Curb
  bgCtx.strokeStyle = theme.roadOuter;
  bgCtx.lineWidth = TILE_SIZE * 0.78;
  bgCtx.stroke();

  // Dark Recessed Trench Core
  bgCtx.strokeStyle = theme.roadInner;
  bgCtx.lineWidth = TILE_SIZE * 0.62;
  bgCtx.stroke();

  // Dual Neon Optical Guide Rails
  bgCtx.strokeStyle = theme.traceColor;
  bgCtx.lineWidth = 1.5;
  bgCtx.stroke();

  // Cross-hatch metal tread grates along road
  const step = 20;
  const numSteps = Math.floor(pathLength / step);
  bgCtx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  bgCtx.lineWidth = 1;
  for (let i = 0; i < numSteps; i++) {
    const pt = getPointAtDistance(i * step);
    const perpAngle = pt.angle + Math.PI / 2;
    const len = 14;
    bgCtx.beginPath();
    bgCtx.moveTo(pt.x + Math.cos(perpAngle) * len, pt.y + Math.sin(perpAngle) * len);
    bgCtx.lineTo(pt.x - Math.cos(perpAngle) * len, pt.y - Math.sin(perpAngle) * len);
    bgCtx.stroke();
  }
}

function buildStage(index) {
  currentStageIndex = index;
  const stage = STAGES[index];
  document.getElementById('hud-stage-name').innerText = stage.name;

  waypoints = stage.path.map(pt => ({
    col: pt[0],
    row: pt[1],
    x: pt[0] * TILE_SIZE + TILE_SIZE / 2,
    y: pt[1] * TILE_SIZE + TILE_SIZE / 2
  }));

  pathLength = 0;
  waypoints[0].dist = 0;
  for (let i = 1; i < waypoints.length; i++) {
    const dx = waypoints[i].x - waypoints[i - 1].x;
    const dy = waypoints[i].y - waypoints[i - 1].y;
    pathLength += Math.hypot(dx, dy);
    waypoints[i].dist = pathLength;
  }

  roadTiles.clear();
  for (let i = 0; i < stage.path.length - 1; i++) {
    const [c1, r1] = stage.path[i];
    const [c2, r2] = stage.path[i + 1];
    const minC = Math.min(c1, c2), maxC = Math.max(c1, c2);
    const minR = Math.min(r1, r2), maxR = Math.max(r1, r2);
    for (let c = minC; c <= maxC; c++) {
      for (let r = minR; r <= maxR; r++) {
        roadTiles.add(`${c},${r}`);
      }
    }
  }

  // Pre-render static background into offscreen buffer
  renderStaticMotherboard(stage.theme);

  towers = [];
  enemies = [];
  projectiles = [];
  particles = [];
  floatingTexts = [];
  spawnQueue = [];
  waveActive = false;
  currentWave = 0;
  coreHealth = 100;
  bits = 650;
  score = 0;
  selectedPlacedTower = null;
  hideInspector();
  updateHUD();
  showToast(`${stage.name} INITIALIZED`);
}

function getPointAtDistance(distance) {
  if (distance <= 0) return { x: waypoints[0].x, y: waypoints[0].y, angle: 0 };
  if (distance >= pathLength) {
    const last = waypoints[waypoints.length - 1];
    return { x: last.x, y: last.y, angle: 0 };
  }

  for (let i = 1; i < waypoints.length; i++) {
    if (distance <= waypoints[i].dist) {
      const p1 = waypoints[i - 1];
      const p2 = waypoints[i];
      const segLength = p2.dist - p1.dist;
      const t = (distance - p1.dist) / segLength;
      return {
        x: p1.x + (p2.x - p1.x) * t,
        y: p1.y + (p2.y - p1.y) * t,
        angle: Math.atan2(p2.y - p1.y, p2.x - p1.x)
      };
    }
  }
  return { x: waypoints[0].x, y: waypoints[0].y, angle: 0 };
}

/* ==========================================================================
   DYNAMIC FOREGROUND 2D BOARD RENDERING
   ========================================================================== */
function drawBoard2D() {
  const currentTheme = STAGES[currentStageIndex].theme;

  // 1. Instant Draw of Off-Screen Pre-rendered High-Tech Motherboard
  ctx.drawImage(bgCanvas, 0, 0);

  // 2. Animated Flowing Neon Data Chevrons along Road
  const chevronSpacing = 36;
  const numChevrons = Math.floor(pathLength / chevronSpacing);
  for (let i = 0; i < numChevrons; i++) {
    const d = (i * chevronSpacing + roadFlowOffset) % pathLength;
    const pt = getPointAtDistance(d);

    ctx.save();
    ctx.translate(pt.x, pt.y);
    ctx.rotate(pt.angle);

    ctx.globalAlpha = 0.55;
    ctx.beginPath();
    ctx.moveTo(-5, -6);
    ctx.lineTo(4, 0);
    ctx.lineTo(-5, 6);
    ctx.lineWidth = 2.2;
    ctx.strokeStyle = currentTheme.accentColor;
    ctx.stroke();

    ctx.restore();
  }

  // 3. AI Incursion Breach Socket (Animated Danger Vortex)
  const sp = waypoints[0];
  ctx.save();
  ctx.translate(sp.x, sp.y);

  // Outer warning hazard stripes ring
  ctx.save();
  ctx.rotate(-portalPulse * 0.4);
  for (let a = 0; a < 8; a++) {
    ctx.fillStyle = a % 2 === 0 ? '#ff3366' : '#111827';
    ctx.beginPath();
    ctx.arc(0, 0, 26, a * Math.PI / 4, (a + 1) * Math.PI / 4);
    ctx.lineTo(0, 0);
    ctx.fill();
  }
  ctx.restore();

  // Dark Inner Breach Eye
  ctx.fillStyle = '#060913';
  ctx.beginPath();
  ctx.arc(0, 0, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#ff3366';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Breach Label
  ctx.fillStyle = '#ff3366';
  ctx.font = 'bold 8px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('INCURSION', 0, 0);
  ctx.restore();

  // 4. Fortified Sovereign Human Core Socket (Animated Power Reactor)
  const cp = waypoints[waypoints.length - 1];
  ctx.save();
  ctx.translate(cp.x, cp.y);

  // Hexagonal Fortified Titanium Socket
  ctx.fillStyle = '#0b1928';
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const ang = i * Math.PI / 3 + portalPulse * 0.3;
    const px = Math.cos(ang) * 28;
    const py = Math.sin(ang) * 28;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#00ff88';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Inner Core Crystal
  const pulseScale = 1.0 + Math.sin(portalPulse * 3) * 0.12;
  ctx.fillStyle = 'rgba(0, 255, 136, 0.2)';
  ctx.beginPath();
  ctx.arc(0, 0, 16 * pulseScale, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#00ff88';
  ctx.beginPath();
  ctx.arc(0, 0, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#000';
  ctx.font = 'bold 8px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('CORE', 0, 0);
  ctx.restore();

  // 5. Grid Hover / Build Placement Indicator
  if (mouseWorld.inside && mouseGrid.col >= 0 && mouseGrid.col < COLS && mouseGrid.row >= 0 && mouseGrid.row < ROWS) {
    const isOccupied = roadTiles.has(`${mouseGrid.col},${mouseGrid.row}`) ||
                       towers.some(t => t.col === mouseGrid.col && t.row === mouseGrid.row);

    const gx = mouseGrid.col * TILE_SIZE;
    const gy = mouseGrid.row * TILE_SIZE;

    ctx.fillStyle = isOccupied ? 'rgba(255, 51, 102, 0.22)' : (selectedTowerType ? 'rgba(0, 240, 255, 0.18)' : 'rgba(255, 255, 255, 0.05)');
    ctx.fillRect(gx, gy, TILE_SIZE, TILE_SIZE);
    ctx.strokeStyle = isOccupied ? '#ff3366' : (selectedTowerType ? '#00f0ff' : 'rgba(255, 255, 255, 0.2)');
    ctx.lineWidth = 1.5;
    ctx.strokeRect(gx + 1, gy + 1, TILE_SIZE - 2, TILE_SIZE - 2);

    if (selectedTowerType && !isOccupied) {
      ctx.beginPath();
      ctx.arc(gx + TILE_SIZE / 2, gy + TILE_SIZE / 2, selectedTowerType.range, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 240, 255, 0.06)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  // 6. Selected Tower Range Ring
  if (selectedPlacedTower) {
    ctx.beginPath();
    ctx.arc(selectedPlacedTower.x, selectedPlacedTower.y, selectedPlacedTower.range, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 240, 255, 0.08)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 4]);
    ctx.stroke();
    ctx.setLineDash([]);
  }
}

/* ==========================================================================
   2.5D EXTRUDED TOWER CLASS
   ========================================================================== */
class Tower25D {
  constructor(type, col, row) {
    this.type = type;
    this.col = col;
    this.row = row;
    this.x = col * TILE_SIZE + TILE_SIZE / 2;
    this.y = row * TILE_SIZE + TILE_SIZE / 2;

    this.level = 1;
    this.kills = 0;
    this.targetMode = 'first';
    this.cooldown = 0;
    this.angle = 0;
    this.target = null;

    this.height = type.height || 32;
    this.dmg = type.dmg;
    this.range = type.range;
    this.rate = type.rate;
  }

  upgrade() {
    if (this.level >= 3) return false;
    this.level++;
    this.dmg = Math.round(this.dmg * 1.5);
    this.range = Math.round(this.range * 1.15);
    this.rate = +(this.rate * 1.15).toFixed(1);
    this.height += 6;
    audio.playUpgrade();
    return true;
  }

  update(dt) {
    if (this.cooldown > 0) this.cooldown -= dt;

    if (this.type.id === 'siphon') {
      if (this.cooldown <= 0) {
        bits += this.type.income * this.level;
        this.cooldown = 1 / this.rate;
        spawnFloatingText(`+${this.type.income * this.level} TB`, this.x, this.y - this.height, '#eab308');
        updateHUD();
      }
      return;
    }

    this.target = this.acquireTarget();

    if (this.target) {
      this.angle = Math.atan2(this.target.y - (this.y - this.height), this.target.x - this.x);

      if (this.cooldown <= 0) {
        this.fire(this.target);
        this.cooldown = 1 / this.rate;
      }
    }
  }

  acquireTarget() {
    const inRange = enemies.filter(e => {
      if (e.stealth && !e.revealed && this.type.id !== 'emp') return false;
      const d = Math.hypot(e.x - this.x, e.y - this.y);
      return d <= this.range;
    });

    if (inRange.length === 0) return null;

    switch (this.targetMode) {
      case 'last':
        return inRange.reduce((a, b) => a.distanceTraveled < b.distanceTraveled ? a : b);
      case 'strong':
        return inRange.reduce((a, b) => a.hp > b.hp ? a : b);
      case 'weak':
        return inRange.reduce((a, b) => a.hp < b.hp ? a : b);
      case 'close':
        return inRange.reduce((a, b) => Math.hypot(a.x - this.x, a.y - this.y) < Math.hypot(b.x - this.x, b.y - this.y) ? a : b);
      case 'first':
      default:
        return inRange.reduce((a, b) => a.distanceTraveled > b.distanceTraveled ? a : b);
    }
  }

  fire(target) {
    const launchX = this.x;
    const launchY = this.y - this.height;

    switch (this.type.id) {
      case 'blaster':
        projectiles.push(new Projectile(launchX, launchY, target, this.dmg, 650, this.type.color, 'laser', this));
        audio.playPulse();
        break;
      case 'railgun':
        projectiles.push(new Projectile(launchX, launchY, target, this.dmg, 1200, this.type.color, 'rail', this));
        audio.playRail();
        break;
      case 'emp':
        audio.playEmp();
        projectiles.push(new EmpWave(launchX, launchY, this.range, this.dmg, this));
        break;
      case 'cryo':
        projectiles.push(new Projectile(launchX, launchY, target, this.dmg, 450, this.type.color, 'cryo', this));
        break;
      case 'tesla':
        audio.playPulse();
        this.fireTeslaArc(target);
        break;
      case 'decompiler':
        projectiles.push(new Projectile(launchX, launchY, target, this.dmg, 480, this.type.color, 'acid', this));
        break;
      case 'mortar':
        audio.playBlast();
        projectiles.push(new MortarShell(launchX, launchY, target.x, target.y, this.dmg, this.type.splashRadius, this));
        break;
      case 'vortex':
        target.pullBack(this.type.pull * this.level);
        createParticles(target.x, target.y, 8, this.type.color);
        break;
      case 'deathray':
        target.takeDamage(this.dmg * 0.25, this);
        createBeam(launchX, launchY, target.x, target.y, this.type.color);
        break;
    }
  }

  fireTeslaArc(firstTarget) {
    let current = firstTarget;
    let hitList = [current];
    current.takeDamage(this.dmg, this);

    for (let c = 1; c < (this.type.chains || 3); c++) {
      const next = enemies.find(e => !hitList.includes(e) && Math.hypot(e.x - current.x, e.y - current.y) < 95);
      if (next) {
        hitList.push(next);
        next.takeDamage(Math.round(this.dmg * 0.75), this);
        current = next;
      } else {
        break;
      }
    }

    for (let i = 0; i < hitList.length - 1; i++) {
      createBeam(hitList[i].x, hitList[i].y, hitList[i + 1].x, hitList[i + 1].y, '#c084fc');
    }
    createBeam(this.x, this.y - this.height, hitList[0].x, hitList[0].y, '#c084fc');
  }

  draw() {
    const bx = this.x;
    const by = this.y;
    const h = this.height;
    const r = TILE_SIZE * 0.38;

    // Cast Drop Shadow
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
    ctx.beginPath();
    ctx.ellipse(bx + 6, by + 6, r * 0.95, r * 0.6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Solder Mounting Socket
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.ellipse(bx, by, r, r * 0.65, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;
    ctx.stroke();

    const topY = by - h;

    // Dark side face
    ctx.fillStyle = '#080d17';
    ctx.beginPath();
    ctx.moveTo(bx - r, by);
    ctx.lineTo(bx - r, topY);
    ctx.lineTo(bx, topY + r * 0.35);
    ctx.lineTo(bx, by + r * 0.35);
    ctx.closePath();
    ctx.fill();

    // Lit side face
    ctx.fillStyle = '#1d2d47';
    ctx.beginPath();
    ctx.moveTo(bx, by + r * 0.35);
    ctx.lineTo(bx, topY + r * 0.35);
    ctx.lineTo(bx + r, topY);
    ctx.lineTo(bx + r, by);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(bx, by + r * 0.35);
    ctx.lineTo(bx, topY + r * 0.35);
    ctx.stroke();

    // Elevated Deck Platform
    ctx.fillStyle = '#131e33';
    ctx.beginPath();
    ctx.ellipse(bx, topY, r * 0.85, r * 0.55, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = this.type.color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Level Indicators
    for (let l = 0; l < this.level; l++) {
      ctx.fillStyle = this.type.color;
      ctx.beginPath();
      ctx.arc(bx - 8 + l * 8, topY - 8, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Elevated Turret Head
    ctx.save();
    ctx.translate(bx, topY);
    ctx.rotate(this.angle);

    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = this.type.color;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = this.type.color;
    switch (this.type.id) {
      case 'blaster':
        ctx.fillRect(4, -4, 14, 2.5);
        ctx.fillRect(4, 1.5, 14, 2.5);
        break;
      case 'railgun':
        ctx.fillRect(4, -2, 22, 4);
        ctx.fillStyle = '#ffb800';
        ctx.fillRect(10, -3.5, 3, 7);
        break;
      case 'emp':
        ctx.strokeStyle = this.type.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.stroke();
        break;
      case 'mortar':
        ctx.fillStyle = '#334155';
        ctx.fillRect(2, -6, 16, 12);
        ctx.fillStyle = this.type.color;
        ctx.fillRect(14, -5, 4, 10);
        break;
      case 'tesla':
        ctx.fillRect(2, -2, 12, 4);
        ctx.beginPath();
        ctx.arc(14, 0, 4, 0, Math.PI * 2);
        ctx.fill();
        break;
      default:
        ctx.fillRect(2, -2.5, 14, 5);
        break;
    }

    ctx.restore();
  }
}

/* ==========================================================================
   2D TOP-DOWN ROGUE AI ENEMY CLASS
   ========================================================================== */
class Enemy2D {
  constructor(type, waveFactor = 1.0) {
    this.type = type;
    this.hp = Math.round(type.hp * waveFactor);
    this.maxHp = this.hp;
    this.shield = type.shield ? Math.round(type.shield * waveFactor) : 0;
    this.maxShield = this.shield;
    this.baseSpeed = type.speed;
    this.speed = this.baseSpeed;
    this.bounty = type.bounty;
    this.size = type.size;
    this.color = type.color;

    this.distanceTraveled = 0;
    this.x = waypoints[0].x;
    this.y = waypoints[0].y;
    this.angle = 0;

    this.slowTimer = 0;
    this.dotTimer = 0;
    this.dotDmg = 0;
    this.dotSource = null;

    this.stealth = !!type.stealth;
    this.revealed = false;
    this.phase = !!type.phase;
    this.phaseCooldown = 3.0;

    this.enraged = false;
    this.legCycle = 0;
    this.dead = false;
  }

  update(dt) {
    if (this.slowTimer > 0) {
      this.slowTimer -= dt;
      if (this.slowTimer <= 0) this.speed = this.baseSpeed;
    }

    if (this.dotTimer > 0) {
      this.dotTimer -= dt;
      this.takeDamage(this.dotDmg * dt, this.dotSource);
      if (Math.random() < 0.2) createParticles(this.x, this.y, 1, '#4ade80');
    }

    if (this.type.enrage && !this.enraged && this.hp < this.maxHp * 0.45) {
      this.enraged = true;
      this.speed = this.baseSpeed * 1.8;
      this.color = '#ff1100';
      spawnFloatingText('OVERCLOCKED!', this.x, this.y - 12, '#ff1100');
    }

    if (this.phase) {
      this.phaseCooldown -= dt;
      if (this.phaseCooldown <= 0) {
        this.distanceTraveled += 45;
        this.phaseCooldown = 3.5;
        createParticles(this.x, this.y, 10, '#f43f5e');
      }
    }

    this.distanceTraveled += this.speed * 60 * dt;
    this.legCycle += this.speed * 12 * dt;

    const pt = getPointAtDistance(this.distanceTraveled);
    this.x = pt.x;
    this.y = pt.y;
    this.angle = pt.angle;

    if (this.distanceTraveled >= pathLength) {
      this.dead = true;
      const penalty = this.type.boss ? 25 : 5;
      coreHealth = Math.max(0, coreHealth - penalty);
      spawnFloatingText(`-${penalty}% CORE!`, this.x, this.y, '#ff3366');
      audio.playBlast();
      updateHUD();
      if (coreHealth <= 0) gameOver();
    }
  }

  takeDamage(amount, source) {
    if (this.dead) return;

    if (this.type.armor) amount *= (1 - this.type.armor);

    if (this.shield > 0) {
      if (this.shield >= amount) {
        this.shield -= amount;
        amount = 0;
      } else {
        amount -= this.shield;
        this.shield = 0;
      }
    }

    this.hp -= amount;
    this.revealed = true;

    if (this.hp <= 0) {
      this.dead = true;
      bits += this.bounty;
      score += this.bounty * 10;
      if (source) source.kills++;
      audio.playBlast();
      createParticles(this.x, this.y, 14, this.color);
      spawnFloatingText(`+${this.bounty} TB`, this.x, this.y - 10, '#ffb800');
      updateHUD();

      if (this.type.splits) {
        for (let i = -1; i <= 1; i += 2) {
          const micro = new Enemy2D(ENEMY_TYPES.find(e => e.id === 'microworm'));
          micro.distanceTraveled = Math.max(0, this.distanceTraveled + i * 16);
          enemies.push(micro);
        }
      }
    }
  }

  pullBack(amount) {
    this.distanceTraveled = Math.max(0, this.distanceTraveled - amount);
    spawnFloatingText('PULL!', this.x, this.y - 8, '#ec4899');
  }

  applySlow(mult, duration) {
    this.slowTimer = duration;
    this.speed = this.baseSpeed * mult;
  }

  applyDot(dmg, duration, source) {
    this.dotDmg = dmg;
    this.dotTimer = duration;
    this.dotSource = source;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);

    if (this.stealth && !this.revealed) {
      ctx.globalAlpha = 0.35;
    }

    const barW = this.size * 2.4;
    const barH = 3;
    const barY = -this.size - 8;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(-barW / 2, barY, barW, barH);

    const hpRatio = Math.max(0, this.hp / this.maxHp);
    ctx.fillStyle = hpRatio > 0.5 ? '#00ff88' : (hpRatio > 0.25 ? '#ffb800' : '#ff3366');
    ctx.fillRect(-barW / 2, barY, barW * hpRatio, barH);

    if (this.maxShield > 0) {
      const shieldRatio = Math.max(0, this.shield / this.maxShield);
      ctx.fillStyle = '#00f0ff';
      ctx.fillRect(-barW / 2, barY - 3, barW * shieldRatio, 2);
    }

    ctx.rotate(this.angle);
    ctx.fillStyle = this.color;
    ctx.strokeStyle = '#ffffff';

    switch (this.type.id) {
      case 'runner':
        ctx.beginPath();
        ctx.moveTo(this.size, 0);
        ctx.lineTo(-this.size, -this.size * 0.7);
        ctx.lineTo(-this.size * 0.4, 0);
        ctx.lineTo(-this.size, this.size * 0.7);
        ctx.closePath();
        ctx.fill();
        break;

      case 'crawler':
      case 'microworm':
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = this.color;
        for (let l = -1; l <= 1; l++) {
          const legWobble = Math.sin(this.legCycle + l) * 5;
          ctx.beginPath();
          ctx.moveTo(0, l * 5);
          ctx.lineTo(-this.size * 0.8, l * 8 + legWobble);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(0, l * 5);
          ctx.lineTo(this.size * 0.8, l * 8 - legWobble);
          ctx.stroke();
        }
        break;

      case 'worm':
        for (let seg = 0; seg < 4; seg++) {
          ctx.beginPath();
          ctx.arc(-seg * 7, 0, this.size * 0.7 - seg * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
        break;

      case 'brute':
        ctx.fillRect(-this.size, -this.size * 0.8, this.size * 2, this.size * 1.6);
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(-this.size * 0.6, -this.size * 0.5, this.size * 1.2, this.size);
        ctx.fillStyle = '#ff0055';
        ctx.fillRect(this.size * 0.4, -2, 6, 4);
        break;

      case 'drone':
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 2;
        ctx.stroke();
        break;

      case 'trojan':
        ctx.beginPath();
        ctx.moveTo(this.size * 1.3, 0);
        ctx.lineTo(0, -this.size);
        ctx.lineTo(-this.size * 1.3, 0);
        ctx.lineTo(0, this.size);
        ctx.closePath();
        ctx.fill();
        break;

      case 'boss':
      case 'overseer':
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ff0055';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-4, -4, 8, 8);
        break;

      default:
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = i * Math.PI / 3;
          const px = Math.cos(a) * this.size;
          const py = Math.sin(a) * this.size;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        break;
    }

    ctx.restore();
  }
}

/* ==========================================================================
   PROJECTILES, PARTICLES & VISUAL FX
   ========================================================================== */
class Projectile {
  constructor(x, y, target, dmg, speed, color, style, source) {
    this.x = x;
    this.y = y;
    this.target = target;
    this.dmg = dmg;
    this.speed = speed;
    this.color = color;
    this.style = style;
    this.source = source;
    this.dead = false;
  }

  update(dt) {
    if (this.target.dead) {
      this.dead = true;
      return;
    }

    const dx = this.target.x - this.x;
    const dy = this.target.y - this.y;
    const dist = Math.hypot(dx, dy);
    const step = this.speed * dt;

    if (step >= dist) {
      this.x = this.target.x;
      this.y = this.target.y;
      this.target.takeDamage(this.dmg, this.source);

      if (this.style === 'cryo') this.target.applySlow(0.5, 2.5);
      if (this.style === 'acid') this.target.applyDot(18, 3.0, this.source);

      createParticles(this.x, this.y, 6, this.color);
      this.dead = true;
    } else {
      this.x += (dx / dist) * step;
      this.y += (dy / dist) * step;
    }
  }

  draw() {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class MortarShell {
  constructor(x, y, tx, ty, dmg, radius, source) {
    this.sx = x; this.sy = y;
    this.tx = tx; this.ty = ty;
    this.dmg = dmg;
    this.radius = radius;
    this.source = source;
    this.progress = 0;
    this.dead = false;
  }
  update(dt) {
    this.progress += dt * 1.6;
    if (this.progress >= 1.0) {
      this.dead = true;
      enemies.forEach(e => {
        const d = Math.hypot(e.x - this.tx, e.y - this.ty);
        if (d <= this.radius) {
          const falloff = 1 - (d / this.radius) * 0.5;
          e.takeDamage(Math.round(this.dmg * falloff), this.source);
        }
      });
      createParticles(this.tx, this.ty, 25, '#f97316');
      audio.playBlast();
    }
  }
  draw() {
    const t = this.progress;
    const curX = this.sx + (this.tx - this.sx) * t;
    const curY = this.sy + (this.ty - this.sy) * t - Math.sin(t * Math.PI) * 75;
    ctx.save();
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.arc(curX, curY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class EmpWave {
  constructor(x, y, maxRadius, dmg, source) {
    this.x = x; this.y = y;
    this.maxRadius = maxRadius;
    this.radius = 5;
    this.dmg = dmg;
    this.source = source;
    this.dead = false;
    this.hitSet = new Set();
  }
  update(dt) {
    this.radius += 240 * dt;
    if (this.radius >= this.maxRadius) {
      this.dead = true;
      return;
    }
    enemies.forEach(e => {
      if (!this.hitSet.has(e)) {
        const d = Math.hypot(e.x - this.x, e.y - this.y);
        if (d <= this.radius) {
          this.hitSet.add(e);
          e.shield = 0;
          e.takeDamage(this.dmg, this.source);
          e.applySlow(0.3, 2.0);
          e.revealed = true;
        }
      }
    });
  }
  draw() {
    ctx.save();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
}

function createParticles(x, y, count, color) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 20 + Math.random() * 80;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0.4 + Math.random() * 0.4,
      maxLife: 0.8,
      color
    });
  }
}

function createBeam(x1, y1, x2, y2, color) {
  particles.push({
    isBeam: true,
    x1, y1, x2, y2,
    life: 0.12,
    color
  });
}

function spawnFloatingText(text, x, y, color) {
  floatingTexts.push({ text, x, y, color, life: 0.9 });
}

/* ==========================================================================
   WAVE GENERATOR
   ========================================================================= */
function transmitWave() {
  if (waveActive) return;
  audio.init();

  currentWave++;
  if (currentWave > maxWaves) {
    showToast('ALL THREATS EXTERMINATED - STAGE CLEARED!');
    return;
  }

  waveActive = true;
  document.getElementById('btn-next-wave').disabled = true;
  updateHUD();

  spawnQueue = [];
  const waveFactor = 1.0 + (currentWave - 1) * 0.22;
  const count = 8 + currentWave * 3;

  for (let i = 0; i < count; i++) {
    let typeId = 'runner';
    if (currentWave >= 2 && i % 3 === 0) typeId = 'crawler';
    if (currentWave >= 4 && i % 5 === 0) typeId = 'worm';
    if (currentWave >= 6 && i % 4 === 0) typeId = 'brute';
    if (currentWave >= 8 && i % 4 === 1) typeId = 'drone';
    if (currentWave >= 10 && i % 5 === 2) typeId = 'trojan';
    if (currentWave >= 12 && i % 6 === 3) typeId = 'phantom';
    if (currentWave >= 14 && i % 5 === 4) typeId = 'berserker';

    if ((currentWave === 10 || currentWave === 20) && i === count - 1) {
      typeId = 'overseer';
    }

    const template = ENEMY_TYPES.find(e => e.id === typeId);
    spawnQueue.push({ type: template, factor: waveFactor });
  }

  spawnTimer = 0.5;
  showToast(`BREACH WAVE ${currentWave} DETECTED!`);
}

/* ==========================================================================
   GAME LOOP
   ========================================================================== */
let lastTimestamp = performance.now();

function gameLoop(timestamp) {
  const rawDt = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;

  const dt = Math.min(rawDt, 0.1) * gameSpeed;

  if (dt > 0) {
    roadFlowOffset = (roadFlowOffset + dt * 42) % pathLength;
    portalPulse += dt;

    if (spawnQueue.length > 0) {
      spawnTimer -= dt;
      if (spawnTimer <= 0) {
        const next = spawnQueue.shift();
        enemies.push(new Enemy2D(next.type, next.factor));
        spawnTimer = Math.max(0.35, 1.3 - currentWave * 0.04);
      }
    } else if (waveActive && enemies.length === 0) {
      waveActive = false;
      document.getElementById('btn-next-wave').disabled = false;
      const waveBonus = 75 + currentWave * 20;
      bits += waveBonus;
      showToast(`WAVE SECURED! +${waveBonus} TB ALLOCATED`);
      updateHUD();
    }

    enemies.forEach(e => e.update(dt));
    enemies = enemies.filter(e => !e.dead);

    towers.forEach(t => t.update(dt));

    projectiles.forEach(p => p.update(dt));
    projectiles = projectiles.filter(p => !p.dead);

    particles.forEach(p => p.life -= dt);
    particles = particles.filter(p => p.life > 0);

    floatingTexts.forEach(f => {
      f.y -= dt * 25;
      f.life -= dt;
    });
    floatingTexts = floatingTexts.filter(f => f.life > 0);
  }

  // 1. Draw High-Tech Motherboard Background & Flow Conduits
  drawBoard2D();

  // 2. Draw 2D Enemies
  enemies.forEach(e => e.draw());

  // 3. Draw 2.5D Extruded Towers (Sorted by row for isometric occlusion)
  const sortedTowers = [...towers].sort((a, b) => a.row - b.row);
  sortedTowers.forEach(t => t.draw());

  // 4. Draw Projectiles
  projectiles.forEach(p => p.draw());

  // 5. Draw Particles & Beams
  particles.forEach(p => {
    ctx.save();
    if (p.isBeam) {
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(p.x1, p.y1);
      ctx.lineTo(p.x2, p.y2);
      ctx.stroke();
    } else {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life / p.maxLife;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  });

  // 6. Draw Floating Texts
  floatingTexts.forEach(f => {
    ctx.save();
    ctx.font = 'bold 11px monospace';
    ctx.fillStyle = f.color;
    ctx.globalAlpha = Math.min(1.0, f.life * 1.5);
    ctx.textAlign = 'center';
    ctx.fillText(f.text, f.x, f.y);
    ctx.restore();
  });

  requestAnimationFrame(gameLoop);
}

/* ==========================================================================
   INPUT HANDLERS
   ========================================================================== */
function getCanvasMousePos(e) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (e.clientX - rect.left) * scaleX;
  const y = (e.clientY - rect.top) * scaleY;
  return {
    x, y,
    col: Math.floor(x / TILE_SIZE),
    row: Math.floor(y / TILE_SIZE)
  };
}

canvas.addEventListener('mousemove', e => {
  const pos = getCanvasMousePos(e);
  mouseWorld.x = pos.x;
  mouseWorld.y = pos.y;
  mouseWorld.inside = true;
  mouseGrid.col = pos.col;
  mouseGrid.row = pos.row;
});

canvas.addEventListener('mouseleave', () => {
  mouseWorld.inside = false;
  mouseGrid.col = -1;
  mouseGrid.row = -1;
});

canvas.addEventListener('click', e => {
  audio.init();
  const pos = getCanvasMousePos(e);
  const { col, row } = pos;
  if (col < 0 || col >= COLS || row < 0 || row >= ROWS) return;

  const existing = towers.find(t => t.col === col && t.row === row);
  if (existing) {
    selectedPlacedTower = existing;
    selectedTowerType = null;
    refreshTowerDock();
    showInspector(existing);
    return;
  }

  if (selectedTowerType) {
    const onRoad = roadTiles.has(`${col},${row}`);
    if (onRoad) {
      showToast('RESTRICTED: CANNOT BUILD ON HIGHWAY');
      return;
    }
    if (bits < selectedTowerType.cost) {
      showToast('INSUFFICIENT BANDWIDTH');
      return;
    }

    bits -= selectedTowerType.cost;
    const newTower = new Tower25D(selectedTowerType, col, row);
    towers.push(newTower);
    audio.playUpgrade();
    updateHUD();
    refreshTowerDock();

    selectedPlacedTower = newTower;
    showInspector(newTower);
    return;
  }

  selectedPlacedTower = null;
  hideInspector();
});

/* ==========================================================================
   UI & HUD CONTROL
   ========================================================================== */
function updateHUD() {
  document.getElementById('hud-bits').innerText = `${bits} TB`;
  document.getElementById('hud-core').innerText = `${coreHealth}%`;
  document.getElementById('hud-wave').innerText = `${currentWave} / ${maxWaves}`;
  document.getElementById('hud-score').innerText = score;

  const coreEl = document.getElementById('hud-core');
  if (coreHealth <= 25) coreEl.className = 'stat-val val-red';
  else if (coreHealth <= 60) coreEl.className = 'stat-val val-amber';
  else coreEl.className = 'stat-val val-green';

  refreshTowerDock();
  if (selectedPlacedTower) updateInspectorValues();
}

function refreshTowerDock() {
  const dock = document.getElementById('dock');
  dock.innerHTML = '';

  TOWER_TYPES.forEach((type, idx) => {
    const card = document.createElement('div');
    const isAffordable = bits >= type.cost;
    const isSelected = selectedTowerType && selectedTowerType.id === type.id;

    card.className = `tower-card ${!isAffordable ? 'disabled' : ''} ${isSelected ? 'selected' : ''}`;
    card.onclick = () => {
      audio.init();
      if (selectedTowerType && selectedTowerType.id === type.id) {
        selectedTowerType = null;
      } else {
        selectedTowerType = type;
        selectedPlacedTower = null;
        hideInspector();
      }
      refreshTowerDock();
    };

    card.innerHTML = `
      <div class="card-hotkey">${idx + 1}</div>
      <svg class="card-icon" viewBox="0 0 32 32">
        <rect x="6" y="10" width="20" height="14" fill="#0d192e" stroke="${type.color}" stroke-width="1.5" rx="3"/>
        <line x1="16" y1="10" x2="16" y2="4" stroke="${type.color}" stroke-width="2.5"/>
        <circle cx="16" cy="16" r="3.5" fill="${type.color}"/>
      </svg>
      <div class="card-name">${type.name}</div>
      <div class="card-cost">${type.cost} TB</div>
    `;
    dock.appendChild(card);
  });
}

function showInspector(tower) {
  const panel = document.getElementById('inspector-panel');
  panel.style.display = 'flex';
  updateInspectorValues();
}

function hideInspector() {
  document.getElementById('inspector-panel').style.display = 'none';
}

function updateInspectorValues() {
  if (!selectedPlacedTower) return;
  const t = selectedPlacedTower;
  document.getElementById('insp-name').innerText = t.type.name.toUpperCase();
  document.getElementById('insp-lvl').innerText = `LVL ${t.level}`;
  document.getElementById('insp-dmg').innerText = t.dmg;
  document.getElementById('insp-rng').innerText = t.range;
  document.getElementById('insp-spd').innerText = `${t.rate}/s`;
  document.getElementById('insp-mode-label').innerText = t.targetMode.toUpperCase();
  document.getElementById('insp-kills').innerText = t.kills;

  const upBtn = document.getElementById('btn-insp-upgrade');
  if (t.level >= 3) {
    upBtn.innerText = 'MAX LEVEL';
    upBtn.disabled = true;
  } else {
    const upCost = Math.round(t.type.cost * 0.85 * t.level);
    upBtn.innerText = `UPGRADE (${upCost})`;
    upBtn.disabled = bits < upCost;
    upBtn.onclick = () => {
      if (bits >= upCost) {
        bits -= upCost;
        t.upgrade();
        updateHUD();
      }
    };
  }

  const refund = Math.round(t.type.cost * 0.7 * t.level);
  const sellBtn = document.getElementById('btn-insp-sell');
  sellBtn.innerText = `SELL (${refund})`;
  sellBtn.onclick = () => {
    bits += refund;
    towers = towers.filter(tw => tw !== t);
    selectedPlacedTower = null;
    hideInspector();
    updateHUD();
  };

  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === t.targetMode);
    btn.onclick = () => {
      t.targetMode = btn.dataset.mode;
      updateInspectorValues();
    };
  });
}

document.getElementById('btn-insp-close').onclick = () => {
  selectedPlacedTower = null;
  hideInspector();
};

document.getElementById('btn-speed-pause').onclick = () => setSpeed(0);
document.getElementById('btn-speed-1').onclick = () => setSpeed(1);
document.getElementById('btn-speed-2').onclick = () => setSpeed(2);
document.getElementById('btn-speed-3').onclick = () => setSpeed(3);

function setSpeed(s) {
  gameSpeed = s;
  ['btn-speed-pause', 'btn-speed-1', 'btn-speed-2', 'btn-speed-3'].forEach(id => {
    document.getElementById(id).classList.remove('active');
  });
  if (s === 0) document.getElementById('btn-speed-pause').classList.add('active');
  if (s === 1) document.getElementById('btn-speed-1').classList.add('active');
  if (s === 2) document.getElementById('btn-speed-2').classList.add('active');
  if (s === 3) document.getElementById('btn-speed-3').classList.add('active');
}

document.getElementById('btn-next-wave').onclick = transmitWave;

document.getElementById('btn-mute').onclick = function() {
  audio.init();
  audio.muted = !audio.muted;
  this.innerText = audio.muted ? 'MUTED' : 'AUDIO';
  this.classList.toggle('active', !audio.muted);
};

window.addEventListener('keydown', e => {
  const num = parseInt(e.key);
  if (num >= 1 && num <= 9) {
    const type = TOWER_TYPES[num - 1];
    if (type) {
      selectedTowerType = type;
      selectedPlacedTower = null;
      hideInspector();
      refreshTowerDock();
    }
  } else if (e.key === '0') {
    selectedTowerType = TOWER_TYPES[9];
    selectedPlacedTower = null;
    hideInspector();
    refreshTowerDock();
  } else if (e.key === 'Escape') {
    selectedTowerType = null;
    selectedPlacedTower = null;
    hideInspector();
    refreshTowerDock();
  } else if (e.key === ' ') {
    transmitWave();
  }
});

let toastTimer = null;
function showToast(msg) {
  const el = document.getElementById('toast');
  el.innerText = msg;
  el.style.opacity = '1';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.style.opacity = '0'; }, 2400);
}

function openModal(id) { document.getElementById(id).style.display = 'flex'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

document.getElementById('btn-stage-select').onclick = () => openModal('stage-modal');
document.getElementById('btn-codex').onclick = () => {
  populateCodex();
  openModal('codex-modal');
};

function selectStage(idx) {
  closeModal('stage-modal');
  buildStage(idx);
}

function populateCodex() {
  const container = document.getElementById('codex-content');
  let html = '<div class="codex-grid">';
  html += '<div style="grid-column: span 2; font-weight:bold; color:var(--cyan); border-bottom:1px solid rgba(0,240,255,0.2); padding-bottom:4px;">DEFENSIVE 2.5D HARDWARE</div>';
  TOWER_TYPES.forEach(t => {
    html += `
      <div class="codex-card">
        <div class="codex-name" style="color:${t.color}">${t.name} (Cost: ${t.cost} TB)</div>
        <div>${t.desc}</div>
        <div style="margin-top:4px; font-size:10px; color:var(--cyan)">Damage: ${t.dmg} | Range: ${t.range} | Cadence: ${t.rate}/s</div>
      </div>
    `;
  });
  html += '<div style="grid-column: span 2; font-weight:bold; color:var(--red); border-bottom:1px solid rgba(255,51,102,0.2); padding-bottom:4px; margin-top:10px;">ROGUE AI THREAT INVENTORY</div>';
  ENEMY_TYPES.forEach(e => {
    html += `
      <div class="codex-card">
        <div class="codex-name" style="color:${e.color}">${e.name}</div>
        <div>Base HP: ${e.hp} | Speed: ${e.speed}x | Bounty: ${e.bounty} TB</div>
        <div style="margin-top:2px; font-size:10px; color:var(--text-secondary)">Special: ${e.shield ? 'Energy Shield. ' : ''}${e.armor ? 'Heavy Plated. ' : ''}${e.stealth ? 'Trojan Cloak. ' : ''}${e.splits ? 'Replication Splitting. ' : ''}${e.phase ? 'Quantum Shift. ' : ''}${e.boss ? 'Titan Class Boss.' : 'Standard Unit.'}</div>
      </div>
    `;
  });
  html += '</div>';
  container.innerHTML = html;
}

function gameOver() {
  showToast('CRITICAL BREACH: HUMAN MAINFRAME COMPROMISED');
  setTimeout(() => {
    alert(`GAME OVER! Final Wave: ${currentWave}, Score: ${score}`);
    buildStage(currentStageIndex);
  }, 100);
}

/* ==========================================================================
   START GAME
   ========================================================================== */
buildStage(0);
requestAnimationFrame(gameLoop);