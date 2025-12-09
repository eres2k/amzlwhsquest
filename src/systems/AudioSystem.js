/**
 * Audio System - Sound effects and background music
 * Handles Web Audio API for procedural sound effects and HTML5 Audio for music tracks
 */

import { AUDIO_CONFIG } from '../constants.js';

export class AudioSystem {
    constructor() {
        this.ctx = null;
    }

    init() {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!this.ctx) this.ctx = new AudioContext();
    }

    resume() {
        if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
    }

    playTone(freq, type, duration, vol = AUDIO_CONFIG.SFX_BASE_VOLUME) {
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

    playNoise(duration, vol = AUDIO_CONFIG.SFX_BASE_VOLUME) {
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
    }

    // Sound effects library
    sfx = {
        step: () => this.playNoise(0.05, 0.05),
        throw: () => this.playTone(400, 'square', 0.1, 0.1),
        hit: () => {
            this.playNoise(0.1, 0.2);
            this.playTone(100, 'sawtooth', 0.1, 0.2);
        },
        bossHit: () => {
            this.playNoise(0.2, 0.3);
            this.playTone(80, 'sawtooth', 0.2, 0.3);
        },
        alert: () => this.playTone(600, 'square', 0.2, 0.1),
        text: () => this.playTone(800, 'square', 0.03, 0.05),
        fix: () => {
            [440, 554, 659].forEach((f, i) =>
                setTimeout(() => this.playTone(f, 'sine', 0.2, 0.1), i * 100)
            );
        },
        hurt: () => this.playTone(150, 'sawtooth', 0.3, 0.2),
        start: () => {
            [440, 440, 440, 660].forEach((f, i) =>
                setTimeout(() => this.playTone(f, 'square', 0.2, 0.2), i * 150)
            );
        },
        angry: () => this.playTone(150, 'square', 0.5, 0.2),
        select: () => this.playTone(550, 'square', 0.1, 0.1),
        bossIntro: () => {
            this.playTone(100, 'sawtooth', 1.0, 0.3);
            setTimeout(() => this.playTone(80, 'sawtooth', 1.0, 0.3), 200);
        },
        pop: () => this.playTone(1200, 'sine', 0.05, 0.1)
    };
}

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
    }

    init() {
        Object.values(this.tracks).forEach(a => {
            a.loop = true;
            a.volume = AUDIO_CONFIG.MUSIC_VOLUME;
            a.preload = 'auto';
        });
    }

    play(name, rate = 1) {
        const track = this.tracks[name];
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
}
