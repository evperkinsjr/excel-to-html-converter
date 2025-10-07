const validExcelExtensions = ['.xlsx', '.xls', '.xlsm', '.xlsb'];

// Check if file object has a valid excel file extension
export function isValidExcelFile(file) {
    if (!file || !file.name) {
        return false;
    }
    const fileName = file.name.toLowerCase();

    // Check file name extension
    return validExcelExtensions.some(ext => fileName.endsWith(ext));
}

export function resetUI(refs) {
    refs.file.value = '';
    refs.width.value = '';
    refs.height.value = '';
    refs.theme.value = 'unstyled';
    refs.enableSearch.checked = false;
    refs.previewBox.innerHTML = '';
    refs.outputBox.value = '';
}

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

export function copyToClipboard(text) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(
        () => alert('HTML copied to clipboard'),
        () => alert('Copy failed. Please select and copy manually.')
    );
}