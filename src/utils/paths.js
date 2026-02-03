export const resolveAssetPath = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;

    // Get base URL from Vite's environment
    const base = import.meta.env.BASE_URL || '/';

    // Ensure base ends with a slash and the relative path doesn't start with one
    // to avoid double slashes or missing slashes.
    const cleanBase = base.endsWith('/') ? base : `${base}/`;
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    return `${cleanBase}${cleanPath}`;
};
