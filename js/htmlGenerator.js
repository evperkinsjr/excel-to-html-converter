function createCell(tag, text) {
    const el = document.createElement(tag);
    el.textContent = text ?? '';
    return el;
}

export function rowsToHTMLTable(rows) {
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

    return { tableEl: table, htmlString: table.outerHTML };
}