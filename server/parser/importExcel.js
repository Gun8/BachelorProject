const worksheet = require("./connectWorksheet");
const con = require("../mysql");

let year = 2019;
let id = 1;
let row = 1;
let col = 1;

let data = [];

for (let i = 5; i <= 1571 ; i += 54){
    for (let cell in worksheet){
        const cellAsString = cell.toString();
        if(cellAsString[0] >= 'B' && cellAsString[0] <= 'K' && !isNaN(cellAsString[1])
            && +cellAsString.slice(1) <= i + 51 && +cellAsString.slice(1) >= i) {
            data.push([id++, worksheet[cell].v, year, col++, row]);
        }

        if (col === 11){
            col = 1;
            row++;
        }
    }

    year--;
    row = col = 1;
}

let sql = "INSERT INTO balance (balance_id, value, year, product_id, supply_and_consumption_id) VALUES ?";

con.query(sql, [data], (err, res) => {
    if (err) throw err;
    console.log("Number of records inserted: " + res.affectedRows);
});
