export async function readWorkbook(file) {
    const data = await file.arrayBuffer();
    return XLSX.read(data, { type: 'array'});
}