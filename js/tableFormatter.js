export function applyTheme(node, theme) {
    // Check to find the table
    const table = node.tagName === 'TABLE' ? node : node.querySelector('table');

    // Clear previous styling classes
    table.removeAttribute('class');

    switch(theme) {
        case 'tailwind':
            // Neutral Tailwind styling
            table.classList.add('min-w-full', 'border', 'border-gray-300');
            table.querySelectorAll('th').forEach(th => th.classList.add('border', 'border-gray-300', 'bg-gray-100', 'text-left', 'p-2'));
            table.querySelectorAll('td').forEach(td => td.classList.add('border', 'border-gray-200', 'p-2'));
            break;

        case 'uswds':
            // Striped USWDS table styling
            table.classList.add('usa-table', 'usa-table--striped');
            break;

        default:
            // Unstyled, plain HTML
            console.log('no formatting style applied.');
            break;
    }
}