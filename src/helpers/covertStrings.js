export function convertStrings(str) {
    // Chuyển sang chữ thường
    let result = str.toLowerCase();

    // Xóa dấu
    result = result.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Thay thế khoảng trắng bằng dấu gạch ngang
    result = result.replace(/\s+/g, '-');

    return result;
}
// Hàm chuyển sang chữ thường