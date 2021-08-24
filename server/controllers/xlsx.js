const con = require('../mysql');
const exportBalanceToExcel = require('../export/exportBalance');

const xlsx = (req,res) => {
    const sql = `
        select balance.balance_id as id, products.name, supply_and_consumption.name as type, balance.value, balance.year 
        from ((balance
        inner join supply_and_consumption
        on balance.supply_and_consumption_id = supply_and_consumption.supply_and_consumption_id)
        inner join products
        on balance.product_id = products.product_id)
        order by id;
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
            "Type",
            "Value",
            "Year"
        ];

        let wscols = [
            {wch:8.38},
            {wch:26.38},
            {wch:35.25},
            {wch:11.88},
            {wch:8.38}
        ];

        const workSheetName = 'Balance';

        const wbout = exportBalanceToExcel(rows,workSheetColumnName, workSheetName,wscols);
        res.send(JSON.stringify({data:wbout}));
    })
};

module.exports = xlsx;
