const con = require('../mysql');

const emissions = (req,res) => {
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

        res.send(JSON.stringify(rows));
    })
};

module.exports = emissions;