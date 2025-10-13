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
    if (refs.file) refs.file.value = '';
    if (refs.width) refs.width.value = '';
    if (refs.height) refs.height.value = '';
    if (refs.theme) refs.theme.value = 'unstyled';
    if (refs.enableSearch) refs.enableSearch.checked = false;
    if (refs.previewBox) refs.previewBox.innerHTML = '';
    if (refs.outputBox) refs.outputBox.value = '';
    if (refs.setupBlock) refs.setupBlock.classList.remove('hidden');
    if (refs.loadingBlock) refs.loadingBlock.classList.add('hidden');
    if (refs.resultsBlock) refs.resultsBlock.classList.add('hidden');
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
    showNotification(`CSS size input "${value}" is invalid. Using default size.`, 'warn');
    return ''; // fallback to default styling if value fails all checks
}

// Copy HTML output to clipboard
export function copyToClipboard(text) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(
        () => showNotification('HTML copied to clipboard', 'success'),
        () => showNotification('Copy failed. Please select and copy manually.', 'error')
    );
}

// Makes the HTML table (in preview) sortable by clicking its headers
export function makeTableSortable(table) {
    if (!table || table.tagName !== 'TABLE') return;

    // Helper to compare values (handles numbers vs strings)
    const compareValues = (valA, valB) => {
        const numA = parseFloat(valA);
        const numB = parseFloat(valB);
        if (!isNaN(numA) && !isNaN(numB)) {
            return numA - numB;
        }
        return valA.localeCompare(valB);
    };

    const headers = table.querySelectorAll('th');
    
    headers.forEach((header, columnIndex) => {
        header.style.cursor = 'pointer'; 
        header.setAttribute('data-sort-direction', 'none'); // 'none', 'asc', or 'desc'

        header.addEventListener('click', () => {
            const tbody = table.querySelector('tbody');
            if (!tbody) return;

            const rows = Array.from(tbody.querySelectorAll('tr'));
            let direction = header.getAttribute('data-sort-direction');

            const newDirection = (direction === 'asc' || direction === 'none') ? 'desc' : 'asc';

            // Clear sorting indicators from all headers
            table.querySelectorAll('th').forEach(th => th.removeAttribute('data-sort-direction'));
            
            // Set new direction on current header
            header.setAttribute('data-sort-direction', newDirection);

            // Sorting logic
            rows.sort((rowA, rowB) => {
                const cellA = rowA.cells[columnIndex].textContent.trim();
                const cellB = rowB.cells[columnIndex].textContent.trim();
                
                let comparison = compareValues(cellA, cellB);
                
                return newDirection === 'asc' ? comparison : comparison * -1;
            });

            // Re-append sorted rows
            rows.forEach(row => tbody.appendChild(row));
        });
    });
}