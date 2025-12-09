/**
 * Gemini TTS System - Google Gemini 2.5 Flash TTS integration
 * Advanced voice generation with character-specific voices
 */

import { GAME_CONSTANTS } from '../constants.js';

export class TTSSettings {
    constructor() {
        this.mode = 'classic'; // 'classic' (Browser TTS) or 'advanced' (Gemini TTS)
        this.preloadedAudio = new Map(); // Cache for preloaded Gemini TTS audio
        this.preloadQueue = []; // Queue of texts to preload
        this.isPreloading = false;
        this.pendingPreloads = new Set(); // Track what's currently being preloaded
        // Loading state for UI indicator
        this.isLoading = false;
        this.loadingProgress = 0;
        this.loadingStartTime = 0;
    }
}

export class GeminiTTSSystem {
    constructor(ttsSettings, ensureApiKeyFn, ttsSystemFallback) {
        this.ttsSettings = ttsSettings;
        this.ensureApiKey = ensureApiKeyFn;
        this.ttsSystemFallback = ttsSystemFallback;

        // Voice mappings for characters - using Gemini 2.5 Flash TTS voices
        // Available voices: Puck, Charon, Kore, Fenrir, Aoede, Leda, Orus, Zephyr
        this.characterVoices = {
            // Main playable characters
            "Carrie": { voice: "Kore", style: "Upbeat, precise, energetic female" },
            "Nevena": { voice: "Aoede", style: "Calm, wise, oracle-like female" },
            "Joao": { voice: "Puck", style: "Loud, energetic, expressive male" },
            "Roman": { voice: "Fenrir", style: "Quiet, mysterious, ghostly male" },
            "Erwin": { voice: "Orus", style: "Confident, managerial male" },
            // Simon & variants
            "Simon": { voice: "Charon", style: "Deep, authoritative, stern male" },
            "Simon Unglaube": { voice: "Charon", style: "Deep, authoritative, stern male" },
            "MEGA SIMON": { voice: "Charon", style: "Intense, powerful, commanding male" },
            "MECHA MEGA SIMON": { voice: "Fenrir", style: "Mechanical, terrifying, robotic" },
            // Bosses
            "Jeff Bezos": { voice: "Orus", style: "Megalomaniacal, corporate, intense male" },
            "Mecha Jeff": { voice: "Fenrir", style: "Robotic, menacing, mechanical" },
            "Labour Inspector": { voice: "Kore", style: "Stern, authoritative female" },
            "Compliance Auditor": { voice: "Aoede", style: "Meticulous, watchful female" },
            "Sebastian Sprigade": { voice: "Puck", style: "Fast-talking, TPH-obsessed male" },
            "Regional OPS MGR": { voice: "Orus", style: "Executive, commanding male" },
            "Avetta Platform": { voice: "Fenrir", style: "Robotic, AI, monotone" },
            "Jelena": { voice: "Leda", style: "HR professional, firm female" },
            "Jelly": { voice: "Leda", style: "HR professional, firm female" },
            // System voices
            "System": { voice: "Aoede", style: "Clear, announcer female" },
            "Corporate": { voice: "Charon", style: "Cold, corporate male" },
            "Narrator": { voice: "Orus", style: "Dramatic, storytelling male" }
        };

        this.currentAudio = null;
        this.audioQueue = [];
        this.isPlaying = false;
        this.rateLimitHit = false;
    }

    getVoiceConfig(speakerName) {
        for (const [name, config] of Object.entries(this.characterVoices)) {
            if (speakerName && speakerName.includes(name)) return config;
        }
        return { voice: "Charon", style: "Default narrator" };
    }

    // Create WAV header for raw PCM audio data (Gemini TTS returns raw PCM)
    createWavHeader(dataLength, sampleRate, numChannels, bitsPerSample) {
        const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
        const blockAlign = numChannels * (bitsPerSample / 8);
        const header = new Uint8Array(44);
        const view = new DataView(header.buffer);

        // RIFF chunk descriptor
        header.set([0x52, 0x49, 0x46, 0x46], 0); // "RIFF"
        view.setUint32(4, 36 + dataLength, true); // File size - 8
        header.set([0x57, 0x41, 0x56, 0x45], 8); // "WAVE"

        // fmt sub-chunk
        header.set([0x66, 0x6D, 0x74, 0x20], 12); // "fmt "
        view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
        view.setUint16(20, 1, true); // AudioFormat (1 = PCM)
        view.setUint16(22, numChannels, true); // NumChannels
        view.setUint32(24, sampleRate, true); // SampleRate
        view.setUint32(28, byteRate, true); // ByteRate
        view.setUint16(32, blockAlign, true); // BlockAlign
        view.setUint16(34, bitsPerSample, true); // BitsPerSample

        // data sub-chunk
        header.set([0x64, 0x61, 0x74, 0x61], 36); // "data"
        view.setUint32(40, dataLength, true); // Subchunk2Size

        return header;
    }

