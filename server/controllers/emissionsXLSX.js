const con = require('../mysql');
const exportEmissionsToExcel = require('../export/exportEmissions');

const emxlsx = (req,res) => {
    const sql = `
        select 
            id, name, value, year 
        from emissions;
  ;`;

    con.query(sql,[], (error,rows) => {
        if (error) {
            return res.status(500).send({
                message: error,
            });
        }

        const workSheetColumnName = [
            "Id",
            "Name",
            "Value",
            "Year"
        ];

        let wscols = [
            {wch:8.38},
            {wch:26.38},
            {wch:11.88},
            {wch:8.38}
        ];

        const workSheetName = 'Emissions';

        const wbout = exportEmissionsToExcel(rows,workSheetColumnName, workSheetName,wscols);
        res.send(JSON.stringify({data:wbout}));
    })
};

module.exports = emxlsx;