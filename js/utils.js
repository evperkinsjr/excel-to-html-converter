const loadedAssets = new Set();

export function loadThemeAssets(theme) {
    if (theme === 'uswds') {
        
        const cssUrl = './css/uswds-preview.css';

        const head = document.head;

        // Load CSS link
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssUrl;
        head.appendChild(link);
        loadedAssets.add(cssUrl);
    }
}

export function sanitizeCssSize(value) {
    const v = (value || '').toString().trim();
    if (!v) return '';
    if (/^\d+$/.test(v)) return `${v}px`; // plain number to px
    if (/^\d+%$/.test(v)) return v; // percentage
    if (/^\d+(\.\d+)?(px|rem|em|vh|vw)$/.test(v)) return v; // valid unit

    // notify user of invalid input
    alert(`CSS size input "${value}" is invalid. Using default size.`);
    return ''; // fallback to default styling if value fails all checks
}