/**
 * AudioSystem.js
 * Complete audio system with TTS, SFX, and Music
 * Extracted from monolithic version
 */

/**
 * TTSSystem - Text-to-Speech using browser's Speech Synthesis API
 */
export class TTSSystem {
    constructor() {
        this.synth = window.speechSynthesis;
        this.voice = null;
        this.voices = [];

        // Character voice configurations: pitch (0.1-2), rate (0.1-10), volume (0-1)
        this.characterVoices = {
            // Main characters - varied voices
            "Simon": { pitch: 0.8, rate: 0.88, volume: 1.0, desc: "Authoritative manager" },
            "Simon Unglaube": { pitch: 0.8, rate: 0.88, volume: 1.0, desc: "Authoritative manager" },
            "Carrie": { pitch: 1.3, rate: 1.05, volume: 0.95, desc: "Energetic, precise" },
            "Nevena": { pitch: 1.15, rate: 0.95, volume: 0.9, desc: "Calm, oracle-like" },
            "Joao": { pitch: 0.85, rate: 1.2, volume: 1.0, desc: "Loud, siren-like" },
            "Roman": { pitch: 0.7, rate: 0.9, volume: 0.75, desc: "Ghost-like, quiet" },
            "Erwin": { pitch: 0.95, rate: 1.1, volume: 1.0, desc: "Manager, confident" },
            // Bosses & antagonists - gender-appropriate voices
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
            // System voices
            "System": { pitch: 1.2, rate: 1.0, volume: 0.9, desc: "Female announcer" },
            "Corporate": { pitch: 0.55, rate: 0.9, volume: 1.0, desc: "Snarky corporate" },
            "Narrator": { pitch: 0.7, rate: 0.85, volume: 1.0, desc: "Dramatic narrator" }
        };

        this.init();
    }

    init() {
        const loadVoices = () => {
            this.voices = this.synth.getVoices();
            // Prioritize English voices - force English language
            const englishVoices = this.voices.filter(v =>
                v.lang.startsWith('en') || v.name.includes('English')
            );
            // Prefer Google US English, then any US English, then any English
            this.voice = englishVoices.find(v => v.name.includes("Google US English"))
                || englishVoices.find(v => v.lang === 'en-US')
                || englishVoices.find(v => v.lang.startsWith('en'))
                || this.voices[0];

            console.log('[TTS] Voice loaded:', this.voice?.name);
        };

        if (this.synth.onvoiceschanged !== undefined) {
            this.synth.onvoiceschanged = loadVoices;
        }
        loadVoices();
    }

    getVoiceConfig(speakerName) {
        // Find matching voice config by checking if speaker name contains any key
        for (const [name, config] of Object.entries(this.characterVoices)) {
            if (speakerName && speakerName.includes(name)) {
                return config;
            }
        }
        return { pitch: 0.9, rate: 1.0, volume: 0.9 }; // Default
    }

    speak(text, speakerName = "System", callback = null) {
        if (!this.synth || !text) {
            if (callback) callback();
            return;
        }

        this.synth.cancel();
        const utterance = new SpeechSynthesisUtterance(text);

        // Force English language
        utterance.lang = 'en-US';
        if (this.voice) utterance.voice = this.voice;

        // Apply character-specific voice settings
        const config = this.getVoiceConfig(speakerName);
        utterance.pitch = config.pitch;
        utterance.rate = config.rate;
        utterance.volume = config.volume;

        // Optional callback when speech ends
        if (callback) {
            utterance.onend = callback;
            utterance.onerror = callback;
        }

        this.synth.speak(utterance);
    }

    // Speak without canceling current speech (for queuing)
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
    }

    cancel() {
        if (this.synth) this.synth.cancel();
    }
}

/**
 * SFXSystem - Sound effects using Web Audio API
 */
export class SFXSystem {
    constructor() {
        this.ctx = null;
        this.init();
    }

