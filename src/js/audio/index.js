/**
 * Audio system - handles sound effects and music
 */

// TTS System with character voices
export const TTSSys = {
  synth: null,
  voice: null,
  voices: [],
  characterVoices: {
    "Simon": { pitch: 0.8, rate: 0.88, volume: 1.0, desc: "Authoritative manager" },
    "Simon Unglaube": { pitch: 0.8, rate: 0.88, volume: 1.0, desc: "Authoritative manager" },
    "Carrie": { pitch: 1.3, rate: 1.05, volume: 0.95, desc: "Energetic, precise" },
    "Nevena": { pitch: 1.15, rate: 0.95, volume: 0.9, desc: "Calm, oracle-like" },
    "Joao": { pitch: 0.85, rate: 1.2, volume: 1.0, desc: "Loud, siren-like" },
    "Roman": { pitch: 0.7, rate: 0.9, volume: 0.75, desc: "Ghost-like, quiet" },
    "Erwin": { pitch: 0.95, rate: 1.1, volume: 1.0, desc: "Manager, confident" },
    "Jeff Bezos": { pitch: 0.6, rate: 0.8, volume: 1.0, desc: "Megalomaniac" },
    "Mecha Jeff": { pitch: 0.3, rate: 0.6, volume: 1.0, desc: "Robotic, terrifying" },
    "MECHA MEGA SIMON": { pitch: 0.25, rate: 1.1, volume: 1.0, desc: "Mechanical overlord" },
    "MEGA SIMON": { pitch: 0.7, rate: 0.82, volume: 1.0, desc: "Final boss authority" },
    "Labour Inspector": { pitch: 1.1, rate: 1.0, volume: 1.0, desc: "Stern female enforcer" },
    "Compliance Auditor": { pitch: 1.05, rate: 0.85, volume: 0.9, desc: "Meticulous female watcher" },
    "Sebastian Sprigade": { pitch: 0.75, rate: 1.15, volume: 1.0, desc: "Fast, TPH obsessed male" },
    "Regional OPS MGR": { pitch: 0.85, rate: 0.9, volume: 1.0, desc: "Male executive" },
    "Avetta Platform": { pitch: 0.3, rate: 0.7, volume: 0.85, desc: "AI, robotic" },
    "Jelena": { pitch: 1.15, rate: 0.95, volume: 0.95, desc: "HR guardian female" },
    "Jelly": { pitch: 1.15, rate: 0.95, volume: 0.95, desc: "HR guardian female" },
    "System": { pitch: 1.2, rate: 1.0, volume: 0.9, desc: "Female announcer" },
    "Corporate": { pitch: 0.55, rate: 0.9, volume: 1.0, desc: "Snarky corporate" },
    "Narrator": { pitch: 0.7, rate: 0.85, volume: 1.0, desc: "Dramatic narrator" }
  },

  init() {
    if (typeof window === 'undefined') return;
    this.synth = window.speechSynthesis;
    const loadVoices = () => {
      this.voices = this.synth.getVoices();
      const englishVoices = this.voices.filter(v =>
        v.lang.startsWith('en') || v.name.includes('English')
      );
      this.voice = englishVoices.find(v => v.name.includes("Google US English"))
        || englishVoices.find(v => v.lang === 'en-US')
        || englishVoices.find(v => v.lang.startsWith('en'))
        || this.voices[0];
    };
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = loadVoices;
    }
    loadVoices();
  },

  getVoiceConfig(speakerName) {
    for (const [name, config] of Object.entries(this.characterVoices)) {
      if (speakerName && speakerName.includes(name)) return config;
    }
    return { pitch: 0.9, rate: 1.0, volume: 0.9 };
  },

  speak(text, speakerName = "System", callback = null) {
    if (!this.synth || !text) {
      if (callback) callback();
      return;
    }
    this.synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    if (this.voice) utterance.voice = this.voice;
    const config = this.getVoiceConfig(speakerName);
    utterance.pitch = config.pitch;
    utterance.rate = config.rate;
    utterance.volume = config.volume;
    if (callback) {
      utterance.onend = callback;
      utterance.onerror = callback;
    }
    this.synth.speak(utterance);
  },

  queue(text, speakerName = "System") {
    if (!this.synth || !text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    if (this.voice) utterance.voice = this.voice;
    const config = this.getVoiceConfig(speakerName);
    utterance.pitch = config.pitch;
    utterance.rate = config.rate;
    utterance.volume = config.volume;
    this.synth.speak(utterance);
  },

  cancel() {
    if (this.synth) this.synth.cancel();
  }
};

