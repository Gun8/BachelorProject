const worksheet = require("./connectWorksheet");
const con = require("../mysql");

let names = [];
let id = 1;

for (let cell in worksheet){
    const cellAsString = cell.toString();

    if(cellAsString[0] === 'A' && cellAsString.slice(1) >= 5 && cellAsString.slice(1) <= 56 ){
        names.push([id++, worksheet[cell].v.trim()]);
    }
}

let sql = "INSERT INTO supply_and_consumption (supply_and_consumption_id, name) VALUES ?";

con.query(sql, [names], (err, res) => {
    if (err) throw err;
    console.log("Number of records inserted: " + res.affectedRows);
});