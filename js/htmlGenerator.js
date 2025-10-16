import { showNotification } from "./utils.js";

function createCell(tag, text) {
    const el = document.createElement(tag);
    el.textContent = text ?? '';
    return el;
}

export function rowsToHTMLTable(rows, { searchable = false } = {}) {
    if (!rows || !rows.length) return showNotification('We couldn\'t find any data rows in this worksheet.', 'error');
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Header row
    const header = rows[0] || [];
    const trHead = document.createElement('tr');
    header.forEach(h => trHead.appendChild(createCell('th', h)));
    thead.appendChild(trHead);

    // Body rows
    for (let r = 1; r < rows.length; r++) {
        const tr = document.createElement('tr');
        (rows[r] || []).forEach(v => tr.appendChild(createCell('td', v)));
        tbody.appendChild(tr);
    }

    table.appendChild(thead);
    table.appendChild(tbody);

    // Caption
    const caption = document.createElement('caption');
    caption.textContent = 'Data converted from Excel spreadsheet';
    table.prepend(caption);

    // Optional - search input
    if (searchable) {
        const input = document.createElement('input');
        input.type = 'search';
        input.placeholder = 'Search table...';
        input.setAttribute('aria-label', 'Search table');
        input.addEventListener('input', () => {
            const q = input.value.toLowerCase();
            for (const row of tbody.rows) {
                const text = row.innerText.toLowerCase();
                row.style.display = text.includes(q) ? '' : 'none';
            }
        });
        const wrapper = document.createElement('div');
        wrapper.appendChild(input);
        wrapper.appendChild(table);
        return { tableEl: wrapper, htmlString: wrapper.outerHTML };
    }

    return { tableEl: table, htmlString: table.outerHTML };
}