    init() {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!this.ctx) {
            this.ctx = new AudioContext();
        }
        console.log('[SFX] Audio context initialized');
    }

    resume() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

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
    }

    playNoise(duration, vol = 0.1) {
        if (!this.ctx) return;

        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(vol, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

        noise.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start();
    }

    // Predefined sound effects
    step() {
        this.playNoise(0.05, 0.05);
    }

    throw() {
        this.playTone(400, 'square', 0.1, 0.1);
    }

    hit() {
        this.playNoise(0.1, 0.2);
        this.playTone(100, 'sawtooth', 0.1, 0.2);
    }

    bossHit() {
        this.playNoise(0.2, 0.3);
        this.playTone(80, 'sawtooth', 0.2, 0.3);
    }

    alert() {
        this.playTone(600, 'square', 0.2, 0.1);
    }

    text() {
        this.playTone(800, 'square', 0.03, 0.05);
    }

    fix() {
        [440, 554, 659].forEach((f, i) => {
            setTimeout(() => this.playTone(f, 'sine', 0.2, 0.1), i * 100);
        });
    }

    hurt() {
        this.playTone(150, 'sawtooth', 0.3, 0.2);
    }

    start() {
        [440, 440, 440, 660].forEach((f, i) => {
            setTimeout(() => this.playTone(f, 'square', 0.2, 0.2), i * 150);
        });
    }

    angry() {
        this.playTone(150, 'square', 0.5, 0.2);
    }

    select() {
        this.playTone(550, 'square', 0.1, 0.1);
    }

    bossIntro() {
        this.playTone(100, 'sawtooth', 1.0, 0.3);
        setTimeout(() => this.playTone(80, 'sawtooth', 1.0, 0.3), 200);
    }

    pop() {
        this.playTone(1200, 'sine', 0.05, 0.1);
    }
}

/**
 * MusicSystem - Background music player
 */
export class MusicSystem {
    constructor() {
        this.tracks = {
            title: new Audio('Pixel Reverie.mp3'),
            menu: new Audio('Game Over But Not Really.mp3'),
            ingame: new Audio('Pixel Warehouse Crawl.mp3'),
            boss: new Audio('Pixel Panic.mp3'),
            victory: new Audio('Pixel Victory.mp3'),
            mechaJeff: new Audio('Mecha Jeff Bezos Showdown.mp3'),
            megaSimon: new Audio('Mega Simon MEU WHS Regional Manager.mp3'),
            credits: new Audio('Game Over Symphony.mp3'),
            snesBoss: new Audio('SNES BOSS FIGHT MUSIC.mp3')
        };

        this.currentName = null;
        this.currentRate = 1;

        this.init();
    }

    init() {
        Object.values(this.tracks).forEach(audio => {
            audio.loop = true;
            audio.volume = 0.35;
            audio.preload = 'auto';
        });

        console.log('[Music] Tracks loaded:', Object.keys(this.tracks).length);
    }

    play(name, rate = 1) {
        const track = this.tracks[name];
        if (!track) {
            console.warn(`[Music] Track not found: ${name}`);
            return;
        }

        // If same track is playing, just adjust rate
        if (this.currentName === name) {
            this.currentRate = rate;
            track.playbackRate = rate;
            if (track.paused) {
                track.play().catch(() => {});
            }
            return;
        }

        // Stop current track if different
        if (this.currentName && this.currentName !== name) {
            this.stop();
        }

        this.currentName = name;
        this.currentRate = rate;
        track.playbackRate = rate;
        track.currentTime = 0;
        track.play().catch(() => {});

        console.log(`[Music] Playing: ${name} (rate: ${rate})`);
    }

    stop() {
        if (this.currentName && this.tracks[this.currentName]) {
            const current = this.tracks[this.currentName];
            current.pause();
            current.currentTime = 0;
        }
        this.currentName = null;
    }

    resume() {
        if (this.currentName && this.tracks[this.currentName]?.paused) {
            this.tracks[this.currentName].playbackRate = this.currentRate || 1;
            this.tracks[this.currentName].play().catch(() => {});
        }
    }

    getCurrentTrack() {
        return this.currentName;
    }

    setVolume(volume) {
        Object.values(this.tracks).forEach(audio => {
            audio.volume = Math.max(0, Math.min(1, volume));
        });
    }
}

/**
 * AudioSystem - Main coordinator for all audio systems
 */
export class AudioSystem {
    constructor() {
        this.tts = new TTSSystem();
        this.sfx = new SFXSystem();
        this.music = new MusicSystem();

        console.log('[Audio] Audio system initialized');
    }

    /**
     * Resume all audio contexts (needed after user interaction)
     */
    resume() {
        this.sfx.resume();
        this.music.resume();
    }

    /**
     * Get TTS system
     */
    getTTS() {
        return this.tts;
    }

    /**
     * Get SFX system
     */
    getSFX() {
        return this.sfx;
    }

    /**
     * Get Music system
     */
    getMusic() {
        return this.music;
    }

    /**
     * Update function (if needed for future features)
     */
    update(deltaTime) {
        // Future: fade in/out, ducking, etc.
    }
}

export default AudioSystem;