    async generateTTS(text, speakerName = "System") {
        const activeKey = await this.ensureApiKey();
        if (!activeKey) return null;

        const config = this.getVoiceConfig(speakerName);
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${activeKey}`;

        const payload = {
            contents: [{
                parts: [{ text: text }]
            }],
            generationConfig: {
                responseModalities: ["AUDIO"],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: {
                            voiceName: config.voice
                        }
                    }
                }
            }
        };

        try {
            // Create abort controller for timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), GAME_CONSTANTS.TTS_TIMEOUT_MS);

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                // Handle rate limit (429) and other errors
                if (response.status === 429) {
                    console.log('[GeminiTTS] Rate limit reached, falling back to browser TTS');
                    this.rateLimitHit = true;
                } else {
                    console.log('[GeminiTTS] API error:', response.status);
                }
                return null;
            }

            const data = await response.json();
            const audioData = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

            if (audioData) {
                // Convert base64 to audio blob
                const binaryString = atob(audioData);
                const pcmData = new Uint8Array(binaryString.length);
                for (let i = 0; i < binaryString.length; i++) {
                    pcmData[i] = binaryString.charCodeAt(i);
                }

                // Get MIME type from response (Gemini returns audio/L16;rate=24000 for raw PCM)
                const mimeType = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.mimeType || '';

                // Check if it's raw PCM audio that needs WAV header
                if (mimeType.includes('audio/L16') || mimeType.includes('audio/pcm')) {
                    // Extract sample rate from MIME type (default 24000 for Gemini TTS)
                    const rateMatch = mimeType.match(/rate=(\d+)/);
                    const sampleRate = rateMatch ? parseInt(rateMatch[1]) : 24000;

                    // Create WAV header for raw PCM data
                    const wavHeader = this.createWavHeader(pcmData.length, sampleRate, 1, 16);
                    const wavData = new Uint8Array(wavHeader.length + pcmData.length);
                    wavData.set(wavHeader, 0);
                    wavData.set(pcmData, wavHeader.length);

                    const blob = new Blob([wavData], { type: 'audio/wav' });
                    return URL.createObjectURL(blob);
                } else {
                    // For other formats (MP3, OGG, etc.), use the returned MIME type
                    const blob = new Blob([pcmData], { type: mimeType || 'audio/mpeg' });
                    return URL.createObjectURL(blob);
                }
            }
            return null;
        } catch (e) {
            // Handle timeout specifically
            if (e.name === 'AbortError') {
                console.log('[GeminiTTS] Request timed out after 10s, falling back to browser TTS');
            } else {
                console.log('[GeminiTTS] Error:', e);
            }
            return null;
        }
    }

    async speak(text, speakerName = "System", callback = null) {
        if (!text) {
            if (callback) callback();
            return;
        }

        // Stop any currently playing audio
        this.stop();

        // If rate limit was hit, fall back immediately to browser TTS
        if (this.rateLimitHit) {
            console.log('[GeminiTTS] Using browser TTS due to previous rate limit');
            this.ttsSystemFallback.speak(text, speakerName, callback);
            return;
        }

        // Check preloaded cache first
        const cacheKey = `${speakerName}:${text}`;
        let audioUrl = this.ttsSettings.preloadedAudio.get(cacheKey);

        if (!audioUrl) {
            // Show loading indicator while generating TTS
            this.ttsSettings.isLoading = true;
            this.ttsSettings.loadingStartTime = Date.now();
            this.ttsSettings.loadingProgress = 0;

            // Generate new TTS
            audioUrl = await this.generateTTS(text, speakerName);

            // Hide loading indicator
            this.ttsSettings.isLoading = false;
        }

        if (audioUrl) {
            this.currentAudio = new Audio(audioUrl);
            this.currentAudio.volume = 0.85;

            this.currentAudio.onended = () => {
                this.isPlaying = false;
                if (callback) callback();
                this.playNextInQueue();
            };

            this.currentAudio.onerror = () => {
                this.isPlaying = false;
                console.log('[GeminiTTS] Audio playback error, falling back to browser TTS');
                // Fallback to browser TTS on error
                this.ttsSystemFallback.speak(text, speakerName, callback);
            };

            this.isPlaying = true;
            this.currentAudio.play().catch(() => {
                console.log('[GeminiTTS] Audio play() failed, falling back to browser TTS');
                // Fallback to browser TTS
                this.ttsSystemFallback.speak(text, speakerName, callback);
            });
        } else {
            // Fallback to browser TTS
            console.log('[GeminiTTS] No audio URL, falling back to browser TTS');
            this.ttsSystemFallback.speak(text, speakerName, callback);
        }
    }

    queue(text, speakerName = "System") {
        this.audioQueue.push({ text, speakerName });
        if (!this.isPlaying) {
            this.playNextInQueue();
        }
    }

    async playNextInQueue() {
        if (this.audioQueue.length === 0 || this.isPlaying) return;
        const next = this.audioQueue.shift();
        await this.speak(next.text, next.speakerName);
    }

    stop() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            this.currentAudio = null;
        }
        this.isPlaying = false;
        this.audioQueue = [];
    }

    cancel() {
        this.stop();
    }
}

export class TTSPreloader {
    constructor(ttsSettings, geminiTTS) {
        this.ttsSettings = ttsSettings;
        this.geminiTTS = geminiTTS;

        // Hardcoded dialogue lines to preload for each game state
        this.preloadLists = {
            'SELECT': [
                { text: "Carrie", speaker: "System" },
                { text: "Nevena", speaker: "System" },
                { text: "Joao", speaker: "System" },
                { text: "Roman", speaker: "System" },
                { text: "Erwin", speaker: "System" }
            ],
            'BOSS_INTRO': [
                { text: "I AM THE SAFETY STANDARD!", speaker: "MEGA SIMON" },
                { text: "YOU CANNOT ESCAPE THE AUDIT!", speaker: "MEGA SIMON" },
                { text: "ENTROPY COMES FOR US ALL!", speaker: "MEGA SIMON" },
                { text: "YOUR PPE IS INSUFFICIENT!", speaker: "MEGA SIMON" }
            ],
            'VISITOR_SPLASH': [
                { text: "VISITOR ALERT!", speaker: "System" },
                { text: "SURPRISE AUDIT INCOMING!", speaker: "System" }
            ],
            'SIMON_VICTORY_FAKE': [
                { text: "Ha! Is that all you've got, Simon?", speaker: "Carrie" },
                { text: "I actually did it! I won!", speaker: "Nevena" },
                { text: "YES! Take that!", speaker: "Joao" },
                { text: "Victory... achieved.", speaker: "Roman" },
                { text: "The Manager always wins!", speaker: "Erwin" }
            ],
            'SIMON_TRANSFORM': [
                { text: "You think this is over?", speaker: "MEGA SIMON" },
                { text: "FOOL! THIS ISN'T EVEN MY FINAL FORM!", speaker: "MEGA SIMON" },
                { text: "TRANSFORMATION COMPLETE. RESISTANCE IS FUTILE.", speaker: "MECHA MEGA SIMON" }
            ]
        };
    }

    async preloadForState(state) {
        if (this.ttsSettings.mode !== 'advanced') return;

        const list = this.preloadLists[state];
        if (!list) return;

        console.log(`[TTSPreloader] Preloading ${list.length} audio files for state: ${state}`);

        for (const item of list) {
            const cacheKey = `${item.speaker}:${item.text}`;

            // Skip if already preloaded or currently preloading
            if (this.ttsSettings.preloadedAudio.has(cacheKey) || this.ttsSettings.pendingPreloads.has(cacheKey)) {
                continue;
            }

            this.ttsSettings.pendingPreloads.add(cacheKey);

            // Generate and cache audio
            const audioUrl = await this.geminiTTS.generateTTS(item.text, item.speaker);
            if (audioUrl) {
                this.ttsSettings.preloadedAudio.set(cacheKey, audioUrl);
                console.log(`[TTSPreloader] Cached: ${cacheKey}`);
            }

            this.ttsSettings.pendingPreloads.delete(cacheKey);
        }
    }

    // Preload a specific custom text
    async preloadCustom(text, speaker) {
        if (this.ttsSettings.mode !== 'advanced') return;

        const cacheKey = `${speaker}:${text}`;
        if (this.ttsSettings.preloadedAudio.has(cacheKey) || this.ttsSettings.pendingPreloads.has(cacheKey)) {
            return;
        }

        this.ttsSettings.pendingPreloads.add(cacheKey);
        const audioUrl = await this.geminiTTS.generateTTS(text, speaker);
        if (audioUrl) {
            this.ttsSettings.preloadedAudio.set(cacheKey, audioUrl);
        }
        this.ttsSettings.pendingPreloads.delete(cacheKey);
    }

    clearCache() {
        // Revoke all blob URLs to free memory
        for (const url of this.ttsSettings.preloadedAudio.values()) {
            URL.revokeObjectURL(url);
        }
        this.ttsSettings.preloadedAudio.clear();
    }
}
