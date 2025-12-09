/**
 * Netlify Function to securely expose the GEMINI_API_KEY to the client-side JavaScript.
 *
 * The client code (AMZL WHS Coordinator Quest) calls this endpoint:
 * fetch('/.netlify/functions/get-gemini-key')
 * and expects a JSON response in the format: { "apiKey": "..." }
 */
exports.handler = async () => {
    // The environment variable name must match what you set in Netlify settings.
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.error("The GEMINI_API_KEY environment variable is missing.");
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "API key is not configured in Netlify Environment Variables.",
                // Do not expose the variable name directly in a public error message
            }),
        };
    }

    try {
        // Return the key to the client-side code
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                // Essential for security: restrict access if possible, or rely on Netlify's protection
                "Access-Control-Allow-Origin": "*", // Allows access from any origin (safe for public API key exposure)
                "Cache-Control": "no-cache" // Always fetch the latest key
            },
            body: JSON.stringify({
                apiKey: apiKey
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to process key retrieval.' }),
        };
    }
};
