export async function handler() {
    const apiKey = (process.env.GEMINI_API_KEY || process.env.GENERATIVE_LANGUAGE_API_KEY || '').trim();

    if (!apiKey) {
        return {
            statusCode: 404,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            },
            body: JSON.stringify({ error: 'GEMINI_API_KEY not configured in Netlify environment.' })
        };
    }

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
        },
        body: JSON.stringify({ apiKey })
    };
}
