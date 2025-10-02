const loadedAssets = new Set();

export function loadThemeAssets(theme) {
    if (theme === 'uswds') {
        const cssUrl = 'https://cdn.jsdelivr.net/npm/uswds@latest/dist/css/uswds.min.css';
        const jsUrl = 'https://cdn.jsdelivr.net/npm/uswds@latest/dist/js/uswds.min.js';

        const head = document.head;

        // Load CSS link
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssUrl;
        head.appendChild(link);
        loadedAssets.add(cssUrl);

        // Load JS link
        const script = document.createElement('script');
        script.src = jsUrl;
        loadedAssets.add(jsUrl);
    }
}