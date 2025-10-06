export function bindUI({ onChange, onReset, onConvert, refs }) {
    refs.file.addEventListener('change', onChange);
    refs.resetBtn.addEventListener('click', onReset);
    refs.convertBtn.addEventListener('click', onConvert);
}