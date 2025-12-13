/**
 * TTS System - Browser Web Speech API with localized voices
 * Character-specific voice configurations and multi-language support
 */

export class TTSSystem {
    constructor() {
        this.synth = window.speechSynthesis;
        this.voice = null;
        this.maleVoice = null;
        this.femaleVoice = null;
        // Localized voices for different regions
        this.germanMaleVoice = null;
        this.germanFemaleVoice = null;
        this.dutchMaleVoice = null;
        this.dutchFemaleVoice = null;
        this.voices = [];

        // Character voice configurations: pitch (0.1-2), rate (0.1-10), volume (0-1), gender preference
        this.characterVoices = {
            // Main characters - varied voices
            "Simon": { pitch: 0.8, rate: 0.88, volume: 1.0, gender: "male", desc: "Authoritative manager" },
            "Simon Unglaube": { pitch: 0.8, rate: 0.88, volume: 1.0, gender: "male", desc: "Authoritative manager" },
            "Carrie": { pitch: 1.3, rate: 1.05, volume: 0.95, gender: "female", desc: "Energetic, precise" },
            "Nevena": { pitch: 1.15, rate: 0.95, volume: 0.9, gender: "female", desc: "Calm, oracle-like" },
            "Joao": { pitch: 0.85, rate: 1.2, volume: 1.0, gender: "male", desc: "Loud, siren-like" },
            "Roman": { pitch: 0.7, rate: 0.9, volume: 0.75, gender: "male", desc: "Ghost-like, quiet" },
            "Erwin": { pitch: 0.95, rate: 1.1, volume: 1.0, gender: "male", desc: "Manager, confident" },
            // Bosses & antagonists - gender-appropriate voices
            "Jeff Bezos": { pitch: 0.6, rate: 0.8, volume: 1.0, gender: "male", desc: "Megalomaniac" },
            "Mecha Jeff": { pitch: 0.3, rate: 0.6, volume: 1.0, gender: "male", desc: "Robotic, terrifying" },
            "MECHA MEGA SIMON": { pitch: 0.25, rate: 1.1, volume: 1.0, gender: "male", desc: "Mechanical overlord" },
            "MEGA SIMON": { pitch: 0.7, rate: 0.82, volume: 1.0, gender: "male", desc: "Final boss authority" },
            "Labour Inspector": { pitch: 1.1, rate: 1.0, volume: 1.0, gender: "female", desc: "Stern female enforcer" },
            "Compliance Auditor": { pitch: 1.05, rate: 0.85, volume: 0.9, gender: "female", desc: "Meticulous female watcher" },
            "Sebastian Sprigade": { pitch: 0.75, rate: 1.15, volume: 1.0, gender: "male", desc: "Fast, TPH obsessed male" },
            "Regional OPS MGR": { pitch: 0.85, rate: 0.9, volume: 1.0, gender: "male", desc: "Male executive" },
            "Avetta Platform": { pitch: 0.3, rate: 0.7, volume: 0.85, gender: "neutral", desc: "AI, robotic" },
            "Jelena": { pitch: 1.15, rate: 0.95, volume: 0.95, gender: "female", desc: "HR guardian female" },
            "Jelly": { pitch: 1.15, rate: 0.95, volume: 0.95, gender: "female", desc: "HR guardian female" },
            // System voices
            "System": { pitch: 1.2, rate: 1.0, volume: 0.9, gender: "female", desc: "Female announcer" },
            "Corporate": { pitch: 0.55, rate: 0.9, volume: 1.0, gender: "male", desc: "Snarky corporate" },
            "Narrator": { pitch: 0.7, rate: 0.85, volume: 1.0, gender: "male", desc: "Dramatic narrator" }
        };
    }

    // Map game region to TTS language code
    getRegionLang() {
        if (typeof window.GAME === 'undefined' || !window.GAME.region) return 'en-US';
        switch (window.GAME.region) {
            case 'DE': return 'de-DE';
            case 'AT': return 'de-DE'; // Austrian German uses de-DE
            case 'NL': return 'nl-NL';
            default: return 'en-US';
        }
    }

    // Get appropriate voice for region and gender
    getLocalizedVoice(gender = "neutral") {
        const lang = this.getRegionLang();
        if (lang === 'de-DE') {
            if (gender === "male" && this.germanMaleVoice) return this.germanMaleVoice;
            if (gender === "female" && this.germanFemaleVoice) return this.germanFemaleVoice;
            return this.germanMaleVoice || this.germanFemaleVoice;
        }
        if (lang === 'nl-NL') {
            if (gender === "male" && this.dutchMaleVoice) return this.dutchMaleVoice;
            if (gender === "female" && this.dutchFemaleVoice) return this.dutchFemaleVoice;
            return this.dutchMaleVoice || this.dutchFemaleVoice;
        }
        // English fallback
        if (gender === "male" && this.maleVoice) return this.maleVoice;
        if (gender === "female" && this.femaleVoice) return this.femaleVoice;
        return this.voice;
    }

