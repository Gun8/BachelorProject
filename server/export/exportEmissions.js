const exportExcel = require('../export/exportService');

const exportEmissionsToExcel = (emissions, workSheetColumnNames, workSheetName,wscols) => {
    const data = emissions.map(emissions => {
        return [emissions.id, emissions.name, emissions.value, emissions.year];
    });

    return exportExcel(data, workSheetColumnNames, workSheetName,wscols);
};

module.exports = exportEmissionsToExcel;