// Audio system for sound effects
export const AudioSys = {
  ctx: null,

  init() {
    if (typeof window === 'undefined') return;
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!this.ctx) this.ctx = new AudioContext();
  },

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  },

  playTone(freq, type, duration, vol = 0.1) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    gain.gain.setValueAtTime(vol, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  },

  playNoise(duration, vol = 0.1) {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(vol, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
    noise.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start();
  },

  sfx: {
    step: () => AudioSys.playNoise(0.05, 0.05),
    throw: () => AudioSys.playTone(400, 'square', 0.1, 0.1),
    hit: () => { AudioSys.playNoise(0.1, 0.2); AudioSys.playTone(100, 'sawtooth', 0.1, 0.2); },
    bossHit: () => { AudioSys.playNoise(0.2, 0.3); AudioSys.playTone(80, 'sawtooth', 0.2, 0.3); },
    alert: () => AudioSys.playTone(600, 'square', 0.2, 0.1),
    text: () => AudioSys.playTone(800, 'square', 0.03, 0.05),
    fix: () => { [440, 554, 659].forEach((f, i) => setTimeout(() => AudioSys.playTone(f, 'sine', 0.2, 0.1), i * 100)); },
    hurt: () => AudioSys.playTone(150, 'sawtooth', 0.3, 0.2),
    start: () => { [440, 440, 440, 660].forEach((f, i) => setTimeout(() => AudioSys.playTone(f, 'square', 0.2, 0.2), i * 150)); },
    angry: () => AudioSys.playTone(150, 'square', 0.5, 0.2),
    select: () => AudioSys.playTone(550, 'square', 0.1, 0.1),
    bossIntro: () => {
      AudioSys.playTone(100, 'sawtooth', 1.0, 0.3);
      setTimeout(() => AudioSys.playTone(80, 'sawtooth', 1.0, 0.3), 200);
    },
    pop: () => AudioSys.playTone(1200, 'sine', 0.05, 0.1)
  }
};

// Music system with lazy loading
export const MusicSys = {
  tracks: {},
  trackUrls: {
    title: '/Pixel Reverie.mp3',
    menu: '/Game Over But Not Really.mp3',
    ingame: '/Pixel Warehouse Crawl.mp3',
    boss: '/Pixel Panic.mp3',
    victory: '/Pixel Victory.mp3',
    mechaJeff: '/Mecha Jeff Bezos Showdown.mp3',
    megaSimon: '/Mega Simon MEU WHS Regional Manager.mp3',
    credits: '/Game Over Symphony.mp3'
  },
  currentName: null,
  currentRate: 1,
  initialized: false,

  init() {
    if (this.initialized || typeof Audio === 'undefined') return;
    this.initialized = true;
    // Lazy load - only create Audio objects when needed
  },

  getTrack(name) {
    if (!this.tracks[name] && this.trackUrls[name]) {
      this.tracks[name] = new Audio(this.trackUrls[name]);
      this.tracks[name].loop = true;
      this.tracks[name].volume = 0.35;
      this.tracks[name].preload = 'auto';
    }
    return this.tracks[name];
  },

  play(name, rate = 1) {
    const track = this.getTrack(name);
    if (!track) return;

    if (this.currentName === name) {
      this.currentRate = rate;
      track.playbackRate = rate;
      if (track.paused) track.play().catch(() => {});
      return;
    }

    if (this.currentName && this.currentName !== name) this.stop();
    this.currentName = name;
    this.currentRate = rate;
    track.playbackRate = rate;
    track.currentTime = 0;
    track.play().catch(() => {});
  },

  stop() {
    if (this.currentName && this.tracks[this.currentName]) {
      const current = this.tracks[this.currentName];
      current.pause();
      current.currentTime = 0;
    }
    this.currentName = null;
  },

  resume() {
    if (this.currentName && this.tracks[this.currentName]?.paused) {
      this.tracks[this.currentName].playbackRate = this.currentRate || 1;
      this.tracks[this.currentName].play().catch(() => {});
    }
  }
};

// Initialize TTS on module load
if (typeof window !== 'undefined') {
  TTSSys.init();
}
