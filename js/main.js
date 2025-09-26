import { readWorkbook } from "./fileReader.js";
import { rowsToHTMLTable } from "./htmlGenerator.js";
import { bindUI } from "./uiController.js";

const refs = {
    file: document.getElementById('excel-file-input'),
    enableSearch: document.getElementById('enable-search'),
    convertBtn: document.getElementById('convert-btn'),
    previewBox: document.getElementById('preview-box'),
    outputBox: document.getElementById('output-box')
}

async function handleConvert() {
    if (!refs.file.files?.[0]) return alert('Please choose an Excel file');
    const wb = await readWorkbook(refs.file.files[0]);
    const sheetName = wb.SheetNames[0];
    const sheet = wb.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, blankrows: false });

    const { tableEl, htmlString } = rowsToHTMLTable(rows, { searchable: refs.enableSearch.checked });

    // Preview
    refs.previewBox.appendChild(tableEl);

    // HTML output
    const outNode = tableEl;
    refs.outputBox.value = outNode.outerHTML;
}

bindUI({
    onConvert: handleConvert,
    refs
});