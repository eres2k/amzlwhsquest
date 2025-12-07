/**
 * AI/Gemini integration system
 */

import { MODEL_NAME } from '../config/constants.js';
import { SIMULATED_AI } from '../config/dialogue.js';

let apiKey = null;
let apiKeyFetched = false;

// Fetch API key from Netlify function
async function fetchApiKey() {
  if (apiKeyFetched) return apiKey;

  try {
    const response = await fetch('/.netlify/functions/get-gemini-key');
    if (!response.ok) {
      console.warn('Failed to fetch API key, using simulated AI');
      apiKeyFetched = true;
      return null;
    }
    const data = await response.json();
    apiKey = data.key || null;
    apiKeyFetched = true;
    return apiKey;
  } catch (error) {
    console.warn('Error fetching API key:', error);
    apiKeyFetched = true;
    return null;
  }
}

// Call Gemini API
export async function callGemini(prompt, context = "general") {
  const key = await fetchApiKey();

  if (!key) {
    return getSimulatedResponse(context);
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${key}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          maxOutputTokens: 80,
          temperature: 0.9,
          topP: 0.9
        }
      })
    });

    if (!response.ok) {
      console.warn('Gemini API error:', response.status);
      return getSimulatedResponse(context);
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return getSimulatedResponse(context);
    }

    return text.trim();
  } catch (error) {
    console.warn('Gemini API call failed:', error);
    return getSimulatedResponse(context);
  }
}

// Get simulated response when API is unavailable
function getSimulatedResponse(context) {
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  switch (context) {
    case 'tip':
    case 'tips':
      return pick(SIMULATED_AI.tips);
    case 'runner':
    case 'runners':
      return pick(SIMULATED_AI.runners);
    case 'taunt':
    case 'taunts':
      return pick(SIMULATED_AI.taunts);
    case 'simon_taunt':
      return pick(SIMULATED_AI.simon_taunts);
    case 'simon_warning':
      return pick(SIMULATED_AI.simon_warnings);
    case 'review_win':
      return pick(SIMULATED_AI.reviews_win);
    case 'review_loss':
      return pick(SIMULATED_AI.reviews_loss);
    case 'intro':
      return "Welcome back. The warehouse waits for no one. Stay sharp, stay safe.";
    case 'defeat':
      return "Performance: Terminated. Entropy wins again.";
    case 'victory':
      return "Outstanding work. The warehouse is safer because of you.";
    default:
      return pick(SIMULATED_AI.tips);
  }
}

// Generate a boss taunt
export async function generateBossTaunt(bossName, playerName, hpPercent) {
  const prompt = `You are ${bossName}, an Amazon middle manager boss. You're fighting ${playerName}. Your HP is at ${Math.floor(hpPercent * 100)}%. Give a short, menacing corporate taunt. Max 15 words.`;
  return callGemini(prompt, 'taunt');
}

// Generate a dialogue for Simon
export async function generateSimonDialogue(context, playerName) {
  let prompt;
  switch (context) {
    case 'intro':
      prompt = `You are Simon Unglaube, WHS Senior Regional Manager for Amazon MEU. Greet ${playerName} with dry humor and one quick, relevant safety reminder for starting the shift. Keep it witty. Max 18 words.`;
      break;
    case 'victory':
      prompt = `You are Simon Unglaube, WHS Senior Regional Manager. ${playerName} just completed a successful safety audit. Give a brief, sardonic congratulation. Max 20 words.`;
      break;
    case 'defeat':
      prompt = `You are Simon Unglaube, WHS Senior Regional Manager. ${playerName} failed the safety challenge. Give a disappointed but darkly humorous review. Max 25 words.`;
      break;
    default:
      prompt = `You are Simon Unglaube, WHS Senior Regional Manager for Amazon MEU. Say something safety-related and sardonic. Max 15 words.`;
  }
  return callGemini(prompt, context);
}

export default { callGemini, generateBossTaunt, generateSimonDialogue };
