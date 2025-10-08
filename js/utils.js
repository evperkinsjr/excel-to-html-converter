// Notify user of something
export function showNotification(message, type) {
    const notificationContainer = document.body;
    if (!notificationContainer) return;

    const existing = document.querySelector('.custom-notification');
    if (existing) existing.remove();

    let themeClasses;
    switch (type) {
        case 'error':
            themeClasses = 'bg-red-900 text-red-100 border-red-300';
            break;
        case 'success':
            themeClasses = 'bg-green-900 text-green-100 border-green-300';
            break;
        case 'warn':
            themeClasses = 'bg-yellow-300 text-yellow-900 border-yellow-300';
            break;
        default:
            themeClasses = 'bg-blue-900 text-blue-100 border-blue-300';
            break;
    }

    const alertDiv = document.createElement('div');
    alertDiv.className = `custom-notification fixed top-4 right-4 z-10 rounded-md p-4 mb-4 text-sm shadow-lg border ${themeClasses} font-medium w-11/12 md:w-1/4 max-w-sm`;
    
    alertDiv.textContent = message;

    notificationContainer.prepend(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Check if file object has a valid excel file extension
const validExcelExtensions = ['.xlsx', '.xls', '.xlsm', '.xlsb'];

export function isValidExcelFile(file) {
    if (!file || !file.name) {
        return false;
    }
    const fileName = file.name.toLowerCase();

    // Check file name extension
    return validExcelExtensions.some(ext => fileName.endsWith(ext));
}

// Reset
export function resetUI(refs) {
    refs.file.value = '';
    refs.width.value = '';
    refs.height.value = '';
    refs.theme.value = 'unstyled';
    refs.enableSearch.checked = false;
    refs.previewBox.innerHTML = '';
    refs.outputBox.value = '';
}

// Load CSS file based on selected theme
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

// Sanitize CSS inputs
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

// Copy HTML output to clipboard
export function copyToClipboard(text) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(
        () => alert('HTML copied to clipboard'),
        () => alert('Copy failed. Please select and copy manually.')
    );
}