    init() {
        const loadVoices = () => {
            this.voices = this.synth.getVoices();

            // English voices (fallback)
            const englishVoices = this.voices.filter(v =>
                v.lang.startsWith('en') || v.name.includes('English')
            );
            // Default voice - prefer Google US English, then any US English, then any English
            this.voice = englishVoices.find(v => v.name.includes("Google US English"))
                || englishVoices.find(v => v.lang === 'en-US')
                || englishVoices.find(v => v.lang.startsWith('en'))
                || this.voices[0];

            // Try to find distinct male and female English voices
            this.maleVoice = englishVoices.find(v => v.name.toLowerCase().includes('male') && !v.name.toLowerCase().includes('female'))
                || englishVoices.find(v => v.name.includes('David'))
                || englishVoices.find(v => v.name.includes('Daniel'))
                || englishVoices.find(v => v.name.includes('Fred'))
                || englishVoices.find(v => v.name.includes('Alex'))
                || this.voice;

            this.femaleVoice = englishVoices.find(v => v.name.toLowerCase().includes('female'))
                || englishVoices.find(v => v.name.includes('Samantha'))
                || englishVoices.find(v => v.name.includes('Victoria'))
                || englishVoices.find(v => v.name.includes('Karen'))
                || englishVoices.find(v => v.name.includes('Moira'))
                || this.voice;

            // German voices for DE/AT regions
            const germanVoices = this.voices.filter(v =>
                v.lang.startsWith('de') || v.name.includes('German') || v.name.includes('Deutsch')
            );
            if (germanVoices.length > 0) {
                const defaultGerman = germanVoices.find(v => v.name.includes("Google Deutsch"))
                    || germanVoices.find(v => v.lang === 'de-DE')
                    || germanVoices[0];

                this.germanMaleVoice = germanVoices.find(v => v.name.toLowerCase().includes('male') && !v.name.toLowerCase().includes('female'))
                    || germanVoices.find(v => v.name.includes('Hans'))
                    || germanVoices.find(v => v.name.includes('Stefan'))
                    || defaultGerman;

                this.germanFemaleVoice = germanVoices.find(v => v.name.toLowerCase().includes('female'))
                    || germanVoices.find(v => v.name.includes('Anna'))
                    || germanVoices.find(v => v.name.includes('Petra'))
                    || germanVoices.find(v => v.name.includes('Marlene'))
                    || defaultGerman;
            }

            // Dutch voices for NL region
            const dutchVoices = this.voices.filter(v =>
                v.lang.startsWith('nl') || v.name.includes('Dutch') || v.name.includes('Nederlands')
            );
            if (dutchVoices.length > 0) {
                const defaultDutch = dutchVoices.find(v => v.name.includes("Google Nederlands"))
                    || dutchVoices.find(v => v.lang === 'nl-NL')
                    || dutchVoices[0];

                this.dutchMaleVoice = dutchVoices.find(v => v.name.toLowerCase().includes('male') && !v.name.toLowerCase().includes('female'))
                    || dutchVoices.find(v => v.name.includes('Xander'))
                    || defaultDutch;

                this.dutchFemaleVoice = dutchVoices.find(v => v.name.toLowerCase().includes('female'))
                    || dutchVoices.find(v => v.name.includes('Ellen'))
                    || dutchVoices.find(v => v.name.includes('Fleur'))
                    || defaultDutch;
            }
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
        return { pitch: 0.9, rate: 1.0, volume: 0.9, gender: "neutral" }; // Default
    }

    speak(text, speakerName = "System", callback = null) {
        if (!this.synth || !text) {
            if (callback) callback();
            return;
        }
        this.synth.cancel();
        const utterance = new SpeechSynthesisUtterance(text);

        // Set language based on game region (de-DE for DE/AT, nl-NL for NL, en-US fallback)
        const regionLang = this.getRegionLang();
        utterance.lang = regionLang;

        // Apply character-specific voice settings
        const config = this.getVoiceConfig(speakerName);

        // Try to use localized voice based on region
        const localizedVoice = this.getLocalizedVoice(config.gender);
        if (localizedVoice) {
            utterance.voice = localizedVoice;
        } else {
            // Fallback to English voices if no localized voice available
            utterance.lang = 'en-US';
            if (config.gender === "male" && this.maleVoice) {
                utterance.voice = this.maleVoice;
            } else if (config.gender === "female" && this.femaleVoice) {
                utterance.voice = this.femaleVoice;
            } else if (this.voice) {
                utterance.voice = this.voice;
            }
        }

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

        // Set language based on game region
        const regionLang = this.getRegionLang();
        utterance.lang = regionLang;

        // Apply character-specific voice settings
        const config = this.getVoiceConfig(speakerName);

        // Try to use localized voice based on region
        const localizedVoice = this.getLocalizedVoice(config.gender);
        if (localizedVoice) {
            utterance.voice = localizedVoice;
        } else {
            utterance.lang = 'en-US';
            if (config.gender === "male" && this.maleVoice) {
                utterance.voice = this.maleVoice;
            } else if (config.gender === "female" && this.femaleVoice) {
                utterance.voice = this.femaleVoice;
            } else if (this.voice) {
                utterance.voice = this.voice;
            }
        }

        utterance.pitch = config.pitch;
        utterance.rate = config.rate;
        utterance.volume = config.volume;
        this.synth.speak(utterance);
    }

    cancel() {
        if (this.synth) this.synth.cancel();
    }
}

// Helper function for external use
export function speakTTS(text, speakerName = "System", callback = null) {
    if (window.ttsSystem) {
        window.ttsSystem.speak(text, speakerName, callback);
    }
}

export function cancelTTS() {
    if (window.ttsSystem) {
        window.ttsSystem.cancel();
    }
}
