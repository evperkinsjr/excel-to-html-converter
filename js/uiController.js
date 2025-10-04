export function bindUI({ onChange, onConvert, refs }) {
    refs.file.addEventListener('change', onChange);
    refs.convertBtn.addEventListener('click', onConvert);
}