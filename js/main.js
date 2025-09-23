import { readWorkbook } from "./fileReader.js";
import { bindUI } from "./uiController.js";

const refs = {
    file: document.getElementById('excel-file-input'),
    convertBtn: document.getElementById('convert-btn'),
}