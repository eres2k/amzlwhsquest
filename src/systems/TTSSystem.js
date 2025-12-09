/**
 * TTS System - Browser Web Speech API
 * Character-specific voice configurations
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
        };
        if (this.synth.onvoiceschanged !== undefined) {
            this.synth.onvoiceschanged = loadVoices;
        }
        loadVoices();
    }

    getVoiceConfig(speakerName) {
        // Find matching voice config by checking if speaker name contains any key
        for (const [name, config] of Object.entries(this.characterVoices)) {
            if (speakerName && speakerName.includes(name)) return config;
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
