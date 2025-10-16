export function applyTheme(node, theme) {
    // Check to find the table
    const table = node.tagName === 'TABLE' ? node : node.querySelector('table');

    // Check to find the search input
    let input = null;
    if (node.tagName !== 'TABLE') {
        input = node.querySelector('input[type="search"]');
    }

    // Check to find the caption
    const caption = table.querySelector('caption');

    // Clear previous styling classes
    table.removeAttribute('class');
    if (input) input.removeAttribute('class');
    if (caption) caption.removeAttribute('class');

    switch(theme) {
        case 'tailwind':
            // Table styling
            table.classList.add('min-w-full', 'border', 'border-gray-300');
            table.querySelectorAll('th').forEach(th => th.classList.add('border', 'border-gray-300', 'bg-gray-100', 'text-center', 'p-2'));
            table.querySelectorAll('td').forEach(td => td.classList.add('border', 'border-gray-200', 'p-2'));

            // Search input styling
            if (input) {
                input.classList.add('mb-2', 'px-2', 'py-1', 'border', 'rounded', 'focus:ring-blue-500');
            }

            // Caption styling
            if (caption) {
                caption.classList.add('caption-top', 'p-2', 'text-sm', 'font-semibold', 'text-gray-800', 'text-center');
            }

            break;

        case 'uswds':
            // Standard table styling
            table.classList.add('usa-table');

            // Search input styling
            if (input) {
                input.classList.add('usa-input');
            }

            // Caption styling
            if (caption) {
                caption.classList.add('font-semibold', 'text-center');
            }
            
            break;

        default:
            // Unstyled, plain HTML
            console.log('no formatting style applied.');
            break;
    }
}