import { readWorkbook } from "./fileReader.js";
import { rowsToHTMLTable } from "./htmlGenerator.js";
import { applyTheme } from "./tableFormatter.js";
import { bindUI } from "./uiController.js";
import { clearNotifications, showNotification, isValidExcelFile, resetUI, loadThemeAssets, sanitizeCssSize, copyToClipboard, makeTableSortable } from "./utils.js";

const refs = {
    setupBlock: document.getElementById('setup-block'),
    loadingBlock: document.getElementById('loading-block'),
    resultsBlock: document.getElementById('results-block'),
    file: document.getElementById('excel-file-input'),
    width: document.getElementById('width'),
    height: document.getElementById('height'),
    theme: document.getElementById('theme'),
    enableSearch: document.getElementById('enable-search'),
    resetBtn: document.getElementById('reset-btn'),
    convertBtn: document.getElementById('convert-btn'),
    previewBox: document.getElementById('preview-box'),
    outputBox: document.getElementById('output-box'),
    copyBtn: document.getElementById('copy-btn')
};

function handleFileChange() {
    const file = refs.file.files?.[0];

    if (file && !isValidExcelFile(file)) {
        showNotification('The selected file does not appear to a valid Excel spreadsheet (.xlsx, .xls). Please select a different file.', 'error');

        refs.file.value = '';
    }
}

async function handleConvert() {
    const file = refs.file.files?.[0];

    // Clear any stale notifications
    clearNotifications();

    // File check
    if (!file) return showNotification('Please choose an Excel file', 'warn');

    // Show loading screen and hide setup block
    if (refs.loadingBlock) refs.loadingBlock.classList.remove('hidden');
    if (refs.setupBlock) refs.setupBlock.classList.add('hidden');

    try {
        const wb = await readWorkbook(file);
        const sheetName = wb.SheetNames[0];
        const sheet = wb.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, blankrows: false });

        //Store selected theme
        const selectedTheme = refs.theme.value;

        // Load external assets based on selected theme
        loadThemeAssets(selectedTheme);

        const { tableEl, htmlString } = rowsToHTMLTable(rows, {
            searchable: refs.enableSearch.checked,
            theme: selectedTheme
        });

        // apply formatting style (theme)
        applyTheme(tableEl, selectedTheme);

        // table size dimensions
        const width = sanitizeCssSize(refs.width.value);
        const height = sanitizeCssSize(refs.height.value);
        tableEl.style.width = width;

        // Determine the element that holds the table (in case it's wrapped)
        const previewTable = tableEl.tagName === 'TABLE' ? tableEl : tableEl.querySelector('table');

        // Make the preview table sortable
        makeTableSortable(previewTable);

        // Insert into preview box
        if (height) {
            const wrapper = document.createElement('div');
            wrapper.style.maxHeight = height;
            wrapper.style.overflow = 'auto';
            wrapper.appendChild(tableEl);
            refs.previewBox.innerHTML = '';
            refs.previewBox.appendChild(wrapper);
        } else {
            refs.previewBox.innerHTML = '';
            refs.previewBox.appendChild(tableEl);
        }

        // HTML output
        const outNode = height ? refs.previewBox.firstChild : tableEl;
        refs.outputBox.value = outNode.outerHTML;

        // SUCCESS
        if (refs.resultsBlock) refs.resultsBlock.classList.remove('hidden');

    } catch (error) {
        // FAILURE... if any error occurred in the try block
        
        // Notify user of the error
        showNotification(`Conversion failed: ${error.message || 'An unknown error occurred.'}`, 'error');

        // Reset
        resetUI(refs, false);

    } finally {
        // Hide loading screen regardless of success or failure
        if (refs.loadingBlock) refs.loadingBlock.classList.add('hidden');
    }
}

bindUI({
    onChange: handleFileChange,
    onReset: () => resetUI(refs, true),
    onConvert: handleConvert,
    onCopy: () => copyToClipboard(refs.outputBox.value),
    refs
});