const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

export function isBackendConfigured() {
    return Boolean(API_BASE_URL);
}

export async function checkReaction(elements) {
    if (!API_BASE_URL) {
        return null;
    }

    const response = await fetch(`${API_BASE_URL}/api/reactions/check`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ elements }),
    });

    if (!response.ok) {
        throw new Error(`Reaction check failed with status ${response.status}`);
    }

    return response.json();
}
