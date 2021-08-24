const xlsx = require("xlsx");
const con = require("../mysql");

let workbook = xlsx.readFile("C:\\Users\\Vladislav\\Downloads\\emissions.xlsx");
let worksheet =  workbook.Sheets[workbook.SheetNames[0]];

let year = 2008;
let id = 1;

let data = [];

for (let cell in worksheet){
    const cellAsString = cell.toString();
    if(cellAsString[0] >= 'B' && cellAsString[0] <= 'N' && !isNaN(cellAsString[1]) && cellAsString.slice(1) !== '1') {
        data.push([id++,worksheet['A' + cellAsString.slice(1)].v, worksheet[cell].v, year++]);
    }

    if (year === 2021){
        year = 2008
    }
}

console.log(data);

let sql = "INSERT INTO emissions (id, name, value, year) VALUES ?";

con.query(sql, [data], (err, res) => {
    if (err) throw err;
    console.log("Number of records inserted: " + res.affectedRows);
});