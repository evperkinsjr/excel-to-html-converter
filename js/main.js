import { readWorkbook } from "./fileReader.js";
import { bindUI } from "./uiController.js";

const refs = {
    file: document.getElementById('excel-file-input'),
    convertBtn: document.getElementById('convert-btn'),
}

async function handleConvert() {
    const wb = await readWorkbook(refs.file.files[0]);
    const sheetName = wb.SheetNames[0];
    const sheet = wb.Sheets[sheetName];

    console.log(sheet);
}

bindUI({
    onConvert: handleConvert,
    refs
});