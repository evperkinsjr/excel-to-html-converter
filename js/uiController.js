export function bindUI({ onConvert, refs }) {
    refs.convertBtn.addEventListener('click', onConvert);
}