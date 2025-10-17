export function bindUI({ onChange, onReset, onConvert, onCopy, onToggleModal, refs }) {
    refs.file.addEventListener('change', onChange);
    refs.resetBtn.addEventListener('click', onReset);
    refs.convertBtn.addEventListener('click', onConvert);
    refs.copyBtn.addEventListener('click', onCopy);
    refs.themeInfoBtn.addEventListener('click', onToggleModal);
    refs.modalCloseBtn.addEventListener('click', onToggleModal);
}