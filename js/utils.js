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