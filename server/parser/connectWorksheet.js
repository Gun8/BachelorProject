const xlsx = require("xlsx");

let workbook = xlsx.readFile("D:\\excel\\EBTS_2020_ua.xls");
let worksheet =  workbook.Sheets[workbook.SheetNames[4]];

module.exports = worksheet;