import { readWorkbook } from "./fileReader.js";
import { rowsToHTMLTable } from "./htmlGenerator.js";
import { applyTheme } from "./tableFormatter.js";
import { bindUI } from "./uiController.js";
import { isValidExcelFile, resetUI, loadThemeAssets, sanitizeCssSize } from "./utils.js";

const refs = {
    file: document.getElementById('excel-file-input'),
    width: document.getElementById('width'),
    height: document.getElementById('height'),
    theme: document.getElementById('theme'),
    enableSearch: document.getElementById('enable-search'),
    resetBtn: document.getElementById('reset-btn'),
    convertBtn: document.getElementById('convert-btn'),
    previewBox: document.getElementById('preview-box'),
    outputBox: document.getElementById('output-box')
}

function handleFileChange() {
    const file = refs.file.files?.[0];

    if (file && !isValidExcelFile(file)) {
        alert('The selected file does not appear to a valid Excel spreadsheet (.xlsx, .xls). Please select a different file.');

        refs.file.value = '';
    }
}

async function handleConvert() {
    const file = refs.file.files?.[0];

    // File check
    if (!file) return alert('Please choose an Excel file');
    
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
}

bindUI({
    onChange: handleFileChange,
    onReset: resetUI,
    onConvert: handleConvert,
    refs
});