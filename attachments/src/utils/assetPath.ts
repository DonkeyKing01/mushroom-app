/**
 * Utility function to get the correct asset path for both development and production.
 * In development, returns the path as-is.
 * In production (GitHub Pages), prepends the base URL.
 */
export const getAssetPath = (path: string): string => {
    // Remove leading slash if present to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    // import.meta.env.BASE_URL is '/' in dev and '/Antigravity-mushroomy-Lee/' in production
    return `${import.meta.env.BASE_URL}${cleanPath}`;
};
