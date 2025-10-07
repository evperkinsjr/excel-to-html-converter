export function bindUI({ onChange, onReset, onConvert, onCopy, refs }) {
    refs.file.addEventListener('change', onChange);
    refs.resetBtn.addEventListener('click', onReset);
    refs.convertBtn.addEventListener('click', onConvert);
    refs.copyBtn.addEventListener('click', onCopy);
}