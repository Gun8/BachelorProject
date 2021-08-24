const con = require('../mysql');

const energyBalance = (req,res) => {
    const sql = `
        select balance.balance_id as id, products.name, supply_and_consumption.name as type, balance.value, balance.year 
        from ((balance
        inner join supply_and_consumption
        on balance.supply_and_consumption_id = supply_and_consumption.supply_and_consumption_id)
        inner join products
        on balance.product_id = products.product_id);
  ;`;

    con.query(sql,[], (error,rows) => {
        if (error) {
            return res.status(500).send({
                message: error,
            });
        }

        res.send(JSON.stringify(rows));
    })
};

module.exports = energyBalance;