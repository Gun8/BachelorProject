const xlsx = require('xlsx');

const exportExcel = (data, workSheetColumnNames, workSheetName,wscols) => {
    const workBook = xlsx.utils.book_new();
    const workSheetData = [
        workSheetColumnNames,
        ... data
    ];
    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);

    workSheet['!cols'] = wscols;

    xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);

    return xlsx.write(workBook, {bookType:'xlsx',  type: 'binary'});
};

module.exports = exportExcel;