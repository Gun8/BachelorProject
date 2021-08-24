const exportExcel = require('../export/exportService');

const exportBalanceToExcel = (balance, workSheetColumnNames, workSheetName,wscols) => {
    const data = balance.map(balance => {
        return [balance.id, balance.name, balance.type, balance.value, balance.year];
    });

    return exportExcel(data, workSheetColumnNames, workSheetName,wscols);
};

module.exports = exportBalanceToExcel;